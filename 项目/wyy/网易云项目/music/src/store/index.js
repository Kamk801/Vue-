import Vue from "vue";
import Vuex from 'vuex'
import music from './music'
import search from './search'
import login from './login'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    music,
    search,
    login
  }
})