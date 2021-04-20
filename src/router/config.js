
export const routes = [
    {
        path:'/',
        name:'Home',
        redirect:'/index',
        meta:{
            title:'主页',
            auth:true,
        },
        component:()=>import('../views/layout/Home.vue'),
        children:[
            {
                path:'/index',
                name:'Index',
                meta:{
                    title:'统计',
                    icon:'bank',
                    auth:true
                },
                component:()=>import('../views/page/Index.vue')
            }
        ]
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
    },
    {
        path:'*',
        name:'NotFound',
        component:()=>import('../views/layout/NotFound.vue')
    }
]

export const asyncRoutes=[
    {
        path:'/product',
        name:'Product',
        redirect:'/productList',
        meta:{
            title:'产品'
        },
        component:()=>import('../views/layout/Home.vue'),
        children:[
            {
                path:'/productList',
                name:'ProductList',
                meta:{
                    title:'商品列表',
                    icon:'unordered-list',
                    auth:true,
                    hidden:false
                },
                component:()=>import('../views/page/ProductList.vue')
            },
            {
                path:'/productAdd',
                name:'ProductAdd',
                meta:{
                    title:'添加商品',
                    icon:'plus-square',
                    auth:true,
                    hidden:false
                },
                component:()=>import('../views/page/ProductAdd.vue')
            },
            {
                path:'/productEdit/:id',
                name:'ProductEdit',
                meta:{
                    title:'编辑商品',
                    icon:'plus-square',
                    auth:true,
                    hidden:true
                },
                component:()=>import('../views/page/ProductAdd.vue')
            },
            {
                path:'/category',
                name:'Category',
                meta:{
                    title:'商品类目',
                    auth:true,
                    hidden:false
                },
                component:()=>import('../views/page/Category.vue')
            }
        ]
    }
]