(function(n){function e(e){for(var a,c,u=e[0],o=e[1],d=e[2],s=0,l=[];s<u.length;s++)c=u[s],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&l.push(r[c][0]),r[c]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(n[a]=o[a]);f&&f(e);while(l.length)l.shift()();return i.push.apply(i,d||[]),t()}function t(){for(var n,e=0;e<i.length;e++){for(var t=i[e],a=!0,c=1;c<t.length;c++){var u=t[c];0!==r[u]&&(a=!1)}a&&(i.splice(e--,1),n=o(o.s=t[0]))}return n}var a={},c={app:0},r={app:0},i=[];function u(n){return o.p+"js/"+({}[n]||n)+"."+{"chunk-2d0b6caa":"8419f0bc","chunk-2f965661":"a61ff941","chunk-343ab85c":"2b233d1c","chunk-371b5f1a":"d5cb717a","chunk-37bdb8ee":"89cfdb98","chunk-4106a04f":"c7f9fa4d","chunk-44b51973":"5e7854e3","chunk-4515dd81":"6ddf5ba2","chunk-4de7f01a":"fecef12e","chunk-0398d01a":"a789f819","chunk-31b3593f":"73d6176b","chunk-3d47439c":"e31d6b0a","chunk-41f34f28":"6ba7ef7b","chunk-5ffd08ee":"add5dbc7","chunk-57dba21f":"567a501f","chunk-64401800":"d1f5b0b5","chunk-b493ab86":"0cd64297","chunk-c1d3786c":"0cd957de"}[n]+".js"}function o(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.e=function(n){var e=[],t={"chunk-2f965661":1,"chunk-343ab85c":1,"chunk-371b5f1a":1,"chunk-37bdb8ee":1,"chunk-4106a04f":1,"chunk-44b51973":1,"chunk-4515dd81":1,"chunk-0398d01a":1,"chunk-31b3593f":1,"chunk-3d47439c":1,"chunk-41f34f28":1,"chunk-5ffd08ee":1,"chunk-57dba21f":1,"chunk-64401800":1,"chunk-b493ab86":1,"chunk-c1d3786c":1};c[n]?e.push(c[n]):0!==c[n]&&t[n]&&e.push(c[n]=new Promise((function(e,t){for(var a="css/"+({}[n]||n)+"."+{"chunk-2d0b6caa":"31d6cfe0","chunk-2f965661":"cfb74df5","chunk-343ab85c":"0ca192b8","chunk-371b5f1a":"6fe5f714","chunk-37bdb8ee":"b18d3bbc","chunk-4106a04f":"ea12cbd7","chunk-44b51973":"9b4a407e","chunk-4515dd81":"8ad3e01f","chunk-4de7f01a":"31d6cfe0","chunk-0398d01a":"eb5b1439","chunk-31b3593f":"897955b5","chunk-3d47439c":"2b522444","chunk-41f34f28":"e835478e","chunk-5ffd08ee":"4711b54b","chunk-57dba21f":"8a439d07","chunk-64401800":"7213e242","chunk-b493ab86":"ebf454d0","chunk-c1d3786c":"15aad4c3"}[n]+".css",r=o.p+a,i=document.getElementsByTagName("link"),u=0;u<i.length;u++){var d=i[u],s=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(s===a||s===r))return e()}var l=document.getElementsByTagName("style");for(u=0;u<l.length;u++){d=l[u],s=d.getAttribute("data-href");if(s===a||s===r)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var a=e&&e.target&&e.target.src||r,i=new Error("Loading CSS chunk "+n+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete c[n],f.parentNode.removeChild(f),t(i)},f.href=r;var b=document.getElementsByTagName("head")[0];b.appendChild(f)})).then((function(){c[n]=0})));var a=r[n];if(0!==a)if(a)e.push(a[2]);else{var i=new Promise((function(e,t){a=r[n]=[e,t]}));e.push(a[2]=i);var d,s=document.createElement("script");s.charset="utf-8",s.timeout=120,o.nc&&s.setAttribute("nonce",o.nc),s.src=u(n);var l=new Error;d=function(e){s.onerror=s.onload=null,clearTimeout(f);var t=r[n];if(0!==t){if(t){var a=e&&("load"===e.type?"missing":e.type),c=e&&e.target&&e.target.src;l.message="Loading chunk "+n+" failed.\n("+a+": "+c+")",l.name="ChunkLoadError",l.type=a,l.request=c,t[1](l)}r[n]=void 0}};var f=setTimeout((function(){d({type:"timeout",target:s})}),12e4);s.onerror=s.onload=d,document.head.appendChild(s)}return Promise.all(e)},o.m=n,o.c=a,o.d=function(n,e,t){o.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},o.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},o.t=function(n,e){if(1&e&&(n=o(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var a in n)o.d(t,a,function(e){return n[e]}.bind(null,a));return t},o.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return o.d(e,"a",e),e},o.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},o.p="/",o.oe=function(n){throw console.error(n),n};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],s=d.push.bind(d);d.push=e,d=d.slice();for(var l=0;l<d.length;l++)e(d[l]);var f=s;i.push([0,"chunk-vendors"]),t()})({0:function(n,e,t){n.exports=t("56d7")},"4ba1":function(n,e,t){"use strict";t.d(e,"b",(function(){return a})),t.d(e,"l",(function(){return c})),t.d(e,"j",(function(){return r})),t.d(e,"e",(function(){return i})),t.d(e,"u",(function(){return u})),t.d(e,"r",(function(){return o})),t.d(e,"t",(function(){return d})),t.d(e,"s",(function(){return s})),t.d(e,"q",(function(){return l})),t.d(e,"p",(function(){return f})),t.d(e,"n",(function(){return b})),t.d(e,"o",(function(){return h})),t.d(e,"m",(function(){return p})),t.d(e,"a",(function(){return m})),t.d(e,"g",(function(){return g})),t.d(e,"i",(function(){return k})),t.d(e,"h",(function(){return v})),t.d(e,"k",(function(){return S})),t.d(e,"f",(function(){return O})),t.d(e,"c",(function(){return y})),t.d(e,"d",(function(){return E}));var a="SET_DAILY_RECOMMEND_SONGS",c="SET_SONGS_PLAYING",r="SET_SONGS",i="SET_KEYWORDS",u="SET_VIDEOTITLELISTS",o="SET_VIDEOID",d="SET_VIDEOPLAYINGLOADING",s="SET_VIDEOPLAYINGDATA",l="SET_USER_PHONE",f="SET_USER_PASSWORD",b="SET_USER_ID",h="SET_USER_NAME",p="SET_USER_AVATARURL",m="SET_AUDIO_SRC",g="SET_PLAY",k="SET_ROTATING_DEG",v="SET_ROTATE_TIMER",S="SET_SONGS_LIST",O="SET_LIST_MODE",y="SET_DETAILED_PLAYLIST",E="SET_DETAILED_PLAYLIST_ARR"},"4ee2":function(n,e,t){},"56d7":function(n,e,t){"use strict";t.r(e);t("e260"),t("e6cf"),t("cca6"),t("a79d");var a=t("2b0e"),c=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view"),t("div",{staticClass:"tabbar"}),t("div",{staticClass:"cloud-tabbar"},[t("div",{staticClass:"tabbar"},[t("router-link",{staticClass:"tabbar-item",attrs:{tag:"div",to:"/find"}},[t("div",{staticClass:"tabbar-icon"},[t("span",{staticClass:"icon-find"})]),t("span",{staticClass:"tabbar-text"},[n._v("发现")])]),t("router-link",{staticClass:"tabbar-item",attrs:{tag:"div",to:"/video"}},[t("div",{staticClass:"tabbar-icon"},[t("span",{staticClass:"icon-video"})]),t("span",{staticClass:"tabbar-text"},[n._v("视频")])]),t("router-link",{staticClass:"tabbar-item",attrs:{tag:"div",to:"/music"}},[t("div",{staticClass:"tabbar-icon"},[t("span",{staticClass:"icon-music"})]),t("span",{staticClass:"tabbar-text"},[n._v("我的")])]),t("router-link",{staticClass:"tabbar-item",attrs:{tag:"div",to:"/account"}},[t("div",{staticClass:"tabbar-icon"},[t("span",{staticClass:"icon-my"})]),t("span",{staticClass:"tabbar-text"},[n._v("账号")])])],1)])],1)},r=[],i=t("5530"),u=t("4ba1"),o=t("2f62"),d={data:function(){return{value:"",bannerList:[]}},methods:Object(i["a"])({},Object(o["b"])({setDailyRecommendSongs:u["b"],setSongsPlaying:u["l"]})),computed:Object(i["a"])({},Object(o["c"])({user:"user"})),mounted:function(){localStorage.getItem("login")||this.$router.push("/login")}},s=d,l=(t("5c0b"),t("2877")),f=Object(l["a"])(s,c,r,!1,null,null,null),b=f.exports,h=(t("d3b7"),t("8c4f"));a["default"].use(h["a"]);var p,m=[{path:"/find",name:"Find",component:function(){return Promise.all([t.e("chunk-4de7f01a"),t.e("chunk-31b3593f")]).then(t.bind(null,"3afa"))},children:[{path:"findSongsView",name:"FindSongsView",component:function(){return t.e("chunk-64401800").then(t.bind(null,"ac59"))}}]},{path:"/video",component:function(){return t.e("chunk-b493ab86").then(t.bind(null,"81a8"))},children:[{path:"/video/:id",name:"VideoList",component:function(){return t.e("chunk-c1d3786c").then(t.bind(null,"79a3"))}}]},{path:"/music",name:"Music",component:function(){return Promise.all([t.e("chunk-4de7f01a"),t.e("chunk-3d47439c")]).then(t.bind(null,"5125"))},children:[{path:"managementPlaylistMenu",name:"ManagementPlaylistMenu",component:function(){return t.e("chunk-4515dd81").then(t.bind(null,"cfb3"))}}]},{path:"/village",name:"Village",component:function(){return t.e("chunk-2d0b6caa").then(t.bind(null,"1f54"))}},{path:"/account",name:"Account",component:function(){return t.e("chunk-2f965661").then(t.bind(null,"77be"))}},{path:"/search",name:"Search",component:function(){return t.e("chunk-4106a04f").then(t.bind(null,"de0b"))},children:[{path:"singer",name:"Singer",component:function(){return Promise.all([t.e("chunk-4de7f01a"),t.e("chunk-41f34f28")]).then(t.bind(null,"eb37"))}},{path:"detailsPage",name:"DetailsPage",component:function(){return Promise.all([t.e("chunk-4de7f01a"),t.e("chunk-5ffd08ee")]).then(t.bind(null,"b409"))}}]},{path:"/musicPlaylist",name:"MusicPlaylist",component:function(){return t.e("chunk-371b5f1a").then(t.bind(null,"78e8"))}},{path:"/musicPlaying",name:"MusicPlaying",component:function(){return Promise.all([t.e("chunk-4de7f01a"),t.e("chunk-0398d01a")]).then(t.bind(null,"115c"))}},{path:"/login",name:"Login",component:function(){return t.e("chunk-343ab85c").then(t.bind(null,"2147"))},children:[{path:"phoneLogin",name:"PhoneLogin",component:function(){return t.e("chunk-37bdb8ee").then(t.bind(null,"8c6b"))},children:[{path:"passwordLogin",name:"PasswordLogin",component:function(){return t.e("chunk-57dba21f").then(t.bind(null,"9953"))}},{path:"registered",name:"Registered",component:function(){return t.e("chunk-44b51973").then(t.bind(null,"155c"))}}]}]},{path:"/",redirect:"/find"},{path:"*",redirect:"/find"}],g=new h["a"]({mode:"history",base:"/",routes:m,linkActiveClass:"active"}),k=g,v=(t("b0c0"),t("ade3")),S=(p={},Object(v["a"])(p,u["n"],(function(n,e){n.user.id=e})),Object(v["a"])(p,u["q"],(function(n,e){n.user.phone=e})),Object(v["a"])(p,u["p"],(function(n,e){n.user.password=e})),Object(v["a"])(p,u["o"],(function(n,e){n.user.name=e})),Object(v["a"])(p,u["m"],(function(n,e){n.user.avatarUrl=e})),Object(v["a"])(p,u["b"],(function(n,e){n.dailyRecommendSongs=e})),Object(v["a"])(p,u["l"],(function(n,e){n.songsPlaying.picUrl=e.picUrl||n.songsPlaying.picUrl,n.songsPlaying.id=e.id})),Object(v["a"])(p,u["j"],(function(n,e){n.song=e})),Object(v["a"])(p,u["e"],(function(n,e){n.keywordsObj=e})),Object(v["a"])(p,u["u"],(function(n,e){n.videoTitleLists=e})),Object(v["a"])(p,u["r"],(function(n,e){n.videoId=e})),Object(v["a"])(p,u["s"],(function(n,e){n.videoPlayingData=e})),Object(v["a"])(p,u["t"],(function(n,e){n.videoPlayingLoading=e})),Object(v["a"])(p,u["a"],(function(n,e){n.audio.src=e})),Object(v["a"])(p,u["g"],(function(n,e){n.play=e})),Object(v["a"])(p,u["i"],(function(n,e){n.rotatingDeg=e})),Object(v["a"])(p,u["k"],(function(n,e){n.songsList=JSON.parse(JSON.stringify(e))})),Object(v["a"])(p,u["f"],(function(n,e){n.listMode=e})),Object(v["a"])(p,u["c"],(function(n,e){n.detailedPlaylist=JSON.parse(JSON.stringify(e))})),Object(v["a"])(p,u["d"],(function(n,e){n.detailedPlaylistArr=JSON.parse(JSON.stringify(e))})),Object(v["a"])(p,u["h"],(function(n){clearInterval(n.rotateTimer),n.rotateTimer=setInterval((function(){n.rotatingDeg+=.18,n.rotatingDeg>360&&(n.rotatingDeg=0)}),10)})),p);a["default"].use(o["a"]);var O=new o["a"].Store({state:{user:{phone:"15920384501",password:"aww1030.",id:"",avatarUrl:"",name:""},dailyRecommendSongs:[],songsPlaying:{id:"",picUrl:""},song:{},audio:new Audio,keywordsObj:{},searchKeyword:"",videoTitleLists:[],videoId:"",videoPlayingLoading:!1,videoPlayingData:{},play:!1,rotatingDeg:0,rotateTimer:null,songsList:[],detailedPlaylist:{},detailedPlaylistArr:[],listMode:1},getters:{},mutations:S,actions:{},modules:{}}),y=(t("4ee2"),t("6672"),t("b970")),E=(t("157a"),t("bc3a")),_=t.n(E),T=t("a7fe"),P=t.n(T),j=t("7212"),L=t.n(j);t("a7a3");a["default"].use(y["a"]),a["default"].use(P.a,_.a),_.a.defaults.baseURL="http://localhost:3000/",_.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",a["default"].use(L.a),a["default"].config.productionTip=!1,new a["default"]({router:k,store:O,render:function(n){return n(b)}}).$mount("#app")},"5c0b":function(n,e,t){"use strict";var a=t("9c0c"),c=t.n(a);c.a},6672:function(n,e,t){},"9c0c":function(n,e,t){}});
//# sourceMappingURL=app.f7d80892.js.map