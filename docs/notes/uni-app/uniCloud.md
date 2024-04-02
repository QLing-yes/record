# 云函数

## 部分规范

- 单个云函数大小限制为10M（包含node_modules）
- 云函数内使用commonjs规范，不可使用import、export，参考：[commonjs模块](http://nodejs.cn/api/modules.html#modules_modules_commonjs_modules)

1. 绝对路径 path.resolve(__dirname,'./info.txt')

2. [连接多个服务空间](https://uniapp.dcloud.io/uniCloud/init?id=init-unicloud)

3. [API列表](https://uniapp.dcloud.io/uniCloud/cf-functions?id=api列表)

4. [!!!云函数配置](https://uniapp.dcloud.io/uniCloud/cf-functions?id=云函数配置)

5. [!!!云函数package.json](https://uniapp.dcloud.io/uniCloud/cf-functions?id=packagejson)

6. [!!!注意事项](https://uniapp.dcloud.io/uniCloud/cf-functions?id=注意事项)

   > 当一个云函数初次被触发时(冷启动)，其完整过程如下：
   >
   > 1. 实例化 计算实例(云函数)
   > 2. 加载函数代码
   > 3. 启动 node
   > 4. 执行代码

7. 关于单实例多并发

   - 云函数的实例并发度设置为10时（即1个实例可以同时处理10个请求）
   
8. [冷热启动](https://uniapp.dcloud.io/uniCloud/cf-functions?id=launchtype)
```js
   //阿里云是15分钟内没有第二次访问的云函数，就会被回收。腾讯云是半小时。
   let count = 0;
   module.exports = async (event) => {
     return count++
     //云函数实例未复用时，每次返回0
     //若实例被复用，则可能返回1、2、3等各种意外情况
   }
```

## [云函数公用模块](https://uniapp.dcloud.io/uniCloud/cf-common?id=云函数公用模块)

1. 右击 common 文件夹 新建模块
2. 右击 云函数 文件夹选择 `管理公共模块依赖` 添加
3. 然后云涵数内使用 `require()` 方法导入

> npm镜像源需要 默认的; 设置里npm路径不需要填写;

## API

- 部分

```
CLIENTIP, // 客户端ip信息
CLIENTUA, // 客户端user-agent
SPACEINFO, // 当前环境信息 {spaceId:'xxx',provider:'tencent'}
SOURCE, // 当前云函数被何种方式调用
// 以下四个属性只有使用uni-app以callFunction方式调用才能获取
OS, //客户端操作系统，返回值：android、ios    等
PLATFORM, //运行平台，返回值为 mp-weixin、app-plus等
APPID, // manifest.json中配置的appid
DEVICEID // 客户端标识，新增于HBuilderX 3.1.0，同uni-app客户端getSystemInfo接口获取的deviceId
path//访问地址
```

# [云数据库](https://uniapp.dcloud.io/uniCloud/cf-database?id=%e8%8e%b7%e5%8f%96%e9%9b%86%e5%90%88%e7%9a%84%e5%bc%95%e7%94%a8)

1. 数据库索引

   > **注意**
   >
   > - 如果记录中已经存在多个记录某字段相同的情况，那么将该字段设为唯一型索引会失败。
   > - 假如记录中不存在某个字段，则对索引字段来说其值默认为 null，如果该索引字段设为唯一型索引，则不允许存在两个或以上的该字段为null或不存在该字段的记录。此时需要设置稀疏索引来解决多个null重复的问题
   > - 唯一索引同名字段值不可相同

2. 
