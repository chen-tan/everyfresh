import instance from '../../axios';
export default {
    login(params){
        return instance.post('passport/login',params);
    },
    reg(params){
        return instance.post('passport/logon',params);
    },
    code(params){
        return instance.post('passport/getCode',params);
    },
    findBack(params){
        return instance.post('passport/findBack',params);
    }


}