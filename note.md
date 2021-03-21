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
- $router.currentRoute就是$route.
- Module not found: Error: Can't resolve 'xxx' in 'xxx'解决办法：
- 父组件引用了子组件，如果在<style></style>上添加了`scope`，则在父组件上写的有关于子组件的样式，不会作用到子组件上。
