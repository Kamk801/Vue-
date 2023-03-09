import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo,reqLogout } from '@/api/index'
import {setToken,removeToken} from '@/utils/token'
const state = {
    code: '',
    token: localStorage.getItem('TOKEN') || '',
    info: {}
}
const mutations = {
    codeGet(state, code) {
        state.code = code
    },
    login(state, token) {
        state.token = token;
    },
    getInfo(state, info) {
        state.info = info
    },
    clear(state){
        state.token='';
        state.info={};
        removeToken();
    }
}
const getters = {

}
const actions = {
    async getCode(context, phone) {
        await reqGetCode(phone).then(res => {
            if (res.code == 200) {
                context.commit("codeGet", res.data);
                return console.log('ok');
            } else {
                return Promise.reject(new Error('failure'))
            }
        })
    },
    async userRegister({ commit }, data) {
        await reqRegister(data).then(res => {
            if (res.code == 200) {
                return console.log('ok');
            } else {
                console.log('fail');
                return Promise.reject(new Error('failure'))
            }
        })
    },
    async userLogin({ commit }, data) {
        await reqUserLogin(data).then(res => {
            if (res.code == 200) {
                commit('login', res.data.token)  
                setToken(res.data.token)
                return console.log('ok');
            } else {
                console.log('fail');
                return Promise.reject(new Error('failure'))
            }
        })
    },
    async userInfo({ commit }) {
        await reqUserInfo().then(res => {
            if (res.code == 200) {
                commit("getInfo", res.data);
                return console.log('ok');
            }else {
                return Promise.reject(new Error('failure'))
            }
        })
    },
    async logout({ commit }) {
        await reqLogout().then(res => {
            if (res.code == 200) {
                commit('clear')  
                return console.log('ok');
            } else {
                return Promise.reject(new Error('failure'))
            }
        })
    },
}

export default ({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
})