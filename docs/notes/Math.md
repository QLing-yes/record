# [Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)

|      | sqrt `平方根`  | min `最小值`       |
| :--- | :------------- | :----------------- |
|      | cbrt `立方根`  | max `最大值`       |
|      | log `对数`     | round `四舍五入`   |
|      | abs `取绝对值` | floor `地板函数`   |
|      | atan `反正切`  | ceil  `天花板函数` |
|      | trunc `去小数` | pow `次方幂`       |
|      | PI `π派`       |                    |

## [三角函数sin\cos\tan\cot角度计算](https://www.jianshu.com/p/069291bedbc8)

## 其他

- `~`  NOT运算符 反转所有位(先转32位进制整数后反转)

  ```js
  ~3 // -3
  ~~3.141592654 // 3
  parseInt() //去小数
  ```

# 已知起点坐标、角度、长度 `求终点坐标`

```js
//角度转弧度
var radian = (angle * Math.PI) / 180;
//计算新坐标 R 就是两者的距离
old_x + distance * Math.Cos(radian);
old_y + distance * Math.Sin(radian);
```

#  欧拉角 四元素 ...

https://malei0311.gitbooks.io/threejs-doc-cn/content/getstart/matrix_transformations.html

# 贝塞尔曲线算法

> https://segmentfault.com/a/1190000018597975

<img style="height:180px;width:600px;" src="https://segmentfault.com/img/bVbqccZ/view?w=360&h=150" alt="preview"  />

`点到点的过程为 t = 起点 / 目标 * 100`

1. a和b点连成线段ab，点o沿ab起点至终点（一阶）
2. c和d点 成线段cd，d和e点 成线段de。点a沿cd起点至终点，点b沿de起点至终点（二阶）
3. n阶...; 就是一堆 点到点点到点点到点 的相同耗时的运动过程

> 搭配`requestAnimationFrame`方法(web)食用更佳