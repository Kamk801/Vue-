import { reqGetSearchinfo } from '@/api/index'
const state = {
    searchlist: {}
}
const mutations = {
    GetSearchlist(state, searchlist) {
        state.searchlist = searchlist;
    }
}
const getters = {
    attrsList(state) {
        return state.searchlist.attrsList || []
    },
    goodslist(state) {
        return state.searchlist.goodsList || []
    },
    trademarkList(state) {
        return state.searchlist.trademarkList || []
    }
}
const actions = {
    getSearchinfo(context, params) {
        reqGetSearchinfo(params).then(res => {
            if (res.code === 200) {
                context.commit("GetSearchlist", res.data)
            }
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