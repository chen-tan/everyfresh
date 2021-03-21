import Vue from 'vue';
import Vuex from 'vuex';
import loginUser from './loginUser'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed:false
  },
  mutations: {
    toggleCollapsed(state){
      state.collapsed=!state.collapsed;
    } 
  },
  actions: {
    toggleCollapsed({commit}){
      commit('toggleCollapsed');
    }
  },
  modules: {
    loginUser
  },
});
