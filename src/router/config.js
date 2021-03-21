
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
    },
    {
        path:'/reg',
        name:'Reg',
        component:()=>import('../views/layout/Reg.vue')
    },
    {
        path:'/code',
        name:'Code',
        component:()=>import('../views/layout/Code.vue')
    },
    {
        path:'/findBack',
        name:'FindBack',
        component:()=>import('../views/layout/FindBack.vue')
    }
]