
import { getLogin, getMimaLogin, getDetail, getUserTest, getUser } from '@/api'
const state = {
    isLogin: JSON.parse(localStorage.getItem('Login')) || false,
    user: JSON.parse(localStorage.getItem('User')) || {},
    cookie: localStorage.getItem('cookie') || '',
    detail: JSON.parse(localStorage.getItem('UserDetail')) || {},
}
const mutations = {
    login(state) {
        if (state.cookie) {
            localStorage.setItem('Login', JSON.stringify(true))
            state.isLogin = true
        } else {
            localStorage.setItem('Login', JSON.stringify(false))
            state.isLogin = false
        }
    },
    getUser(state, value) {
        state.user = value
    },
    getUserDetail(state, value) {
        state.detail = value
    },
    getCokkie(state,cookie){
        state.cookie=cookie;
    }
}
const getters = {

}
const actions = {
    async reqLogin(context, { phone, captcha }) {
        await getLogin({ phone, captcha }).then(res => {
            console.log(res);
            if (res.status == 200) {
                context.commit('login')
                return 'ok'
            } else {
                return Promise.reject(newError(res.message || 'Error'))
            }
        })
    },
    async reqMimaLogin(context, { phone, password }) {
        await getMimaLogin({ phone, password }).then(res => {
            console.log(res);

        })
    },
    reqDeatil({ state, commit }) {
        getDetail(state.cookie).then(detail => {
            if (detail.status == 200) {
                localStorage.setItem('User', JSON.stringify(detail.data.data))
                commit('getUser', detail.data.data);
            }
        })
    },
    async getUser({ state, commit }) {
        getUserTest(state.user.profile.userId).then(res => {
            localStorage.setItem('UserDetail', JSON.stringify(res.data));
            commit('getUserDetail', res.data);
        })
    }
}

export default ({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
})