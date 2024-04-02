## tip

##### [路由通配符](https://www.npmjs.com/package/path-to-regexp) `?`, `+`, `*`, 和`()`

##### [重定向](https://docs.nestjs.com/controllers#redirection)

##### [RECIPES工具](https://docs.nestjs.com/recipes/crud-generator)

##### 生成器 `nest g `mo-模块 co-控制器 s-服务 resource-新资源

## [部分装饰器](https://docs.nestjs.cn/9/customdecorators?id=%e5%8f%82%e6%95%b0%e8%a3%85%e9%a5%b0%e5%99%a8)

`@Param(key?: string, ...pipes?)`
`@Query(key?: string, ...pipes?)`
`@UsePipes()`

## 控制器

### [路由参数](https://docs.nestjs.com/controllers#route-parameters)

```typescript
//url: http://127.0.0.1:3000/e/w
@Get(':id/:xx')
getTest(@Param() params): string {
    console.log(params);//{ id: 'e', xx: 'w' }
    return "OK";
}
```

### `@Controller(<Options || string>)`

1. 路由路径`@HostParam('www')` or `{ path:'www' }`
1. 子域路由`{ host: 'www.ling-in.top' }`(Fastify不支持)

### 路径前缀`@Controller('cats')`

### [请求有效载荷](https://docs.nestjs.com/controllers#request-payloads)

1. `ValidationPipe`会过滤掉不规范荷载

```typescript
export class CreateCatDto {//官方建议使用类
    //荷载白名单
  name: string;
  age: number;
}
```

```typescript
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

### @Res

> `@Res()`或`@Response()`处理程序时，将置于**库特定模式**，并且**您将负责管理响应**（例如，`res.json(...)`或）来发出某种响应`res.send(...)`，否则 HTTP 服务器将挂起。
> 失去依赖于Nest标准响应处理的Nest功能的兼容性，例如拦截器和`@HttpCode()`/`@Header()`装饰器。要解决此问题，您可以将`passthrough`选项设置为`true`，如下所示：

```typescript
findAll(@Res({ passthrough: true }) res: Response) {
  res.status(HttpStatus.OK);
  return [];
}
```

## Provide / Injec

### **@Inject**

```typescript
@Injectable()
export class HttpService<T> {
    @Inject('HTTP_OPTIONS')
    private readonly httpClient: T;
    //or
    constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```

注册

```typescript
//app.module.ts
@Module({ providers: [HttpService] })
export class AppModule {}
```

### [手动实例化](https://docs.nestjs.com/providers#manual-instantiation)

## 模块

| `@Module(<Options>)` |                                                     |
| -------------------- | --------------------------------------------------- |
| providers            | 注册 注入器(模块中所有用到的功能类，模块内共享实用) |
| controllers          | 注册 控制器                                         |
| imports              | 导入 其他模块中导出的Providers(以实现共享)          |
| exports              | 导出 Providers                                      |

### 全局

- 全局模块`@Global`应该只注册**一次**，通常由根模块或核心模块注册。

  ```typescript
  @Global() @Module({})
  export class CatsModule {}
  ```

### [动态模块](https://docs.nestjs.com/fundamentals/dynamic-modules)

```typescript
//部分
@Module({
  imports: [Module.forRoot([User])],
  exports: [Module],
})
```

## [中间件](https://docs.nestjs.cn/9/middlewares)

- 可以在在具有`@Injectable()`装饰器的**类**中实现自定义`Nest`中间件。

  ```typescript
  //middleware.ts
  @Injectable()
  export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) { next(); }
  }
  //或 函数式
  export function logger(req, res, next) { next(); };
  ```

  > 中间件没有任何依赖关系时，我们可以考虑使用函数式中间件。

- 使用中间件

  ```typescript
  //app.module.ts
  @Module({imports: []})
  export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
      	.apply(middleware)//middleware.ts
          .exclude(
          { path: 'cats', method: RequestMethod.GET },
          { path: 'cats', method: RequestMethod.POST },
          'cats/(.*)',
      	)
      	.forRoutes('');
        //.forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
        //.forRoutes(AppController);//控制器类
    }
  }
  ```

  `apply()` - 注册中间件

  1. 可入参**多**个中间件

  `exclude()` - 排除路由

  1. 不使用`exclude()`直接在中间件内部进行逻辑处理也是可以的

  `forRoutes(<Options>)` - 特定路径和请求方式的中间件

  1. 可接受一个字符串、多个**字符串**、**对象**、一个**控制器类**甚至多个控制器类。

- 全局中间件

  ```typescript
  //main.ts
  //const app = await NestFactory.create(AppModule);
  app.use(middleware);
  //await app.listen(3000);
  ```

  > 或`.forRoutes('*')`

## [异常处理](https://docs.nestjs.com/exception-filters#custom-exceptions)

```typescript
throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
```

`HttpException(response,status)`

- `response<string | obj>` 响应信息
- `status<number>` HTTP[状态代码](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)。

### [异常过滤器](https://docs.nestjs.com/exception-filters#exception-filters-1)

> 有点像是`HttpException`的中间件

## 管道(pipes)

> 管道在异常区内运行,
> 这意味着(管道内可直接抛出异常响应)当 Pipe 抛出异常时,它由异常层处理（**异常过滤器**).
>
> **客户端请求 -> 过滤 -> 管道 -> 请求处理程序**

### [内置管道](https://docs.nestjs.com/pipes#built-in-pipes)

- 自定义状态码示例:`new ParseIntPipe({ errorHttpStatusCode: 400 })` - 部分入参选项

> [部分介绍](#validator)

### [自定义管道](https://docs.nestjs.com/pipes#custom-pipes)

```typescript
@Injectable()
export class ValidationPipe implements PipeTransform<any, ArgumentMetadata> {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

- `PipeTransform<T, R>` `T`-value类型 `R`返回值类型
- `value` 当前处理方法参数的值
- `metadata` 当前处理方法参数的元数据

> 绑定管道示例:
> `@UsePipes(Pipe)`
> `@Body(Pipe)`

### [全局管道](https://docs.nestjs.com/pipes#global-scoped-pipes)

`app.useGlobalPipes(<...Pipes>);`

> 全局管道用于整个应用程序、每个控制器和每个路由处理程序。
>
> **注意**对于[混合应用程序](https://docs.nestjs.com/faq/hybrid-application)，该`useGlobalPipes()`方法不会为网关和微服务设置管道。
> 对于标准(非混合) 微服务应用使用 `useGlobalPipes()` 全局设置管道。

**真全局**

```typescript
//app.module.ts
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [{provide: APP_PIPE, useClass: ValidationPipe}]
})
export class AppModule {}
```

[对象结构验证](https://docs.nestjs.com/pipes#object-schema-validation)

## <a id="validator">验证器</a>

`npm i --save class-validator class-transformer`

class-validator - 类和对象的相互转换 [#](https://github.com/typestack/class-transformer#table-of-contents)
class-transformer - 各种意义上的验证器 [#](https://github.com/typestack/class-validator#validation-decorators)

- [ValidationPipe](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe)

  ```typescript
  //app.module.ts
  app.useGlobalPipes(
      new ValidationPipe({//一些习惯性配置
          transform: true,
          enableDebugMessages: true,
          whitelist: true,
          stopAtFirstError: true,
          disableErrorMessages: false,
          forbidUnknownValues: true,
          forbidNonWhitelisted: true,
          // exceptionFactory: (err) => {
          //   console.log(err);
          // },
      }),
  );
  ```

  > 内置`ValidationPipe`基于`class-validator`和`class-transformer`

- `ParseArrayPipe` - 数组类型限制

  ```typescript
  new ParseArrayPipe({ items: Number })
  ```

### 工具类

- `PartialType()` - 将类属性添加可选类型
- `PickType()` - 类中挑选属性并返回新类
- `OmitType()` - 与`PickType()`相反
- `IntersectionType()` - 合并类型

## nestjs的元数据

`@SetMetadata(key:string, value:any)` - 定义元数据

`<Reflector>.get(key, target)` - 获取元数据

`<Reflector>.getAllAndOverride(key,targets:[])` - 覆盖(仅context)

`<Reflector>.getAllAndMerge(key,targets:[])` - 合并(仅context)

> [执行上下文](https://docs.nestjs.com/fundamentals/execution-context#executioncontext-class)

