# XSS攻击
  全称 Cross Site Script attacks，跨站脚本攻击。 XSS 是存在于客户端的攻击方式，原理是攻击 都向有 XSS 漏洞的网站中注入恶意的 HTML 代码。 用户浏览被攻击的网站时，恶意的代码会被执行，可以盗取用户 Cookie、 破坏页面结构、 重定向到其他网站等等。


## 类型

1. 存储型XSS (Stored XSS)
    恶意代码 -> 数据库 -> 后端检索 -> 前端执行 -> 被攻击
    通常发生在带有用户自定义数据保存的网站，如富文本编辑，论坛发帖，商品评论等。
    攻击者往往会结合多种手段诱导用户点击。

2. 反射型XSS
    恶意代码 -> url -> 后端解析拼接HTML -> 前端执行 -> 被攻击
    攻击者往往会结合多种手段诱导用户点击。

3. DOM型XSS
    恶意代码 -> url -> 前端解析，拼接HTML -> 被攻击

## 特点/要素

    要完成XSS攻击，需要两点, 防范XSS攻击也是从这两点入手。 但最主要是第二点，因为我们很难避免攻击者注入。
1. 是攻击者注入恶意代码
2. 恶意代码被目标浏览器执行

## 防范手段

### 防止 HTML 中出现注入
1. 纯前端渲染

避免拼接HTML，同时不使用一些模糊的API，如.innerHTML、.outerHTML、document.write()，Vue 里的 v-html/dangerouslySetInnerHTML 等。
要明确的告诉浏览器将要设置的内容是文本（.innerText），还是属性（.setAttribute），还是样式（.style）等等。

DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，<a> 标签的 href 属性，JavaScript 的 eval()、setTimeout()、setInterval() 等会把字符串作为代码运行，要多注意。

对于onload 事件和 <a> 标签的 href 中的链接要过滤 javascript:xxx 协议或其他非法协议，明确使用 http 和 https 等协议

2. 转义 HTML 和 Javascript 代码

string/escape/main.md

3. 限制

xss攻击要能达成往往需要较长的字符串，因此对于一些可以预期的输入可以通过限制长度强制截断来进行防御。


## 参考

[前端安全系列（一）：如何防止XSS攻击？](https://tech.meituan.com/fe_security.html)