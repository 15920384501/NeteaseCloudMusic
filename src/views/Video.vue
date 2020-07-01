<template>
    <div>
        <div class="wrapper-top"></div>
        <searchBar></searchBar>
        <div class="video-tabs">
            <van-tabs @click="conso" v-model="active" swipeable ref="videoTab" title-active-color="rgb(238,77,68)" title-inactive-color="rgb(0,0,0)" >
                <van-tab   :to="{name:'VideoList',params:{id:item.id}}"  v-for="(item) in videoTitleLists" :name="item.id" :title="item.name" :key="item.id " title-style="flex: 0 0 auto ;padding : 0 12px ;font-size : 13px ;  font-family:'微软雅黑'" />
            </van-tabs>

        </div>
        <div class="video-view" ref="videoListView">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <div class="video-list"  >
                    <router-view></router-view >
                </div>
            </van-pull-refresh>

        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import {mapState,mapMutations} from 'vuex' ;
    import {SET_VIDEOTITLELISTS,SET_VIDEOID,SET_VIDEOPLAYINGDATA,SET_VIDEOPLAYINGLOADING} from "../store/mutations-types";
    import searchBar from '../components/SearchBar' ;


    export default {
        name: "Video",
        data : () => ({
            active: 0,
            isLoading:false ,

        }),
        methods:{
            ...mapMutations({
                setVideoTitleLists : SET_VIDEOTITLELISTS ,
                setVideoId : SET_VIDEOID ,
                setVideoPlayingData : SET_VIDEOPLAYINGDATA ,
                setVideoPlayingLoading:SET_VIDEOPLAYINGLOADING,
                onRefresh() {

                    setTimeout(() => {
                        this.axios({
                            url: `/video/group?id=${this.videoId}&timestamp=${new Date().getTime()}`,
                            withCredentials: true //关键
                        }).then(res => {
                            this.setVideoPlayingData(res.data);
                            console.log(res.data);
                            this.$nextTick(() => {
                                this.isLoading = false;
                                Toast(this.videoPlayingData.msg);
                            })
                        });
                    }, 4000);


                },

            }),
            conso(id) {
                this.isLoading = true ;
                this.setVideoId(id);
                this.setVideoPlayingLoading(true);
                this.axios({
                    url: `/video/group?id=${id}`,
                    withCredentials: true //关键
                }).then(res => {
                    this.setVideoPlayingData(res.data);
                    console.log(res.data,'conso');
                    this.$nextTick(() => {
                        Toast(this.videoPlayingData.msg);
                        this.isLoading = false;
                    })
                });
            }
        },
        components:{
            searchBar,
        },
        computed:{
            ...mapState({
                videoTitleLists : state => state.videoTitleLists ,
                videoPlayingData : state => state.videoPlayingData ,
                videoId : state => state.videoId ,
                user : state =>  state.user ,
            })
        },
        created(){
            this.axios({
                url: `/video/group/list`,
                withCredentials: true //关键
            }).then(res =>  {

                this.setVideoTitleLists(res.data.data.slice(0,15));
                let {id} = this.videoTitleLists[0] ;
                console.log(id)
                this.$router.push({path:`/video/${id}`}) ;
                this.setVideoId(id);
                this.setVideoPlayingLoading(true);

               this.axios({
                   url: `/login/cellphone?phone=${this.user.phone}&password=${this.user.password}`,
                   withCredentials : true
               }).then(res => {
                   console.log(res,'测试')
                   //请求视频列表
                   this.axios({
                       url: `/video/group?id=${id}`,
                       withCredentials: true //关键
                   }).then(res => {
                       console.log(res);
                       this.setVideoPlayingData(res.data);
                   });
               })
            });
        },
        // mounted(){
        //     this.$nextTick(() => {
        //
        //         if(!this.videoScroll){
        //             this.videoScroll = new BScroll(this.$refs.videoListView,{
        //                 probeType :2 ,
        //             })
        //         }
        //     });

        // },


    }
</script>

<style lang="scss" scoped>
    .wrapper-top{
        height : 94px ;
        width : 100vw ;
    }
    .video-tabs{
        position : fixed ;
        top : 50px ;
        width : 100vw ;
        /*background-color : #fff;*/
        z-index: 10;
        border-bottom : 1px solid rgba(7, 17, 27, 0.1);
    }
    .video-view{

        background-color : #fff;

        .video-list{
            width : 100vw ;
            background-color : rgb(248,248,248);
        }
    }
</style>