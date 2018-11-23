# 前言

javascript 是 **单线程**、 **非阻塞** 的脚本语言，用来与浏览器交互。

> 单线程： 在任何时候 js 只有一个主线程来执行代码。
> 非阻塞： 在处理异步任务时，主线程先挂起（pending）这个任务，当异步任务返回结果时再执行相应的回调程序。

为了实现非阻塞这个特点，javascript 引擎引入了Event Loop（事件循环）这个机制。


# 浏览器环境

## 图示

```graph
graph TD;
   A(开始)-->B[主程序执行中]
   B-.->|调用BrowserApi|J[产生异步任务并挂起]
   B-->C(主程序结束)
   C-->|查询等待队列|I
   I-->D{任务队列是否为空}
   D-->|否|O{是否有微任务}
   D-->|是|N(等待下次查询)
   O-->|是|E[取出一个微任务]
   O-->|否|F[取出一个宏任务]
   E-->G[执行中]
   F-->G
   G-->H(任务结束)
   H-->|查询等待队列|I
   G-.->|调用BrowserApi|J[产生异步任务并挂起]
   J-.->|返回结果|K[任务队列]
   subgraph task
   K-.->L[宏任务]
   K-.->M[微任务]
   L-.->I(等待队列)
   M-.->I
   end

   linkStyle 3 stroke:red;
   linkStyle 12 stroke:red;
```

## 宏任务

 setTimeout、setInterval、setImmediate、I/O、UI交互事件

## 微任务

 Promise、process.nextTick、MutationObserver


# Node环境

   与浏览器环境稍有不同，Node使用chromeV8引擎来解析js, 解析结果调用对应的Node Api，这些Api则是由libuv引擎驱动，去执行对应的任务事件。 事件循环则由libuv引擎控制。


## 图示

```graph
graph TD;
   A[timers]-->B[I/O callbacks]
   B-->C[idle/prepare]
   C-->D[poll]
   D-->E[check]
   E-->F[close callbacks]
   F-->A
   G[incoming: data/etc]-->D
```