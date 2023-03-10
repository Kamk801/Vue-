import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueMarqueeSlider from 'vue-marquee-slider';
import {Slider} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Header from '@/components/Header'
Vue.use(Slider);
Vue.use(VueMarqueeSlider);
Vue.use(Vant);
Vue.config.productionTip = false
Vue.component(Header.name,Header)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
