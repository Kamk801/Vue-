import request from './request'
import mockAjax from './mockAjax'
//三级联动接口
//   /api/product/getBaseCategoryList   
export const reqCategoryList = () => request({ url: '/api/product/getBaseCategoryList', method: 'get' })
export const reqGetBannerList = () => mockAjax({ url: '/banner', method: 'get' })
export const reqGetFloorList = () => mockAjax({ url: '/floor', method: 'get' })
export const reqGetSearchinfo = (params) => request({ url: '/api/list', method: 'post', data: params })

//     /api/item/{ skuId }    GET
//   参数名称	类型	是否必选	描述
//    skuId	  string	  Y	     商品ID
export const reqGoodsinfo = (skuid) => request({ url: `/api/item/${skuid}`, method: 'get' })
//   /api/cart/addToCart/{ skuId }/{ skuNum }
//   POST
// 参数名称	类型	是否必选	描述
// skuID	string	  Y	     商品ID
// skuNum	string	  Y	     商品数量
//修改购物车数据
export const reqAddShopCart = (skuid, skunum) => request({ url: `/api/cart/addToCart/${skuid}/${skunum}`, method: 'post' })

export const reqShopCart = () => request({ url: '/api/cart/cartList', method: 'get' })
//删除购物车数据
export const reqDelShopCart = (skuid) => request({ url: `/api/cart/deleteCart/${skuid}`, method: 'delete' })

export const reqChangeCheckd = (skuid, isChecked) => request({ url: `/api/cart/checkCart/${skuid}/${isChecked}`, method: 'get' })

//获取验证码  /api/user/passport/sendCode/${phone}  get

export const reqGetCode = (phone) => request({ url: `/api/user/passport/sendCode/${phone}`, method: 'get' })

// 参数名称	类型	是否必选	描述
// phone	string	Y	注册手机号
// password	string	Y	密码
// code	string	Y	验证码

export const reqRegister = (data) => request({ url: '/api/user/passport/register', data, method: 'post' })

//  /api/user/passport/login
// 参数名称	类型	是否必选	描述
// phone	string	Y	用户名
// password	string	Y	密码


export const reqUserLogin = (data) => request({ url: '/api/user/passport/login', data, method: 'post' });

//         /api/user/passport/auth/getUserInfo   获取用户信息api地址

export const reqUserInfo = () => request({ url: '/api/user/passport/auth/getUserInfo', method: 'get' });

//  /api/user/passport/logout  get

export const reqLogout = () => request({ url: '/api/user/passport/logout', method: 'get' });

//  /api/order/auth/trade
export const reqTrade = () => request({ url: '/api/order/auth/trade', method: 'get' });

//  /api/user/userAddress/auth/findUserAddressList 

export const reqAddress = () => request({ url: '/api/user/userAddress/auth/findUserAddressList', method: 'get' });

//  /api/order/auth/submitOrder?tradeNo={tradeNo}  POST  

// 参数名称	类型	是否必选	描述
// traderNo	string	Y	交易编号(拼接在路径中)
// consignee	string	Y	收件人姓名
// consigneeTel	string	Y	收件人电话
// deliveryAddress	string	Y	收件地址
// paymentWay	string	Y	支付方式
// (ONLINE代表在线)
// orderComment	string	Y	订单备注
// orderDetailList	Array	Y	存储多个商品对象的数组
export const subOrder = (tradeNo,data) => request({ url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });

//     /api/payment/weixin/createNative/{orderId}    
export const getOrder = (orderId) => request({ url:`/api/payment/weixin/createNative/${orderId}`, method: 'get' });

//        /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayState = (orderId) => request({ url:`/api/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

//     /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page,limit) => request({ url:`/api/order/auth/${page}/${limit}`, method: 'get' });
