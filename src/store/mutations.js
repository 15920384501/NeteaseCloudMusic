import * as types from './mutations-types' ;


export default {
    [types.SET_USER_ID](state,id){
        state.user.id = id  ;
    },
    [types.SET_USER_PHONE](state,phone){
        state.user.phone = phone  ;
    },
    [types.SET_USER_PASSWORD](state,password){
        state.user.password = password  ;
    },
    [types.SET_USER_NAME](state,name){
        state.user.name = name ;
    },
    [types.SET_USER_AVATARURL](state,avatarUrl){
        state.user.avatarUrl = avatarUrl ;
    },
    [types.SET_DAILY_RECOMMEND_SONGS](state,dailyRecommendSongs){
        state.dailyRecommendSongs = dailyRecommendSongs ;
    },
    [types.SET_SONGS_PLAYING](state,option){
        state.songsPlaying.picUrl = option.picUrl || state.songsPlaying.picUrl;
        state.songsPlaying.id = option.id;
    },
    [types.SET_SONG](state,option){
       state.song = option  ;
    },
    [types.SET_KEYWORDS](state,keywordsObj){
        state.keywordsObj = keywordsObj ;
    },
    [types.SET_VIDEOTITLELISTS](state,videoTitleLists){
        state.videoTitleLists = videoTitleLists ;
    },
    [types.SET_VIDEOID](state,videoId){
        state.videoId = videoId ;
    },

    [types.SET_VIDEOPLAYINGDATA](state,obj){
        state.videoPlayingData = obj ;
    },
    [types.SET_VIDEOPLAYINGLOADING](state,bool){
        state.videoPlayingLoading = bool ;
    },
    [types.SET_AUDIO_SRC](state,src){
        state.audio.src = src ;
    },
    [types.SET_PLAY](state,bool){
        state.play = bool ;
    },
    [types.SET_ROTATING_DEG](state,num){
        state.rotatingDeg = num ;
    },
    [types.SET_SONGS_LIST](state,arr){
        state.songsList = JSON.parse(JSON.stringify(arr));
    },
    [types.SET_LIST_MODE](state,num){
        state.listMode = num ;
    },
    [types.SET_DETAILED_PLAYLIST](state,obj){
        state.detailedPlaylist =JSON.parse(JSON.stringify(obj));
    },
    [types.SET_DETAILED_PLAYLIST_ARR](state,arr){
        state.detailedPlaylistArr =JSON.parse(JSON.stringify(arr));
    },
    [types.SET_ROTATE_TIMER](state){
        clearInterval(state.rotateTimer);
        state.rotateTimer = setInterval(() => {
         state.rotatingDeg += 0.18;
            // this.rotatingDeg += 0.18 ;
            if(state.rotatingDeg > 360){
                // this.rotatingDeg = 0 ;
                state.rotatingDeg = 0;
            }
            // console.log(state.rotatingDeg);
        },10) ;
    },
}