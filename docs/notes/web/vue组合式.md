## 介绍 [🔗](https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose)

- **组合式 API**  [setup](https://staging-cn.vuejs.org/api/sfc-script-setup.html)

  1. ```vue
     <script setup>
     	defineExpose({  a,  b })//暴露的对象
     </script>
     /* OR */
     <script>
     	export default { setup() {return {/*暴露对象*/} }//通过this访问setup暴露的对象
     </script>
     ```

  2. 完美取代`mixin`。

## 响应式

#### reactive() shallowReactive()

- `reactive()`**默认是深层响应式**(深代理);

- 浅响应使用 `shallowReactive()`

- 当你更改响应式状态后，DOM 也会自动更新. 

  (在更新周期的 “下个时机” 以确保无论你进行了多少次声明更改，每个组件都只需要更新一次。)

- `nextTick(func)`更新后的dom;

```javascript
import { reactive } from 'vue'
const state = reactive({ ... })//reactive() 返回一个原始对象的 Proxy
```

 `reactive()` [的局限性](https://staging-cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)

> 仅对引用类型有效

**`ref()` 定义响应式变量**

- ShallowRef()//浅

- `ref()` 使我们能创造一种**任意值的 “引用”** 并能够不丢失响应性地随意传递
-  ref 在作为组件模板顶层 property 被访问时，它们会被自动“解包(解构)”
- 在深层响应式对象内时，会发生 ref 解包;

```javascript
import { ref } from 'vue'
const count = ref(0);//{ value: 0 }
count.value = { xx: 0 };//{ value: { xx: 0 } }
```

- 响应性语法糖 `$ref()`
  1. 无需手动添加value
  2. **处于实验性阶段**

## [生命周期](https://cn.vuejs.org/api/composition-api-lifecycle.html)



## 自定义指令

```vue
<script setup>
// 在模板中注册 v-focus
const vFocus = {
    //el当前元素
  mounted: (el) => el.focus()
}
//OR
export default {
  directives: {
    // 在模板中启用 v-focus
    focus
  }
}
</script>
```

### [指令钩子](https://staging-cn.vuejs.org/guide/reusability/custom-directives.html#directive-hooks)

> 除了 `el` 外，你应该将这些参数都视为只读的。若你需要在不同的钩子间共享信息，推荐方法是通过元素的 [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) attribute。

**`简化形式`**

```javascript
//v-xxx 
// 这会在 `mounted` 和 `updated` 时都调用
app.directive('xxx', (/* 钩子参数 */) => {})
```

### el

```javascript
vnode.data.on.<someEvent>.apply(vnode.context,[参数...]);//触发并代理
el.event.appear.handler = () => {//修改代理
    vnode._vei.onAppear();//触发事件//vue3
    vnode.data.on.appear();//触发事件//vue2
}
```

------

> TIP

- 当所需功能只能通过直接 DOM 操作来实现时，才应该使用自定义指令。
- 自定义指令的参数也可以是动态的`v-example:[arg]="value"`
- 组件上使用自定义指令时，它会始终应用于组件的根节点

## [插件](https://staging-cn.vuejs.org/guide/reusability/plugins.html#introduction)

- use()必须提供 `install` 方法
- 该方法需要在调用 `new Vue()` 之前被调用。

```javascript
import { createApp } from 'vue'
const app = createApp({})
const Plugin = {
    install(app, options){}
}
app.use(Plugin, options)//options 对应上面的 options
```

## [异步组件](https://staging-cn.vuejs.org/guide/components/async.html#async-components)

- 拆分应用为更小的块，并仅在需要时再从服务器加载相关组件

```js
const Foo = defineAsyncComponent(() => import('./Foo.vue'))
const Foo = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => { resolve(/* 获取到的组件 */) })
})
```

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),
  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

## [Suspense](https://cn.vuejs.org/guide/built-ins/suspense.html#suspense)

## :is

```vue
<component :is="uuu" />
<div is="vue:uuu"></div>
```

## $refs

- 视图渲染后赋值

```javascript
const content = ref<Element>();
//<div ref="content" />
//unref(content) -> isRef(val) ? val.value : val
//:ref="(el) => child = el"
const tiptap = ref<InstanceType<typeof Component>>//获取组件实列(具有类型)
```

## provide / inject

```javascript
const ProductKey: InjectionKey<{a:string}> = Symbol('Product');
provide(ProductKey,{a:'1'});
inject(ProductKey);
```

> 建议不使用`provide / inject`, 自己创建文件去管理状态

## Props

```javascript
const post = { id: 1,title: 'Vue' }
<BlogPost v-bind="post" /> //等价于 ↓
//<BlogPost :id="post.id" :title="post.title" />
```

```typescript
type prop = {
  id?: string[]
}
const props = defineProps<prop>()
//prop属性
        prop: {
            type: [String, Number,...], //类型
            default: 0,//默认值
            required: true,//必填?
            validator: function(value) {//验证器
                return value >= 0//返回 false 的时抛出错误 
            }
        }
```

## $emit

```typescript
const emit = defineEmits(['inFocus', 'xx'])
emit('xx')
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
emit('change',1)
```

```javascript
const emit = defineEmits({ xx(payload){ /*返回值bool 判断验证是否通过*/ } })
```

> [配合 `v-model` 使用](https://cn.vuejs.org/guide/components/events.html#usage-with-v-model)

## slot

```javascript
//A.vue
<div>
    <slot name="header" xx="1"></slot>
</div>
//B.vue
<A v-slot="attr">
  <template v-slot:header>//#name // #[name] //#[name]="attr"
    <div>{{attr.xx}}</div>
  </template>
</A>
```

## setup函数

- ctx 上下文对象

```javascript
export default {
  emits: ['submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

## 定义全局对象

```typescript
//最好在入口文件内
window.$foo = (...params) => { return '1' }
//declare.d.ts
declare function foo(params: number, d: string): string
//使用
$foo(1,'1')
```

> OR: provide / inject
>
> ...

## script setup

#### 组件实列类型

```js
//导出对象(a.vue)
defineExpose({})
//b.vue
import A from 'a.vue'
const _A = ref<InstanceType<typeof A>>()
```

## Pinia

### 结构

```typescript
import { createPinia, defineStore, setMapStoreSuffix } from 'pinia'

//定义
export const useStore = defineStore('id1', {
  state: () => ({}),
  // state === getters
  getters: {},
  actions: {},
})
export default useStore

//注册(main.ts)
setMapStoreSuffix('Store')// 自定义mapStores的属性访问后缀
declare module 'pinia' {
  export interface MapStoresCustomization {
    suffix: 'Store'// 自定义mapStores的属性访问后缀
  }
}
const pinia = createPinia()
pinia.use(SecretPiniaPlugin)
new Vue({ pinia }).$mount('#app')

//使用
store.name// 通用访问
mapState(useStore, ['name'])// 只读
mapWritableState(useStore, ['name'])// 可写
// 访问多个store集合
mapStores(useStore, useStore2)//使用(id + 后缀"Store" -> mapStores["id1Store"])
// 访问 action
mapActions(useStore, ['name'])
```

### [方法API](https://pinia.vuejs.org/zh/core-concepts/state.html#resetting-the-state)

```typescript
//将 state 重置为初始值。
store.$reset()
//批量修改 state
store.$patch({} | (state) => {})
//替换 state
state.value = {}

//侦听 state 变化($patch 后只触发一次)
store.$subscribe((mutation, state) => {
  mutation.type // 'direct' | 'patch object' | 'patch function'
  mutation.payload // 传递给 $patch() 的补丁对象。
  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  localStorage.setItem('cart', JSON.stringify(state))
},{ detached: true })//detached 是否从组件中分离(true时组件卸载时不销毁侦听)

//侦听 action
const unsubscribe = store.$onAction(({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
	}) => {
    // 它等待着promise的成功返回 
    after((result) => {})
    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {})
}, true) //参数二表示是否从组件中分离
// 手动删除监听器
unsubscribe()

```

### [插件](https://pinia.vuejs.org/zh/core-concepts/plugins.html)

```typescript
function SecretPiniaPlugin(context: PiniaPluginContext) {
    
  context.pinia // 用 `createPinia()` 创建的 pinia。 
  context.app // 用 `createApp()` 创建的当前应用(仅 Vue 3)。
  context.store // 该插件想扩展的 store
  context.options // 定义传给 `defineStore()` 的 store 的可选对象。
    
  const {store} = context;
  // 每个store都有单独的自定义属性
  store.hello = ref('secret')
  // 所有的store都共享shared属性
  store.shared = ''
    
  return { }//创建的每个store中都会添加其中的属性。
}

//main.ts
import { createPinia } from 'pinia'
const pinia = createPinia()
pinia.use(SecretPiniaPlugin)
```

### [组合式 Store](https://pinia.vuejs.org/zh/cookbook/composing-stores.html)

> **两个或更多的store相互使用时**不可以在 setup函数 中直接互相读取对方, 但可以在函数中

- `ref()` 就是 `state` 属性
- `computed()` 就是 `getters`
- `function()` 就是 `actions`

```typescript
import { computed } from 'vue'
export const useCounterStore = defineStore('counter', () => {
    const myState = ref({})
    function myActions() {}
    const myGetters = computed(() => myState)
    return { myState, myActions, myGetters }
})
```

