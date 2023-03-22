import store from '@/store';
import axios from 'axios'
import nProgress from 'nprogress';
import "nprogress/nprogress.css"
const request = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn',
    timeout: 5000
})

request.interceptors.request.use(config => {
    let uuid_token=localStorage.getItem("UUIDTOKEN");
    if(uuid_token){
        config.headers.userTempId=uuid_token;
    }
    if(store.state.user.token){
        config.headers.token=store.state.user.token;
    }
    nProgress.start()
    return config
}, err => {
    console.log(err);
})

request.interceptors.response.use(res => {
    nProgress.done();
    return res.data
}, err => {
    console.log(err);
})

export default request