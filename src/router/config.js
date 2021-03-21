
export default [
    {
        path:'/',
        name:'Home',
        component:()=>import('../views/layout/Home.vue')
    },
    {
        path:'/login',
        name:'Login',
        component:()=>import('../views/layout/Login.vue')
    }
]