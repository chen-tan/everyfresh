import axios from 'axios'

axios.defaults.baseURL='https://mallapi.duyiedu.com';

const instance = axios.create();
instance.interceptors.request.use(config=>{
    return config;
})
instance.interceptors.response.use(config=>{
    return config.data;
})

export default instance;