(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c1d3786c"],{"0462":function(a,t,i){"use strict";var n=i("d93c"),e=i.n(n);e.a},"79a3":function(a,t,i){"use strict";i.r(t);var n=function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",a._l(a.videoPlayingData.datas,(function(t){return i("div",{key:t.data.vid,ref:"videoList",refInFor:!0,staticClass:"video-item"},[i("div",{staticClass:"video-playing"},[i("div",{on:{click:function(i){return a.onVideoPlay(t.data.vid)}}},[a.playingId!==t.data.vid?i("div",{staticClass:"pic"},[a._m(0,!0),i("div",{staticClass:"video-durationms"},[i("span",{staticClass:"icon-2"}),a._v(a._s(a._f("durationmsFilter")(t.data.durationms?t.data.durationms:t.data.duration)))]),i("span",{staticClass:"video-playCount"},[i("i",{staticClass:"icon-play3"}),a._v(" "+a._s(a._f("playCountFilter")(t.data.playCount?t.data.playCount:t.data.playTime)))]),i("img",{attrs:{src:t.data.coverUrl,alt:""}})]):i("div",{staticClass:"video-onPlaying"},[i("video",{attrs:{src:a.playingSrc,autoplay:"",controls:""}})])])]),i("div",{staticClass:"video-title"},[i("span",{staticClass:"title"},[a._v(" "+a._s(t.data.title?t.data.title:t.data.name)+" ")])]),i("div",{staticClass:"video-author"},[i("div",{staticClass:"author"},[i("img",{staticClass:"author-pic",attrs:{src:t.data.creator?t.data.creator.avatarUrl:t.data.artists[0].img1v1Url,alt:""}}),i("span",{staticClass:"author-name"},[a._v(a._s(t.data.creator?t.data.creator.nickname:t.data.artists[0].name))])]),i("div",{staticClass:"video-operation"},[i("div",{staticClass:"video-like"},[i("span",{staticClass:"icon-like "}),i("small",[a._v(a._s(t.data.praisedCount?t.data.praisedCount:t.data.likeCount))])]),i("div",{staticClass:"video-comment"},[i("span",{staticClass:"icon-comment "}),i("small",[a._v(a._s(t.data.commentCount))])]),a._m(1,!0)])])])})),0)},e=[function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"video-play"},[i("span",{staticClass:"icon-play3"})])},function(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"video-more"},[i("span",{staticClass:"icon-more "})])}],s=(i("99af"),i("5530")),o=i("2f62"),r={name:"videoList",data:function(){return{playingId:0,playingIndex:0,playingSrc:""}},methods:{onVideoPlay:function(a){var t=this;this.axios({url:"/video/url?id=".concat(a),withCredentials:!0}).then((function(i){t.playingId=a,t.playingSrc=i.data.urls[0]["url"]}))}},computed:Object(s["a"])({},Object(o["c"])({videoId:function(a){return a.videoId},videoPlayingLoading:function(a){return a.videoPlayingLoading},videoPlayingData:function(a){return a.videoPlayingData}})),filters:{playCountFilter:function(a){if(a>1e5){var t=Math.floor(a/1e5);return t}return a},durationmsFilter:function(a){var t=Math.floor(a/1e3/60),i=Math.floor(a/1e3%60);return t=t<10?"0"+t:t,i=i<10?"0"+i:i,"".concat(t,":").concat(i)}}},c=r,d=(i("0462"),i("2877")),l=Object(d["a"])(c,n,e,!1,null,"3fe5ecc4",null);t["default"]=l.exports},"99af":function(a,t,i){"use strict";var n=i("23e7"),e=i("d039"),s=i("e8b5"),o=i("861d"),r=i("7b0b"),c=i("50c4"),d=i("8418"),l=i("65f0"),u=i("1dde"),v=i("b622"),f=i("2d00"),p=v("isConcatSpreadable"),m=9007199254740991,C="Maximum allowed index exceeded",y=f>=51||!e((function(){var a=[];return a[p]=!1,a.concat()[0]!==a})),g=u("concat"),h=function(a){if(!o(a))return!1;var t=a[p];return void 0!==t?!!t:s(a)},_=!y||!g;n({target:"Array",proto:!0,forced:_},{concat:function(a){var t,i,n,e,s,o=r(this),u=l(o,0),v=0;for(t=-1,n=arguments.length;t<n;t++)if(s=-1===t?o:arguments[t],h(s)){if(e=c(s.length),v+e>m)throw TypeError(C);for(i=0;i<e;i++,v++)i in s&&d(u,v,s[i])}else{if(v>=m)throw TypeError(C);d(u,v++,s)}return u.length=v,u}})},d93c:function(a,t,i){}}]);
//# sourceMappingURL=chunk-c1d3786c.0cd957de.js.map