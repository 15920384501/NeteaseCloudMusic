<template>
    <div class="phone-wrapper">
       <div class="phone-bar">
            <span class="bar-text">手机号登录</span>
           <span @click="$router.go(-1)" class="icon-back bar-icon"></span>
       </div>
       <div class="phone-content">
           <div class="phone-tip">
               未注册手机号登录后将自动创建账号
           </div>
           <van-form @submit="onsubmit"  >
               <van-field
                       @touchstart.native.stop="show = true"
                       v-model="phone"
                       name="手机号"
                       label="+86"
                       placeholder="输入手机号码"
                       :rules="[{pattern:/^1[3456789]\d{9}$/ , required: true, message: '请填写正确手机号' }]"
               />

               <div style="margin: 16px;">
                   <van-button round block type="info" native-type="submit">
                       下一步
                   </van-button>
               </div>
           </van-form>
           <van-number-keyboard
                   :show="show"
                   @blur="show = false"
                   @input="onInput"
                   @delete="onDelete"
           />
       </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {SET_USER_PHONE} from '../../store/mutations-types'
    import {mapMutations} from 'vuex' ;
    export default {
        name: "PhoneLogin",
        data: () => ({
            phone : '',
            password : '',
            show : true ,
        }),
        methods:{
            ...mapMutations({
                setUserPhone : SET_USER_PHONE ,
            }),
            onsubmit(){
              this.axios({
                  url:`/cellphone/existence/check?phone=${this.phone}&timestamp=${new Date().getTime()}`,
                  withCredentials: true ,//关键
              }).then(res => {
                  console.log(res)
                  //记录当前账号
                  this.setUserPhone(this.phone) ;
                  if(res.data.exist === 1){
                      console.log(this.phone);
                      this.$router.push({name:'PasswordLogin'});
                  }else{
                      console.log('尚未注册');
                      this.$router.push({name:'Registered'});
                  }
              })
            },
            onInput(value){
               this.phone = (this.phone +value).slice(0,11) ;
            },
            onDelete(){
                this.phone = this.phone.substring(0, this.phone.length-1);
            }
        },

    }
</script>

<style lang="scss" scoped>
.phone-wrapper{
    position : fixed ;
    top : 0 ;
    z-index: 52 ;
    width : 100vw ;
    height : 100vh ;
    background-color :#fff ;

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
    .phone-content{
        padding :0  10px ;
        .phone-tip{
            padding: 20px 0 ;
            font-size : 12px ;
            color : #ccc;
        }
    }

}
</style>