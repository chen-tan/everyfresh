import instance from '../axios';
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
    },
    getCategory(params){
        return instance.get('category/all',{
            params
        });
    },
    getProductsList(params){
        return instance.get('products/all',{
            params
        });
    },
    delete(id){
        const url=`products/${id}`;
        return instance.delete(url);
    },
    add(params){
        return instance.post('products/add',params);
    },
    detail(id){
        const url=`products/${id}`;
        return instance.get(url);
    },
    editProduct(params){
        return instance.put('products/edit',params)
    }

}