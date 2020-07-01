<template>
   <div class="find-wrapper">
<!--  可作为组件    顶部栏 start-->
<!--       顶部栏占位置-->
       <div class="wrapper-top"></div>
       <searchBar></searchBar>
<!--      发现界面顶部栏 End-->

       <div class="find-wrapper">
    <!--发现页面 vant swiper 轮播图 Start-->
    <div class="cloud-swiper">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item) in bannerList" :key="item.pic" >
                <div class="swipe">
                    <img :src="item.pic" alt="" slot="default">
                    <span class="swipe-text" :class="item.titleColor">{{item.typeTitle}}</span>
                </div>
            </van-swipe-item>

        </van-swipe>
    </div>
    <!--发现页面 vant swiper 轮播图 End-->

    <!--发现页面  歌曲导航栏    Start-->
    <div class="cloud-nav">
        <div class="nav-item">
               <span class="nav-icon">
                   <i class="icon-1"></i>
               </span>
            <span class="nav-text">每日推荐</span>
        </div>
        <div class="nav-item">
               <span class="nav-icon">
                    <i class="icon-4"></i>
               </span>
            <span class="nav-text">歌单</span>
        </div>
        <div class="nav-item">
               <span class="nav-icon">
                    <i class="icon-2"></i>
               </span>
            <span class="nav-text">排行榜</span>
        </div>
        <div class="nav-item">
               <span class="nav-icon">
                    <i class="icon-5"></i>
               </span>
            <span class="nav-text">电台</span>
        </div>
        <div class="nav-item">
               <span class="nav-icon">
                     <i class="icon-uniE90A"></i>
               </span>
            <span class="nav-text">直播</span>
        </div>
    </div>
    <!--发现页面  歌曲导航栏    End-->

    <!--发现页面   推荐歌单     Start-->
    <div class="cloud-RecommendPlaylist">
        <div class="RecommendPlaylist-top">
            <p>推荐歌单</p>
            <h4>为你精挑细选</h4>
            <button class="RecommendPlaylist-btn" >查看更多</button>
        </div>
        <!--        可作为组件  推荐栏BScroll  Start-->
        <div class="RecommendPlaylist-BScroll" ref="scrollWrapper">
            <ul :style="{width:dailyRecommendSongs.length * 116 +'px'}">
                <li @click="intoFindSongsView(item)" class="playlist-item" v-for="(item) in dailyRecommendSongs"  :key="item.picUrl">
                    <div class="playlist-pic"  :style="{background:`url(${item.picUrl}?param=106y106) 0 0 / 106px 106px no-repeat `}" >
                        <span class="ifLike" v-show="item.copywriter === '猜你喜欢'"> {{item.copywriter}}</span>
                    </div>
                    <div class="playlist-txt">
                        {{item.name}}
                    </div>
                </li>


            </ul>
        </div>
        <!--        可作为组件  推荐栏BScroll End-->
    </div>
    <!--发现页面   推荐歌单     End-->

    <!--发现页面   新歌|新碟    Start-->
    <div class="cloud-new">
        <div class="new-top">
            <p>{{new Date()|nowTime}}</p>
            <h4>
                <span class="newSong" :class="{toggleNew: !toggleNew }" @click.prevent="toggleNew=true">新歌</span>
                <span class="newEst" :class="{toggleNew }"  @click.prevent="toggleNew=false">新碟</span>
            </h4>
            <button class="new-btn"   >更多新歌</button>
        </div>

        <div key="song" class="new newSongs" >
            <template>
                <div v-swiper:newSwiper="newSwiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,i) in showNewSongs" :key="i">
                            <!--                               Swiper自定义部分-->
                            <ul class="swiper-item" >
                                <li class="new-item" v-for="(v) in item" :key="v.picUrl" >
                                    <div class="newSong-icon" :style="{background : `url(${v.picUrl}?param=54y54) 0 0 / 54px 54px no-repeat`}"></div>
                                    <div class="newSong-right">
                                        <p class="newSong-title">
                                                   <span class="newSong-name">
                                                      {{v.name}}
                                                   </span>

                                            <span class="newSong-artist" v-show="toggleNew">
                                                       -  {{toggleNew ? v.song.artists[0].name : null}}
                                                   </span>
                                        </p>

                                        <p class="newSong-describe">
                                            <span class="SQ" v-show="toggleNew">SQ</span>
                                            {{toggleNew ?  ' 终于回归trance了 吹爆阿明！': v.company }}
                                        </p>
                                    </div>
                                    <div v-if="toggleNew" class="newSong-play" :style="{border:songsPlaying.id == v.song.id? '0' : '1px solid rgba(153,153,153,.5)'}">
                                        <span class="icon-play3" v-show="songsPlaying.id != v.song.id" @click="musicPlaying(v)"></span>
                                        <span class="icon-uniE911 play" v-show="songsPlaying.id == v.song.id" @click="musicStopPlaying(v)"></span>

                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </template>
        </div>

    </div>
    <!--发现页面   新歌|新碟    End-->


<!--           搜索页面展示区-->
<!--           <router-view></router-view>-->
</div>

       <router-view></router-view>
   </div>
</template>

<script>
    import {mapState,mapMutations} from "vuex" ;
    import {
        SET_AUDIO_SRC,
        SET_KEYWORDS,
        SET_SONGS_PLAYING,
        SET_DAILY_RECOMMEND_SONGS,
        SET_USER_PHONE,
        SET_USER_PASSWORD,
        SET_USER_ID,
        SET_SONGS_LIST,
        SET_LIST_MODE,
        SET_PLAY, SET_USER_NAME, SET_USER_AVATARURL, SET_DETAILED_PLAYLIST_ARR, SET_DETAILED_PLAYLIST,
    } from '../store/mutations-types' ;
    import searchBar from '../components/SearchBar' ;
    import BScroll from 'better-scroll' ;
    export default {
        name: "Find",
        data:() => ({
            loading:false ,//数据是否在请求
            keywords : {} ,
            bannerList:[],
            recommendSongLists:[],

            newSwiperOption:{ //Swiper配置
                slidesPerView: 'auto',
                click : true ,
            },
            newSongs:[] ,//新歌数组
            newEst:[] ,//新碟数组
            toggleNew:true ,//新歌|新碟切换
            // audio : new Audio(),//歌曲播放
        }),
        methods:{
            ...mapMutations({
                setSongsPlaying : SET_SONGS_PLAYING,
                setKeywords : SET_KEYWORDS ,
                setDailyRecommendSongs: SET_DAILY_RECOMMEND_SONGS,
                setUserPhone: SET_USER_PHONE,
                setUserPassword: SET_USER_PASSWORD,
                setUserName : SET_USER_NAME,
                setUserAvatarUrl: SET_USER_AVATARURL,
                setUserId: SET_USER_ID,
                setAudioSrc : SET_AUDIO_SRC ,
                setSongsList : SET_SONGS_LIST,
                setListMode: SET_LIST_MODE,
                setPlay : SET_PLAY,
                setDetailedPlaylist: SET_DETAILED_PLAYLIST,
                setDetailedPlaylistArr: SET_DETAILED_PLAYLIST_ARR,
            }),
            intoFindSongsView(item){
                console.log(item);
                let {id} = item
                this.axios({
                    url:`playlist/detail?id=${id}`,
                    withCredentials : true
                }).then(res => {
                    this.setDetailedPlaylist(res.data.playlist);
                    this.setDetailedPlaylistArr(res.data.playlist.tracks);
                });
                this.setUserName(item.creator.nickname);
                this.setUserAvatarUrl(item.creator.avatarUrl);
                this.$router.push({name: 'FindSongsView'});
            },
            musicPlaying(v){
                console.log(v,'新歌')
                let id = v.song.id ;
                if (this.songsPlaying.id === id){
                    if(this.play !== true){
                        this.setPlay(true);
                        this.audio.play();

                    }
                    this.$router.push({name : 'MusicPlaying'});
                    return ;
                }else{
                    this.axios.get(`/check/music?id=${id}`).then(res => {
                        if(res.data.success === true ){
                            this.axios.get(`/song/url?id=${id}`).then(res => {


                                this.setSongsPlaying({
                                    id,
                                    picUrl : v.picUrl
                                });
                                this.setAudioSrc(res.data.data[0].url);
                                this.setPlay(true);
                                this.audio.play();
                                this.setSongsList(this.newSongs);
                                this.setListMode(2);
                            });
                        }else{
                            console.log('该歌曲没有版权，无法播放')
                        }

                    });
                }


            },
            musicStopPlaying(){
                this.setPlay(true);
                this.audio.play() ;
                this.$router.push({name : 'MusicPlaying'});
            }

        },
        components:{
            searchBar ,
        },
        filters:{
            nowTime(time){
                let m = time.getMonth() + 1 ;
                let d = time.getDate() ;
                return `${m}月${d}日` ;
            }
        },
        computed:{
            ...mapState(["dailyRecommendSongs",'songsPlaying','user','audio','songsList','play']),
            showNewSongs(){
                let showNew = [] ;
                let lists = [] ;
                if(this.toggleNew){
                    for(let i = 0 ; i < this.newSongs.length ; i ++){
                        lists.push(this.newSongs[i]);
                        if((i+1)  % 3 == 0){
                            showNew.push(lists);
                            lists = [] ;
                        }
                    }
                }else{
                    for(let i = 0 ; i < this.newEst.length ; i ++){
                        lists.push(this.newEst[i]);
                        if((i+1)  % 3 == 0){
                            showNew.push(lists);
                            lists = [] ;
                        }

                    }
                }
                return showNew ;
            },

        },
        mounted() {
            //如果已经登录，获取已登录账号信息，更新vuex
            this.setUserPhone(localStorage.getItem('phone'));
            this.setUserPassword(localStorage.getItem('password'));
            this.setUserId(localStorage.getItem('id'));
            console.log(this.user);
            let {CancelToken} = this.axios ;
            this.loading = true ;   //表示请求开始
            //请求用户登录接口
            this.axios({
                method:'POST',
                url: `http://localhost:3000/login/cellphone`,
                withCredentials: true ,//关键
                data:{
                    phone:this.user.phone,
                    password:this.user.password
                },

                cancelToken : new  CancelToken (c =>{
                    this.axiosCancel = c ;
                })

            }).then(res => {

                this.loading = false ; //记录请求结束

                console.log(res,'----登录成功');

                // 请求每日推荐歌单
                this.axios({
                    url: `http://localhost:3000/recommend/resource?timestamp=${new Date().getTime()}`,
                    withCredentials: true ,//关键
                }).then(res =>  {
                    this.setDailyRecommendSongs(res.data.recommend)  ;
                }).catch(err => {
                    console.log(err);
                });
                //如果已经有，就不请求
                if(!this.songsPlaying.id){
                    console.log(this.user,'user');
                    //请求用户播放记录
                    this.axios({
                        url: `/user/record?uid=${this.user.id}&type=1`,
                        withCredentials: true ,//关键
                    }).then(res =>  {
                        console.log(res,'播放记录');
                        this.setSongsList(res.data.weekData);
                        if(res.data.weekData[0]){
                            let {picUrl} = res.data.weekData[0].song.al;
                            let {id} = res.data.weekData[0].song
                            this.setSongsPlaying({
                                picUrl ,
                                id
                            })
                            //使audio获取用户播放记录的第一个首音乐
                            this.axios.get(`/check/music?id=${id}`).then(res => {
                                if(res.data.success === true ){
                                    this.axios.get(`/song/url?id=${id}`).then(res => {
                                        this.setAudioSrc(res.data.data[0].url);
                                    });
                                }else{
                                    console.log('该歌曲没有版权，无法播放')
                                }

                            });
                        }


                    });
                }
            });

            //请求轮播图内容
            this.axios.get('http://localhost:3000/banner?type=2').then(res => {
                this.bannerList = res.data.banners ;
                // console.log(this.bannerList)
            });
            //请求新歌|新碟数据
            this.axios({
                url: `http://localhost:3000/personalized/newsong`,
                withCredentials: true //关键
            }).then(res =>  {
              this.newSongs = res.data.result  ;
            });
            this.axios({
                url: `http://localhost:3000/album/newest    `,
                withCredentials: true //关键
            }).then(res =>  {
                this.newEst = res.data.albums  ;
            });
            //请求默认搜索词
            this.axios({
                url: `http://localhost:3000/search/default`,
                withCredentials: true //关键
            }).then(res =>  {
                this.setKeywords(res.data.data);
            });

            //请求每日推荐歌单内容
            // vue.config.js申请跨域请求方式 （失败）
            // this.axios.get('/cloud/login/cellphone?phone=15920384501&password=aww1030.').then(res => {
            //     console.log(res.data);
            //     this.axios({
            //         url:'/cloud/recommend/resource',
            //         withCredentials: true
            //     }).then(result => {
            //         console.log(result.data) ;
            //     })
            // });
            //node.js后台请求方式 （成功）


           this.$nextTick(() => {
               if(!this.recommendScroll){
                   //配置每日推荐歌单BScroll
                    this.recommendScroll = new BScroll(this.$refs.scrollWrapper,{
                        click : true ,
                        scrollX: true,
                        probeType :2 ,
                    })
               }else{
                   this.recommendScroll.refresh() ;
               }
           })


        },

        beforeDestroy() {
            this.recommendScroll.destroy() ;
            this.recommendScroll = null ;

            //todo 如果请求没有结束，取消网络请求
            if(this.loading){
                this.axiosCancel() ;
            }




        }
    }
</script>

<style scoped lang="scss">
/* padding 10px公共样式*/
@mixin padding-box{
    padding : 10px ;
}
@mixin margin-bottom-10 {
    margin-bottom : 10px ;
}

    .find-wrapper{
        position: relative;
    }

    /* 发现页面顶部栏样式    Start*/
    .wrapper-top{
        height : 50px ;
        width : 100vw ;
    }

    /* 发现页面顶部栏样式    End*/

    /* 发现页面 vant swiper轮播图样式 Start*/
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        /*background-color: #39a9ed;*/

        .swipe{
            width : 100% ;
            height : 100%;
            padding : 10px ;
            overflow: hidden;
            position : relative ;

            img{
                width : 100% ;
                height : 100%;
                display: block;
                border-radius : 10px ;
            }

            .swipe-text{
                position : absolute ;
                bottom : 10px ;
                right : 10px ;
                padding : 4px 8px ;
                border-bottom-right-radius: 10px ;
                border-top-left-radius: 10px ;
                font-size : 10px ;
                line-height : 10px ;

                &.blue{
                    background-color : rgb(96,163,234);
                }

                &.red{
                    background-color : rgb(233,95,77);
                }
            }

        }
    }
    /* 发现页面 vant swiper轮播图样式 End*/

/*    发现页面  导航栏样式  Start*/
    .cloud-nav{
        width : 100vw ;
        display: flex;
        margin-top : 4px ;
        @include margin-bottom-10 ;

        .nav-item{
            flex : 1 ;
            text-align: center;

            .nav-icon{
                /*width : calc(100vw / 8);*/
                /*height : calc(100vw / 8);*/
                width : 40px  ;
                height : 40px ;
                margin: 0 auto ;
                border-radius: 50% ;
                background-image : linear-gradient(to right,rgb(236,100,83),rgb(234,58,40) );
                display: flex;
                justify-content: center ;
                align-items: center;

                i{
                    display: inline-block;
                    color : #fff;
                    font-size : 26px ;

                }
            }

            .nav-text{
                font-size : 12px ;
                font-weight : 200 ;
            }
        }
    }
/*    发现页面  导航栏样式  End*/

/*    发现页面  推荐歌单样式  Start*/
.cloud-RecommendPlaylist{
        /*overflow: hidden;*/
        @include margin-bottom-10 ;
    }

    .RecommendPlaylist-top{
        /*height : 50px ;*/
        @include padding-box ;
        position : relative ;

        p{
            font-size : 12px ;
            font-weight : 200 ;
            line-height : 18px ;
            color : rgb(170,170,170);
        }

        h4{
            font-size : 16px ;
            font-weight : 700 ;
        }

        .RecommendPlaylist-btn{
            position : absolute ;
            bottom : 10px ;
            right : 10px ;
            padding : 2px 10px ;
            background-color : #fff;
            border : 1px solid #ccc;
            border-radius: 20px ;
            font-size : 12px ;
            outline: 0 ;
            line-height : 18px ;


        }
    }

    .RecommendPlaylist-BScroll{
        width : calc(100vw - 10px) ;
        margin-left : 10px ;
        overflow: hidden;

        > ul{
            width : 700px ;

            .playlist-item{
                display: inline-block;
                margin-right : 10px ;
                width : 106px ;
                overflow: hidden;

                .playlist-pic{
                    width : 106px ;
                    height : 106px ;
                    border-radius: 5px;
                    overflow: hidden;
                    position : relative;

                   .ifLike{
                       display: block;
                       padding : 2px 4px ;
                       border-radius: 4px ;
                       background-color : rgba(0,0,0,.4);
                       color : #fff;
                       font-size: 10px ;
                       line-height : 14px ;
                       position : absolute;
                       bottom : 2px ;
                       left : 10px ;
                   }
                }

                .playlist-txt{

                    height : 36px ;
                    width : 106px ;
                    padding-right :  6px ;
                    margin-top : 4px ;
                    font-size : 12px ;
                    line-height : 18px ;
                    white-space :pre-wrap ;
                    text-align: justify ;

                }
            }
        }
    }
/*    发现页面  推荐歌单样式  End*/

/*    发现页面  新歌|新碟     Start*/
.cloud-new{
    @include margin-bottom-10 ;

    .newToggle-enter,.newToggle-leave-to{
        opacity : 0 ;
    }
    .newToggle-enter-to,.newToggle-leave{
        opacity : 1 ;
    }
    .newToggle-enter-active,
    .newToggle-leave-active{
        transition : all 0.5s;
    }
}
    .new-top{
        /*height : 50px ;*/
        @include padding-box ;
        position : relative ;

        p{
            font-size : 12px ;
            font-weight : 200 ;
            line-height : 18px ;
            color : rgb(170,170,170);
        }

        h4{
            font-size : 16px ;
            font-weight : 700 ;

            span{
                &.newSong{
                    padding-right : 10px ;
                    border-right: 1px solid rgba(7, 17, 27, 0.1);
                }

                &.newEst{
                    padding-left : 10px ;
                    padding-right : 10px ;
                }

                &.toggleNew{
                    color : rgb(153,153,153);
                }
            }

        }

        .new-btn{
            position : absolute ;
            bottom : 10px ;
            right : 10px ;
            padding : 2px 10px ;
            background-color : #fff;
            border : 1px solid #ccc;
            border-radius: 20px ;
            font-size : 12px ;
            outline: 0 ;
            line-height : 18px ;
        }
    }
    .new{

        margin-left : 10px ;
    .swiper-slide{
        width : 90vw ;
        .swiper-item{
           width : 100%;
        }
    }

    .new-item{
        width : 100% ;
        display: flex;
        margin-bottom : 5px ;
        padding-right : 15px ;
        .newSong-icon{
            flex : 0 0 54px ;
            width : 54px ;
            height : 54px ;
            background-color : red ;
            margin-right : 10px ;
            border-radius: 5px ;
        }

        .newSong-right{
            flex:1  ;

            .newSong-name{
                font-size : 14px ;
                font-weight : normal;
            }

            .newSong-artist{
                font-size : 12px ;
                font-weight : 200 ;
                color : rgb(153,153,153);

            }

            .newSong-describe{
                font-size : 12px ;
                font-weight : normal;
                color : rgb(153,153,153);

                .SQ{
                    display: inline-block;
                    font-size : 8px ;
                    color : red ;
                    line-height: 10px;
                    vertical-align : text-top ;
                    border-radius: 2px ;
                    border : 1px solid red ;
                    padding : 0 2px ;
                }
            }
        }

        .newSong-play{
            flex : 0 0 24px ;
            height : 24px ;
            text-align: center;
            border: 1px solid rgba(153,153,153,.5);
            border-radius: 50%;
            margin: auto ;
            padding-left : 4px ;

            span{
                font-size : 16px ;
                line-height : 16px ;
                color : red ;


            }
        }
    }

}



/*    发现页面  新歌|新碟     End*/
</style>