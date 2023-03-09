import { reqTrade,reqAddress } from '@/api/index'
const state = {
    tradelist: {},
    address:[]
}
const mutations = {
    trade(state, tradelist) {
        state.tradelist = tradelist
    },
    getaddress(state, address) {
        state.address = address
    },
}
const getters = {
    
}
const actions = {
    async getTrade(context) {
        await reqTrade().then(res => {
            if (res.code == 200) {
                context.commit("trade", res.data);
                return console.log('ok');
            } else {
                return Promise.reject(new Error('failure'))
            }
        })
    },
    async getAddress(context) {
        await reqAddress().then(res => {
            if (res.code == 200) {
                context.commit("getaddress", res.data);
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