import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
    //发现页面
    {
      path:'/find',
      name:'Find',
      component : () => import('../views/Find'),
      children: [
        {path:'findSongsView',name:'FindSongsView',component : () => import('../components/Find/FindSongsView')}
      ],
    },
      //视频页面
    {
      path:'/video',
      component : () => import('../views/Video'),
      children:[
        {path:'/video/:id',name:"VideoList",component:()=>import('../components/Video/videoList')}
      ]
    },
      //我的音乐页面
    {
      path:'/music',
      name:'Music',
      component : () => import('../views/Music'),
      children: [
        {path : 'managementPlaylistMenu',name:'ManagementPlaylistMenu',component : () => import('../components/music/ManagementPlaylistMenu')},
      ],
    },
      //云村页面
    {path:'/village',name:'Village',component : () => import('../views/Village')},
      //我的账号页面
    {path:'/account',name:'Account',component : () => import('../views/Account')},
      //搜索页面
    {path:'/search',
      name:'Search',
      component : () => import('../components/Search/SearchView'),
      children:[
        {path : 'singer',name : 'Singer' , component:() => import('../components/Search/SingerView')},
        {path : 'detailsPage',name : 'DetailsPage' , component:() => import('../components/Search/DetailsPage')},
      ]
    },
      //歌单页面
    {path : '/musicPlaylist',name:'MusicPlaylist',component : () => import('../components/music/musicPlaylist')},
      //页面播放页面
    {path:'/musicPlaying',name:'MusicPlaying',component: () => import('../components/MusicPlaying')},
      //登录页面
    {
      path:'/login',
      name:'Login',
      component : () => import('../components/login/LoginPage'),
      children: [
        {
          path : 'phoneLogin' , name : 'PhoneLogin' ,component : () => import('../components/login/PhoneLogin'),
          children:[
            {path : 'passwordLogin',name:'PasswordLogin',component: () => import('../components/login/PasswordLogin')},
            {path : 'registered', name : 'Registered' , component : () => import('../components/login/Registered')}
          ]

        }
      ]
    },
    {path:'/',redirect:'/find'},
    {path:'*',redirect:'/find'}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:'active'

})

export default router
