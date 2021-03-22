const roleToRoute = {
    customer:[
        {name:'Product'},
        {name:'ProductAdd'},
        {name:'ProductList'},
    ],
    admin:[
        {name:'Product'},
        {name:'ProductAdd'},
        {name:'ProductList'},
        {name:'Category'}
    ]
}
    
export default function getMenu(role,asyncRoutes){
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
