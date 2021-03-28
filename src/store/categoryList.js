import api from '../api/index'
export default {
    namespaced:true,
    state:{
        data:null
    },
    mutations:{
        setData(state,payload){
            state.data=payload;
        }
    },
    actions:{
        async getCategoryList({commit},payload){
            const resp = await api.getCategory(payload);
            commit('setData',resp.data.data);
        }
    }
}