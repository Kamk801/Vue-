import { reqAddShopCart, reqGoodsinfo } from '@/api/index'
import { getUUID } from '@/utils/uuid_token'
const state = {
    goods: {},
    uuid_token: getUUID()
}
const mutations = {
    goodInfo(state, goods) {
        state.goods = goods;
    }
}
const getters = {
    categoryView(state) {
        return state.goods.categoryView || {}
    },
    skuInfo(state) {
        return state.goods.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goods.spuSaleAttrList || []
    }
}
const actions = {
    getGoodInfo(context, skuid) {
        reqGoodsinfo(skuid).then(res => {
            if (res.code == 200) {
                context.commit('goodInfo', res.data)
            }
        })
    },
    //修改购物车数据||修改某一个产品个数
    async addShopCart(context, { skuid, skunum }) {
        let result = await reqAddShopCart(skuid, skunum);
        if (result.code == 200) {
            return console.log('ok');
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    
    
}

export default ({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
})