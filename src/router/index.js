import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes,asyncRoutes} from './config'
import store from '../store/index'
import getMenu from '../util/permission'


Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

router.beforeEach(async (to,from,next)=>{
    if(to.path!=='/login'){
      //去的不是登录页
        await store.dispatch('loginUser/whoAmI');
        if(store.state.loginUser.data){
          //已经登录了，需要根据用户类型判断动态路由
          const menuRoutes = getMenu(store.state.loginUser.data.role,asyncRoutes);
          router.addRoute(...menuRoutes);
          let hasMetaRoutes = routes.filter(i=>{
            if(i.meta){
              i.children=i.children.filter(c=>c.meta);
              return true;
            }else{
              return false;
            }
          })
          store.dispatch('getMenuRoutes',hasMetaRoutes.concat(menuRoutes));
          next();
        }else{
          next({name:'Login'});
        }
    }else{
      next();
    }
})

export default router;
