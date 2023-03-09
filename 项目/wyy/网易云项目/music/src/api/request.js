import axios from 'axios'
import store from '@/store'
if (store.state.login.cookie) {
    document.cookie = store.state.login.cookie;
}
const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    withCredentials: true   //设置跨域的时候传递cookie，需要服务端的配合 
})

export default request