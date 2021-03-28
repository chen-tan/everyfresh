const roleToRoute = {
    customer:[
        {name:'Product',path:'/product'},
        {name:'ProductAdd',path:'/productAdd'},
        {name:'ProductList',path:'/productList'},
        {name:'ProductEdit',path:'/productEdit'},
    ],
    admin:[
        {name:'Product',path:'/product'},
        {name:'ProductAdd',path:'/productAdd'},
        {name:'ProductList',path:'/productList'},
        {name:'ProductEdit',path:'/productEdit'},
        {name:'Category',path:'/category'}
    ]
}
    
export function getMenu(role,asyncRoutes){
    const hasPerName=roleToRoute[role].map(i=>i.name);
    const menuRoutes = asyncRoutes.filter(item=>{
        if(hasPerName.indexOf(item.name)!==-1){
            item.children = item.children.filter(c=>{
                return hasPerName.indexOf(c.name)!==-1;
            });
            return true;
        }else{
            return false;
        }
    })
    return menuRoutes;
}

export function isAsync(path,asyncRoutes){
    let result=false;
    asyncRoutes.forEach(i=>{
        if(i.path===path){
            result = true;
        }
        if(i.children){
            result = isAsync(path,i.children);
        }
    })
    return result;
}
