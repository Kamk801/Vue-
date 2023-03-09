import Vue from 'vue'
import App from './App.vue'
import TypeNav from '@/components/TypeNav'
import store from './store/index'
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false
import router from '@/router/index'
import '@/mock/mockServe.js'
import 'swiper/css/swiper.css'
import carousel from '@/components/Carousel'
import pagination from '@/components/Pagination'
import * as API from '@/api'
import { Button, MessageBox } from 'element-ui';
import VueLazyload from 'vue-lazyload'
import moren from '@/assets/默认.jpeg'
Vue.component(carousel.name, carousel)
Vue.component(pagination.name, pagination)
Vue.component(Button.name, Button);
Vue.use(VueLazyload, {
  loading: moren
})

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  }
}).$mount('#app')
