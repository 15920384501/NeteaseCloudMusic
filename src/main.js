import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入移动端样式表
import './assets/css/reset.css'
import './assets/css/style.css'

//引入Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//引入Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
