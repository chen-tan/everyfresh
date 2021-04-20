# 每日优鲜
## B端
### 使用创建vue项目
不使用预设，可在创建项目时将vuex、router、eslint、css预处理语言安装好。

### 引入ant-design
#### 在vue中引入ant-design的命令
使用`vue add ant-design`，安装过程中可以选择全部安装或者按需安装，可以选择语言(选择英文)，可以选择是否重写less(选择重写)，安装完成后会自动在`main.js`文件中引入 `import './plugins/ant-design-vue.js'`，报错，需要将`.js`的扩展名去掉。
#### 报错 `Inline JavaScript is not enabled. Is it set in your options?`
是因为`Inline JavaScript`在ant-design中不允许使用了，可在`vue.config.js`中配置
```
    css:{
            loaderOptions:{
                less:{javascriptEnabled:true}
            }
        }
```

### 小细节
- 禁用eslint:在根目录下有个`.eslintignore`文件，在其中添加`*.vue`即可
- 验证邮箱的正则表达式 `/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$`
- 在邮箱输入框中先输入数字后，无法输入字母和其他字符。对应的`input`框使用了`v-model.number`，只需要把`number`修饰符去掉即可。
- 只使用`export default obj`导出时，导入时不能使用结构语法，如`import {login} from obj`，这样会导入一个`{default:obj}`的对象，使得解构的值`login`为`undefined`。
- 对`axios`进行默认值配置，可以使用`const instance = axios.create({baseURL:xxx})`，一般用来配置`baseURL`。
- 在统一将所有请求写到一个文件中时，在函数中发送请求，需要将请求作为返回值
```
    function login(params){
        return instance.post('http://xxx');
    }
```
- 可以使用`axios.interceptors`对`request`，`response`进行拦截，尤其是`response`，在成功或失败时直接返回最需要的数据，去除无用信息。当请求失败时，由于只有一条错误信息，故可以返回`Promise.reject(err.msg)`，这样可以在`catch`中捕捉错误
- 不使用`async`函数时，必须在函数内部`return`一个`Promise`，才能让该函数的返回值是一个`Promise`。继续对这个`Promise`使用`then`或`catch`时，在其内部`return`的值，将作为下一次`then`或`catch`的参数，对`return`的值不做类型要求。
- 在`Promise`链式调用中，只要不报错，下一步就会进入`then`函数，无论上一步是`then`还是`catch`，报错了才会进入`catch`函数。
- "path" is required in a route configuration.
用`router.addRoute()`添加动态路由时，报此条错误，因为传入的参数是一个数组，需要直接传入路由的配置对象为参数，如下格式的对象
```
    {
        path:'/index',
        name:'Index',
        component:Index
    }
```
如果是一个路由组成的数组对象，可以使用**展开运算符**
- Uncaught (in promise) Error: Navigation cancelled from "/login" to "/" with a new navigation.
至今没搞懂是为什么，不过注释了导航守卫的代码后再解开注释就好了，很神奇，以后搞懂了再补充。
暂时发现，如果取消了`router.addRoute()`就可以避免这个报错，但是这样就不能动态添加路由了。
- $router.currentRoute就是$route.
- Module not found: Error: Can't resolve 'xxx' in 'xxx'解决办法：
- 父组件引用了子组件，如果在<style></style>上添加了`scope`，则在父组件上写的有关于子组件的样式，不会作用到子组件上。
- 在路由导航守卫中，如果进入到一个需要登录后才能展示的页面，此时需要判断是否登录，正常在页面中登录了即可。但是有一种情况：当前已经登录，刷新页面后，需要通过`token`来自动登录，此时在`main.js`中发送请求登录会被导航街截断，解决方法是，在判断是否登录前，发送请求`whoAmI`登录，然后进行是否登录的判断，代码如下：
```
router.beforeEach(async (to,from,next)=>{
    if(to.path!=='/login'){
      //去的不是登录页
        await store.dispatch('loginUser/whoAmI'); //通过本地token发送登录请求，等待结果
        if(store.state.loginUser.data){
          //已经登录了
          next();
        }else{
            //没有登录
          next({name:'Login'});
        }
    }else{
      next();
    }
})
```
- Uncaught (in promise) TypeError: "children" is read-only
因为children是用`const`定义的，改成`let`就行了
- 给定一个数组，返回其中及其子元素中含有指定prop属性的项，代码如下：
```
function getNeed(arr,prop){
  arr = arr.filter(i=>{
    if(i[prop]){
      if(i['children']){
        i['children'] = getNeed(i['children'],prop)
      }
      return true;
    }
  });
  return arr;
}

const arr=[
  { 
    name:'1',
    meta:1,
    children:[
      {
        name:'1-1',
        meta:'1-1',
        children:[
          {
            name:'1-1-1',
            meta:'1-1-1'
          },
          {
            name:'1-1-2'
          }
        ]
      },
      {
        name:'1-2',

      }
    ]
  },
  {
    name:'2',
  }
]
let res = getNeed(arr,'meta');
```
- 使用ant-design组件，有时设置了`router-link`，但是样式和内容显示都有问题，是因为组件库的默认样式是根据标签来写的，所以在`router-link`上使用`tag`属性，修改组件库的标签就行。
- `router-link`标签用其他元素更换`<a></a>`的新方法,如下图，使用`span`标签：
```
<router-link :to="{name:sub.name}" v-slot="{}">
  <span>{{ sub.meta.title }}</span>
</router-link>
```
- 使用v-charts报错：[Vue warn]: Unknown custom element: <ve-line> - did you register the component correctly? For recursive components, make sure to provide the "name" option.
1. 安装的v-charts和echarts版本不兼容，兼容版本 v-charts@2.0.9和echarts@4.8.0
2. 安装之后没有在`main.js`中引入和使用
- 使用axios时设置参数默认值，在配置请求时：
```
  //这是请求
  axios.get(url,{params});
  //这是拦截
  axios.interceptors.request.use(config=>{
    config.params={
      ...config.params,
      appkey,
    }
    return config;
  })
```
- 在使用`watch`侦听器的时候，如果是侦听`store`中的数据，不要使用`mapState`获取数据后再监听，容易导致数据改变后页面不渲染（要切换页面后才渲染)，直接`store`中的数据对侦听即可。
- [vue-router] missing param for named route "ProductEdit": Expected "id" to be defined
- 当路由改变时，需要监听路由的变化做出数据改变，使用`watch`监听路由，但是改变了页面不一定会发生变化，此时在组件上加一个属性（属性值可以用事件戳），当路由改变时，更新属性值，使得组件重新渲染。
- tags is required，在select选择框时，设置了`required`，有输入内容时还是会报这个错误，可能是缺少`v-model`，添加后就好了
- 使用ant-design，在输入框表单验证中验证数字，用`require:'number'`，输入框在输入数字后会自动转换成字符串，此时需要在`label`标签上加上`v-model.number`
- 上传图片时，速度很慢，可以检查一下上传的地址，以及上传需要的字段是否正确
- 使用upload组件，上传图片，在action中写上传地址如下：
action:https://mallapi.duyiedu.com/upload/images?appkey=${$store.state.loginUser.data.appkey
一开始上传始终显示跨域，然后，在"?"前加了一个"/"，就上传成功了，成功的写法如下：
action:https://mallapi.duyiedu.com/upload/images/?appkey=${$store.state.loginUser.data.appkey
不知道为什么这样能解决跨域。
emmm...现在发现和路径没有关系，就是有一张图片会报错跨域，其他的不报错。
- 调用editProduct接口，编辑失败，返回结果显示成功，但是返回的数据中n:0；nModified:0；ok: 1，不全为1，说明编辑并没有成功，只是请求成功了。原因：将需要传的数据传在了`params`中，实际数据应该传在`config`中。
- 使用`$router.push({name:'ProductList'})`跳转页面时，name的值应为字符串。
- fileList，编辑商品时图片不显示，可能是把标签上的` :file-list="fileList"`删掉了，加上就行。

**如果感觉代码逻辑没问题，那就可能是写错位置了之类的，如果用的组件库，就去看下组件库的文档和模板**
### 本地打包后运行，需要启动一个 HTTP 服务器来访问
参考：https://cli.vuejs.org/zh/guide/deployment.html#%E6%9C%AC%E5%9C%B0%E9%A2%84%E8%A7%88
1. 安装静态文件服务器  `npm install -g serve`
2. 运行命令打开页面 `serve -s dist`
### 将项目部署到Github，使用`hash`模式
参考：https://cli.vuejs.org/zh/guide/deployment.html#github-pages
1. 在 vue.config.js 中设置正确的 publicPath。
2. 执行`npm run build`，打包到dist目录
3. 进入到`dist`目录，打开git Bash
4. 依次执行：`git init` -> `git add -A` -> `git commit -m 'deploy'`
5. 执行 `git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages`，访问`https://<USERNAME>.github.io/<REPO>`
6. ps:若第5步执行：`git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master`，则访问
`https://<USERNAME>.github.io`
7. 我自己的gitHub地址：`https://chen-tan.github.io/xxxxx`