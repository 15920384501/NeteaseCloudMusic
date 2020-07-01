<template>
    <div class="password-login-wrapper">
        <div class="phone-bar">
            <span class="bar-text">手机号登录</span>
            <span @click="$router.go(-1)" class="icon-back bar-icon"></span>
        </div>
        <div class="password-form">
            <van-form @submit="onSubmit">
                <van-field
                        v-model="password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="输入密码"
                        :rules="[{pattern:/.{6,}/, required: true, message: '密码长度至少为6位' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        立即登录
                    </van-button>
                </div>
            </van-form>
        </div>
        <div v-show="loginLoading" class="login-loading">
            <van-loading color="#fff" type="spinner" size="24px"><span class="loading-text">登陆中...</span></van-loading>
        </div>
    </div>
</template>

<script>
    import {SET_USER_PASSWORD,SET_USER_ID} from "../../store/mutations-types";
    import {mapState,mapMutations} from 'vuex' ;
    import {Toast} from 'vant';
    export default {
        name: "PasswordLogin",
        data: ()=>({
            password: '',
            loginLoading: false ,
        }),
        methods:{
            ...mapMutations({
                setUserPassword : SET_USER_PASSWORD ,
                setUserId : SET_USER_ID ,
            }),
            onSubmit(){
                this.loginLoading = true ;

                this.setUserPassword(this.password);
                console.log(this.password,this.user) ;
                this.timer = setTimeout(() => {
                    this.axios({
                        method:'POST',
                        url: `http://localhost:3000/login/cellphone`,
                        data:{
                            phone:this.user.phone,
                            password:this.user.password,

                        },


                    }).then(res => {
                        this.loginLoading = false ;
                        if(res.data.code === 200){
                            console.log('登录成功');
                            localStorage.setItem('login','true');
                            //利用localStorage记录用户信息
                            localStorage.setItem('phone',this.user.phone);
                            localStorage.setItem('password',this.user.password);

                            //记录用户id
                            this.setUserId(res.data.account.id);
                            localStorage.setItem('id',res.data.account.id);

                            this.$router.push('/find');
                        }else if(res.data.code === 502){
                            console.log('账号或密码错误');
                            Toast('账号或密码错误');
                        }
                    })
                },5000)
            }
        },
        computed : {
            ...mapState({
                user: state => state.user
            }),
        },
        beforeDestroy() {
            clearTimeout(this.timer)  ;
        }
    }
</script>

<style lang="scss" scoped>
.password-login-wrapper{
    width : 100vw ;
    height : 100vh ;
    position : fixed ;
    top : 0 ;
    z-index : 52 ;
    background-color : #fff ;

    .phone-bar{
        width : 100vw ;
        height : 50px ;
        background-color : #fff;
        text-align : center ;
        line-height : 50px ;
        font-weight : bold ;
        position : relative ;

        .bar-icon{
            display: block;
            height : 50px ;
            line-height : 50px ;
            position : absolute;
            top : 0 ;
            left : 20px ;
        }
    }

    .password-form{
        padding : 20px 10px ;


    }

    .login-loading{
       width : 120px ;
        height : 60px ;
        line-height : 60px ;
        text-align: center;
        position : absolute;
        top:30% ;
        left : 50% ;
        margin-left : -60px ;
        background-color : rgba(7,17,25,.6);

        .loading-text{
            color : #fff;
        }
    }

}
</style>