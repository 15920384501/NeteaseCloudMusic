import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        //用户信息
        user:{
            phone:'15920384501',
            password:'aww1030.',
            id:'',
            avatarUrl:'',
            name:'',
        },
        //每日推荐歌单
        dailyRecommendSongs:[],
        //播放歌曲的id，背景图片
        songsPlaying:{
            id : '',
            picUrl: '' ,
        },
        //当前歌曲详细信息
        song:{},
        //歌曲播放
        audio: new Audio(),
        //关键词
        keywordsObj:{},
        searchKeyword: '' ,
        //视频Tab列表数组
        videoTitleLists:[],
        //当前视频列表id
        videoId:'',
        //视频列表加载是否完成
        videoPlayingLoading:false ,
        //当前视频列表
        videoPlayingData:{
        },
        play : false ,
        //旋转角度
        rotatingDeg:0,
        rotateTimer:null ,
        //播放歌单
        songsList:[],
        //播放歌单对象
        detailedPlaylist:{},
        //播放歌单数组
        detailedPlaylistArr:[],
        listMode:1 ,
  },
  getters:{

  },
  mutations ,
  actions: {
  },
  modules: {
  }
})
