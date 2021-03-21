import api from '../api/index'

function delay(duration){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },duration)
    })
}

export default {
    namespaced:true,
    state:{
        data:null,
        isLoading:false,
        err:'',
        msg:'',
    },
    mutations:{
        setData(state,payload){
            state.data=payload;
        },
        setIsLoading(state,payload){
            state.isLoading=payload;
        },
        setErr(state,payload){
            state.err=payload;
        },
        setMsg(state,payload){
            state.msg=payload;
        }
    },
    actions:{
        async login({commit},payload){
            let result=false;
            commit('setIsLoading',true);
            const resp = await api.login(payload);
            if(resp.status==='fail'){
                //登录失败
                commit('setErr',resp.msg);
            }else{
                commit('setData',resp.data);
                localStorage.setItem('freshEmail',payload.email);
                localStorage.setItem('freshPassword',payload.password);
                result = true;
            }
            commit('setIsLoading',false);
            return result;
        },
        async reg({commit},payload){
            let result = false;
            const resp = await api.reg(payload);
            if(resp.status==='fail'){
                commit('setErr',resp.msg);
            }else{
                result=true;
            }
            return result;
        },
        async code({commit},payload){
            const resp = await api.code(payload);
            if(resp.status==='success'){
                return resp.msg;
            }
        },
        async findBack({commit},payload){
            let result=false;
            const resp = await api.findBack(payload);
            if(resp.status==='success'){
                commit('setMsg',resp.msg);
                result=true;
            }
            return result;
        },
        async whoAmI({commit}){
            commit('setIsLoading',true);
            const freshEmail=localStorage.getItem('freshEmail');
            const freshPassword=localStorage.getItem('freshPassword');
            if(freshEmail && freshPassword){
                await delay(1000);
                const resp = await api.login({
                    email:freshEmail,
                    password:freshPassword
                });
                if(resp.status==='success'){
                    commit('setData',resp.data);
                }
            }
            commit('setIsLoading',false);
        },
        loginOut({commit}){
            commit('setData',null);
        }

    },
}