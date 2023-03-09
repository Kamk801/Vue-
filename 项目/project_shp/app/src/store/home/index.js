
import { reqCategoryList,reqGetBannerList,reqGetFloorList } from '@/api/index'
const state = {
    category: [],
    banner:[],
    floor:[]
}
const mutations = {
    Catelist(state, category) {
        state.category = category
    },
    Bannerlist(state, banner) {
        state.banner = banner
    },
    Floorlist(state, floor) {
        state.floor = floor
    },
}
const getters = {

}
const actions = {
    categoryList(context) {
        reqCategoryList().then(res => {
            if (res.code === 200) {
                context.commit("Catelist", res.data)
            }
        })
    },
    getbannerlist(context){
        reqGetBannerList().then(res => {
            if (res.code === 200) {
                context.commit("Bannerlist", res.data)
            }
        })
    },
    getFloorList(context){
        reqGetFloorList().then(res => {
            if (res.code === 200) {
                context.commit("Floorlist", res.data)
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