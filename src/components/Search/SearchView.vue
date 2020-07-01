<template>
   <transition tag="div" name="search">
       <div class="searchView">
           <div class="searchView-top">
               <div class="search">
                   <form action="/">
                       <van-search
                               v-model="keyword"
                               show-action
                               :placeholder="this.$route.params.showKeyword || '请输入你想要的'"
                               @cancel="backFindView"
                               @input="onSearchKeyword"
                       />
                   </form>
               </div>
               <div class="singer" @click="enterSingerView">
                   <span class="icon-singer" ><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
               </div>
           </div>

<!--           搜索结果     START-->
           <div v-show="keyword " class="theSearchResultsView">
               <div @click="intoSearchResultsPage(keyword)" class="searchKeyword">
                    <span>搜索</span>“{{keyword}}”
               </div>
               <div @click="intoSearchResultsPage(item.keyword)" class="recommendSearchKeyword-item" v-for="(item,index) in recommendKeywordLists" :key="index">

                   <div class="search-icon">
                       <van-icon name="search" color="rgb(174,175,178)" size="16px"/>
                   </div>
                   <div class="recommendSearch-txt">
                       {{item.keyword}}
                   </div>
               </div>
           </div>
<!--           搜索结果     END-->

<!--           搜索页面书主要内容-->
            <div class="searchContent">
                <div class="search-hotList">
                    <p class="hotList-title">热搜榜</p>
                    <div class="hotList">
                        <ul>
                            <li @click="intoSearchResultsPage(item.searchWord)" v-for="(item,i) in hotList" :key="item.score">
                                <div class="hotList-left" :class="{best:(i+1)<=4}">
                                    {{i+1}}
                                </div>
                                <div class="hotList-right">
                                    <p class="hotList-name" :class="{best:(i+1)<=4}">
                                        {{item.searchWord}}

                                        <img class="hot-icon" :src="item.iconUrl" alt="" :v-if="item.iconUrl">

                                    </p>
                                    <p class="hotList-describe">{{item.content}}</p>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
<!--           搜索页面书主要内容     End-->


              <transition name="singer">
                  <router-view></router-view>
              </transition>

       </div>
   </transition>
</template>

<script>
    export default {
        name: "SearchView",
        data:() => ({
            keyword : '',
            hotList : [],
            recommendKeywordLists:[],
        }),
        methods:{
            intoSearchResultsPage(keyword){
                console.log(keyword)
                this.$router.push({name : 'DetailsPage',query:{keyword}});
            },
            backFindView(){
                this.$router.go(-1);

            },

            enterSingerView(){
               this.$router.push({name:'Singer'}) ;
            },
            onSearchKeyword(){
              if(this.keyword.length > 0){
                  let keyword = encodeURIComponent(this.keyword);
                  this.axios({
                      url :`/search/suggest?keywords=${keyword}&type=mobile`,
                      withCredentials : true ,
                  }).then(res => {
                      console.log(res);
                      if(res.data.result){
                          this.recommendKeywordLists = res.data.result.allMatch ;
                      }else{
                          this.recommendKeywordLists = [];
                      }

                  })
              }

            }
        },
        mounted() {

            this.keyword = this.$route.params.relKeyword ;

            this.axios({
                url: `http://localhost:3000/search/hot/detail`,
                withCredentials: true //关键
            }).then(res =>  {
                this.hotList = res.data.data  ;
            });
        }
    }
</script>

<style scoped lang="scss">
    .singer-enter,
    .singer-leave-to{
        transform: translateX(100%);
    }
    .singer-enter-to,
    .singer-leave{
        transform: translateX(0);
    }
    .singer-enter-active,
    .singer-leave-active{
        transition : all 0.3s ;
    }

    .search-enter,
    .search-leave-to{
        opacity : 0 ;
    }
    .search-enter-to,
    .search-leave{
       opacity : 1 ;
    }
    .search-enter-active,
    .search-leave-active{
        transition : all 0.2s linear;
    }

.searchView{
    width : 100vw ;
    height : 100vh ;
    position : fixed;
    top : 0 ;
    background-color : #fff;
    z-index :100 ;

    .theSearchResultsView{
        position : absolute;
        top : 50px ;
        left : 0 ;
        width : 100vw ;
        height : calc(100vh - 54px ) ;
        background-color : #fff ;
        z-index : 50 ;

        .searchKeyword{
            height : 40px ;
            line-height : 40px ;
            margin-left  : 12px ;
            padding-left :4px ;
            font-size : 13px ;
            color : rgb(90,124,171);
            border-bottom : 1px solid rgba(7,17,27,0.1);

            span{
                margin-right : 10px ;
            }
        }

        .recommendSearchKeyword-item{
            margin-left : 12px ;
            height : 40px ;
            line-height : 40px ;
            display: flex;
            font-size : 13px ;

            .search-icon{
                flex : 0 0 30px ;
                display: flex;
               justify-content: center;
                align-items: center;
            }

            .recommendSearch-txt{
                flex : 1 ;
                padding-left : 4px ;
                border-bottom : 1px solid rgba(0,0,0,0.1);
            }
        }
    }

    .searchView-top{
        height : 54px ;
        width : 100vw ;
        display: flex ;

       .search{
           flex : 1 ;

           .van-search__content{
               border-radius : 20px ;
           }

           .van-search__action{
               font-weight : 700 ;
               font-size : 16px ;
           }
       }

        .singer{
            flex : 0 0 50px ;
            padding :14px 10px 10px ;


            span{
                font-size : 26px ;
            }
        }
    }

    /*搜索页面主要内容样式*/
    .searchContent{
        position : fixed;
        top: 50px;
    }

    .search-hotList{
        padding : 10px ;
        overflow: hidden;

        .hotList-title{
            font-size : 13px ;
            font-weight : 700 ;
        }

        .hotList{
            width : 100% ;

            overflow: hidden;

            >ul {
                width : 100% ;
                overflow: hidden;

                li{
                    width : 50% ;
                    float : left ;
                    height : 40px ;
                    display: flex;
                    overflow: hidden;
                    margin-bottom : 15px ;
                }
            }
        }
        .hotList-left{
            width : 40px ;
            color : rgb(153,153,153) ;
            flex : 0 0 30px;
            text-align: center;
            line-height : 40px ;
            font-weight : 700 ;

            &.best{
                color : rgb(235,77,68);
            }
        }

        .hotList-right{
           line-height : 20px ;
            font-family: '微软雅黑';


            .hotList-name{
                font-size : 13px ;

                .hot-icon{
                    height : 12px ;
                    vertical-align: middle;
                }

                &.best{
                    font-weight : 700 ;
                }
            }

            .hotList-describe{
                font-size : 10px ;
                color : rgb(153,153,153);
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>

