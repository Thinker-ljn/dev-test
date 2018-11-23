# Babel
  Babel 是一个 javascript 编译器，它通过语法转换器将最新版本的 Javascript 代码编译为一般浏览器支持的语法。

## Babel - ES2015 及更高版本
  安装最现代化 preset (预先设置)，并添加 "env" 到你的 .babelrc 文件的 presets 数组中。

```
npm install --save-dev babel-preset-env
```

## Polyfill
  由于 Babel 只转换语法(如箭头函数)， 你可以使用 babel-polyfill 支持新的全局变量，例如 新的内置对象Promise 、新的原生方法如 String.padStart (left-pad) 等。 Polyfill 会在使用 babel-node 时自动加载。

### 安装

```
npm install --save-dev bable-polyfill
```
### 使用
  Polyfill 不是库或工具，它需要实时运行在一个应用中。你可以在在 Node / Browserify / Webpack 中使用。 要确保它在任何代码或依赖声明之前被调用

```
require("babel-polyfill")
// OR
import "babel-polyfill";
```
  在 webpack.config.js 中，将 babel-polyfill 加到你的 entry 数组中。

```
module.exports = {
    entry: ["babel-polyfill", "./app.js"]
}
```

## JSX 和 Flow
  Babel 能够转换 JSX 语法并去除类型注释。
  如下安装，并添加 "react" 到你的 .babelrc 的 presets 数组中
```
npm install --save-dev babel-preset-react
```

## 自定义


## .babelrc配置文件

```
{
    "presets": ["env", "react"]
}

{
    "presets": [
        ["env", {
            "targets": {
                "browsers": ["last 2 version", "safari >= 7"]
            }
        }]
    ]
}

{
    "presets": [
        ["env", {
            "targets": {
                "node": "6.10"
                // "node": "current"
            }
        }]
    ]
}

```