import request from './request'

export const reqBanner = () => request({ url: '/banner', method: 'get' })

// /personalized?limit=1
export const reqRecommandList = () => request({ url: '/personalized?limit=10', method: 'get' })

//   /playlist/detail?id=24381616
export const reqListDetail = (id) => request({ url: `/playlist/detail?id=${id}`, method: 'get' })

// /playlist/track/all?id=24381616&limit=10&offset=1
export const reqListMusic = (id) => request({ url: `/playlist/track/all?id=${id}&limit=21&offset=0`, method: 'get' })

//    /song/url?id=33894312     
export const reqMusic = (id) => request({ url: `/check/music?id=${id}`, method: 'get' })

//   /lyric?id=33894312
export const reqLyric = (id) => request({ url: `/lyric?id=${id}`, method: 'get' })

//  /search?keywords=海阔天空
export const reqSearchList = (keyword) => request({ url: `/cloudsearch?keywords=${keyword}&limit=50`, method: 'get' })

//    /login/cellphone?phone=xxx&password=yyy
export const getMimaLogin = ({ phone, password }) => request({ url: `/login/cellphone?phone=${phone}&password=${password}`, method: 'get' })

//  /captcha/sent
export const getCapcha = (phone) => request({ url: `/captcha/sent?phone=${phone}`, method: 'get' })

//   /captcha/verify?phone=13xxx&captcha=1597
export const getLogin = ({ phone, captcha }) => request({ url: `/captcha/verify?phone=${phone}&captcha=${captcha}`, method: 'get' })

//    /song/url?id=33894312
export const getMusicUrl = (id) => request({ url: `/song/url?id=${id}`, method: 'get' })
//  /user/account
export const getUser = () => request({ url: '/user/account', method: 'get' })
//  /user/subcount
export const getDetailUser = () => request({ url: '/user/subcount', method: 'get' })

//     /login/qr/key
export const getKey = () => request({ url: '/login/qr/key', method: 'get', params: { timerstamp: new Date().getTime() } })
//    /login/qr/create?key=xxx
export const getErweiImg = (key) => request({ url: `/login/qr/create?key=${key}`, method: 'get', params: { timerstamp: new Date().getTime(), qrimg: true, } })
//   /login/qr/check?key=xxx
export const getErweiState = (key) => request({ url: `/login/qr/check?key=${key}`, method: 'get', params: { timerstamp: new Date().getTime(),withCredentials: true } })
//  /login/status?cookie=${sessionStorage.getItem("cookie")}
export const getDetail = (cookie) => request({ url: `/login/status?cookie=${cookie}`, method: 'get' })
//   /user/detail?uid=32953014
export const getUserTest = (uid) => request({ url: `/user/detail?uid=${uid}`, method: 'get' })
