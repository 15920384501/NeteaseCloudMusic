<template>
   <div class="account-wrapper">
<!--      <video src="http://vodkgeyttp9.vod.126.net/vodkgeyttp8/68sKFbGS_1328070069_hd.mp4?ts=1589303343&rid=DD69D326D623639D22FBED99B72D53D0&rl=3&rs=nbkVFMTPRjwLWhrgzwEqZOQvpDyDMHiQ&sign=81a3728e968f66131d75b8686f166c6a&ext=%2F1c6CdK%2B9EbrZJj1paIcUfv8uVR2nmkmuVlOVYyujxfR8NGg5RcxZnQ7g4p9OKDhgkVYZph6jFucpRdg4eDuJS7yYybAZmi7axl3NjhelnnecmHdKMpGBg%2FMq5kYGB2PWh%2F%2FXC%2FKEt9mZjQGYs8VwyEEg5uUpSyIMxxFy9RrVAOBNWBVucZO1KVldP%2ByckKYUMX6dZcxEnhFpq8oLTUdNer9H5wc7ki3w2OR3%2F8oQRPCJZB3sGdI5467qk%2FEL1d7"></video>-->
      <div class="account-topBar">
         <div class="icon">
            <van-icon name="scan" />
         </div>
         <div v-if="songsPlaying.picUrl" class="top-playing">
            <div @click="intoMusicPlaying" class="myMusic">
               <img :style="{'transform':`rotate(${rotatingDeg}deg)`}"  :src="songsPlaying.picUrl" alt="">
            </div>
         </div>
      </div>

     <div class="account-content">
        <div class="account-user">
           <div class="user-pic">
              <img :src="avatarUrl" alt="">
           </div>
           <div class="user-name">
              {{nickname}}
           </div>
        </div>
        <div class="account-btn">
           <div class="btn-item">
              <div class="btn-icon">
                 <van-icon name="envelop-o" badge="39" />
              </div>
              <div class="btn-txt">
                 我的消息
              </div>
           </div>
           <div class="btn-item">
              <div class="btn-icon">
                 <van-icon name="friends-o" />
              </div>
              <div class="btn-txt">
                  我的好友
              </div>
           </div>
           <div class="btn-item">
              <div class="btn-icon">
                 <van-icon name="wap-home-o" />
              </div>
              <div class="btn-txt">
                 个人主页
              </div>
           </div>
           <div class="btn-item">
              <div class="btn-icon">
                 <van-icon name="goods-collect-o" />
              </div>
              <div class="btn-txt">
                 个性装扮
              </div>
           </div>
        </div>
        <div class="account-tool">
           <div class="tool-title">
              小工具
           </div>
           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="setting-o" />
              </div>
              <div class="tool-text">
                 设置
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>

           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="closed-eye" />
              </div>
              <div class="tool-text">
                 夜间模式
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>

           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="underway-o" />
              </div>
              <div class="tool-text">
                 定时关闭
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>

           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="close" />
              </div>
              <div class="tool-text">
                 音乐黑名单
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>
           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="vip-card-o" />
              </div>
              <div class="tool-text">
                 鲸云音效
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>
           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="desktop-o" />
              </div>
              <div class="tool-text">
                 添加Siri捷径
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>
           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="tosend" />
              </div>
              <div class="tool-text">
                 音乐闹钟
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>
           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="certificate" />
              </div>
              <div class="tool-text">
                 青少年
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>

        </div>
        <div class="my-tool">
           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="description" />
              </div>
              <div class="tool-text">
                 我的订单
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>
           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="coupon-o" />
              </div>
              <div class="tool-text">
                 优惠券
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>
           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="exchange" />
              </div>
              <div class="tool-text">
                 分享网易云音乐
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>
           <div class="tool-item">
              <div class="tool-icon">
                 <van-icon name="warning-o" />
              </div>
              <div class="tool-text">
                 关于
              </div>
              <div class="tool-more">
                 <van-icon name="arrow" />
              </div>
           </div>
        </div>
        <div class="logOut" @click="logOut">
           退出登录
        </div>
     </div>
   </div>
</template>

<script>
   import {Toast} from 'vant'
   import  {mapState} from  'vuex' ;
    export default {
        name: "Mine",
       data : () => ({
          userInformation : null ,
          avatarUrl : '',
          nickname: '',
       }),
       methods:{
          logOut(){
               localStorage.removeItem('login');
               localStorage.removeItem('phone');
               localStorage.removeItem('password');
               localStorage.removeItem('id');
               this.axios({
                  url:`/logout`,
                  withCredentials: true
               }).then(res => {
                  console.log(res,'已经成功退出登录');
                  Toast('已退出登录');
               });
               this.$router.push('/login');
          },
          intoMusicPlaying(){
             this.$router.push({name:'MusicPlaying'});
          },
       },
       computed:{
           ...mapState({
              songsPlaying : state => state.songsPlaying,
              rotatingDeg : state => state.rotatingDeg,
           }),
       },
       mounted() {
          let id = localStorage.getItem('id');
          //请求个人页面信息
          this.axios({
             url:`/user/detail?uid=${id}`,
             withCredentials: true ,//关键
          }).then(res => {
             this.userInformation = res.data.profile ;
             this.avatarUrl = this.userInformation.avatarUrl ;
             this.nickname = this.userInformation.nickname ;
          });
       }

    }
</script>

<style scoped lang="scss">
.account-wrapper{
   width : 100vw ;
   background-image : linear-gradient(to right , rgb(149,149,149),rgb(100,100,100));

   .account-topBar{
      height : 50px ;
      width : 100vw ;
      display: flex;
      justify-content: space-between;


      .icon{
         flex : 0 0 50px ;
         padding : 10px ;
         color : #fff ;
         font-size : 24px ;
         display: flex;
         justify-content: center;
         align-items: center;
      }

      .top-playing{
         flex:  0 0 50px ;
         padding : 10px ;

         .myMusic{
            width: 100% ;
            height : 100% ;
            border-radius: 50% ;
            border : 1px solid rgb(229,227,228);
            padding : 2px ;

            img{
               display: block;
               width : 100% ;
               height :100% ;
               border-radius: 50% ;
            }
         }

      }
   }

   .account-content{

      width : 100vw ;
      border-top-left-radius: 20px ;
      border-top-right-radius: 20px ;
      overflow: hidden;
      background-color : #e6e6e6 ;

      .account-user{
         background-color : #fff ;
         padding : 12px ;
         width : 100% ;
         display: flex;

         .user-pic{
            flex : 0 0 30px ;
            height : 30px ;
            width : 30px ;
            border-radius: 50% ;
            overflow: hidden;

            img{
               width : 100% ;
               height : 100% ;
            }
         }

         .user-name{
            flex :1 ;
            padding-left : 10px ;
            height : 30px ;
            line-height : 30px ;
            font-size : 12px ;
            font-weight : bold;
         }
      }

      .account-btn{
         padding : 20px 0 10px ;
         width : 100% ;
         background-color : #fff ;
         display: flex;

         .btn-item{
            flex :1 ;

            .btn-icon{
               text-align: center;
               font-size : 24px ;
               color : red ;
            }
            .btn-txt{
               text-align: center;
               font-size : 12px ;
            }
         }
      }
   }
   
   .account-tool{
      margin-top : 10px ;
      background-color : #fff ;

      .tool-title{
         padding :  4px  12px ;
         font-size : 10px ;
         font-weight : 700 ;
         border-bottom : 1px solid rgba(7,17,27,0.1);
      }

      .tool-item{
         height : 40px ;
         line-height : 40px ;
         display: flex;

         .tool-icon{
            flex : 0 0 40px ;
            display: flex;
            align-items: center;
            justify-content: center;
         }

         .tool-text{
            flex : 1 ;
            font-size : 13px ;
            border-bottom : 1px solid rgba(230,230,230,0.7);
         }
         .tool-more{
            flex : 0 0 30px ;
            display: flex;
            justify-content: center;
            align-items: center;
            color : #ccc;
            border-bottom : 1px solid rgba(230,230,230,0.7);
         }

         &:last-child .tool-text,
         &:last-child .tool-more,{
            border : 0 ;
         }
      }


   }

   .my-tool{
      margin-top : 10px ;
      background-color : #fff ;

      .tool-item{
         height : 40px ;
         line-height : 40px ;
         display: flex;

         .tool-icon{
            flex : 0 0 40px ;
            display: flex;
            align-items: center;
            justify-content: center;
         }

         .tool-text{
            flex : 1 ;
            font-size : 13px ;
            border-bottom : 1px solid rgba(230,230,230,0.7);
         }
         .tool-more{
            flex : 0 0 30px ;
            display: flex;
            justify-content: center;
            align-items: center;
            color : #ccc;
            border-bottom : 1px solid rgba(230,230,230,0.7);
         }

         &:last-child .tool-text,
         &:last-child .tool-more,{
            border : 0 ;
         }
      }
   }

   .logOut{
      width : 100vw ;
      color : red ;
      height : 40px ;
      line-height : 40px ;
      text-align: center;
      margin-top : 10px ;
      font-size : 16px ;
      background-color : #fff ;
   }
}
</style>