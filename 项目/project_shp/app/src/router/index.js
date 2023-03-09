import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)
import routes from './route'
let router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    if (token) {
        if (to.name == 'login' || to.name == 'register') {
            next('/home');
        } else {
            let name = store.state.user.info.name;
            if (name) {
                next();
            } else {
                try {
                    await store.dispatch("user/userInfo");
                    next();
                } catch (err) {
                    await store.dispatch("user/logout");
                    next('/login');
                }
            }
        }

    } else {
        let topath = to.path;
        if (topath.indexOf('/trade') != -1 || topath.indexOf('/pay') != -1 || topath.indexOf('/center') != -1) {
            next(`/login?redirect=${topath}`)
        } else {
            next()
        }
    }
})
//统一账户   13700000000 111111
export default router;