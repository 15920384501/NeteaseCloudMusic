<template>
    <div class="singer-wrapper">
      <div class="singer-navBar">
          <van-nav-bar title="歌手分类"  left-text="返回" @click-left="goBack" left-arrow fixed placeholder >
              <template v-if="songsPlaying.picUrl" #right>
                  <div  class="top-playing">
                      <div class="myMusic " @click="$router.push({name:'MusicPlaying'})">
                          <img :style="{'transform':`rotate(${rotatingDeg}deg)`}" :src="songsPlaying.picUrl" alt="">
                      </div>
                  </div>
              </template>
          </van-nav-bar>
      </div>

      <div class="singer-content">
<!--           分类选择       Start-->
          <div class="singer-classification" ref="singerClassification">
              <div class="area-classification">
                  <span :class="{active:singerClassification.area==='7'}"  @click="setClassification({area:'7'})">华语</span>
                  <span :class="{active:singerClassification.area==='96'}"   @click="setClassification({area:'96'})">欧美</span>
                  <span :class="{active:singerClassification.area==='8'}"  @click="setClassification({area:'8'})">日本</span>
                  <span :class="{active:singerClassification.area==='16'}"   @click="setClassification({area:'16'})">韩国</span>
                  <span :class="{active:singerClassification.area==='0'}"   @click="setClassification({area:'0'})">其他</span>
              </div>
              <div class="type-classification">
                  <span :class="{active:singerClassification.type==='1'}" @click="setClassification({type:'1'})">男</span>
                  <span :class="{active:singerClassification.type==='2'}" @click="setClassification({type:'2'})">女</span>
                  <span :class="{active:singerClassification.type==='3'}" @click="setClassification({type:'3'})">乐队/组合</span>
              </div>
              <p class="singerList-title">热门歌手 </p>
          </div>
<!--           分类选择       End-->

          <!--          图片加载中-->
          <van-loading v-show="loadingShow" size="24px" class="loading" color='red'>加载中...</van-loading>

<!--            歌手列表    Start -->
          <div class="singer-list"  ref="singerList" :style="{top:singerListTop+'px'}" v-show="!loadingShow">
              <div>
                  <div class="singer-item" v-for="(item,index) in singerClassificationList" :key="index">
                      <div class="singer-pic">
                          <img :src="`${item.img1v1Url}?param=50y50`" alt="">
                      </div>
                      <div class="singer-name">
                          {{item.name}}
                          <span class="alias" v-if="item.alias[0]">({{item.alias[0]}})</span>
                      </div>
                      <div class="singer-follow">
                          <span @click="follow(item.name)" class="followed" v-if="item.followed" >✔ 已关注</span>
                            <span @click="follow(item.name)" class="follow"  v-else >+ 关注</span>

                      </div>
                  </div>
                  <div v-show="refreshLoading" class="refresh-loading">
                      <van-loading  color="#1989fa" />
                  </div>

              </div>
          </div>
<!--            歌手列表    End -->



      </div>

    </div>
</template>

<script>

    import BScroll from "better-scroll";
    import {mapState} from 'vuex' ;
    import {Toast} from 'vant'
    export default {
        name: "SingerView",
        data: () => ({

            //下拉刷新加载
            refreshLoading : false ,

            singerListTop : 0 ,   // 歌手分类列表距离页面顶部距离
            singerClassificationList:[],
            singerClassification:{    //歌手分类列表数据来源
                type: '0' ,
                area: '-1' ,
                limit :'20' ,
                offset : 0 ,
                hot : true
            },

            loadingShow: true ,
        }),
        methods:{
            goBack(){
                this.$router.go(-1);
            },
           setClassification(option) {
               this.singerClassification.offset = 0 ; // 设置请求偏移值为0，以此保证重第一个开始请求
                let {hot} = this.singerClassification ;
                this.loadingShow = true  ;
               this.singerList.scrollTo(0,0, 0) ;
                if(hot){
                    let type  = option.type || '1' ;
                    let area  = option.area || '7' ;
                    this.singerClassification = {...this.singerClassification,type,area,hot:false};
                    this.requestAxios() ;
                }else{
                    if(option.type){
                        this.singerClassification.type = option.type ;
                    }
                    if(option.area){
                        this.singerClassification.area = option.area ;
                    }
                    this.requestAxios() ;

                }
            },
            requestAxios(){
                //请求歌手分类列表
                let {type,area,limit,offset} = this.singerClassification ;
                this.axios({
                    url: `/artist/list?type=${type}&area=${area}&limit=${limit}&offset=${offset}`,
                    withCredentials: true ,//关键
                }).then(res =>  {
                    this.singerClassificationList = res.data.artists ;
                    this.singerList.refresh(); //重置列表后刷新BScroll
                    this.loadingShow = false ;
                });

            },
            follow(name){

                let item = this.singerClassificationList.find(item => item.name === name );
                console.log(item)
                if(item.followed){
                    this.followAxios(item.id,0);
                    item.followed = false ;

                }else{
                    this.followAxios(item.id,1);
                    item.followed = true ;

                }

            },
            followAxios(id,num){
                // let id = localStorage.getItem('id');
                this.axios({
                    method:'POST',
                    url: `http://localhost:3000/login/cellphone`,
                    withCredentials: true ,//关键
                    data:{
                        phone:this.user.phone,
                        password:this.user.password
                    },
                }).then(res => {
                    console.log(res);
                    this.axios({
                        url : `/follow?id=${id}&t=${num}`,
                        withCredentials : true ,
                    }).then(res => {
                        console.log(res);
                        if(res.data.code){
                            Toast(res.data.followContent ||  res.data.msg);

                        }else{
                            Toast('关注失败');

                        }
                    }).catch(err => {
                        console.log(err);
                        Toast('关注失败');
                    })
                });

            }
        },
        computed :{
            ...mapState({
                songsPlaying : state => state.songsPlaying,
                rotatingDeg : state => state.rotatingDeg,
                user : state => state.user,
            })
        },

        mounted() {


            this.loadingShow = false ;
            //singerList部分设置top值，等于其他元素高度之和
            this.singerListTop  = this.$refs.singerClassification.getBoundingClientRect().height+50 ;
            this.$nextTick(() => {
                //注册歌手列表BScroll事件
                if(!this.singerList){
                    this.singerList = new BScroll(this.$refs.singerList,{
                        probeType :2 ,
                        pullUpLoad:{
                            threshold: 0
                        },
                        click : true ,
                    });
                    this.singerList.on('pullingUp',()=>{

                        if(this.refreshTimer){
                            //清除定时器
                            clearTimeout(this.refreshTimer);
                        }

                        this.refreshLoading = true ;

                        //函数防抖
                        this.refreshTimer = setTimeout(() => {

                            this.singerClassification.offset += Number(this.singerClassification.limit) ;
                            let {offset,hot,type,area,limit} = this.singerClassification ;
                            let url ;
                            if(hot){
                                url = `/top/artists?offset=${offset}&limit=20`
                            } else{
                                url = `/artist/list?type=${type}&area=${area}&limit=${limit}&offset=${offset}`
                            }
                            this.axios({
                                url,
                                withCredentials: true ,//关键
                            }).then(res =>  {

                                //关闭下拉加载标识
                                this.refreshLoading = false ;

                                res.data.artists.forEach(obj => {
                                    this.singerClassificationList.push(obj);
                                });

                                this.singerList.finishPullUp();
                                this.singerList.refresh();
                            });
                        } , 1000)
                    });

                }else{
                    this.singerList.refresh() ;
                }
            });


        },
        beforeRouteEnter(to,from,next){
            //请求热门歌手列表数据
            console.log(to,from,'-----beforeRouterEnter');
            next(vm => {
                vm.axios({
                    url: `/top/artists?offset=0&limit=20`,
                    withCredentials: true ,//关键
                }).then(res =>  {

                    vm.singerClassificationList = res.data.artists ;
                });
            })
        },
        beforeDestroy() {
            this.singerList.destroy();
            this.singerList = null ;

            //清除防抖定时器
            clearTimeout(this.refreshTimer);
        }
    }
</script>

<style scoped lang="scss">
/*Singer公共样式*/
@mixin padding-0-10 {
    padding : 0 10px ;
}

.refresh-loading{
    text-align: center;
}

.singer-wrapper{
    width : 100vw    ;
    height : 100vh ;
    position : fixed;
    top : 0 ;
    z-index : 101 ;
    background-color : #fff ;
}
    .singer-navBar{
        overflow: hidden;

        .top-playing{
            /*flex:  0 0 50px ;*/
            width : 30px ;
            height : 50px ;
            padding : 10px 0 ;

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


    .singer-content {
        width: 100vw;


        .loading {
            position : absolute;
            top : 200px ;
            left : 50% ;
            margin-left : -24px ;
        }

        .singer-classification{


            .area-classification,
            .type-classification    {
                font-size : 13px ;
             @include padding-0-10 ;

                span{
                    display: inline-block;
                    min-width : 50px ;
                    color : rgb(102,102,102);

                    &.active{
                        color : rgb(235,77,68);
                    }
                }
            }

            .singerList-title{
                width : 100vw ;
                font-size : 11px ;
                margin-top : 10px ;
                padding : 0 10px ;
                color : rgb(99,99,99);
                background-color : rgb(248,248,248);
            }
        }

        .singer-list {
            width: 100vw;
            padding: 8px 10px;
            overflow: hidden;
            position: absolute;
            top: 140px;
            bottom: 0;


        }
            .singer-item{
                height: 50px ;
                margin-bottom : 15px ;
                display: flex ;

            }

            .singer-pic{
                flex : 0 0 50px ;
                height : 50px ;
                width : 50px ;
                border-radius: 50% ;
                overflow: hidden;
                margin-right : 10px ;
                img{
                    height : 100% ;
                    width : 100% ;
                }
            }

            .singer-name{
                flex :1 ;
                height : 50px ;
                line-height : 50px ;
                font-size :13px ;
                color : rgb(51,51,52);

                .alias{
                    color : rgb(153,153,153);
                    font-family: '微软雅黑';
                }
            }

            .singer-follow{
                flex : 0 0 50px ;
                text-align: center;
                display: flex;
                align-items: center;

                span{
                    display: inline-block;
                    width : 50px ;
                    height : 20px ;
                    line-height : 20px ;
                    font-size :11px ;

                    border-radius: 20px ;

                    &.follow{
                        color : red ;
                        border : 1px solid red ;
                    }

                    &.followed{
                        color : rgb(153,153,153);
                        border : 1px solid rgb(153,153,153) ;
                    }
                }
            }
        }

</style>