<template>
    <div class="detailsPage-wrapper">
        <div class="detailsPage-top">
            <div @click="$router.go(-1)" class="detailsPage-back">
                <span class="icon-back"></span>
            </div>
            <div class="detailsPage-searchBar">
                <van-search @focus="$router.go(-1)" v-model="keyword" placeholder="请输入搜索关键词"  shape="round"/>
            </div>
        </div>
       <div class="detailsPage-BScroll" ref="detailsPageBScroll">
         <div>
             <div class="detailsPage-interested" v-if="interestedAlbum||interestedArtist ||interestedMv">
                 <div class="interested-title">
                     你可能感兴趣
                 </div>
                 <div class="interested-lists">
                     <div v-if="interestedAlbum" class="interested-item interested-album">
                         <div class="item-pic">
                             <img :src="`${interestedAlbum.picUrl}?param=200y200`" alt="">
                         </div>
                         <div class="item-txt">
                             <div class="item-title">
                                 专辑：{{interestedAlbum.name}}
                             </div>
                             <div class="item-describe">
                                 {{interestedAlbum.artist.name}}
                             </div>
                             <div v-if="interestedAlbum.onSale" class="item-onSale">数字专辑销售中</div>
                         </div>
                         <div class="item-more">
                             <van-icon name="arrow" size="20px"/>
                         </div>
                     </div>
                     <div v-if="interestedArtist" class="interested-item interested-artist">
                         <div class="item-pic">
                             <img :src="`${interestedArtist.picUrl}?param=200y200`" alt="">
                         </div>
                         <div class="item-txt">
                             <div class="item-title">
                                 歌手：<span class="artist-name">{{interestedArtist.name}}</span>  <span v-if="interestedArtist.alias.length > 0" class="artist-alias">（{{interestedArtist.alias[0]}}）</span>
                             </div>
                             <div class="item-describe">
                                 <span>粉丝：{{interestedArtist.fansSize |sizeFilter}}</span>
                                 <span>歌曲：{{interestedArtist.musicSize |sizeFilter}}</span>
                                 <span>专辑：{{interestedArtist.albumSize |sizeFilter}}</span>
                             </div>
                         </div>
                         <div class="item-more">
                             <van-icon name="arrow" size="20px"/>
                         </div>
                     </div>
                     <div v-if="interestedMv" class="interested-item interested-mv">
                         <div class="item-pic">
                             <div class="item-play">
                            <span class="icon-play3">

                            </span>
                             </div>
                             <img :src="`${interestedMv.cover}?param=360y200`" alt="">
                         </div>
                         <div class="item-txt">
                             <div class="item-title">
                                 MV：<span>{{interestedMv.name}}</span>
                             </div>
                             <div class="item-describe">
                                 {{interestedMv.artistName}}
                             </div>
                         </div>
                         <div class="item-more">
                             <van-icon name="arrow" size="20px"/>
                         </div>
                     </div>


                 </div>
             </div>
             <div  class="detailPage-single">
                 <div class="single-title">
                     <div class="title-box">
                         单曲
                     </div>
                 </div>
                 <div  class="single-list">
<!--                     <van-pull-refresh v-model="refreshing" @refresh="onRefresh">-->
                         <van-list
                                 v-model="loading"
                                 :finished="finished"
                                 finished-text="没有更多了"
                                 @load="onLoad"
                         >
                             <van-cell v-for="(item) in resultSongsLists" :key="item.id">
                                 <div class="single-item">
                                     <span class="icon-uniE911 play" v-show="songsPlaying.id === item.id" ></span>
                                     <div @click="playSingle(item)" class="item-txt">
                                         <div class="item-song-name" :class="{'active' : songsPlaying.id === item.id}">
                                             {{item.name}}
                                         </div>
                                         <div class="item-album">
                                             <i></i>
                                             <span class="artist">
                                                {{item.artists | artistsFilter}}
                                            </span>
                                                         -
                                             <span class="album-name">
                                                {{item.album.name}}
                                            </span>
                                         </div>
                                     </div>
                                     <div class="item-more">
                                         <span class="icon-more"></span>
                                     </div>
                                 </div>
                             </van-cell>

                         </van-list>
<!--                     </van-pull-refresh>-->
                 </div>


             </div>
         </div>
       </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll" ;
    import {mapState,mapMutations} from 'vuex' ;
    import {SET_AUDIO_SRC, SET_PLAY, SET_SONGS_PLAYING} from '../../store/mutations-types'
    import {Toast} from "vant";
    export default {
        name: "DetailsPage",
        data : () => ({
            keyword : '' ,
            interestedMv:null,
            interestedArtist:null,
            interestedAlbum:null,
            resultSongsLists: [],
            resultSongsListsIndex : 0 ,
            loading: false,
            finished: false,
            refreshing: false,
        }),
        filters:{
            sizeFilter(size){
                if(size > 10000){
                   let thousand =  Math.floor(size /1000) %10;
                   let ten =  Math.floor(Math.floor(size /1000) / 10);
                   return `${ten}.${thousand}万`
                }
                return size ;
            },
            artistsFilter(list){
                let nameList = list.map(item => item.name);
                let nameStr = nameList.join('/');
                return nameStr ;
            }
        },
        methods:{
            ...mapMutations({
                setSongsPlaying : SET_SONGS_PLAYING,
                setAudioSrc : SET_AUDIO_SRC,
                setPlay : SET_PLAY
            }),
            onLoad() {
                this.axios({
                    url: `/search?keywords=${this.keyword}&offset=${this.resultSongsListsIndex}`,
                    withCredentials : true ,
                }).then(res => {
                    console.log(res.data.result.songs,'---------搜索结果');
                    if(res.data.result.songs){
                        res.data.result.songs.forEach(item => {
                            this.resultSongsLists.push(item) ;
                        })
                        this.resultSongsListsIndex ++ ;
                        this.loading = false;

                    }else{
                        this.finished = true;
                    }


                });

            },
            playSingle(item){
                console.log(item);
                let {id} = item ;
                if(this.songsPlaying.id === id){
                    if(!this.play){
                        this.setPlay(true);
                        this.audio.play();
                    }
                    this.$router.push({name:'MusicPlaying'});
                    return ;

                }
                //请求将要播放歌曲的详细内容
                this.axios({
                    url: `/song/detail?ids=${id}`,
                    withCredentials: true ,//关键
                }).then(res =>  {

                    let obj = res.data.songs.filter(item => item.id === id)[0];
                    this.setSongsPlaying({
                        id ,
                        picUrl : obj.al.picUrl,
                    });
                });
                //使audio获取音乐
                this.axios.get(`/check/music?id=${id}`).then(res => {
                    if(res.data.success === true ){
                        this.axios.get(`/song/url?id=${id}`).then(res => {
                            if(res.data.data[0].url ){
                                this.setAudioSrc(res.data.data[0].url);
                                this.setPlay(true);
                                this.audio.play() ;
                                this.setListMode(1);
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
                audio : state => state.audio,
                play : state => state.play ,
                songsPlaying : state => state.songsPlaying ,
            }),
        },
        mounted(){

            this.keyword = this.$route.query.keyword ;
            if(this.keyword){
                //请求关键词的多重匹配
                this.axios({
                    method : 'POST',
                    url : `/search/multimatch`,
                    params:{
                        keywords:this.keyword ,
                    },
                    withCredentials : true
                }).then(res => {
                    let {mv,artist,album} = res.data.result ;
                    if(mv){
                        this.interestedMv = mv[0] ;
                    }
                    if(artist){
                        this.interestedArtist = artist[0] ;
                    }
                    if(album){
                        this.interestedAlbum = album[0] ;
                    }
                });
            }


           this.$nextTick(() => {
               if(!this.singleBScroll){
                   this.singleBScroll = new BScroll(this.$refs.detailsPageBScroll,{
                       probeType : 2 ,
                       click : true ,
                   })
               }else {
                   this.singleBScroll.refresh();
               }
           })
        },
    }
</script>

<style lang="scss" scoped>
    .detailsPage-wrapper{
        width : 100vw ;
        height : 100vh ;
        position : fixed ;
        top : 0 ;
        z-index : 52 ;
        background-color : #fff ;

        .detailsPage-top{
            height : 54px ;
            width : 100vw ;
            padding-left : 12px ;
            display: flex;


            .detailsPage-back{
                width : 30px ;
                height : 54px ;
                padding : 12px 0 ;
                font-size : 20px ;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .detailsPage-searchBar{
                flex : 1 ;
            }
        }

        .detailsPage-BScroll{
            position : absolute;
            top : 54px ;
            bottom : 0 ;
            overflow: hidden;
            width : 100vw ;
        }

        .detailsPage-interested{
            padding : 0 12px ;
            border-top : 1px solid rgba(7,17,27,.1);
            margin-bottom : 10px ;

            .interested-title{
                font-size : 12px ;
                line-height : 1.1 ;
                font-weight : 700 ;
                padding : 10px  0 ;
            }

            .interested-lists{
                .interested-item{
                    display: flex;
                    width : 100% ;
                    margin-bottom : 16px ;
                    &:last-child{
                        margin : 0 ;
                    }

                    .item-pic {
                        flex: 0 0 50px ;
                        width : 50px ;
                        height : 50px ;

                        img{
                            width : 100% ;
                            height : 100% ;
                        }
                    }

                    .item-txt{
                        flex : 1;
                        margin-left : 12px ;
                        overflow: hidden;

                        .item-title{
                            font-size : 13px ;
                        }

                        .item-describe{
                            font-size : 10px ;
                        }

                        .item-onSale{
                            float : left ;
                            font-size : 10px ;
                            line-height : 1 ;
                            text-align: center;
                            padding: 4px 8px ;
                            border-radius: 10px ;
                            background-color : rgba(7,17,27,.1);
                            color : rgb(153,153,153);
                        }
                    }

                    .item-more{
                        flex :  0 0 30px ;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color : rgba(7,17,27,.3);
                    }

                    &.interested-album{
                        .item-txt{
                            margin-left : 20px ;
                        }
                        .item-pic{
                            position : relative ;

                            &::after {
                                content: "";
                                position: absolute;
                                top: 2px;
                                right: -10px;
                                width: 10px;
                                height: 46px;
                                background-repeat: no-repeat;
                                background-size: 166px 97px;
                                background-image: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=);
                                background-position: 0 -30px;
                            }
                        }
                        .item-describe{
                            color : rgb(90,124,171);
                        }
                    }

                    &.interested-artist{
                        .item-pic img{
                            border-radius: 50% ;
                        }
                        .item-title {
                            .artist-name{
                                color : rgb(90,124,171);
                            }
                            .artist-alias{
                                color : rgb(153,153,153);
                            }
                        }
                        .item-describe > span{
                            color : rgb(153,153,153);
                            margin-right : 6px ;
                        }
                    }

                    &.interested-mv{
                        .item-pic{
                            flex : 0 0 90px ;
                            width: 90px;
                            height: 50px;
                            position: relative;

                            .item-play{
                                padding : 4px 2px 4px 6px ;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                border-radius: 50%;
                                background-color : rgba(255,255,255,.5);
                                position : absolute;
                                top : 50% ;
                                left : 50% ;
                                margin-left : -10px ;
                                margin-top  : -10px ;
                                color : red ;
                                font-size : 12px ;
                            }
                        }
                        .item-title > span{
                            color : rgb(90,124,171);
                        }
                        .item-describe{
                            color : rgb(153,153,153);
                        }
                    }
                }
            }

        }

        .detailPage-single{

            .single-title{
                height : 40px ;
                padding : 0 12px ;
                font-size : 14px ;
                font-weight : 700 ;

                .title-box{
                    height : 40px ;
                    line-height : 40px ;
                    border-bottom: 1px solid  rgba(7,17,27,.1);
                }
            }

            .single-item{
                display: flex;

                .play{
                    flex :  0  0 30px ;
                    display: flex;
                    align-items: center;
                    color : red ;
                }

                .item-txt{
                    flex : 1 ;
                }

                .item-song-name{
                    font-size : 14px ;
                    color : black ;
                    line-height : 1.4 ;

                    &.active{
                        color : red ;
                    }
                }

                .item-album{
                    font-size : 12px ;
                    line-height : 1.4 ;

                    .artist{
                        color : rgb(90,124,171);
                    }

                    .album-name{
                        color : rgb(153,153,153);
                    }

                    i{
                        display: inline-block;
                        width: 12px;
                        height: 8px;
                        margin-right: 4px;
                        background: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=) no-repeat;
                        background-size: 166px 97px;
                    }
                }

                .item-more{
                    flex :  0 0 30px ;
                    font-size : 16px ;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color : rgb(153,153,153);
                }
            }
        }
    }
</style>