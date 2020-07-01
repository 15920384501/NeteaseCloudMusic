<template>
    <div class="music-playing-wrapper" :style="{background: `url(${songsPlaying.picUrl}) center center / 120% 120% no-repeat`  }">
        <div class="music-playing-box">
            <div class="music-playing-top">
                <div class="top-back">
                    <span @click="$router.go(-1)" class="icon-back"></span>
                </div>
                <div class="top-title">
                  <h4>
                      {{songName}}
                  </h4>
                    <p>
                        {{author}}&nbsp;＞
                    </p>
                </div>
            </div>
            <div class="music-playing-picture">
<!--               <transition name="showLyric" mode="out-in">-->

<!--               </transition>-->
                <transition tag="div" name="showLyric" mode="out-in">

                    <div @click="toggleShowLyric(true)" v-if="!isShowLyric" class="pic">
                        <img :style="{'transform':`rotate(${rotatingDeg}deg)`}" :src="`${picUrl}?param=1000y1000`" alt="">
                    </div>
                    <div @click="toggleShowLyric(false) "  class="music-play-lyric" ref="lyricBScroll" v-else>
                        <ul>
                            <li :class="{active:lyricTimeIndex === index}" class="lyric-item" v-for="(item,index) in lyricArr " :key="index" ref="lyricList" >{{item}}</li>
                        </ul>
                    </div>

                </transition>
            </div>
            <div class="music-playing-control">
                <div class="control-user-operation">
                    <div class="user-operation-item">
                        <van-icon name="like" />
                    </div>
                    <div class="user-operation-item">
                        <van-icon name="down" />
                    </div>
                    <div class="user-operation-item">
                        <van-icon name="vip-card-o" />
                    </div>
                    <div class="user-operation-item">
                        <van-icon name="comment-o" />
                    </div>
                    <div class="user-operation-item">
                        <van-icon name="ellipsis" />
                    </div>
                </div>
                <div class="control-playing-progressBar">
                   <div class="control-currentTime">
                       {{currentTime|timeFilter}}
                   </div>
                   <div class="control-progressBar" >
                       <div  ref="slidingDistance" class="control-line">
                           <div @touchmove="onTouchMove" @touchstart="onTouchStart"  @touchend="onTouchEnd"  class="control-slider" :style="{'left':sliderX}"></div>
                           <div class="slider-line" :style="{'width':sliderX}"></div>
                       </div>
                   </div>
                   <div class="control-duration">
                       {{audio.duration|timeFilter}}
                   </div>
               </div>
                <div class="control-operationPanel">
                    <div class="control-mode">
                        <span v-show="mode === 3" class="icon-_321" @click="modeSwitch"></span>
                        <span v-show="mode === 2" class="icon-_322" @click="modeSwitch"></span>
                        <span v-show="mode === 1" class="icon-_32" @click="modeSwitch"></span>
                    </div>
                    <div class="control-prep">
                        <span @click="onPlayPrep" class="icon-prep"></span>
                    </div>
                    <div class="control-play">
                        <span  v-show="!play"  class="icon-play" @click="onAudioPlay"></span>
                        <span  v-show="play"  class="icon-pause" @click="onAudioPause"></span>
                    </div>
                    <div class="control-next">
                        <span @click="onPlayNext" class="icon-next"></span>
                    </div>
                    <div class="control-playlist">
                        <span @click="showSongsList = true " class="icon-playlist"></span>
                    </div>
                </div>
            </div>  
        </div>
        <div v-show="showSongsList" class="songsListView">
            <div class="songsList-title">当前播放 <span class="songsList-count">({{songsList.length}})</span></div>
            <div class="songsList-mode">
                <div v-show="mode === 3" @click="modeSwitch">
                    <span  class="icon-_321 mode-icon"  ></span ><span>随机播放</span>
                </div>
               <div  v-show="mode === 2" @click="modeSwitch">
                   <span class="icon-_322 mode-icon" ></span ><span>单曲循环</span>
               </div>

               <div v-show="mode === 1" @click="modeSwitch">
                   <span  class="icon-_32 mode-icon" ></span ><span>列表播放</span>
               </div>
            </div>
            <div @click="showSongsList = false" class="songsList-close">
                关闭
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {Toast} from 'vant'
    import {mapState,mapMutations} from 'vuex'
    import {
        SET_AUDIO_SRC,
        SET_PLAY,
        SET_ROTATE_TIMER,
        SET_ROTATING_DEG,
        SET_SONG,
        SET_SONGS_PLAYING
    } from "../store/mutations-types";
    export default {
        name: "MusicPlay",
        data : () => ({
            picUrl : '',
            author:'',
            currentTime:0,
            mode: 1 ,
            songName : '' ,
            isSlider: false ,
            isShowLyric : false,
            lyricArr : [],
            lyricTimeArr:[],
            lyricIndex: 0 ,
            showSongsList : false ,
        }),
        methods:{
           ...mapMutations({
               setSong  : SET_SONG,
               setSongsPlaying : SET_SONGS_PLAYING,
               setPlay : SET_PLAY,
               setRotatingDeg : SET_ROTATING_DEG,
               setRotateTimer : SET_ROTATE_TIMER,
               setAudioSrc: SET_AUDIO_SRC,
           }),
            toggleShowLyric(bool){
               this.isShowLyric = bool;
                this.$nextTick(() => {
                    if(this.isShowLyric) {
                        if(!this.lyricBScroll ){
                            this.lyricBScroll = new BScroll(this.$refs.lyricBScroll,{
                                probeType :2 ,
                                click : true
                            });
                        }else{
                            this.lyricBScroll.refresh();
                        }
                    }else {
                        this.lyricBScroll.destroy();
                        this.lyricBScroll = null ;
                    }

                });
            },
            onTouchStart(){
               this.isSlider = true ;
                clearInterval(this.timer);
            },
            onTouchMove(e){
               //判断是否开始计算
               if(this.isSlider){
                    //计算比值
                   let moveX = (e.touches[0].clientX - this.$refs.slidingDistance.offsetLeft);
                   if(moveX <= 0 || moveX >= this.$refs.slidingDistance.clientWidth){
                       console.log('超出距离拉');
                   }
                   moveX = moveX <= 0 ? 0 : moveX ;
                   moveX = moveX >= this.$refs.slidingDistance.clientWidth ? this.$refs.slidingDistance.clientWidth -1 : moveX ;
                   let x  = moveX / this.$refs.slidingDistance.clientWidth * this.audio.duration;

                   this.currentTime = x ;

               }

               // this.audio.getStartDate();
               //  this.audio.currentTime= this.currentTime = 100 ;
            },
            onTouchEnd(){
               this.isSlider = false ;
                this.audio.currentTime = this.currentTime ;
                clearInterval(this.timer);
                this.timer =  setInterval(() => {
                    this.currentTime = this.audio.currentTime ;
                    if(this.currentTime === this.audio.duration){
                        this.setPlay(false);
                        clearInterval(this.rotateTimer);
                        this.audio.pause() ;
                    }
                    if(this.isShowLyric){
                        this.scrollToLyricItem();
                    }

                },200);
            },
            scrollToLyricItem(){
               if(this.lyricBScroll){
                   let el = this.$refs.lyricList;
                   this.lyricBScroll.scrollToElement(el[this.lyricTimeIndex],500,false,true);
               }

            },
            onAudioPlay(){
                this.setPlay(true);
                if(this.play){
                    //唱片旋转角度数定时器
                    this.rotating();
                }
               this.audio.play() ;
            },
            onAudioPause(){
                this.setPlay(false);
                clearInterval(this.rotateTimer);
               this.audio.pause() ;
            },
            modeSwitch(){
               this.mode ++ ;
               if(this.mode > 3){
                   this.mode = 1;
               }
            },
            rotating(){

               //将定时器任务交给vuex
                this.setRotateTimer();
            },
            musicRequestInformation(id){
                //请求确认歌曲是否可播放
                this.axios.get(`/check/music?id=${id}`).then(res => {
                    if(res.data.success === true ){
                        //请求获取歌曲url
                        this.axios.get(`/song/url?id=${id}`).then(res => {
                            this.setSongsPlaying({
                                id,
                                picUrl : this.picUrl
                            });
                            this.setRotatingDeg(0)
                            //不能播放，提示并下一首
                            if(!res.data.data[0].url){
                                Toast('没有该歌的资源')
                                clearTimeout(this.mistackTimer);
                                this.mistackTimer = setTimeout(()=>{
                                    clearInterval(this.timer);
                                    this.onPlayNext();
                                },1000);
                                return ;
                            }

                            clearInterval(this.timer);
                            this.timer =  setInterval(() => {
                                this.currentTime = this.audio.currentTime ;
                                if(this.currentTime === this.audio.duration){
                                    clearInterval(this.rotateTimer);
                                    this.audio.pause() ;
                                }
                                if(this.isShowLyric){
                                    this.scrollToLyricItem() ;
                                }
                            });
                            this.setAudioSrc(res.data.data[0].url);
                            this.setPlay(true);
                            this.timerOut = setTimeout(() => {

                                this.audio.addEventListener("canplay",() =>{
                                    this.audio.play();
                                })
                                this.rotating();
                            },1000)
                        });

                    }else{
                        console.log('该歌曲没有版权，无法播放');
                    }

                }).catch(() =>{
                    Toast('没有该歌的资源');
                clearTimeout(this.mistackTimer);
                this.mistackTimer = setTimeout(()=>{
                    clearInterval(this.timer);
                    this.onPlayNext();
                },1000);
                return ;
                });
                //请求歌词
                this.axios({
                    url:`/lyric?id=${id}`,
                    withCredentials: true
                }).then(res => {
                    if(res.data.lrc){
                        if(this.lyricBScroll){
                            //更新歌词BScroll
                            this.lyricBScroll.refresh();
                        }

                        let delIndexArr = [];
                        this.lyricArr = res.data.lrc.lyric.
                        slice(res.data.lrc.lyric.indexOf('[00:'),res.data.lrc.lyric.length).
                        split(/\n/g).map(lyr => {
                            let src = lyr.split(']')[1];
                            return src ;
                        }).filter((item , index)=> {
                            if(item !== '' &&item !== undefined) {
                                return true ;
                            }
                            delIndexArr.unshift(index);
                            return false ;
                        });


                        this.lyricTimeArr = res.data.lrc.lyric.
                        slice(res.data.lrc.lyric.indexOf('[00:'),res.data.lrc.lyric.length).
                        split(/\n/g).map(lyr => {
                            let src = lyr.split(']')[0].split('[')[1];
                            return src ;
                        })

                        delIndexArr.forEach(item => {
                            this.lyricTimeArr.splice(item,1);
                        });
                        this.lyricTimeArr=this.lyricTimeArr.filter(item => item!==undefined);
                        this.lyricTimeArr = this.lyricTimeArr.map(item => {
                            let m = parseFloat(item.split(':')[0]);
                            let s = parseFloat(item.split(':')[1]);

                            let time = m * 60 + s ;
                            return time
                        }).filter(item =>!isNaN(item));
                    } else{
                        this.lyricArr = ['该歌词为纯音乐，没有歌词'];
                    }
                });

            },
            prepOrNext(index,str){
                let id ;
                if(isNaN(index)){
                    index = 0 ;
                }
                if(this.listMode === 1) {
                    this.songName = this.songsList[index].song.name;
                    this.author = '';

                    this.songsList[index].song.ar.forEach(item => {
                        this.author +=  item.name +'/'
                    })
                    this.author = this.author.slice(0,this.author.length - 1);
                    this.picUrl = this.songsList[index].song.al.picUrl;

                    id  = this.songsList[index].song.id;
                }else if(this.listMode === 2){
                    this.songName = this.songsList[index].name;
                    this.author = '';
                    this.songsList[index].song.artists.forEach(item => {
                        this.author +=  item.name +'/'
                    })
                    this.author = this.author.slice(0,this.author.length - 1);
                    this.picUrl = this.songsList[index].picUrl;

                    id  = this.songsList[index].id;
                }else if(this.listMode === 3){
                    this.author = '';
                    this.author = this.songsList[index].ar.forEach(item => {
                        this.author +=  item.name +'/'
                    })
                    this.songName = this.songsList[index].name;
                    this.picUrl = this.songsList[index].al.picUrl;
                    id  = this.songsList[index].id;
                }
                Toast(str);
                clearInterval(this.timer);
                this.currentTime = this.audio.currentTime ;
                this.timer =  setInterval(() => {
                    this.currentTime = this.audio.currentTime ;
                    if(this.currentTime === this.audio.duration){
                        this.setPlay(false);
                        clearInterval(this.rotateTimer);
                        this.audio.pause() ;
                    }
                    if(this.isShowLyric){
                        this.scrollToLyricItem();
                    }

                },200);
                this.musicRequestInformation(id);
            },
            onPlayPrep(){
                this.setPlay(false);
                this.audio.pause();
                let index = parseInt(this.isPlayingIndex)-1 ;
                if(index < 0){
                    index = this.songsList.length -1 ;
                }
                this.prepOrNext(index,'上一首');

            },
            onPlayNext(){
                this.setPlay(false);
                this.audio.pause();
               let index ;
               if(this.mode === 1){
                   index = parseInt(this.isPlayingIndex)+1 ;
                   if(index === this.songsList.length){
                       index = 0 ;
                   }
               }else if(this.mode === 3){
                   let _this = this ;
                   index = Math.floor(_this.songsList.length * Math.random());
               }
               this.prepOrNext(index,'下一首')

            }
        },
        computed :{
           ...mapState({
               songsPlaying: state => state.songsPlaying ,
               song : state => state.song ,
               audio : state => state.audio,
               play : state => state.play ,
               rotatingDeg : state => state.rotatingDeg,
               rotateTimer : state => state.rotateTimer,
                songsList : state => state.songsList ,
               listMode : state => state.listMode,

           }),
            lyricTimeIndex(){



               if(!this.isSlider){

                   this.lyricTimeArr.forEach((item,index )=> {
                       if( this.currentTime >= item ){
                         this.lyricIndex  =  index ;
                       }
                   })
               }
             return  this.lyricIndex ;
            },
            sliderX(){
                return this.currentTime /this.audio.duration *100 + '%'  ;
            },
            isPlayingIndex(){
               let index ;
               if(this.listMode === 2){
                       for(let k in this.songsList){
                           if (this.songsList[k].id  === this.songsPlaying.id){
                               index = k ;
                           }
                       }
               }else if(this.listMode === 1){
                   for(let k in this.songsList){
                       if(this.songsList[k].song.id === this.songsPlaying.id){
                           index = k ;
                       }
                   }
               }else if(this.listMode === 3){
                   for(let k in this.songsList){
                       if(this.songsList[k].id === this.songsPlaying.id){
                           index = k ;
                       }
                   }
               }
               return index ;

            }

        },
        filters:{
            timeFilter(time){
                let s = Math.floor(time %60);
                if(s < 10){
                    s  =  '0'+ s ;
                }
                let m = Math.floor(time /60);
                if(m < 10){
                    m  =  '0'+ m ;
                }
                return `${m}:${s}`
            }
        },
        created(){
            let {id} = this.songsPlaying ;
            //创建时请求歌词
            this.axios({
                url:`/lyric?id=${id}`,
                withCredentials: true
            }).then(res => {
                if(res.data.lrc){
                    let delIndexArr = [];
                    this.lyricArr = res.data.lrc.lyric.
                    slice(res.data.lrc.lyric.indexOf('[00:'),res.data.lrc.lyric.length).
                    split(/\n/g).map(lyr => {
                        let src = lyr.split(']')[1];
                        return src ;
                    }).filter((item , index)=> {
                        if(item !== '' &&item !== undefined) {
                            return true ;
                        }
                        delIndexArr.unshift(index);
                        return false ;
                    });


                    this.lyricTimeArr = res.data.lrc.lyric.
                    slice(res.data.lrc.lyric.indexOf('[00:'),res.data.lrc.lyric.length).
                    split(/\n/g).map(lyr => {
                        let src = lyr.split(']')[0].split('[')[1];
                        return src ;
                    })

                    delIndexArr.forEach(item => {
                        this.lyricTimeArr.splice(item,1);
                    });
                    this.lyricTimeArr=this.lyricTimeArr.filter(item => item!==undefined);

                    this.lyricTimeArr = this.lyricTimeArr.map(item => {
                        let m = parseFloat(item.split(':')[0]);
                        let s = parseFloat(item.split(':')[1]);

                        let time = m * 60 + s ;
                        return time
                    }).filter(item =>!isNaN(item));
                } else{
                    this.lyricArr = ['该歌词为纯音乐，没有歌词'];
                }
            });
            //请求将要播放歌曲的详细内容
            this.axios({
                url: `/song/detail?ids=${id}`,
                withCredentials: true ,//关键
            }).then(res =>  {
                let obj = res.data.songs.filter(item => item.id === id)[0];



                    this.setSong( obj);
                this.author = '';
                this.song.ar.forEach(item => {
                    this.author +=  item.name +'/'
                })
                this.author = this.author.slice(0,this.author.length - 1);
                this.picUrl = this.song.al.picUrl ;
                this.songName = this.song.name ;
            });

            this.currentTime = this.audio.currentTime ;

            //每隔一秒获取一次当前播放时间
            if(!this.timer){
                clearInterval(this.timer);
                this.timer =  setInterval(() => {
                    this.currentTime = this.audio.currentTime ;
                    if(this.currentTime === this.audio.duration){
                        clearInterval(this.rotateTimer);
                        this.audio.pause() ;
                    }
                    if(this.isShowLyric){
                        this.scrollToLyricItem() ;
                    }

                },200);
            }
        },
        mounted() {
            //当歌曲播放时，旋转唱片
            if(this.play){
                //唱片旋转角度数定时器
                this.rotating();
            }
            this.$nextTick(() => {
                 if(this.isShowLyric) {
                     if(!this.lyricBScroll ){

                         this.lyricBScroll = new BScroll(this.$refs.lyricBScroll,{
                             probeType :2 ,
                             click : true
                         });
                     }else{
                         this.lyricBScroll.refresh();
                     }
                 }

            });
            this.audio.addEventListener('ended', () => {
                if(this.mode != 2){
                    console.log(1);
                    this.onPlayNext();
                }else{
                    this.audio.play();
                }

            }, false);
        },
        beforeRouteLeave(to,from,next){

            if(to.name === "/search/detailsPage"){
               this.$router.replace(`/search/detailsPage?keyword=${this.songName}`);
            }else{
                next() ;
            }



        },
        beforeDestroy() {
            if(this.lyricBScroll){
                this.lyricBScroll.destroy();
            }

            clearInterval(this.timer);
            clearTimeout( this.mistackTimer);
            clearTimeout(this.timerOut);
        }

    }
</script>

<style scoped lang="scss">
    .showLyric-enter,
    .showLyric-leave-to{
        opacity : 0 ;
    }
    .showLyric-enter-to,
    .showLyric-leave{
        opacity : 1 ;
    }
    .showLyric-enter-active,
    .showLyric-leave-active{
        transition : opacity 1s;
    }

    /*定义唱片动画帧*/
    @keyframes rotating {
        0%{
            transform: rotate(0deg);
        }
        50%{
            transform: rotate(180deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }

    .music-playing-wrapper{
        width : 100vw ;
        height : 100vh ;
        position : fixed ;
        top : 0 ;
        /*background-color : #fff;*/
        z-index : 101 ;

        .music-playing-box{
            width : 100% ;
            height : 100% ;
            background: rgba(7, 17, 27, 0.5);
            -webkit-backdrop-filter: blur(30px);
            backdrop-filter: blur(30px);
            display: flex ;
            flex-direction: column;
        }

        .songsListView{
            position : absolute ;
            top : 150px ;
            left : 5vw ;
            bottom : 20px ;
            width : 90vw ;
            background-color : #fff ;
            border-radius: 20px ;
            padding : 12px ;

            .songsList-title{
                font-size : 16px ;
                font-weight : 700 ;

                .songsList-count{
                    font-size : 14px ;
                    font-weight :normal;
                    color : #ccc ;
                }
            }

            .songsList-mode{
                > div{
                    height : 20px ;
                    font-size: 12px ;
                    display: flex;
                    align-items: center;
                }
                .mode-icon{
                    font-size : 16px ;
                   padding : 0 6px ;
                }
            }

            .songsList-close{
                position : absolute;
                bottom : 0 ;
                left : 0 ;

                height : 44px ;
                width : 100% ;
                text-align: center;
                line-height : 44px ;
                border-top: 1px solid rgba(7,17,27,.1);
            }
        }
    }
    /*播放页面顶部样式     Start*/
    .music-playing-top{
        flex : 0 0 50px ;


        .top-back{
            width : 50px ;
            height : 50px ;
            position :absolute;
            left : 0 ;
            top : 0 ;
            text-align: center ;
            line-height : 50px ;

            span{
                display: inline-block;
                color : #fff;
                font-size : 22px ;
                vertical-align: middle;
            }
        }

        .top-title{
           width : 200px ;
            height : 50px ;
            margin : 0 auto ;
            text-align : center ;
            line-height : 20px ;
            padding-top : 10px ;

            font-family: '微软雅黑';
            h4{
                font-size : 16px ;
                color : #fff;
            }

            p{
                font-size : 12px ;
                color : rgb(210,210,210);
            }
        }
    }
    /*播放页面顶部样式     End*/

    .music-playing-picture{
        flex : 1 ;
        height : calc(100% - 200px);
        position : relative;
        display: flex ;
        justify-content: center;
        align-items: center;

        > div{
            width : 100% ;
            height : 100% ;
            display: flex ;
            justify-content: center;
            align-items: center;
        }

        .pic{
            box-sizing: content-box;
            width : 60vw ;
            height : 60vw ;
            padding : 4vw  ;
            border-radius: 50%;
            border : 4px dotted #ccc ;


            img{
                display: block;
                width : 60vw  ;
                height : 60vw;
                border-radius: 50%;

                /*&.rotating{*/
                /*    animation: rotating 20s linear infinite;*/
                /*    !* Firefox: *!*/
                /*    -moz-animation: rotating 20s linear infinite;*/
                /*    !* Safari 和 Chrome: *!*/
                /*    -webkit-animation: rotating 20s linear infinite;*/
                /*    !* Opera: *!*/
                /*    -o-animation: rotating 20s linear infinite;*/
                /*}*/
            }
        }

        .music-play-lyric{
            margin  : 30px 0 ;
            width : 100%   ;
            height : calc( 100% - 60px );

            mask : -webkit-linear-gradient(top,#000,#000 70%,rgba(0,0,0,0)) ;
            overflow: hidden;

            ul{
                padding : 50% 30px ;


                .lyric-item{
                    text-align: center ;
                    font-size : 14px ;
                    padding-bottom : 10px ;
                    line-height: 1.5;
                    color: hsla(0,0%,100%,.6);

                    &.active{
                        color : #fff ;
                    }
                }
            }

        }


    }
    .music-playing-control{
        flex : 0 0 150px ;
        padding : 0 12px ;

        .control-user-operation{
            padding :0  12px 10px ;
            display: flex;

            .user-operation-item{
                color : #fff ;
                font-size : 20px ;
                flex : 1 ;
                text-align: center;
            }
        }

        .control-playing-progressBar{
            height : 22px ;
            display: flex;

            .control-progressBar{
                flex: 1;
                padding : 10px 0;
                height : 22px ;

                .control-line{
                    width : 100% ;
                    height : 2px ;
                    background-color : rgb(107,104,97) ;
                    position : relative;

                    .control-slider{
                        width : 10px ;
                        height : 10px ;
                        border-radius : 50% ;
                        background-color : #fff ;
                        position: absolute;
                        left : 0 ;
                        top : -4px ;
                        z-index: 11 ;
                    }

                    .slider-line{
                        width : 0 ;
                        height : 2px ;
                        background-color : rgb(153,151,147);
                        position : absolute;
                        top: 0 ;
                        left : 0 ;
                        z-index: 10 ;
                    }
                }
            }

            .control-currentTime{
                flex:  0 0 36px ;
                display: flex;
                align-items: center;
                justify-content: center;
                width : 36px ;
                height : 22px ;

                color : rgb(169,164,156) ;
                font-size : 8px ;
            }

            .control-duration{
                flex:  0 0 40px ;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-left : 10px ;
                width : 36px ;
                height : 22px ;

                color : rgb(169,164,156);
                font-size : 8px ;
            }
        }

        .control-operationPanel{
            margin-top : 20px ;
            height : 56px ;
            width :  100% ;

            > div {
                width : 20% ;
                height : 56px ;
                float : left ;
                color : #fff ;
                font-size : 24px ;
                display: flex;
                justify-content: center;
                align-items: center;

                span{
                    display: block;
                    font-weight : 200 ;
                }
            }

            .control-play{

                font-size : 56px ;
            }
        }
    }
</style>