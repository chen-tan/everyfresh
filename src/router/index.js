import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes,asyncRoutes} from './config'
import store from '../store/index'
import {getMenu , isAsync} from '../util/permission'


Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

let autoLogin=false,
    isAddRoutes=false;

router.beforeEach(async (to,from,next)=>{
  let isAsyncPath = isAsync(to.path,asyncRoutes);
    if(to.meta.auth || isAsyncPath){
      //去的页面需要登录
      // console.log('登录状态',autoLogin);
      if(!autoLogin){
        await store.dispatch('loginUser/whoAmI');
        autoLogin=true;
      }
        if(store.state.loginUser.data){
          // 已经登录了，需要根据用户类型判断动态路由
          // console.log('已经登录了',isAddRoutes);
          if(!isAddRoutes){
            const menuRoutes = getMenu(store.state.loginUser.data.role,asyncRoutes);
            router.addRoute(...menuRoutes);
            // console.log('路由添加了');
            isAddRoutes=true;
            let hasMetaRoutes = routes.filter(i=>{
              if(i.meta){
                i.children=i.children.filter(c=>c.meta);
                return true;
              }else{
                return false;
              }
            })
            store.dispatch('getMenuRoutes',hasMetaRoutes.concat(menuRoutes));
          }
          
          next();

        }else{
          next({name:'Login'});
        }
    }else{
      next();
    }
})

export default router;
