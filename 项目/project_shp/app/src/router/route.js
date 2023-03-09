import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
export default [{
    path: '/',
    redirect: '/home'
},
{
    name: 'home',
    path: '/home',
    component: Home,
    meta: {
        isShow: true
    }
},
{
    name: "search",
    path: '/search/:keyword?',
    component: Search,
    meta: {
        isShow: true
    }
},
{
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
        isShow: false
    }
},
{
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
        isShow: false
    }
},
{
    path: '/detail/:skuid',
    component: Detail,
    meta: {
        isShow: true
    }
},
{
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: {
        isShow: true
    }
},
{
    name: 'shopcart',
    path: '/shopcart',
    component: ShopCart,
    meta: {
        isShow: true
    }
},
{
    name: 'trade',
    path: '/trade',
    component: Trade,
    meta: {
        isShow: true
    },
    beforeEnter: (to, from, next) => {
        if (from.path == '/shopcart') {
            next()
        } else {
            next(false)
        }
    }
},
{
    name: 'pay',
    path: '/pay',
    component: Pay,
    meta: {
        isShow: true
    },
    beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
            next()
        } else {
            next(false)
        }
    }
},
{
    name: 'paysuccess',
    path: '/paysuccess',
    component: PaySuccess,
    meta: {
        isShow: true
    }
},
{
    name: 'center',
    path: '/center',
    component: Center,
    meta: {
        isShow: true
    },
    children: [{
        path: '',
        redirect: '/center/myorder'
    }, {
        path: 'myorder',
        component: myOrder,
    },
    {
        path: 'grouporder',
        component: groupOrder,
    }]
}]