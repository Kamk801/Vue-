import { reqShopCart, reqDelShopCart,reqChangeCheckd } from '@/api/index'
const state = {
    cartlist: []
}
const mutations = {
    getCart(state, cart) {
        state.cartlist = cart;
    }
}
const getters = {
    CartList(state) {
        return state.cartlist[0] || {}
    },
    CartInfoList(state) {
        return state.cartlist[0].cartInfoList || []
    }
}
const actions = {
    getCartList(context) {
        reqShopCart().then(res => {
            if (res.code === 200) {
                context.commit("getCart", res.data)
            }
        })
    },
    async delShopCart(context, skuid) {
        let result = await reqDelShopCart(skuid);
        if (result.code == 200) {
            return console.log('ok');
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    async changeCheck(context,{skuid,isChecked}) {
        let result = await reqChangeCheckd(skuid,isChecked);
        if (result.code == 200) {
            return console.log('ok');
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    delAllChecked(context) {
        let promiseALL = [];
        context.getters.CartInfoList.forEach(item => {
            let result = item.isChecked == 1 ? context.dispatch('delShopCart', item.skuId) : '';
            promiseALL.push(result);
        })
        //如果有一个失败，返回即为失败结果
        return Promise.all(promiseALL)
    },
    updateAllchecked({ dispatch, getters }, isChecked) {
        let promiseALL = [];
        getters.CartInfoList.forEach(item => {
            let result =dispatch("changeCheck",{skuid:item.skuId,isChecked:isChecked});
            promiseALL.push(result);
        })
        //如果有一个失败，返回即为失败结果
        return Promise.all(promiseALL)
    }
}

export default ({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
})