import axios from 'axios'
import nProgress from 'nprogress';
import "nprogress/nprogress.css"

const mockAjax = axios.create({
    baseURL: '/mock',
    timeout: 5000
})

mockAjax.interceptors.request.use(config => {
    nProgress.start()
    return config
}, err => {
    console.log(err);
})

mockAjax.interceptors.response.use(res => {
    nProgress.done();
    return res.data
}, err => {
    console.log(err);
})

export default mockAjax