import axios from 'axios'
import store from './store/index'
axios.defaults.baseURL='https://mallapi.duyiedu.com';

const instance = axios.create();
instance.interceptors.request.use(config=>{
    const appkey = store.state.loginUser.data ? store.state.loginUser.data.appkey :'';
    config.params={
        // page:1,
        // size:10,可以配置参数的默认值
        ...config.params,
        appkey,
    }
    return config;
})
instance.interceptors.response.use(config=>{
    return config.data;
})

export default instance;