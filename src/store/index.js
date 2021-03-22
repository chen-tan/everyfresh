import Vue from 'vue';
import Vuex from 'vuex';
import loginUser from './loginUser'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed:false,
    menuRoutes:null,
  },
  mutations: {
    toggleCollapsed(state){
      state.collapsed=!state.collapsed;
    },
    getMenuRoutes(state,payload){
      state.menuRoutes=payload;
    } 
  },
  actions: {
    toggleCollapsed({commit}){
      commit('toggleCollapsed');
    },
    getMenuRoutes({commit},payload){
      commit('getMenuRoutes',payload);
    }
  },
  modules: {
    loginUser
  },
});
