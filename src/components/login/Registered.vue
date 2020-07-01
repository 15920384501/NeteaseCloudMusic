<template>
    <div class="registered-wrapper">
        <div class="registered-bar">
            <span class="bar-text">手机号登录</span>
            <span @click="$router.go(-1)" class="icon-back bar-icon"></span>
        </div>
        <div class="registered-phone">
            <div class="registered-phone-title">
                验证码以发送至
            </div>
            <div class="registered-phone-number">
                +86 {{user.phone | phoneFilter}}
                <div class="send-again">
                    <span class="again" v-show="!isCountDown" @click="sendAgain">重新发送</span>
                    <span class="countDown" v-show="isCountDown">{{countDown}}S</span>
                </div>
            </div>
        </div>
<!--        验证码输入区域-->
        <div class="verification-code-input">
            <van-password-input
                    :value="value"
                    :length="4"
                    :gutter="15"
                    :focused="showKeyboard"
                    @focus="showKeyboard = true"
            />
        </div>
        <van-number-keyboard
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard = false"
        />
    </div>
</template>

<script>
    import {mapState} from 'vuex' ;
    export default {
        name: "Registered",
        data : () => ({
            value : '',
            showKeyboard : false,
            countDown: 60 ,
            isCountDown : false ,//判断是否在倒计时
        }),
        methods: {
            onInput(key) {
                this.value = (this.value + key).slice(0, 4);

                if(this.value.length === 4){
                    console.log('该请求验证验证码了');
                    this.axios({
                        url:`/register/cellphone?phone=${this.user.phone}&password=wangyiyun111&captcha=${this.value}&nickname=binary${1345*Math.floor(Math.random())}}`,
                        withCredentials: true ,//关键
                    }).then(res => {
                        console.log(res);
                        if(res.data.code === 200){
                            localStorage.setItem('phone',this.user.phone);
                            localStorage.setItem('password','wangyiyun111');
                            // this.$router.push('/find');

                        }
                        console.log(res);
                    })
                }
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1);

            },
            sendAgain(){
                this.countDown = 60 ;
                //60s倒计时
                this.timerFunc() ;
            },
            //60S倒计时
            timerFunc(){
                this.isCountDown = true ;
                clearInterval(this.timer);//防抖
                this.timer = setInterval(() => {
                    this.countDown -- ;
                    if(this.countDown === 0 ){
                        clearInterval(this.timer) ;
                        this.isCountDown = false ;
                    }
                } , 1000)
            }
        },
        computed:{
            ...mapState({
                user : state => state.user ,
            }),
            // valueLength(){
            //
            //     return this.value.length ;
            // }
        },
        filters:{
            phoneFilter(phone){
                let phoneHead = phone.slice(0,3) ;
                let phoneFoot = phone.slice(7,11);
                let newPhone = phoneHead + '****' + phoneFoot ;
                return newPhone ;
            }
        },
        mounted(){
            //请求发送验证码到用户手机
            this.axios({
                url:`/captcha/sent?phone=${this.user.phone}`,
                withCredentials: true ,//关键
            }).then(res => {
                console.log(res);
            });
            //60s倒计时
            this.timerFunc() ;
        },
        beforeDestroy() {
            //todo 清除定时器，防止内存泄漏
            clearInterval(this.timer) ;
        }
    }
</script>

<style lang="scss" scoped>
    .registered-wrapper {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: 52;
        background-color: #fff;

        .registered-bar {
            width: 100vw;
            height: 50px;
            margin-bottom: 20px ;
            background-color: #fff;
            text-align: center;
            line-height: 50px;
            font-weight: bold;
            position: relative;

            .bar-icon {
                display: block;
                height: 50px;
                line-height: 50px;
                position: absolute;
                top: 0;
                left: 20px;
            }
        }

        .registered-phone{
            padding : 0 20px ;

            .registered-phone-title{
                font-weight : bold;
                font-size : 16px ;
            }

            .registered-phone-number{
                font-size : 14px ;
                color : #ccc;
                position : relative;

                .send-again{
                    font-size : 13px ;
                    color : rgb(90,127,171) ;
                    position : absolute;
                    right : 0 ;
                    top : 0 ;

                    .countDown{
                        color : #ccc;
                    }
                }
            }
        }

        .verification-code-input{
            padding : 0 10px ;

            .van-password-input__security li{
                border-bottom : 2px solid #ccc;
            }
        }

    }
</style>