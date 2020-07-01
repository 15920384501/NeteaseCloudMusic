<template>
    <div class="music-playlist-wrapper" :style="{'background-image' : `url(${detailedPlaylist.coverImgUrl})`,}">
        <div class="music-playlist-mask">
            <div class="topBar"></div>
            <div @click="con" class="music-topBar" >
                <span @click="$router.go(-1)" class="icon-back"></span>
                <span class="title">歌单</span>
                <div v-if="songsPlaying.picUrl" class="top-playing">
                    <div @click="intoMusicPlaying" class="myMusic">
                        <img :style="{'transform':`rotate(${rotatingDeg}deg)`}" :src="songsPlaying.picUrl" alt="">
                    </div>
                </div>
            </div>
            <div class="playlist-information">
                <div class="playlist-pic">
                    <img :src="detailedPlaylist.coverImgUrl" alt="">
                    <span> <i class="icon-play3"></i>{{detailedPlaylist.playCount |playCountFilter}}</span>
                </div>
                <div class="playlist-text">
                    <div class="playlist-title">
                        {{detailedPlaylist.name}}
                    </div>
                    <div class="playlist-user">
                        <span class="user-pic">
                            <img :src="`${avatarUrl}?param=200y200`" alt="">
                        </span>
                        <span class="user-name">
                            {{userName}} >
                        </span>
                    </div>
                </div>
            </div>
            <div class="playlist-musicList">
                <div class="musicList-control">
                    <i class="icon-play"></i>
                    播放全部
                    <span>（共{{detailedPlaylistArr.length}}首）</span>
                </div>
                <div @click="playItem(item)" class="musicList-item" v-for="(item,index) in detailedPlaylistArr" :key="item.id">
                    <div class="item-num">
                        <span v-show="songsPlaying.id !== item.id" class="num">{{index+1}}</span>
                        <span class="icon-uniE911 play" v-show="songsPlaying.id === item.id" ></span>
                    </div>
                    <div class="item-txt">
                        <div class="item-musicTitle">
                            <span :class="{'active':songsPlaying.id === item.id}" class="item-name">{{item.name}}</span>
                            <span v-if="item.alia.length > 0" class="Album">（{{item.alia.join()}}）</span>
                        </div>
                        <div class="item-musicAuthor">
                            {{item.ar.map(item => {if(item.name)return item.name}).join('/')}}-{{item.al.name}}
                        </div>

                    </div>
                    <div class="item-more">
                        <span class="icon-more"></span>
                    </div>
                </div>
                <div v-if="detailedPlaylistArr.length < 1" class="addMusicBtn">添加歌曲</div>
            </div>
        </div>

    </div>
</template>

<script>
    import {Toast} from 'vant'
    import {mapState,mapMutations} from 'vuex';
    import {
        SET_AUDIO_SRC,
        SET_LIST_MODE,
        SET_PLAY,
        SET_SONGS_LIST,
        SET_SONGS_PLAYING
    } from "../../store/mutations-types";
    export default {
        name: "musicPlaylist",
        data : () =>({
        }),
        methods : {
            ...mapMutations({
                setSongsPlaying : SET_SONGS_PLAYING,
                setAudioSrc :SET_AUDIO_SRC,
                setSongsList : SET_SONGS_LIST,
                setListMode : SET_LIST_MODE ,
                setPlay : SET_PLAY
            }),
            intoMusicPlaying(){
                this.$router.push({name:'MusicPlaying'});
            },
            con(){
                console.log(this.detailedPlaylist)
                console.log(this.detailedPlaylistArr)
            },
            playItem(item){
                if(this.songsPlaying.id === item.id){

                    if(!this.play){
                        this.setPlay(true);
                        this.audio.play();
                    }
                    this.$router.push({name:'MusicPlaying'});
                    return ;

                }
                this.setSongsPlaying({
                    id : item.id ,
                    picUrl : item.al.picUrl
                })
                //使audio获取音乐
                this.axios.get(`/check/music?id=${item.id}`).then(res => {
                    if(res.data.success === true ){
                        this.axios.get(`/song/url?id=${item.id}`).then(res => {
                            if(res.data.data[0].url ){
                                this.setAudioSrc(res.data.data[0].url);
                                this.setPlay(true);
                                this.audio.play() ;
                                this.setSongsList(this.detailedPlaylistArr);
                                this.setListMode(3);
                            }else{
                                Toast('该歌曲需要VIP，无法播放');
                                this.audio.pause();
                            }

                        });
                    }else{
                        console.log('该歌曲没有版权，无法播放')
                    }

                });
            },
        },
        computed:{
            ...mapState({
                songsPlaying : state => state.songsPlaying,
                rotatingDeg : state => state.rotatingDeg,
                detailedPlaylist : state => state.detailedPlaylist,
                detailedPlaylistArr : state => state.detailedPlaylistArr,
                userName : state => state.user.name ,
                avatarUrl : state => state.user.avatarUrl ,
                audio : state => state.audio,
                play : state => state.play,
            })
        },
        filters:{
            playCountFilter(count){
                if(count >= 10000 && count < 100000000){
                    let num = count / 10000
                    return `${Math.floor(num/10)}.${Math.floor(num%10)}万`
                }else if(count >= 100000000){
                    let num = count / 10000000
                    return `${Math.floor(num/10)}.${Math.floor(num%10)}亿`
                }
                return count ;
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
.music-playlist-wrapper{
    width : 100vw ;
    min-height : 90vh;
    background-color: #161824;

    background-repeat: no-repeat;
    background-size: 100% auto;
    position: relative;
    z-index : 50 ;


    .music-playlist-mask{
        position : absolute;
        width : 100vw ;
        height : 100vh ;
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        z-index: 51;
    }
    .topBar{
        height : 50px ;

    }
    .music-topBar{
        height : 50px ;
        width : 100vw ;
        display: flex;
        justify-content: center;
        align-items: center;
        position : fixed;
        z-index : 55 ;
        top: 0;
        color : #fff ;


        .icon-back{
            font-size :26px ;
            color : #fff ;
            position : absolute;
            left : 14px ;
        }

        .top-playing{
            position : absolute;
            right  : 0 ;
            height : 50px ;
            width : 50px ;
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

    .playlist-information{
        padding : 20px 12px 0 ;
        display: flex;

        .playlist-pic{
            flex : 0 0 34vw ;
            width : 34vw ;
            height  : 34vw ;
            border-radius: 5px ;
            overflow: hidden;
            position: relative;

            img{
                width : 100% ;
                height : 100% ;
            }

            span{
                position: absolute;
                top : 5px ;
                right : 5px ;
                font-size : 10px ;
                line-height : 1.1 ;
                color : #fff ;
            }
        }

        .playlist-text{
            margin-left : 15px ;

            .playlist-title{
                font-weight : 600;
                font-size : 16px ;
                color : #fff ;
                line-height : 1.4 ;
            }

            .playlist-user{
                margin-top : 10px ;
                display: flex;
                align-items: center;
                .user-pic{
                    display: inline-block;
                    width : 7.8vw ;
                    height  : 7.8vw ;
                    border-radius: 50% ;
                    overflow: hidden;


                    img{
                        width : 100% ;
                        height : 100% ;
                    }
                }

                .user-name{
                    margin-left : 5px ;
                    color : rgb(190,190,190);
                    font-size : 12px ;
                }
            }
        }
    }

    .playlist-musicList{
        margin-top: 20px ;
        width : 100vw ;
        min-height : 450px  ;
        background-color : #fff ;
        border-top-left-radius: 20px ;
        border-top-right-radius: 20px  ;

        .musicList-control{
            height : 50px ;
            width : 100% ;
            color : black ;
            font-size : 14px ;
            font-weight : bold;
            display: flex;
            align-items: center;
            border-bottom : 1px solid rgba(7,17,27,0.1);
            i{
                display: inline-block;
                width : 40px ;
                text-align: center;
                font-size : 20px ;
            }

            span{
                font-size : 12px ;
                font-weight : 400;
                color : rgb(153,153,153);
            }
        }

        .musicList-item{
            display: flex;
            height : 50px ;

            .item-num{
                flex : 0 0 40px ;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size : 14px ;

                .play{
                    color : rgb(235,77,68);
                }
            }

            .item-txt{
                flex : 1 ;
                padding : 8px 0 ;

                .item-musicTitle{
                    font-size : 14px ;
                    line-height : 1.4 ;
                    font-weight : 600 ;
                    max-width : calc(100vw - 100px );
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                    span{
                        color : rgb(153,153,153);

                        &.item-name{
                            color : black ;
                        }

                        &.active{
                            color : rgb(235,77,68);
                        }
                    }
                }

                .item-musicAuthor{
                    max-width : calc(100vw - 100px );
                    font-size : 12px ;
                    line-height : 1.4 ;
                    color : rgb(153,153,153);
                    overflow: hidden;
                    white-space: nowrap;
                  text-overflow: ellipsis;
                }
            }

            .item-more{
                flex : 0 0 50px  ;
                font-size : 14px ;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .addMusicBtn{
            width : 150px ;
            height : 36px ;
            color : red ;
            border : 1px solid red ;
            border-radius: 20px ;
            margin : 50px auto 0 ;
            line-height : 36px ;
            text-align: center;
            font-size  :14px ;
        }
    }
}
</style>