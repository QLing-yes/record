

[path](http://nodejs.org/api/path.html)：处理文件路径

[fs](http://nodejs.org/api/fs.html)：操作文件系统

[child_process](http://nodejs.org/api/child_process.html)：新建子进程

[util](https://link.jianshu.com?t=http://nodejs.org/api/util.html)：提供一系列实用小工具

[http](https://link.jianshu.com?t=http://nodejs.org/api/http.html)：提供HTTP服务器功能

[url](https://link.jianshu.com?t=http://nodejs.org/api/url.html)：用于解析URL

[querystring](https://link.jianshu.com?t=http://nodejs.org/api/querystring.html)：解析URL中的查询字符串

[crypto](https://link.jianshu.com?t=http://nodejs.org/api/crypto.html)：提供加密和解密功能

# [Node.js 如何处理 ES6 模块](https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)

# 模块化

**✨exports 和 module.exports**

- require() 返回的是 module.exports 而不是 exports
- exports指向module.exports的一个引用。
- module也是局部变量（即只在模块中）

- 实际上模块中的代码都是包装在一个函数中执行的,并且在函数行时,同时传递进了5个实参

  ```js
  function (exports, require, module, __filename, __dirname)
  ```

  

# 全局对象 global

在node中有一个全局对象 `global`,它的作用和网页中 `window`类似

- ​	**声明全局**`a = 1; global.a = 1;`

## 局部 （注意形参）

```js
//console.log(arguments.callee +"");--**打印如下：**
function (exports, require, module, __filename, __dirname) {
    
console.log(arguments.callee +"");//其实整体是在一个函数内部写
}
//arguments是function 对象(){}原型里的
//他里面还有一个属性callee -里面对应一个函数,就是当前的(function 对象(形参){参数}) | arguments.callee
```

## function (exports, require, module, __filename, __dirname)

**exports**
    --该对象用来将变量或函数暴露到外部
**require**
    --函数,用来引入外部的模块
**module**
	--module代表的是当前模块本身
    --exports就是module的属性
    --既可以使用 exports导出,也可以使用module. exports导出
**__filename**
	--当前模块的完整路径
**__dirname**
	--当前模块所在文件夹路径

# 包

**包结构**
    包实际上就是一个压缩文件,解压以后还
    原为目录。符合规范的目录,应该包含如
    下文件:
        --package.json	描述文件
        --bin					  可执行二进制文件
        --lib 					   js代码
        --doc					  文档
        --test					  单元测试



[15:00](https://www.bilibili.com/video/BV1bs411E7pD?p=9&spm_id_from=pageDriver)

# `文件系统（File System）`

## **buffer（缓冲区）**buffer.from()

​		--Buffer的结构和数组很像,操作的方法也和数组类似
​		--数组中不能存储二进制的文件(mp3,图片,视频)，而 buffer就是专门用来存储二进制数据

### [**Buffer.allocUnsafe(size)**](http://nodejs.cn/api/buffer.html#buffer_static_method_buffer_allocunsafe_size)

​				`Buffer.alloc();创建安全的`
​				`Buffer.allocUnsafe();创建不安全的` -性能好--但有敏感数据
​				`变量.fill(0);初始化为`
​				`Buffer.from();将一个字符串转为Buffer` -也就是二进制 - (控制台一般输出十进制)

```js
//创建一个10个字的 Buffer
var buf = Buffer.alloc(10);
//通过索引,来操作buf中的元素
buf[0]=88;//默认十进制
buf[1]=255;//默认十进制
buf[2]=0xaa;	//以十六进制
console.log(buf);//<Buffer 58 ff aa 00 00 00 00 00 00 00>//object
console.log(buf[0]);//number-**控制台输出数字都是十进制**
buf.fill(0);//初始化为0
console.log(buf);//<Buffer 00 00 00 00 00 00 00 00 00 00>
```

```js
//用户数据可以传入buffer，然后解码(.toString())读出；
var buf = Buffer.alloc(10);
var txt = Buffer.from("资料");
console.log("txt=",txt);
buf = txt;
console.log(buf.toString());//资料
```

> Buffer的大小一旦确定则不能修改（Buffer实际上是对底层内存的直接操作）
>
> Buffer中存储的都是**二进制数据**，但是都是以**十六进制显示**（可能不同）
> **控制台输出数字都是十进制**
> 范围：零 至 八个一；超出取前或后8位置（一般是后）

## 同步文件写入

**1.打开文件**
    `fs.openSync (path, flags[, mode]);`
       --path	要打开文件的路径
       --flags	打开文件要做的**操作的类型**（r读/w写）[操作类型更多](http://nodejs.cn/api/fs.html#fs_file_system_flags)
       --mode	投置文件的操作权限,一般不传
	   --返回值：返回一个文件的描述符
**2.向文件中写入内容**
    `fs.writeSync (fd, string[, position[, encoding]]);`
        --fd	文件的描述符,需要传递要写入的文件的描述符
        --string	要写入的内容
        --position	起始位置
        --encoding	编码(默认UTF-8)
		--返回值：字节数
**3.保存并关闭文件**
	`fs.closeSync(fd);`
		--fd	文件的描述符,需要传递要写入的文件的描述符

## 异步文件写入

**1.打开文件**
	`fs.open (path, flags[, mode], callback);`
			...省略
			--callback	这里填一个构造函数；(err,fd)
	**返回值：**
			--都是 **通过回调函数** 的参数返回的；
			--err 错误对象,如果没有错误则为null；fd 文件的描述符；
			--可以通过判断有无err；

```javascript
var fs = require("fs");
fs.open("hello.txt","w",function(err,fd) {
	//判断是否出错
	if (!err) {
		//没出错则执行写入操作
		console.log(fd);
		fs.write(fd,"lingL",function(err){
			if(!err){console.log("写入成功")};
		});
	} else {
		console.log(err);
	}
});
```

**2.向文件中写入内容**
	`fs.write(fd, string[, position[, encoding]], callback);`
			...省略
			--callback	这里填一个构造函数；(err-错误, written-字节数, string-内容)

**3.关闭文件**
`fs.close(fd,callback);`
	...省略
	--callback	这里填一个构造函数；(err)



> **异步代码通过后台进程池操作，不会阻塞其他进程执行；**
> 注意导入模块：`var fs = require("fs");`

## [简单文件写入](http://nodejs.cn/api/fs.html#fs_fs_writefile_file_data_options_callback)

`fs.writeFile(file, data[, options], callback)`
`fs.writeFileSync(file, data[, options])`

​	--file	文件名或文件描述符**或路径**
​	--data	要写入的数据
​	--callback	:    (err)
​	--options	：要以对象形式传入如-,{flag:"w"},

> options

- `encoding` [`<string>`](http://url.nodejs.cn/9Tw2bK) | [`<null>`](http://url.nodejs.cn/334hvC) **默认值:** `'utf8'`。
- `mode` [`<integer>`](http://url.nodejs.cn/SXbo1v) **默认值:** `0o666`。
- `flag`  参见[文件系统 `flag` 的支持](http://nodejs.cn/api/fs.html#fs_file_system_flags)。 **默认值:** `'w'`。

<img src="..\image\image-20210218110825429.png" alt="image-20210218110825429" style="zoom: 70%;float: left" />

## [流式文件写入](http://nodejs.cn/api/fs.html#fs_fs_createwritestream_path_options)

​	`fs.createWriteStream(path[, options])`
​		--path	路径
​		--options	配置

​		write	通过write()写入
​		open	打开
​		close	关闭接**收**	.close()
​		end	  关闭发**送**	.end()

###### 事件方法-监听-JQ

​		--通过.on("事件", 构造函数)可以给对象绑定一个事件，事件运行时触发；
​		--on	：长期有效的事件；	once	：一次性的事件（触发后自动失效）;



> 同步、异步、筒单文件的写入都不适合大文件的写入,性能较差,容易导致内存溢出

## 同步文件--[读取](http://nodejs.cn/api/fs.html#fs_fs_readfilesync_path_options)

`fs.readFileSync(path[, options])`

## 异步文件--[读取](http://nodejs.cn/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback)

`fs.read(fd, buffer, offset, length, position, callback)`
`fs.read(fd, [options,] callback)`

## 简单文件--[读取](http://nodejs.cn/api/fs.html#fs_fs_readfile_path_options_callback)

`fs.readFile(path[, options], callback)`

## 流式文件--[读取](http://nodejs.cn/api/fs.html#fs_fs_createreadstream_path_options)

`fs.createReadStream(path[, options])`
	--流式需要通过绑定data读取；可以通过	对象.on绑定；`对象.on("data",(data) => {console.log(data)});`
	--data.length

### 复制粘贴--管道(通用)

​	`对象.pipe(对象)`--**之间搭建管道**

```js
var rs = fs.createReadStream();
var ws = fs.createWriteStream();
rs.pipe(ws);
```



> （fd | path路径，options配置，callback构造函数(err, data)）
>
> **buffer** - 数据写入的缓冲区。
> **offset** - 缓冲区写入的写入偏移量。
> **length** - 要从文件中读取的字节数。
> **position** - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
> **callback** - 回调函数,有三个参数,err 为错误信息,bytesRead 表示读取的字节数,buffer 为缓冲区对象。

> 内容data；返回`<Buffer>`	通过特定解码读取

## 验证路径是否存在

`fs.existsSync(path)`--如果路径存在，则返回 `true`，否则返回 `false`。

## [获取文件信息](http://nodejs.cn/api/fs.html#fs_fs_stat_path_options_callback)

`fs.stat(path[, options], callback)`-异步- err - stats
`fs.statSync(path[, options])`-同步

## [删除文件](http://nodejs.cn/api/fs.html#fs_fs_unlink_path_callback)

`fs.unlink(path, callback)`-异步 - err
`fs.unlinkSync(path)`-同步

## [删除目录](http://nodejs.cn/api/fs.html#fs_fs_rmdir_path_options_callback)

`fs.rmdir(path[, options], callback)` - err

## [列出文件](http://nodejs.cn/api/fs.html#fs_fs_readdir_path_options_callback)

`fs.readdir(path[, options], callback)` - err - files
`fs.readdirSync(path[, options])`

## [截断文件](http://nodejs.cn/api/fs.html#fs_fs_truncate_path_len_callback)

`fs.truncate(path[, len], callback)` - err
`fs.truncateSync(path[, len])` - len = 数字 -设置字节数 

## [建立目录](http://nodejs.cn/api/fs.html#fs_fs_mkdir_path_options_callback)

`fs.mkdir(path[, options], callback)` - err
`fs.mkdirSync(path[, options])`

## [重命名和剪切](http://nodejs.cn/api/fs.html#fs_fs_rename_oldpath_newpath_callback)

`fs.rename(oldPath, newPath, callback)` - err
`fs.renameSync(oldPath, newPath)` - (老路径，新路径) -也可以剪切移动

## [监视文件更改写入](http://nodejs.cn/api/fs.html#fs_fs_watchfile_filename_options_listener)

`fs.watchFile(filename[, options], listener)` - (名字，配置，回调函数(curr, prev))
	回调函数 :	文件发生变化时执行；
	(curr当前文件状态, prev修改后状态)

`options` [](http://url.nodejs.cn/jzn6Ao)

- `bigint` **默认值:** `false`。
- `persistent` **默认值:** `true`。
- `interval`  **默认值:** `5007`。

# 自定义事件

**Node.js 为我们提供了一个`事件模块`：EventEmitter，我们可以用它来处理事件**

```js
const EventEmitter = require('events')
const eventEmitter = new EventEmitter()
```

**eventEmitter 对象上有两个方法：on 和 emit**

- on 用于`添加自定义事件`，注册回调函数
- emit 用于`触发事件`，并将参数传递给回调函数

```js
eventEmitter.on('start', (e) => {
  console.log(e)
})
eventEmitter.emit('start', 'started')
//控制台将会打印 started
```

https://juejin.cn/post/6844904199013007367

# `Hash 哈希加密`

[文档](http://nodejs.cn/api/crypto/class_hash.html)

```js
//哈希 + 盐
const { createHash } = require('crypto');
function Hash(password) {
    let hash = createHash('sha256');//哈希方式
    var salt = '1Ee#';
    var value = `${password}` + salt;
    return hash.update(value).digest('hex');//update(value) 和 digest(编码)
}
```

[哈希方式](https://1024tools.com/hash)

# `express`

**res:**

- res.header()

  > Access-Control-Allow-Origin / 允许的域
  >
  > ```js
  > Access-Control-Allow-Origin: *				//允许所有域
  > Access-Control-Allow-Origin: <origin>		//指定域
  > ```
  
  > Vary / 
  >
  > ```
  > Vary: Origin
  > ```

  > Access-Control-Allow-Headers / 允许客户端携带的头信息
  >

  > Access-Control-Allow-Methods / 允许客户端使用的请求方法
  >
  > ```js
  > Access-Control-Allow-Methods:'PUT,POST,GET,DELETE,OPTIONS,PATCH';
  > ```

  > Content-Type / 告诉客户端实际返回的内容的内容类型
  >
  > ```js
  > Content-Type:'application/json;charset=utf-8';
  > ```

  > X-Powered-By /  服务器,语言,版本...信息
  >
  > ```js
  > X-Powered-By: ... //版本信息
  > ```

  > Access-Control-Max-Age / 预检请求缓存时间
  > （预检请求）的返回结果（即 Access-Control-Allow-Methods 和Access-Control-Allow-Headers 提供的信息） 可以被缓存多久。
  > 由于不想让客户端每次都发一个**OPTIONS预检测**，后台可以配置Access-Control-Max-Age来缓存预检测
  >
  > ```js
  > Access-Control-Max-Age: 600;//s
  > ```

------

GET					方法请求一个指定资源的表示形式，使用GET的请求应该只被用于获取数据。
HEAD				方法请求一个与GET请求的响应相同的响应，但没有响应体。
POST		 		方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用。
PUT					方法用请求有效载荷替换目标资源的所有当前表示。
DELETE	 		方法删除指定的资源。
CONNECT		 方法建立一个到由目标资源标识的服务器的隧道。
OPTIONS		  方法用于描述目标资源的通信选项(预检测)。
TRACE			   方法沿着到目标资源的路径执行一个消息环回测试。
PATCH			   方法用于对资源应用部分修改。

## req/res/app 属性

```js
req.method;//客户端http的请求方式
req.headers.origin//获取域
"主机", req.path, "域名", req.headers.origin
"请求方式", req.method, "请求路径", req.hostname
'req请求体：', req.body,'req链接参数：', req.query
```

```js
res.status(200)//状态
res.send()//发送
```

```js
const app = express();
app.set('x-powered-by',false) //Express中禁用某头方式//不会在客户端显示
app.use(express.json());//只接收json
app.all('*', function (req, res, next){})//*统一设置一些东西

```

