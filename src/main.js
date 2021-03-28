import Vue from 'vue';
import App from './App.vue';
import VCharts from 'v-charts-v2';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';
import './assets/css/reset.css'
import './assets/css/global.less'

Vue.config.productionTip = false;

// store.dispatch('loginUser/whoAmI');

Vue.use(VCharts)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
