#  CORS - 跨域资源共享
  这是一种HTTP请求机制，在浏览器中向其他域请求资源时，目标域使用额外的 HTTP Header 来告知浏览器是否有权限来使用这些资源。

## Same-origin policy - 同源策略
  首先，之所以会有 CORS, 是因为浏览器实行了同源策略，这是一个在网页应用安全模型的概念。

### 何谓同源
  协议，端口（如果有指定）和域名都相同。

### 不同源的处理
  当A域向B域请求资源时，将发出跨域请求，出于安全原因，浏览器限制从脚本内发起的跨源HTTP请求或拦截服务器返回的响应。如下面的几种情况：

- 脚本中的 XMLHttpRequest 或者 Fetch APIs
- 网页字体（在 CSS 中使用 @font-face 获取跨域字体资源）因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
- WebGL 贴图
- Canvas 的 drawImage 接口

## 机制原理
### 请求类别
  脚本通过浏览器发出的 HTTP 请求中，可分为简单请求和非简单请求。

1. 简单请求
  GET, HEAD, POST(类HTML表单提交的请求)

## 用处

可限制CSRF攻击


[参考](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)