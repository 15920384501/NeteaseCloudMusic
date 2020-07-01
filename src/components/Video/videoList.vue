<template>
    <div>
        <div class="video-item" v-for="(item) in videoPlayingData.datas" :key="item.data.vid" ref="videoList">
            <div class="video-playing">
                <div @click="onVideoPlay(item.data.vid)">
                  <div v-if="playingId !== item.data.vid" class="pic">
                      <div class="video-play"><span class="icon-play3"></span></div>
                      <div class="video-durationms"><span class="icon-2"></span>{{item.data.durationms ?item.data.durationms :item.data.duration  | durationmsFilter}}</div>
                      <span class="video-playCount"> <i class="icon-play3"></i> {{item.data.playCount?item.data.playCount : item.data.playTime | playCountFilter}}</span>
                      <img :src="item.data.coverUrl" alt="">
                  </div>
                    <div v-else  class="video-onPlaying">
                        <video  :src="playingSrc" autoplay controls></video>
                    </div>
                </div>
            </div>
            <div class="video-title">
                <span class="title">
                     {{item.data.title?item.data.title : item.data.name}}
                </span>
            </div>
            <div class="video-author">
                <div class="author">
                    <img class="author-pic" :src=" item.data.creator ?item.data.creator.avatarUrl : item.data.artists[0].img1v1Url " alt="">
                    <span class="author-name">{{item.data.creator ? item.data.creator.nickname : item.data.artists[0].name }}</span>
                </div>
                <div class="video-operation">
                    <div class="video-like">
                        <span class="icon-like "></span>
                        <small>{{item.data.praisedCount?item.data.praisedCount : item.data.likeCount}}</small>
                    </div>

                    <div class="video-comment">
                        <span class="icon-comment "></span>
                        <small>{{item.data.commentCount}}</small>
                    </div>
                    <div class="video-more">
                        <span class="icon-more "></span>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "videoList",
        data : () => ({
            playingId: 0 ,
            playingIndex : 0 ,
            playingSrc : '',
        }),
        methods:{

            onVideoPlay(id){
                this.axios({
                    url : `/video/url?id=${id}`,
                    withCredentials : true ,
                }).then(res => {
                    this.playingId = id ;
                    this.playingSrc = res.data.urls[0]['url'] ;
                })

            }
        },
        computed:{
            ...mapState({
                videoId : state => state.videoId,
                videoPlayingLoading : state => state.videoPlayingLoading,
                videoPlayingData : state => state.videoPlayingData,
            })
        },
        filters :{
            playCountFilter(count){
                if(count > 100000){
                    let num = Math.floor(count / 100000);
                    return num ;
                }

               return count ;
            },
            durationmsFilter(time){
                let m  = Math.floor(time /1000 / 60 );
                let s = Math.floor(time/1000%60);
                m = m < 10 ? '0'+m : m ;
                s = s < 10 ? '0'+s : s ;

                return `${m}:${s}`;
            }
        },

    }
</script>

<style lang="scss" scoped>
.video-item{
    margin-bottom : 10px ;
    width : 100vw ;
    padding :0  3.5vw  ;
    background-color : #fff;

    .video-playing{
        padding : 3.5vw  0;
        width : 100% ;
        height : 34vh ;

        >div{
            background-color :  #ccc ;
            width : 100% ;
            height : 100% ;
            border-radius: 8px ;
            overflow: hidden;
            position : relative;

            .video-onPlaying{
                width : 100% ;
                height : 100% ;

                video{
                    width : 100% ;
                    height : 100% ;
                }
            }

            .video-durationms{
                position : absolute;
                right : 4px ;
                bottom : 2px ;
                font-size : 12px ;
                color : #fff ;
            }

            .video-play{
                position : absolute;
                top: 50% ;
                left  : 50% ;
                margin-left : -15px ;
                margin-top: -15px ;
                color :rgba(255,255,255,0.7) ;
                font-size : 30px ;
            }

            .video-playCount{
                position : absolute;
                bottom : 2px ;
                left : 4px ;
                color : #fff ;
                font-size : 12px ;
            }

            img{
                width : 100% ;
                height : 100% ;
            }
        }
    }

    .video-title{
        font-size : 14px ;
        font-weight : 700 ;
        font-family: '微软雅黑';
        line-height : 14px ;
        padding-bottom : 3.6vw ;
        border-bottom : 1px solid rgba(7, 17, 27, 0.1);
    }

    .video-author{
        width : 100% ;
        display: flex;
        height : 7vh ;

        align-items: center;


        .author{
            height  : 4.5vh ;
            line-height : 4.5vh ;
            flex : 1 ;

            .author-pic{
                display: inline-block;
                height : 4.5vh ;
                width : 4.5vh ;
                background-color : #333;
                border-radius: 50%;
            }

            .author-name{
                padding-left : 6px ;
                display: inline-block;
                vertical-align: top ;
                font-size : 12px ;
            }
        }

        .video-operation{
            flex :  0 0 40vw ;
            display: flex;
            justify-content: space-between;

            >div{
                position  : relative;

                span{
                    font-size : 22px ;
                }

                small{
                    position : absolute;
                    font-size : 10px ;
                    top : -8px ;
                    left : 22px ;
                }
            }
        }
    }
}
</style>