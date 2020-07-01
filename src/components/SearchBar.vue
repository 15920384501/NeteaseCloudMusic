<template>
<div>
    <div class="cloud-top">
        <div class="top-left">
            <div class="top-sound"><span class="icon-3"></span></div>
            <van-search @focus="search" v-model="keywords" :placeholder="keywordsObj.showKeyword" />
        </div>
        <div v-if="songsPlaying.picUrl" class="top-playing">
            <div @click="intoMusicPlaying" class="myMusic">
                <img :style="{'transform':`rotate(${rotatingDeg}deg)`}"  :src="songsPlaying.picUrl" alt="">
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "Search",
        data:() => ({
            keywords:'',
        }),
        methods:{
            intoMusicPlaying(){
                this.$router.push({name:'MusicPlaying'});
            },
            search(){
                this.$router.push({name : 'Search',params:this.keywordsObj});
            },
            rotating(){

                clearInterval(this.rotatingTimer);
                this.rotatingTimer =  setInterval(() => {
                    this.setRotatingDeg(this.rotatingDeg + 0.18);
                    // this.rotatingDeg += 0.18 ;
                    if(this.rotatingDeg > 360){
                        // this.rotatingDeg = 0 ;
                        this.setRotatingDeg(0);
                    }
                    console.log(this.rotatingDeg)
                },10);
            }
        },
        computed:{
            ...mapState({
                songsPlaying : state => state.songsPlaying,
                keywordsObj : state => state.keywordsObj  ,
                rotatingDeg : state => state.rotatingDeg,
            }),

        },
        mounted() {

        }

    }
</script>

<style scoped lang="scss">
    .cloud-top{
        width : 100vw ;
        height : 50px ;
        background-color : #fff ;
        display: flex;
        position : fixed ;
        top : 0 ;
        z-index  : 50 ;
        .top-left{
            flex : 1 ;
            display: flex;

            .top-sound{
                flex : 0 0 40px ;
                padding : 12px 0 12px 14px;
                /*line-height : 50px ;*/
                font-size : 26px ;
                color : #000000;
            }

            .van-search{
                flex : 1 ;
                padding : 0  12px ;
                background-color : transparent ;
                border-radius: 20px ;


                .van-search__content{
                    border-radius: 20px;
                    background-color : rgb(247,247,247);
                }
            }
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
</style>