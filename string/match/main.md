# String Match

## 语法

    string.match(searchValue) | string.match(regexp)


## 例子

```
let str = 'hello world world'

str.match('world')
// ["world", index: 6, input: "hello world world", groups: undefined]

str.match(/world/)
// same as upper

str.match(world/g)
// ["world", "world"]

```