<template>
    <div class="findSongs-wrapper">
        <musicPlaylist></musicPlaylist>
    </div>
</template>

<script>
    import musicPlaylist from "../music/musicPlaylist";
    export default {
        name: "FindSongsList",
        components:{
            musicPlaylist
        }
    }
</script>

<style scoped>
.findSongs-wrapper{
    position : absolute;
    top : 0 ;
}
</style>