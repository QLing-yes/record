## [小程序不支持列表](https://uniapp.dcloud.io/tutorial/vue3-components.html#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%8D%E6%94%AF%E6%8C%81%E5%88%97%E8%A1%A8)

## [v-for 与 v-if 一同使用](https://uniapp.dcloud.io/vue3-basics?id=v-for-与-v-if-一同使用)

可以把 `v-for` 移动到 `template` 标签中来修正：

```html
<template v-for="todo in todos">
    <view v-if="!todo.isComplete">
        {{ todo }}
    </view>
</template>
```

## [内联处理器中的方法](https://uniapp.dcloud.io/vue3-basics?id=内联处理器中的方法)

访问原始的 DOM 事件-特殊变量:

- $event - 原生事件对象

## [`事件修饰符`](https://uniapp.dcloud.io/vue3-basics?id=事件修饰符)

修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。
例如，`.prevent` 修饰符告诉 @事件对于触发的事件调用 `event.preventDefault()`：

@事件（v-on）提供了事件修饰符:

- `.stop`: 各平台均支持， 使用时会阻止事件冒泡，在非 H5 端同时也会阻止事件的默认行为

  > `$event.stopPropagation()` - 阻止事件冒泡
- `.prevent`: 仅在 H5 平台支持
- `.capture`: 仅在 H5 平台支持
- `.self`: 仅在 H5 平台支持
- `.once`: 仅在 H5 平台支持
- `.passive`: 仅在 H5 平台支持

```html
    <!-- 阻止单击事件继续传播 -->
    <view @click.stop="doThis"></view>
```

> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，
> 用 `@click.prevent.self` 会阻止所有的点击，而 `@click.self.prevent` 只会阻止对元素自身的点击。

## [部分事件映射表](https://uniapp.dcloud.io/vue3-basics?id=事件映射表)

```js
// 左侧为 WEB 事件，右侧为 ``uni-app`` 对应事件
    {
        click: 'tap',
        touchstart: 'touchstart',///开始触摸
        touchmove: 'touchmove',///触摸后移动元素
        touchcancel: 'touchcancel',//触摸动作被打断
        touchend: 'touchend',//触摸结束
        tap: 'tap',//点击元素
        longtap: 'longtap', //长按(推荐使用longpress代替)
        input: 'input',//输入文本
        change: 'change',
        submit: 'submit',
        blur: 'blur',
        focus: 'focus',
        reset: 'reset',
        confirm: 'confirm',
        columnchange: 'columnchange',
        linechange: 'linechange',
        error: 'error',
        scrolltoupper: 'scrolltoupper',
        scrolltolower: 'scrolltolower',
        scroll: 'scroll'
    }
```

## nvue事件穿透

- `eventPenetrationEnabled`属性，当值为true（默认为false）时，View的子View仍能正常响应事件，但View自身将不会响应事件。

- `userInteractionEnabled`属性，当值为false（默认为true）时，View及其子View均不响应事件，事件向下层View传递。

## [APP-NVUE通用事件](https://uniapp.dcloud.io/component/waterfall?id=事件)

- click：用于监听点击事件。
- longpress：用于监听长按事件
- appear：用于监听子组件出现事件
- disappear：用于监听子组件滑出屏幕事件

**注意**

- waterfall是区域滚动，不会触发页面滚动，无法触发pages.json配置的下拉刷新、页面触底onReachBottomDistance、titleNView的transparent透明渐变。

### [v-model](https://uniapp.dcloud.io/vue3-basics?id=v-model)

同vue2 : `visible.sync`

> `双向数据绑定`
> 忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源
> data 选项中声明初始值。

```js
<input v-model="obj">
 data() {return {obj:""}
```

### v-memo

- 如果数组中的每个值都与上次渲染相同，则将跳过整个子树的更新

- `v-memo="[/* 值或表达式 */]"` //vue3

### [计算属性的 setter](https://uniapp.dcloud.io/vue3-basics?id=计算属性的-setter)

```js
<view>{{ fullName }}</view>//触发get
<view>{{ fullName = '2333' }}</view>//触发set
    //...
computed: {
    fullName: {
        get(){ return },
        set(newValue){}
    }
}
//...
```

- get：通过设置get方法可以得到fullName的新值。
- set：通过set的方法，设置一个值（newValue）来改变fullName相关联的值，引起fullName重新的计算，相应的页面上fullName也会发生改变成新的内容

#### 计算属性缓存 vs 方法

> **计算属性是基于它们的反应依赖关系缓存的**。
> 相依赖**发生改变时它们才会重新求值**。这就意味着只要 属性 还没有发生改变，多次访问计算属性会立即返回之前的计算结果，而不必再次执行函数。

> 相比之下，每当触发重新渲染时，**调用方法将总会再次执行函数**。

### [侦听器watch](https://uniapp.dcloud.io/vue3-basics?id=侦听器watch)

- watch会监听对象状态, 状态变更时更新绑定此对象视图 !!!!!

```js
...
data() {return { obj:{x:'',y:''}}},
watch: {
    /* 使用watch来响应数据的变化，第一个参数为newVal新值，第二个参数oldVal为旧值*/
    objData: function(newVal, oldVal) {}
	//or 选项
	objData:{
        handler(newVal, oldVal) {},//新旧值可能相同 - y(内存指向相同)
        immediate: true,//初始化绑定时就会执行handler方法
        deep: true//对象中任一属性值发生变化，都会触发handler方法
      }
    //监听单个属性
    "objData.x":{...}
},
//计算属性
computed: {
    objData(){
        return [...this.obj]//解析到新数组并返回 - 解决newVal, oldVal 一致问题
    }
},
...
```

- 当你有一些数据需要随着其它数据变动而变动时，就可以使用`Watch`来监听他们之间的变化。
- 页面刚加载时，因为没有变化，所以不会执行。用`immediate`来解决
- 为了发现对象内部值的变化，可以在选项参数中指定 `deep: true` 。

## 标签属性变化

- `@click="one($event), two($event)"`

- 倾听标签属性变化:
  
  ```vue
  ...
  <view :prop="2333" :change:prop="func"></view>
  ...
  function func(newValue, oldValue, ownInstance, instance){}
  ...
  ```
  

## CSS 功能✨

`vue3`

 `<style scoped>`

- 其 CSS 将仅适用于当前组件的元素

`<style module>` [🔗](https://staging-cn.vuejs.org/api/sfc-css-features.html#css-modules)

### `v-bind()`

- css链接对象状态

```css
.text {
  color: v-bind(/* data属性 */);/*选项式*/
  color: v-bind(/* 暴露的对象 */);/*组合式*/
}
```



## `weex`

  ```js
  //获取元素信息
  var dom = weex.requireModule('dom');
  const result = dom.getComponentRect(this.$refs.xxx, option => {
      console.log('getComponentRect:', option);
      console.log('--------');
      this.size = option.size;
  });
  ```

## 结构

```vue
<script>
export default {
	data() {
		return {
	};
	},
    //方法
	methods: {},
    //计算属性
    computed: {},//get,set
    //侦听器
    watch: {}
};
</script>
```

## [`Vuex`](https://uniapp.dcloud.io/vue3-vuex)

> 具体文件配置:
> [uniapp](https://uniapp.dcloud.io/vue3-vuex?id=state)
> [vue3](https://next.vuex.vuejs.org/zh/guide/state.html)

### 结构

```js
// @/store/index.js
export default store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
    namespaced: true,//模块是否分命名空间
    state: { //存放状态数据 State mapState

    },
    getters: { //类似计算属性 Getter mapGetters
        doneTodosCount: (state, getters) => {
            //state ：可访问数据 //getters：访问其他函数，等同于 store.getters
            return ()=>{}
        }
    },
    mutations: {// 变更状态(不可包含异步) Mutation mapMutations
		add(state, num) {}
    },
    actions: {//通过 mutation 来改变 state //可包含异步 Action mapActions
		addCountAction (context, num) {
            //context 是一个 $store实列
		    context.commit('add')
		}
    },
    modules:{ // Module
        moduleA, moduleB
    }
})
export default store;
//模块 moduleA.js
export default { state, getters ,mutations, actions}

```

- https://zhuanlan.zhihu.com/p/108925230

- `this.$store`

- `import { } from 'vuex'`

- ```js
  ...mapState({ age: state => state.age, })
  ...mapState(['age'])
  ...mapGetters({doneCount: 'doneTodosCount'})
  //Mutation 调用
  import store from '@/store/index.js'
  this.$store
  .commit('add',2)
  .commit({type: 'add',amount: 2})
  //Action 调用
  store.dispatch('addCountAction', 2)
  store.dispatch({ type: 'addCountAction',amount: 2 })
  //Module 模块访问
  state.moduleA
  //namespaced: true 是局部命名空间时: 方法调用("模块名称/方法")
  ```
  
  > 视图状态不更新时可: Vue.set( target, key, value )

## `组件`

### 注册组件

- 符合‘components/组件名称/组件名称.vue’目录结构，easycom方式可直接使用组件

> 全局注册
>
> ```js
> import myComponent from './components/my-component/my-component.vue'
> app.component('my-component', myComponent)//调用app.component方法全局注册组件
> ```

> 局部注册
>
> ```js
> import uniBadge from '@/components/uni-badge/uni-badge.vue';
> export default {
>  components:{uniBadge}
> }
> ```
>
> - 符合 `components/组件名称/组件名称.vue` 目录结构。就可以不用引用、注册，直接在页面中使用。

## 动态组件✨

```vue
<component :is="组件对象"></component>
```

- vue3 

### [props](https://uniapp.dcloud.io/vue3-components?id=props)

- `props` 可以是数组或对象，用于接收来自父组件的数据。

  ```js
  ///
  export default {
      props: {
          Field: {
              type: [String, Number,...], //类型
              default: 0,//默认值
              required: true,//必填?
              validator: function(value) {//验证器
                  return value >= 0//返回 false 的时抛出错误 
              }
          }
      }
  }
  ///
  <componentA :Field="10"> </componentA>
  ```
  
  1. 父级 `prop` 的更新会向下流动到子组件中, 不应该在一个子组件内部改变 `prop
  
  2. 注意在 `JavaScript` 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 `prop` 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。
  
  3. `HTML` 中的 `attribute` 名是`大小写不敏感`的，所以浏览器会把所有大写字符解释为小写字符。
  
     > `<xx :attri-bute="1"><xx>`
     > props:[attribute]
  
  4. 一个非 `prop` 的 `attribute` 是指传向一个组件，但是该组件并没有相应 `props` 或 `emits` 定义的 `attribute`。常见的示例包括 `class`、`style` 和 `id` 属性

#### Attribute 继承

------

组件上的属性会自动添加到根元素的属性中

- 小程序只能有一个根组件 //uni
- 多根组件需添加属性 `v-bind="$attrs"`

## [定义自定义事件](https://uniapp.dcloud.io/vue3-components?id=定义自定义事件)

- 因为 `HTML` dom是大小写不敏感的, 所以建议`kebab-case` (短横线隔开式) 的事件名

1. 定义和监听事件

   2. `优先级高于原生事件`

   ```js
   // 子AB组件
   <button @click="$emit('count-change')"></button>
   //父组件
   <AB @count-change="func"></AB>
   ```

2. **验证抛出的事件**

   1. 与 `prop` 类型验证类似，如果使用对象语法而不是数组语法定义发出的事件，则可以验证它。

   2. ```js
      export default {
          emits: {
              // 没有验证
              click: null,
      
              // 验证submit 事件
              submit: (email, password) => {
                  if (email && password) {
                      return true
                  } else {
                      console.warn('Invalid submit event payload!')
                      return false
                  }
              }
          },
          methods: {
              submitForm() {
                  this.$emit('submit',email, password)
              }
          }
      }
      ```

#### v-model参数 更新props属性的值

```js
//子组件
props: ['number']
this.$emit('update:number', this.number + 1); //子组件通过this.$emit()方法修改number值 并 触发'update:number'事件
//父组件
v-model:number="obj" //直接标签绑定 v-model:prop="值"
```

> 建议使用自定义事件方式

#### [处理 v-model 修饰符](https://uniapp.dcloud.io/vue3-components?id=处理-v-model-修饰符)

1. 添加到组件 `v-model` 上的修饰符将通过 `modelModifiers` prop 提供给组件:

   1. v-model.capitalize & modelModifiers
   
   ```js
   //父组件
   //capitalize是自定义名称
   v-model.capitalize="obj" //修饰符添加在组件的v-model属性标签上
   //子组件
   props: {
       modelModifiers: {
           default: () => ({})
       }
   }
   this.modelModifiers.capitalize//访问capitalize修饰符
   ```

2. 对于带参数的 `v-model` 绑定，生成的 `prop` 名称将为 `arg + "Modifiers"`：
   1. **v-model:xxx.capitalize &  xxxModifiers**

------

## [插槽](https://uniapp.dcloud.io/vue3-components?id=插槽)

- **父和子模板都具有各自的作用域**

- **一个不带 `name` 的 `slot` 出口会带有隐含的名字`“default”`。**

  - 父: `v-slot:name 或 #name` 子: `name`
  
  ```vue
  //父组件
  <xxx v-slot:default="{ obj }">//提供了一个prop对象
  	<view>{{ obj }}</view>//读取对象
  </xxx>
  //子组件
  <view v-for="(item, index) in items">
  	<slot name="default" :aaa="index"></slot>//向 行参 的 prop 属性赋值了index
  </view>
  ```

#### 动态插槽名✨

- 父: `v-slot:[name] 或 #[name]` //vue3

#### [作用域插槽Prop](https://uniapp.dcloud.io/vue3-components?id=作用域插槽)

  绑定在 `slot` 元素上的 属性 被称为**插槽 prop**。

  ```vue
  //子组件todo-list
  <view v-for="(item, index) in items">
  	<slot :aaa="index"></slot>//向 行参 的 prop 属性赋值了index
  </view>
  //父组件
  <todo-list>
  	<template v-slot:default="obj">//向插槽提供属性集合对象名称
  		<view>{{ obj.aaa }}</view>//读取prop属性
  	</template>
  </todo-list>
  ```

   [解构插槽 Prop](https://uniapp.dcloud.io/vue3-components?id=解构插槽-prop)　：

  - 作用域插槽的内部工作原理: 
  
    ```js
    //父插槽
    //default-插槽名称 //obj-行参 //obj2后备内容
    function default(obj = obj2) {
        //插槽内容
        obj.aaa//从obj读取aaa内容
    }
    //子插槽
    //<slot :aaa="index"></slot>//向 行参 的 aaa 属性赋值了index
    ```

  [命名限制](https://uniapp.dcloud.io/vue3-components?id=命名限制)

  <details>
    <summary>不建议使用的</summary>
    提供的内容`只有默认插槽时`, 组件的标签才可以被当作插槽的模板来使用 :<br>
    `＜xxx v-slot="obj"＞＜/xxx＞`<br>
    !! **默认插槽的缩写语法不能和具名插槽混用**，因为它会导致作用域不明确：<br>
    v-slot:default="" - v-slot=""<br>
    现多个插槽，请始终为所有的插槽使用完整的基于 `template` 的语法<br>
  </details>
  

#### 微信端问题

- 解决不能动态name

  ```vue
  //////////hack方法 - 可能并不太靠谱
  <slot name="{{name}}" />
  ////////////////////////////////
  <template slot="name">
      <view>1</view>
  </template>
  ```

## 混入

- 创建js文件 `export default {}`
- 导入混入 `export default { mixins:[<objs>] }`
- 全局 `Vue.mixin({<objs>})`

## 依赖注入✨

`vue3`

处理组件props层级嵌套关系

- Provide (供给)

```js
//组件层(局部)
//import { computed } from 'vue'
export default {
 //provide:{...} //OR
  provide() {
    return {
      message: obj
      //message: computed(() => obj)//通过组合计算属性保持响应性
    }
}
//应用层(全局)
import { createApp } from 'vue'
const app = createApp({})
app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

- Inject (注入)

```js
export default {
  //inject: ['message'] //OR
  inject: {
    /* 别名-> */ localMessage: {from: /* 原注入名-> */ 'message'}
  }
}
```

## [组件实例](https://cn.vuejs.org/v2/api/#vm-refs)

可从任意页面或组件拿取任意数据

## subNVue 原生子窗体

- [api](https://uniapp.dcloud.io/api/window/subNVues?id=app-getsubnvuebyid)
- [配置指南](https://ask.dcloud.net.cn/article/35948)

## [Vue.use()](https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)

- 必须提供 `install` 方法
- 该方法需要在调用 `new Vue()` 之前被调用。

```js
const Plugin = {
    install(Vue, options){}
}
Vue.use(Plugin, options)//options 对应上面的 options
```

## image base64

```javascript
 //:src=" 'data:image/jpeg;base64,' + base64-Obj "
```

## BindingX

- timing
  1. `expression`: easingFunction(t, 起始位置, 移动距离, 持续时间)
