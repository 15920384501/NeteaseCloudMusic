<template>
  <div id="app">
<!--      <keep-alive>  </keep-alive>-->
          <router-view></router-view>






<!--    tabbar底部导航栏 start-->
    <div class="tabbar"></div>
   <div class="cloud-tabbar">
     <div class="tabbar">
        <router-link tag="div" class="tabbar-item" to="/find">
         <div class="tabbar-icon">
           <span class="icon-find" ></span>
         </div>
         <span class="tabbar-text">发现</span>
       </router-link>
        <router-link tag="div" class="tabbar-item" to="/video">
        <div class="tabbar-icon">
          <span class="icon-video" ></span>
        </div>
        <span class="tabbar-text">视频</span>
      </router-link>
         <router-link tag="div" class="tabbar-item" to="/music">
           <div class="tabbar-icon">
             <span class="icon-music"></span>
           </div>
           <span class="tabbar-text">我的</span>
         </router-link>
<!--         <router-link tag="div" class="tabbar-item" to="/village">-->
<!--           <div class="tabbar-icon">-->
<!--             <span class="icon-we" ></span>-->
<!--           </div>-->
<!--           <span class="tabbar-text">云村</span>-->
<!--         </router-link>-->
         <router-link tag="div" class="tabbar-item" to="/account">
           <div class="tabbar-icon">
             <span class="icon-my"></span>
           </div>
           <span class="tabbar-text">账号</span>

         </router-link>

      </div>
    <!--    tabbar底部导航栏 end-->
  </div>
  </div>
</template>
<script>
  import {SET_DAILY_RECOMMEND_SONGS,SET_SONGS_PLAYING} from './store/mutations-types'
  import {mapState,mapMutations} from "vuex"
  export default {

    data:() => ({


      value : '' ,
      bannerList:[],
    }),

    methods:{
      ...mapMutations({
        setDailyRecommendSongs : SET_DAILY_RECOMMEND_SONGS,
        setSongsPlaying: SET_SONGS_PLAYING
      })
    },

    computed:{
        ...mapState({
           user : "user" ,
        })
    },

    mounted() {
        if(!localStorage.getItem('login')){
            this.$router.push('/login');
        }
    },



  }
</script>
<style lang="scss">
#app{
  width : 100vw ;
  /*height : 100vh ;*/
  background-color : #fff ;

}

.tabbar{
  height : 50px ;
}
.cloud-tabbar{
  .tabbar{
    height : 50px ;
    width : 100vw ;
    position : fixed;
    bottom : 0 ;

    background-color : rgba(248,248,248,0.8);
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    display: flex;
    z-index: 10;

    .tabbar-item{
      flex : 1 ;
      padding : 5px 0 ;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

        &.active{
            .tabbar-icon{
                    transform: scale(1.2);
                    /*background-color : rgb(222,72,47) ;*/
                    background-image: radial-gradient(at 6px 6px,  rgba(222,72,47,.7) , rgba(222,72,47,1) );
                    color : #fff;
            }
            .tabbar-text{
                color:rgb(222,72,47);
            }
        }

      .tabbar-icon {
        width: 20px;
        height: 20px;
        margin: 5px ;
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        text-align: center ;
        line-height : 20px ;
        border-radius: 50%;
        background-color : rgba(248,248,248,0.8);
        transition: all 0.3s;
        font-size : 18px ;
        color : rgb(148,148,148);
        position : relative;


      }

      .tabbar-text{
          font-size : 12px ;
          color : rgb(148,148,148);
        line-height : 12px ;
      }
    }
  }


}


</style>
