# Entry

首先看 package.json，先从开发模式开始

```javascript
{
  // ...
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    // ...
  }
}
```
在开发模式下，rollup 的配置文件是 scripts/config.js ， 环境变量是 web-full-dev

转到 scripts/config.js 

```javascript
// ... 
const aliases = require('./alias')
const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}
// ...
{
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
}
// ...
```

web-full-dev 的配置中，入口是 resolve('web/entry-runtime-with-compiler.js')， 解析之后是 /src/platforms/web/entry-runtime-with-compiler.js

```javascript
// ...
import Vue from './runtime/index'
// ...
import { compileToFunctions } from './compiler/index'
// ...
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
// ...
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
// ...
  return mount.call(this, el, hydrating)
}
```

在入口中， 主要是引入了 Vue 实例文件，改写 $mount 函数，实现实时编译模版。
