import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import ItemMusic from '@/views/itemMusic'
import Search from '@/views/Search'
import Login from '@/views/Login'
import User from '@/views/User'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      show: true
    }
  },
  {
    path: '/item',
    name: 'item',
    component: ItemMusic,
    meta: {
      show: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      show: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      show: false
    },
    beforeEnter: (to, from, next) => {
      if (store.state.login.isLogin) {
        next(from)
      } else {
        next()
      }
    },
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    beforeEnter: (to, from, next) => {
      if (store.state.login.isLogin || store.state.cookie) {
        next()
      } else {
        next('/login')
      }
    },
    meta: {
      show: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
