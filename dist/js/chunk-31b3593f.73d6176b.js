(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31b3593f"],{"14ac":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"cloud-top"},[e("div",{staticClass:"top-left"},[t._m(0),e("van-search",{attrs:{placeholder:t.keywordsObj.showKeyword},on:{focus:t.search},model:{value:t.keywords,callback:function(s){t.keywords=s},expression:"keywords"}})],1),t.songsPlaying.picUrl?e("div",{staticClass:"top-playing"},[e("div",{staticClass:"myMusic",on:{click:t.intoMusicPlaying}},[e("img",{style:{transform:"rotate("+t.rotatingDeg+"deg)"},attrs:{src:t.songsPlaying.picUrl,alt:""}})])]):t._e()])])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"top-sound"},[e("span",{staticClass:"icon-3"})])}],n=e("5530"),o=e("2f62"),l={name:"Search",data:function(){return{keywords:""}},methods:{intoMusicPlaying:function(){this.$router.push({name:"MusicPlaying"})},search:function(){this.$router.push({name:"Search",params:this.keywordsObj})},rotating:function(){var t=this;clearInterval(this.rotatingTimer),this.rotatingTimer=setInterval((function(){t.setRotatingDeg(t.rotatingDeg+.18),t.rotatingDeg>360&&t.setRotatingDeg(0),console.log(t.rotatingDeg)}),10)}},computed:Object(n["a"])({},Object(o["c"])({songsPlaying:function(t){return t.songsPlaying},keywordsObj:function(t){return t.keywordsObj},rotatingDeg:function(t){return t.rotatingDeg}})),mounted:function(){}},c=l,r=(e("8393"),e("2877")),d=Object(r["a"])(c,a,i,!1,null,"665bc7ee",null);s["a"]=d.exports},"3afa":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"find-wrapper"},[e("div",{staticClass:"wrapper-top"}),e("searchBar"),e("div",{staticClass:"find-wrapper"},[e("div",{staticClass:"cloud-swiper"},[e("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e3,"indicator-color":"white"}},t._l(t.bannerList,(function(s){return e("van-swipe-item",{key:s.pic},[e("div",{staticClass:"swipe"},[e("img",{attrs:{slot:"default",src:s.pic,alt:""},slot:"default"}),e("span",{staticClass:"swipe-text",class:s.titleColor},[t._v(t._s(s.typeTitle))])])])})),1)],1),t._m(0),e("div",{staticClass:"cloud-RecommendPlaylist"},[t._m(1),e("div",{ref:"scrollWrapper",staticClass:"RecommendPlaylist-BScroll"},[e("ul",{style:{width:116*t.dailyRecommendSongs.length+"px"}},t._l(t.dailyRecommendSongs,(function(s){return e("li",{key:s.picUrl,staticClass:"playlist-item",on:{click:function(e){return t.intoFindSongsView(s)}}},[e("div",{staticClass:"playlist-pic",style:{background:"url("+s.picUrl+"?param=106y106) 0 0 / 106px 106px no-repeat "}},[e("span",{directives:[{name:"show",rawName:"v-show",value:"猜你喜欢"===s.copywriter,expression:"item.copywriter === '猜你喜欢'"}],staticClass:"ifLike"},[t._v(" "+t._s(s.copywriter))])]),e("div",{staticClass:"playlist-txt"},[t._v(" "+t._s(s.name)+" ")])])})),0)])]),e("div",{staticClass:"cloud-new"},[e("div",{staticClass:"new-top"},[e("p",[t._v(t._s(t._f("nowTime")(new Date)))]),e("h4",[e("span",{staticClass:"newSong",class:{toggleNew:!t.toggleNew},on:{click:function(s){s.preventDefault(),t.toggleNew=!0}}},[t._v("新歌")]),e("span",{staticClass:"newEst",class:{toggleNew:t.toggleNew},on:{click:function(s){s.preventDefault(),t.toggleNew=!1}}},[t._v("新碟")])]),e("button",{staticClass:"new-btn"},[t._v("更多新歌")])]),e("div",{key:"song",staticClass:"new newSongs"},[[e("div",{directives:[{name:"swiper",rawName:"v-swiper:newSwiper",value:t.newSwiperOption,expression:"newSwiperOption",arg:"newSwiper"}]},[e("div",{staticClass:"swiper-wrapper"},t._l(t.showNewSongs,(function(s,a){return e("div",{key:a,staticClass:"swiper-slide"},[e("ul",{staticClass:"swiper-item"},t._l(s,(function(s){return e("li",{key:s.picUrl,staticClass:"new-item"},[e("div",{staticClass:"newSong-icon",style:{background:"url("+s.picUrl+"?param=54y54) 0 0 / 54px 54px no-repeat"}}),e("div",{staticClass:"newSong-right"},[e("p",{staticClass:"newSong-title"},[e("span",{staticClass:"newSong-name"},[t._v(" "+t._s(s.name)+" ")]),e("span",{directives:[{name:"show",rawName:"v-show",value:t.toggleNew,expression:"toggleNew"}],staticClass:"newSong-artist"},[t._v(" - "+t._s(t.toggleNew?s.song.artists[0].name:null)+" ")])]),e("p",{staticClass:"newSong-describe"},[e("span",{directives:[{name:"show",rawName:"v-show",value:t.toggleNew,expression:"toggleNew"}],staticClass:"SQ"},[t._v("SQ")]),t._v(" "+t._s(t.toggleNew?" 终于回归trance了 吹爆阿明！":s.company)+" ")])]),t.toggleNew?e("div",{staticClass:"newSong-play",style:{border:t.songsPlaying.id==s.song.id?"0":"1px solid rgba(153,153,153,.5)"}},[e("span",{directives:[{name:"show",rawName:"v-show",value:t.songsPlaying.id!=s.song.id,expression:"songsPlaying.id != v.song.id"}],staticClass:"icon-play3",on:{click:function(e){return t.musicPlaying(s)}}}),e("span",{directives:[{name:"show",rawName:"v-show",value:t.songsPlaying.id==s.song.id,expression:"songsPlaying.id == v.song.id"}],staticClass:"icon-uniE911 play",on:{click:function(e){return t.musicStopPlaying(s)}}})]):t._e()])})),0)])})),0)])]],2)])]),e("router-view")],1)},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"cloud-nav"},[e("div",{staticClass:"nav-item"},[e("span",{staticClass:"nav-icon"},[e("i",{staticClass:"icon-1"})]),e("span",{staticClass:"nav-text"},[t._v("每日推荐")])]),e("div",{staticClass:"nav-item"},[e("span",{staticClass:"nav-icon"},[e("i",{staticClass:"icon-4"})]),e("span",{staticClass:"nav-text"},[t._v("歌单")])]),e("div",{staticClass:"nav-item"},[e("span",{staticClass:"nav-icon"},[e("i",{staticClass:"icon-2"})]),e("span",{staticClass:"nav-text"},[t._v("排行榜")])]),e("div",{staticClass:"nav-item"},[e("span",{staticClass:"nav-icon"},[e("i",{staticClass:"icon-5"})]),e("span",{staticClass:"nav-text"},[t._v("电台")])]),e("div",{staticClass:"nav-item"},[e("span",{staticClass:"nav-icon"},[e("i",{staticClass:"icon-uniE90A"})]),e("span",{staticClass:"nav-text"},[t._v("直播")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"RecommendPlaylist-top"},[e("p",[t._v("推荐歌单")]),e("h4",[t._v("为你精挑细选")]),e("button",{staticClass:"RecommendPlaylist-btn"},[t._v("查看更多")])])}],n=(e("99af"),e("5530")),o=e("2f62"),l=e("4ba1"),c=e("14ac"),r=e("1fba"),d={name:"Find",data:function(){return{loading:!1,keywords:{},bannerList:[],recommendSongLists:[],newSwiperOption:{slidesPerView:"auto",click:!0},newSongs:[],newEst:[],toggleNew:!0}},methods:Object(n["a"])({},Object(o["b"])({setSongsPlaying:l["l"],setKeywords:l["e"],setDailyRecommendSongs:l["b"],setUserPhone:l["q"],setUserPassword:l["p"],setUserName:l["o"],setUserAvatarUrl:l["m"],setUserId:l["n"],setAudioSrc:l["a"],setSongsList:l["k"],setListMode:l["f"],setPlay:l["g"],setDetailedPlaylist:l["c"],setDetailedPlaylistArr:l["d"]}),{intoFindSongsView:function(t){var s=this;console.log(t);var e=t.id;this.axios({url:"playlist/detail?id=".concat(e),withCredentials:!0}).then((function(t){s.setDetailedPlaylist(t.data.playlist),s.setDetailedPlaylistArr(t.data.playlist.tracks)})),this.setUserName(t.creator.nickname),this.setUserAvatarUrl(t.creator.avatarUrl),this.$router.push({name:"FindSongsView"})},musicPlaying:function(t){var s=this;console.log(t,"新歌");var e=t.song.id;if(this.songsPlaying.id===e)return!0!==this.play&&(this.setPlay(!0),this.audio.play()),void this.$router.push({name:"MusicPlaying"});this.axios.get("/check/music?id=".concat(e)).then((function(a){!0===a.data.success?s.axios.get("/song/url?id=".concat(e)).then((function(a){s.setSongsPlaying({id:e,picUrl:t.picUrl}),s.setAudioSrc(a.data.data[0].url),s.setPlay(!0),s.audio.play(),s.setSongsList(s.newSongs),s.setListMode(2)})):console.log("该歌曲没有版权，无法播放")}))},musicStopPlaying:function(){this.setPlay(!0),this.audio.play(),this.$router.push({name:"MusicPlaying"})}}),components:{searchBar:c["a"]},filters:{nowTime:function(t){var s=t.getMonth()+1,e=t.getDate();return"".concat(s,"月").concat(e,"日")}},computed:Object(n["a"])({},Object(o["c"])(["dailyRecommendSongs","songsPlaying","user","audio","songsList","play"]),{showNewSongs:function(){var t=[],s=[];if(this.toggleNew)for(var e=0;e<this.newSongs.length;e++)s.push(this.newSongs[e]),(e+1)%3==0&&(t.push(s),s=[]);else for(var a=0;a<this.newEst.length;a++)s.push(this.newEst[a]),(a+1)%3==0&&(t.push(s),s=[]);return t}}),mounted:function(){var t=this;this.setUserPhone(localStorage.getItem("phone")),this.setUserPassword(localStorage.getItem("password")),this.setUserId(localStorage.getItem("id")),console.log(this.user);var s=this.axios.CancelToken;this.loading=!0,this.axios({method:"POST",url:"http://localhost:3000/login/cellphone",withCredentials:!0,data:{phone:this.user.phone,password:this.user.password},cancelToken:new s((function(s){t.axiosCancel=s}))}).then((function(s){t.loading=!1,console.log(s,"----登录成功"),t.axios({url:"http://localhost:3000/recommend/resource?timestamp=".concat((new Date).getTime()),withCredentials:!0}).then((function(s){t.setDailyRecommendSongs(s.data.recommend)})).catch((function(t){console.log(t)})),t.songsPlaying.id||(console.log(t.user,"user"),t.axios({url:"/user/record?uid=".concat(t.user.id,"&type=1"),withCredentials:!0}).then((function(s){if(console.log(s,"播放记录"),t.setSongsList(s.data.weekData),s.data.weekData[0]){var e=s.data.weekData[0].song.al.picUrl,a=s.data.weekData[0].song.id;t.setSongsPlaying({picUrl:e,id:a}),t.axios.get("/check/music?id=".concat(a)).then((function(s){!0===s.data.success?t.axios.get("/song/url?id=".concat(a)).then((function(s){t.setAudioSrc(s.data.data[0].url)})):console.log("该歌曲没有版权，无法播放")}))}})))})),this.axios.get("http://localhost:3000/banner?type=2").then((function(s){t.bannerList=s.data.banners})),this.axios({url:"http://localhost:3000/personalized/newsong",withCredentials:!0}).then((function(s){t.newSongs=s.data.result})),this.axios({url:"http://localhost:3000/album/newest    ",withCredentials:!0}).then((function(s){t.newEst=s.data.albums})),this.axios({url:"http://localhost:3000/search/default",withCredentials:!0}).then((function(s){t.setKeywords(s.data.data)})),this.$nextTick((function(){t.recommendScroll?t.recommendScroll.refresh():t.recommendScroll=new r["a"](t.$refs.scrollWrapper,{click:!0,scrollX:!0,probeType:2})}))},beforeDestroy:function(){this.recommendScroll.destroy(),this.recommendScroll=null,this.loading&&this.axiosCancel()}},u=d,g=(e("c013"),e("2877")),p=Object(g["a"])(u,a,i,!1,null,"4616a907",null);s["default"]=p.exports},8393:function(t,s,e){"use strict";var a=e("a4f6"),i=e.n(a);i.a},a4f6:function(t,s,e){},c013:function(t,s,e){"use strict";var a=e("e8bb"),i=e.n(a);i.a},e8bb:function(t,s,e){}}]);
//# sourceMappingURL=chunk-31b3593f.73d6176b.js.map