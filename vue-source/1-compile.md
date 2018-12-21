# Compile

在 /src/platforms/web/compile/index.js 下， 文件内容很简单

```javascript

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }

```

主要是引入了 /src/compiler/index , 产生并导出 compile, compileToFunctions 给 /src/platforms/web/entry-runtime-with-compiler.js 使用

