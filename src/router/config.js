
export const routes = [
    {
        path:'/',
        name:'Home',
        meta:{
            title:'主页'
        },
        component:()=>import('../views/layout/Home.vue'),
        children:[
            {
                path:'/index',
                name:'Index',
                meta:{
                    title:'统计',
                    icon:'bank'

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
    }
]

export const asyncRoutes=[
    {
        path:'/product',
        name:'Product',
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
                    icon:'unordered-list'
                },
                component:()=>import('../views/page/ProductList.vue')
            },
            {
                path:'/productAdd',
                name:'ProductAdd',
                meta:{
                    title:'添加商品',
                    icon:'plus-square'
                },
                component:()=>import('../views/page/ProductAdd.vue')
            },
            {
                path:'category',
                name:'Category',
                meta:{
                    title:'商品类目'
                },
                component:()=>import('../views/page/Category.vue')
            }
        ]
    }
]