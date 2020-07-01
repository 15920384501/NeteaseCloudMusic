<template>
    <div class="ManagementPlaylistMenu-wrapper">
        <div class="ManagementPlaylistMenu-top">
            <div v-if="showSelectAll" class="top-all" @click="onChooseAll">全选</div>
            <div v-else class="top-all" @click="onNotChooseAll">取消全选</div>
            管理菜单
            <div class="top-finish" @click="$router.go(-1)">完成</div>
        </div>
        <div class="ManagementPlaylistMenu-list">
            <div class="ManagementPlaylistMenu-item" v-for="(item,index) in showPlaylist" :key="item.id">
                <div class="item-checkbox">
                        <van-checkbox v-model="checkedList[index]" />
                </div>
                <div class="item-pic">
                    <img :src="`${item.coverImgUrl}?param=200y200`" alt="">
                </div>

                <div class="item-txt">
                    <p class="item-playlistName">{{item.name}}</p>
                    <p class="item-playlistCount">{{item.trackCount}}首</p>
                </div>

            </div>

        </div>
        <div class="deleteBtn" :class="{'can' : isChoose}" @click="deletePlaylist" >
            <span class="icon-delete"></span>删除
        </div>
      
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    export default {
        name: "TheManagementMenu",
        data: () => ({
            checkedList:[false,false,false],
            showSelectAll : true ,
        }),
        methods:{
            onChooseAll(){
                let list = new Array() ;
                for(let k = 0 ; k < this.checkedList.length ; k++){
                    list.push(true) ;
                }
                this.checkedList = list ;
                this.showSelectAll = false ;
            },
            onNotChooseAll(){
                for(let k = 0 ; k < this.checkedList.length ; k++){
                    this.checkedList[k] = false ;
                }
                this.showSelectAll = true  ;
            },
            deletePlaylist(){
                console.log(this.whichChoose);
                Dialog.confirm({
                    title: '确认删除歌单？',
                }).then(() => {
                        for(let y in this.whichChoose){
                            this.axios({
                                url:`/playlist/delete?id=${this.showPlaylist[this.whichChoose[y]].id}`,
                                withCredentials : true ,
                            }).then(res => {
                                console.log(res) ;
                                this.$emit('deleteItem',this.showPlaylist[this.whichChoose[y]].id);
                                this.checkedList = this.checkedList.filter(item => item === false) ;
                                console.log(this.checkedList,'checkedList') ;

                            })
                        }
                    }).catch(err => {
                        console.log(err)
                })
            }
        },
        computed:{
            isChoose(){
                return this.checkedList.filter(item => item === true ).length > 0 ;
            },
            whichChoose(){
                return this.checkedList.map((item,index) => {
                    if(item){
                        return index ;
                    }

                }).filter(item => item !=undefined) ;
            },
        },
        props:{
            showPlaylist:{
                typeof : Array,
            }
        },
        watch:{
            showPlaylist:{
                handler(newVal){
                    this.showPlaylist = newVal ;
                },
                immediate :true,
                deep:true
            }
        },
        mounted() {
            if(this.checkedList.length < this.showPlaylist.length){
                let length = this.showPlaylist.length-this.checkedList.length ;
                for(let i = 0 ; i <  length ; i++){
                    this.checkedList.push(false);
                }
            }
            console.log(this.showPlaylist)


        }
    }
</script>

<style lang="scss" scoped>
.ManagementPlaylistMenu-wrapper{
    width : 100vw ;
    height :100vh ;
    position : fixed ;
    top : 0 ;
    z-index: 100;
    background-color : #fff ;

    .ManagementPlaylistMenu-top{
        height : 50px ;
        line-height : 50px ;
        text-align: center;
        padding : 0 14px ;
        font-size : 16px ;
        font-weight : 700 ;
        position : relative;
        .top-all{
            position : absolute;
            left : 12px ;
            top : 0 ;
            font-weight : 400 ;
        }

        .top-finish{
            position : absolute;
            right : 12px ;
            top : 0 ;
            font-weight : 400 ;
        }
    }

    .ManagementPlaylistMenu-list{
        width : 100vw ;
        padding : 0 14px ;

        .ManagementPlaylistMenu-item{
            display: flex;
            margin-bottom : 10px ;

            .item-checkbox{
                flex: 0 0 40px ;
                display: flex;
                align-items: center;
            }

            .item-pic{
                flex:  0 0 50px ;
                height : 50px ;
                background-color : #ccc ;
                border-radius: 5px ;
                overflow: hidden;

                img{
                    width : 100% ;
                    height : 100% ;
                }
            }

            .item-txt{
                flex : 1  ;
                margin-left : 10px ;

                .item-playlistName{
                    font-size: 14px ;
                }

                .item-playlistCount{
                    font-size : 12px ;
                    color : rgb(153,153,153);
                }
            }
        }
    }

    .deleteBtn{
        width : 100vw ;
        height : 50px ;
        line-height : 50px ;
        text-align: center;
        font-size : 16px ;
        color : rgba(7,17,27,.2) ;
        border-top : 1px solid rgba(7,17,27,.1);
        position : absolute;
        bottom : 0 ;

        pointer-events: none;

        span{
            display: inline-block;
            vertical-align: middle;
            font-size : 22px ;
            margin-right : 12px ;
        }

        &.can{
            color : #333;
            pointer-events: auto;
        }
    }
}
</style>