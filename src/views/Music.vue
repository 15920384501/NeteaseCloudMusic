<template>
    <div class="myMusic-wrapper" :style="{'background':`url(${backgroundUrl}?param=${fullWidth}y${fullHeight}) no-repeat`}">
<!--        空bar占50px位置-->
        <div class="topBar"></div>
        <div class="myMusic-mask"></div>
<!--        顶部栏-->
        <div class="myMusic-topBar" :style="{'background':`url(${backgroundUrl}?param=${fullWidth}y${fullHeight}) no-repeat`}">
            <span class="icon-cloud"></span>
            <div v-if="songsPlaying.picUrl" class="top-playing">
                <div @click="intoMusicPlaying()" class="myMusic">
                    <img :style="{'transform':`rotate(${rotatingDeg}deg)`}" :src="songsPlaying.picUrl" alt="">
                </div>
            </div>
        </div>
<!--        用户信息区    START-->
        <div class="myMusic-user">
            <div class="user-information">
                <div class="user-pic">
                    <img :src="`${avatarUrl}`" alt="">
                </div>
                <div class="user-right">
                    <p class="user-name">
                        {{nickname }}
                        <span class="user-VIP">开通黑胶VIP ></span>
                    </p>
                    <p class="user-leave">
                        <span>Lv.6</span>
                    </p>
                </div>
            </div>
<!--            功能键区-->
            <div class="myMusic-funcKey">
                <div class="funcKey-item">
                    <div class="funcKey-icon icon-uniE91E">

                    </div>
                    <div class="funcKey-text">
                        本地音乐
                    </div>
                </div>
                <div class="funcKey-item">
                    <div class="funcKey-icon icon-5">

                    </div>
                    <div class="funcKey-text">
                        我的电台
                    </div>
                </div>
                <div class="funcKey-item">
                    <div class="funcKey-icon icon-7">

                    </div>
                    <div class="funcKey-text">
                        我的收藏
                    </div>
                </div>
                <div class="funcKey-item">
                    <div class="funcKey-icon icon-uniE91E">

                    </div>
                    <div class="funcKey-text">
                        关注新歌
                    </div>
                </div>
            </div>
        </div>
<!--        用户信息区    END-->

<!--        用户音乐区    START-->
            <div class="myMusic-content">
                <div class="content-title">
                    我的音乐
                    <div class="title-right">
                        更多>
                    </div>
                </div>
                <div class="content-musicApplication"  ref="musicApplication">
                    <div class="musicApplication ">
                        <div class="musicApplication-item">
                            <div  @click="intoMusicPlaylistView" class="item-mask">
                                <div class="item-text">
                                    <p>
                                        <span class="icon-6"></span>
                                    </p>
                                    我喜欢的音乐
                                </div>
                                <div class="item-introduce">
                                    <div class="cardiac">
                                        <span class="triangle"></span>
                                        心动模式
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="musicApplication-item">
                            <div class="item-mask">
                                <div class="item-text">
                                    <p>
                                        <span class="icon-FM_"></span>
                                    </p>
                                    私人FM
                                </div>
                                <div class="item-introduce">最懂你的推荐</div>
                            </div>
                        </div>
                        <div class="musicApplication-item">
                            <div class="item-recommend">推荐</div>
                            <div class="item-text">
                                <p>
                                    <span class="icon-moon"></span>
                                </p>
                                Sati空间
                            </div>
                            <div class="item-introduce">释放压力轻音乐</div>
                        </div>
                        <div class="musicApplication-item">
                            <div class="item-recommend">推荐</div>
                            <div class="item-text">
                                <p>
                                    <span class="icon-9"></span>
                                </p>
                                古典专区
                            </div>
                            <div class="item-introduce">专业的古典音乐大全</div>
                        </div>
                        <div class="musicApplication-item">
                            <div class="item-recommend">推荐</div>
                            <div class="item-text">
                                <p>
                                    <span class="icon-8"></span>
                                </p>
                                热歌放映厅
                            </div>
                            <div class="item-introduce">好音乐，看得见</div>
                        </div>
                    </div>
                </div>

                <!--        用户歌单区    START-->
                <div class="myMusic-playlist">
                    <div class="playlist-title">
                        <span :class="{'active':playlistCount === 1}" @click="playlistCount = 1">创建歌单<small> {{createPlaylist.length}}</small></span>
                        <span :class="{'active':playlistCount === 2}"  @click="playlistCount = 2">收藏歌单<small> {{collectPlaylist.length}}</small></span>
                        <i class="icon-more" @click="showManagementMenu = true"></i>
                    </div>
                    <div class="playlist-content clearFix">
                        <div @click="intoMusicPlaylistView(item)" class="playlist-item" v-for="(item,index) in showPlaylist" :key="index">
                            <div class="item-pic">
                                <img :src="item.coverImgUrl" alt="">
                            </div>
                            <div class="item-txt">
                                <p class="item-playlistName">{{item.name}}</p>
                                <p class="item-playlistCount">{{item.trackCount}}首</p>
                            </div>
                        </div>

                        <div class="playlist-item newListBtn" v-show="playlistCount === 1" @click="onNewPlaylist">
                            <div class="item-pic">
                                <van-icon name="add-o" size="26px" color="rgb(204,204,204)"></van-icon>
                            </div>
                            <div class="item-txt">
                                <p class="item-playlistName">新建歌单</p>

                            </div>
                        </div>
                    </div>
                </div>
<!--                管理歌单功能区-->
                <van-action-sheet
                        v-model="showManagementMenu"
                        :actions="managementMenuActions"
                        description="请选择"
                        @select="onSelect"
                />

                <van-action-sheet v-model="showNewPlaylistMenu" title="新建歌单" cancel-text="完成" @cancel="onFinish" close-icon="false">
                    <div class="newPlaylistMenu-content">
                        <input  type="text" placeholder="歌单标题" v-model="newPlaylistName">
                    </div>
                </van-action-sheet>
                <!--        用户歌单区    END-->

            </div>
<!--        用户音乐区    END-->

        <transition name="newPlaylist">
            <router-view :showPlaylist="showPlaylist" @deleteItem='deleteItem'></router-view>
        </transition>

    </div>
</template>

<script>
    import {
        SET_DETAILED_PLAYLIST,
        SET_DETAILED_PLAYLIST_ARR,
        SET_USER_AVATARURL,
        SET_USER_NAME
    } from "../store/mutations-types";
    import { Dialog } from 'vant';
    import BScroll from 'better-scroll'
    import {mapState,mapMutations} from 'vuex' ;
    export default {
        name: "Mine",
        data : () => ({
            userInformation:null ,
            avatarUrl:'',
            nickname : '',
            backgroundUrl : '',
            playlist : [],
            playlistCount:1 ,
            likeMusicPlaylist : null,
            showManagementMenu:false ,//管理菜单是否展示
            showNewPlaylistMenu : false , //新建歌单菜单是否展示
            newPlaylistName:'' ,   //记录新建歌单名字
            managementMenuActions:[
                {name:'新建歌单',type:1},
                {name:'管理歌单',type:2},
                {name:'导入外部歌单',type:3},
                {name:'恢复歌单',type:4},
                {name:'切换至单列模式',type:5},
            ],
        }),
        methods:{
            ...mapMutations({
                setDetailedPlaylist : SET_DETAILED_PLAYLIST,
                setDetailedPlaylistArr : SET_DETAILED_PLAYLIST_ARR,
                setUserName : SET_USER_NAME,
                setUserAvatarUrl:SET_USER_AVATARURL,
            }),
            intoMusicPlaylistView(item ){
                let obj ;
                if(item.id){
                    obj = item ;
                }else{
                    obj = this.likeMusicPlaylist ;
                }

                let {id} = obj
                console.log(obj,'obj')
                this.axios({
                    url:`playlist/detail?id=${id}`,
                    withCredentials : true
                }).then(res => {
                    this.setDetailedPlaylist(res.data.playlist);
                    this.setDetailedPlaylistArr(res.data.playlist.tracks);

                });
                this.setUserName(obj.creator.nickname);
                this.setUserAvatarUrl(obj.creator.avatarUrl);
                this.$router.push({name: 'MusicPlaylist'});

            },
            intoMusicPlaying(){
                this.$router.push({name:'MusicPlaying'});
            },
            onSelect(item){
                this.showManagementMenu = false ;
                if(item.type === 1 ){
                    this.showNewPlaylistMenu = true ;
                }
                if(item.type === 2 ){
                    this.$router.push({name : 'ManagementPlaylistMenu'});
                }
            },

            onFinish() {   //实为新建歌单填写完成事件
                this.showNewPlaylistMenu = false ;
                //判断是否填写名字
                if(this.newPlaylistName ){
                    // 请求 创建歌单接口
                    if(this.isDuplicateName.length === 0){
                        this.axios({
                            url : `/playlist/create?name=${this.newPlaylistName}`,
                            withCredentials: true ,//关键
                        }).then(res => {
                            this.newPlaylistName = '';
                            this.playlist.push(res.data.playlist);
                        })
                    }else {
                        Dialog({ message: '该歌单已存在，请更换歌单标题' });
                    }

                }
                return ;
            },
            onNewPlaylist(){
                this.showNewPlaylistMenu = true ;
                // if(this.newPlaylistName){
                //     console.log(this.isDuplicateName);
                    // this.axios({
                    //     url : `/playlist/create?name=${this.newPlaylistName}`,
                    //     withCredentials: true ,//关键
                    // }).then(res => {
                    //     this.playlist.push(res.data.playlist);
                    // })
                // }
                // return ;
            },
            //子传夫 处理playlist数据
            deleteItem(id){
                this.playlist = this.playlist.filter(item => item.id != id) ;
            },
        },
        computed:{
            ...mapState({
                songsPlaying : state => state.songsPlaying,
                user : state =>  state.user ,
                rotatingDeg : state =>  state.rotatingDeg ,
            }),
            fullWidth(){
                return document.documentElement.clientWidth;
            },
            fullHeight(){
                return document.documentElement.clientHeight ;
            },
            createPlaylist(){
                return this.playlist.filter(item => item.userId ==this.user.id ) ;
            },
            collectPlaylist(){
                return this.playlist.filter(item => item.userId !=this.user.id ) ;
            },
            showPlaylist(){
                if(this.playlistCount ===1){
                    return this.createPlaylist ;
                }
                return this.collectPlaylist ;
            },
            isDuplicateName(){
                return this.showPlaylist.filter(item => item.name === this.newPlaylistName);
            }
        },
        mounted(){
            console.log(this.user.id)
            let id = localStorage.getItem('id');
            //请求个人页面信息
            this.axios({
                url:`/user/detail?uid=${id}`,
                withCredentials: true ,//关键
            }).then(res => {
                // console.log(res.data);
                this.userInformation = res.data.profile ;
                this.avatarUrl = this.userInformation.avatarUrl ;
                this.nickname = this.userInformation.nickname ;
                this.backgroundUrl = this.userInformation.backgroundUrl ;

            });
            //注册我的音乐BScroll
            this.$nextTick(() => {
                if(!this.musicApplicationBS){
                    this.musicApplicationBS = new BScroll(this.$refs.musicApplication,{
                        scrollY : false ,
                        scrollX: true,
                        click: true ,
                        probeType :2 ,
                        swipeBounceTime:400
                    });
                }else{
                    this.musicApplicationBS.refresh() ;
                }

            });
            //请求歌单
            this.axios({
                url : `/user/playlist?uid=${id}&timestamp=${new Date().getTime()}`,
                withCredentials: true ,//关键
            }).then(res => {
                console.log(res) ;
                this.likeMusicPlaylist = res.data.playlist.shift() ;
                console.log(this.likeMusicPlaylist );
                this.playlist = res.data.playlist ;
                console.log(this.createPlaylist);
                console.log(this.collectPlaylist);
            })

        }
    }
</script>

<style lang="scss" scoped>
    .newPlaylist-enter,
    .newPlaylist-leave-to{
        transform: translateY(100%);
    }
    .newPlaylist-enter-to,
    .newPlaylist-leave{
        transform: translateY(0);
    }
    .newPlaylist-enter-active,
    .newPlaylist-leave-active{
        transition : all 0.3s ;
    }

    .clearFix::after {
        content: '';
        display: block;
        clear : both ;
    }

    .myMusic-wrapper{
        overflow: hidden;
    }

    .topBar{
        height : 50px ;
    }
    .myMusic-mask{
        position : fixed;
        width : 100vw ;
        height : 100vh ;
        background-color : #fff ;
        z-index: -1;

    }
    /*顶部栏样式*/
    .myMusic-topBar{
        height : 50px ;
        width : 100vw ;
        padding-left : 14px ;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position : fixed;
        top: 0;
        left : 0;

        .icon-cloud{
            font-size :26px ;
            color : #fff ;
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

    /*用户信息区总体样式    START*/
    .myMusic-user{
        padding : 0 12px ;
    }

    /*用户个人信息*/
    .user-information{
        padding : 20px 0 ;
        display: flex;

        .user-pic{
            flex: 0 0 50px ;
            width : 50px ;
            height : 50px ;
            border-radius: 50% ;
            overflow: hidden;

            img{
                width : 100% ;
                height : 100% ;
            }
        }

        .user-right{
            flex : 1 ;
            margin-left : 12px ;

            .user-name{
                color : #fff;
                font-size: 16px ;

                .user-VIP{
                    float :right ;
                    font-size : 12px ;
                    color : #ccc;
                }
            }

            .user-leave{
                span{
                    display: inline-block;
                    line-height : 12px ;
                    font-size : 12px ;
                    font-weight : 700 ;
                    padding : 2px 5px ;
                    background-color : rgb(56,55,61);
                    color : rgb(215,215,216);
                    border-radius: 10px ;
                }
            }
        }
    }

    .myMusic-funcKey{
        color : #fff ;
        display: flex;
        justify-content: space-between;

        .funcKey-item{
            flex : 1 ;
            text-align: center;
            padding-bottom: 10px ;

            .funcKey-icon{
                display: inline-block;
                font-size : 24px ;
                font-weight : 200 ;
            }

            .funcKey-text{
                font-size : 12px ;
                font-weight : 200 ;
                text-align: center;
                line-height : 12px ;
            }
        }

    }
    /*用户信息区总体样式    END*/


    /*我的音乐  （用户音乐区）    START*/
    .myMusic-content{
        width : 100vw ;
        overflow: hidden;
        background-color : #fff ;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;

        .content-title{
            height : 50px ;
            width : 100% ;
            padding : 0 12px ;
            line-height : 50px ;
            font-size : 16px ;
            font-weight : 700 ;
            font-family: '宋体';

            .title-right{
                float : right ;
                line-height : 50px ;
                font-size : 12px ;
                font-weight : 500 ;
                color : #ccc;
            }
        }

        /*音乐区BScroll内容*/
        .content-musicApplication{
            width : 100vw ;
            margin-bottom : 20px ;

            .musicApplication{
                padding : 0  12px ;
                width : 616px ;

                .musicApplication-item{
                    display: inline-block;
                    height : 146px ;
                    width : 110px ;
                    border-radius: 10px ;
                    overflow: hidden;
                    margin-right : 10px ;
                    position : relative;
                    background-color : rgb(233,233,233);

                    .item-mask{
                        height : 146px ;
                        width : 110px ;
                        position : absolute;
                        top : 0 ;
                        background-color : rgba(7, 17, 27, 0.5) ;

                    }

                    .item-text{
                        margin : 40px auto ;
                        color : rgb(25,24,31);
                        font-size : 12px ;
                        text-align: center;

                        p{
                            color : rgb(25,24,31) ;
                            font-size : 36px ;
                        }
                    }

                    .item-recommend{
                        width : 100% ;
                        position : absolute;
                        top: 5px ;
                        text-align: center;
                        font-size : 12px ;
                        color : rgb(172,171,174);
                    }

                    .item-introduce{
                        width : 100% ;
                        position : absolute;
                        bottom : 5px ;
                        z-index: 10 ;
                        font-size : 12px ;
                        text-align: center;
                        color : rgb(172,171,174);
                    }

                    &:nth-child(1){
                        background : url("../assets/acitve.jpg") -100px 0 / 259px 146px  no-repeat;

                        .item-text{
                            color : #fff;

                            p{
                                color : rgb(236,93,77) ;
                            }
                        }

                        .item-introduce{

                            .cardiac{
                                display: inline-block;
                                width : 80px ;
                                height : 22px ;
                                line-height : 22px ;
                                border-radius: 20px ;
                                margin : 0 auto ;
                                background: rgba(145, 138, 137, .8);

                                color : #fff;

                                .triangle{
                                    display: inline-block;
                                    /*vertical-align: top;*/
                                    width : 0 ;
                                    height : 0 ;
                                    line-height : 22px ;
                                    border-top: 4px solid transparent ;
                                    border-bottom: 5px solid transparent ;
                                    border-right: 0 ;
                                    border-left : 7px solid #fff ;
                                }
                            }
                        }
                    }

                    &:nth-child(2){
                        background : url("../assets/active02.jpg") 0 0 / 127px 146px  no-repeat;

                        .item-text{
                            color : #fff;

                            p{
                                color : #fff ;
                            }
                        }
                    }

                    &:last-child{
                        margin:  0 ;
                    }
                }
            }
        }

        /*用户音乐区    START*/
        .myMusic-playlist{
            width : 100vw ;
            padding : 0 12px ;

            .playlist-title{
                margin-bottom : 10px ;

                span{
                    font-size : 14px ;
                    font-weight : 700;
                    margin-right : 20px ;
                    color : rgb(153,153,153) ;

                    &.active{
                        color : black ;
                    }
                }

                i{
                    display: block;
                    margin-top : 5px  ;
                    float : right ;
                    font-size : 14px ;
                    line-height : 14px ;
                    color : rgb(153,153,153) ;
                }
            }

            .playlist-content{
                width : 100% ;
                padding-bottom : 10px ;

                .playlist-item{
                    width : calc(50% - 20px) ;
                    margin-right : 20px ;
                    display: flex;
                    float : left ;
                    margin-bottom : 20px ;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                    .item-pic{
                        flex : 0 0 15vw ;
                        height : 15vw ;
                        overflow: hidden;
                        border-radius: 6px ;
                        background-color : #ccc ;

                        img{
                            width : 100% ;
                            height : 100% ;
                        }
                    }

                    .item-txt{
                        flex : 1 ;
                        margin-left : 10px ;

                        .item-playlistName{
                            font-size :12px ;
                            width : 25vw  ;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .item-playlistCount{
                            font-size :12px ;
                            color : rgb(153,153,153);
                        }
                    }

                    &.newListBtn{

                        .item-pic{
                            background-color : rgb(238,238,238);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size : 20px ;
                        }

                        .item-txt{
                            display: flex;
                            align-items: center ;
                        }
                    }
                }
            }
        }
        /*用户音乐区    END*/

        /*新建歌单菜单样式*/
        .newPlaylistMenu-content{
            padding: 16px 16px ;

            input{
                outline: 0;
                border : 0 ;
            }
        }
    }
    /*我的音乐  （用户音乐区）    END*/
</style>