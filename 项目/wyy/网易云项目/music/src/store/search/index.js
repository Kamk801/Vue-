
import { reqSearchList } from '@/api'
const state = {
    songs: []
}
const mutations = {
    getList(state, songs) {
        state.songs = songs
    }
}
const getters = {

}
const actions = {
    reqList(context, keyword) {
        reqSearchList(keyword).then(res => {
            if (res.status == 200) {
                console.log(res.data);
                context.commit('getList', res.data.result.songs)
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