# Escape | 转义

## HTML

| char | escape |
|  &   | &amp;  |
|  <   | &lt;   |
|  >   | &gt;   |
|  "   | &quot; |
|  '   | &#x27; &#039; &apos;[不适用于HTML4]|
|  /   | &#x2f; |

## Javascript

| Unicode | escape  | meaning -> type
| \u0008  | \b      | Backspace
| \u0009  | \t      | Tab 空白
| \u000A  | \n      | 换行符（换行）-> 行结束符
| \u000B  | \v      | 垂直制表符 -> 空白
| \u000C  | \f      | 换页 -> 空白
| \u000D  | \r      | 回车 -> 行结束符
| \u0022  | \"      | 双引号 (")
| \u0027  | \'      | 单引号 (')
| \u005C  | \\      | 反斜杠 (\)
| \u00A0  | \\u00A0 | 不间断空格 -> 空白
| \u2028  | \\u2028 | 行分隔符 -> 行结束符
| \u2029  | \\u2029 | 段落分隔符 -> 行结束符
| \uFEFF  | \\uFEFF | 字节顺序标记 -> 空白

当JSON返回的结果有 \u2028 \u2029 时，javascript 会认为这是个行结束符，会换行。 由于字变量是不能存在换行符，所以解析错误。