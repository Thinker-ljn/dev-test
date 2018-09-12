# KMP算法

> 一个字符串S，一个模式串P，求P在S中的位置。

## 暴力破解

```
FIND-POS (S, P)
  ls <- length[S]
  lp <- length[P]
  i <- 0
  j <- 0
  while i < ls && j < lp
    do
      if S[i] = P[j]
      then i++
           j++
      else i <- i - j + 1
           j <- 0
  if j = lp
  then return i - j
  else return -1
```
## 考虑下面几种情况
```
情况一
      i                          i
S: ABC?    A|BC|?  AB|C|?    ABC|?|
P: ABCX     |AB|CX   |A|BCX     |A|BCX
      j = 3                      j = 0
情况二
       i                               i
S: ABCA?    A|BCA|?   AB|CA|?    ABC|A|?
P: ABCAX     |ABC|AX    |AB|CAX     |A|BCAX
       j = 4                           j = 1
情况三
        i                                  i
S: ABCAB?    A|BCAB|?   AB|CAB|?    ABC|AB|?
P: ABCABX     |ABCA|BX    |ABC|ABX     |AB|CABX
        j = 5                              j = 2
```

  为了方便表示，作以下简写说明

  | 简写 | 意义 |
  | ---- | ----- |
  | Q         | 失配字符前面的子串 |
  | ^Q        | Q前缀 |
  | Q$        | Q后缀 |
  | eq^Q$     | 相等的前缀后缀 |
  | max-eq^Q$ | 最大相等的前缀后缀 |

  暴力破解其实就是在【发生失配】时，不断地移动P，但在上面的例子中，我们每移动一次P，可以看到失配字符X前面的子串Q，其实是前缀和后缀在比较。

  当所有的 ^Q != Q$ 时，不用比较 S 和 P 就可以知道匹配一定失败，直接把P移动到?处继续匹配，如情况一。
  当只要有 ^Q = Q$的情况时，找出 max-eq^Q$ ，我们可以直接把P移动到相等最大后缀处，如情况二和三。
  这种做法我们不用一步步的移动P，而是直接移动到合适的位置。 也就是说不用回溯 i，重新设置 j 的位置就行。
  我们把 j 的新位置设为 next[j]，情况一的next[j] = 0，情况二的next[j] = 1，情况三的next[j] = 2，由此可看出next[j] = len[max-eq^Q$]。
  由上总结，发生失配时失配位置为j，找出【j 之前 max-eq^Q$ 】，把 j 赋值为 max-eq^Q$ 的长度，然后继续进行匹配。
  由next[j] = len[max-eq^Q$]，对于P的任意一个位置j (j > 0)，我们都能求出他的next[j]。求出了next数组，我们就能在失配时快速定位下一个判断位置。这就是KMP算法的核心。所以下面我们来求解next数组。

## 求next数组的图解例子

求字符串 ABCDABD 的每个位的next值。

| Q       | ^Q                              | Q$                              | length[max-eq^Q$] |
| ------- | ------------------------------- | ------------------------------- | ----------------- |
| A       | -                               | -                               | -                 |
| AB      | A                               | B                               | 0                 |
| ABC     | A, AB                           | C, BC                           | 0                 |
| ABCD    | A, AB, ABC                      | D, CD, BCD                      | 0                 |
| ABCDA   | [A], AB, ABC, ABCD              | [A], DA, CDA, BCDA              | 1                 |
| ABCDAB  | A, [AB], ABC, ABCD, ABCDA       | B, [AB], DAB, CDAB, BCDAB       | 2                 |
| ABCDABD | A, AB, ABC, ABCD, ABCDA, ABCDAB | D, BD, ABD, DABD, CDABD, BCDABD | 0                 |

| IDX  | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| ---- | - | - | - | - | - | - | - |
| STR  | A | B | C | D | A | B | D |
| LEN  | - | 0 | 0 | 0 | 1 | 2 | 0 |
| NEXT | -1 | 0 | 0 | 0 | 0 | 1 | 2 |


 对于 j > 0 时，next[j] = len[max-eq^Q$]，当 j = 0 时，next[j = 0] = -1
 next[j]的意义在于，失配时，把P对齐S[i]处，next[j] > 0，往左移动 next[j] 个单位，next[j] = -1时，往右移动一个单位
 或者换种说法，失配时，将P移动 j - next[j] 个单位。

但这样子的求法肯定是繁琐的，和暴力破解没什么区别。只是形象的解释下。

## 关于前缀后缀那些事

  假设P在j位置失配，并且next[j] > 0，我们可以令k = next[j]，有j > k > 0。 由上可知，k = next[j] = len[max-eq^Q$]，所以我们可以说 k 是^Q的长度，也可以说 k 是^Q的后一位。而 j 是Q$的后一位。如下图：
```
i:  0 ... k-1 k ... j-k ... j-1 j
P: | |...|   | |...|   |...|   | |
   |   ^Q    |     |     Q$    |
```
  所以有^Q = P[0 ~ k-1] = P[j-k ~ j-1] = Q$

  如果P[k] = P[j]，则有P[0 ~ k] = P[j-k ~ j]，
  就会有 next[j + 1] = length[P[0 ~ k]] = k + 1 = next[j] + 1

  换句话说，在这种情况下，我们知道 next[j]，就能知道next[j + 1]，相关代码如下

```
  if P[k] = P[j]
  then next[j + 1] = k + 1
```

  如果P[k] != P[j]， 如何求 next[j + 1] 呢？
  如下图，我们取出P^ = P[0 ~ k] 和 P$ = P[j-k ~ j]，一一对应，有P^[0 ~ k-1] = P$[j-k ~ j-1]

```
i:   0  ... n-1  n  ... k-n ... k-1  k
P: |   |...|   |   |...|   |...|   |   |
   |     s1    |   |     s2        |

i:  j-n ... n-1  n  ... j-n ... j-1  j
P: |   |...|   |   |...|   |...|   |   |
   |     s3    |   |     s4        |
```

  对于P^，设n = next[k]，由之前的结论有，s1 = P^[0 ~ n-1] = P^[k-n ~ k-1] = s2
  对于P$，相应的有                      s3 = P$[0 ~ n-1] = P$[j-n ~ j-1] = s4
  所以有s1 = P^[0 ~ n-1] = P$[j-n ~ j-1] = s4，且上面我们假设了P[k] != P[j]，n = next[k]，
  如果P[n] = P[j]的话，就有P[0 ~ n] = P[j-n ~ j]
  就会有 next[j + 1] = length[P[0 ~ n]] = n + 1 = next[j] + 1
  也就是说，虽然P[k] != P[j]，但我们可以比较P[next[k]]（P[n]），因为在P[k] != P[j]的情况下，我们能保证s1 = P^[0 ~ n-1] = P[j-n ~ j-1] = s4是当前 max-eq^Q$。

  但是，我们并不能保证P[n] = P[j]，上面的情况是假设的，所以在P[n] != P[j]的情况下，我们就要继续求出 m = next[n]，然后再次比较P[m] 和 P[j]，这是一个递归的过程。 代码如下，令 k = next[k]。

```
  if P[k] != P[j]
  then k = next[k]
```
  既然是递归，那就一定要有终止条件或者初始条件，当P[k] = P[j]时，这就是第一个终止条件，如果P[k] 一直不等于 P[j]时，k会一直变小直到k = 0，如果P[0] ！= P[j]，意味着在j + 1前的子串Q = P[0 ~ j]找不到eq^Q$，所以next[j + 1] = 0，但上面的代码中我们得继续求next[0]的值，上面说到失配时，将P移动 j - next[j] 个单位。明显的0位置失配时需要整体向右移动一个单位，也就是 j - next[j] = 0 - next[0] = 1，所以k = next[0] = -1
  也就是说我们有了初始条件：k = next[0] = -1

  当我们递归求出k = -1时，已经不能再求next[k = -1]了，这时候有next[j + 1] = 0，也能写能next[j + 1] = 0 = -1 + 1 = k + 1，代码如下。

```
  if k = -1
  then next[j + 1] = k + 1
```
  现在我们知道了无论 P[k] 是否等于 P[j]，我们都能求出next[j + 1]，整理下上面的代码：

```
GET-NEXT (P)
  j <- 0
  k <- -1
  lp <- length[P]
  next[0] <- -1

  while j < lp
   do
     if k = -1 || P[j] = P[k]
     then next[++j] = ++k
     else k = next[k]

  return next
```

## 考虑下面的情况
```
情况四
  move0      move1        move2     move3
        i                                  i
S: ABXAB?    A|BXAB|?   AB|XAB|?    ABX|AB|?
P: ABXABX     |ABXA|BX    |ABX|ABX     |AB|XABX
        j = 5                              j = 2
```
  和情况三相比，把 S[2] = C 改为 S[2] = X
  当j = 5时失配，其前面的子串为 ABXAB ，可以看出 max-eq^Q$ = AB，长度为2，所以next[j] = 2，即move3的情况
  我们知道，在move0时，j = 5时失配，即 X != ?，但在move3时，我们再次看到 X 对上了 ?，这种情况下是一定匹配失败的。
  所以move3时，j = 2失配，需要再次找到next[j], 其前面的子串为 AB ，len[max-eq^Q$] = 0, next[j] = 0，如下：

```
情况四优化
  move0         move3            move4
        i            i               i
S: ABXAB?     ABX|AB|?         ABXAB|?|
P: ABXABX        |AB|XABX           |A|BXABX
        j = 5        j = 2           j = 0
```
  也就是说，当我们利用 max-eq^Q$ 求出的next值，在P[j] === P[next[j]]的情况下，一定是不匹配的。通过再次移动，取更小的next值才是最优解。

  为了和上面的代码联系上，我们要求next[j = 5]，实际上是在已经k = next[j = 4]的情况下，来判断P[k] 是否等于 P[j = 4]，如果相等，在P[5] === P[next[5]]的情况，一定匹配失败，所以要继续求next[next[5]]

```
   k     j
 0 1 2 3 4 5
 A B X A B X
```
  令j = 4，则k = 1，显然P[k] = P[1] = P[4] = P[j]，并且P[k + 1] = P[2] = P[5]= P[j + 1]，所以next[j + 1] = next[next[j] + 1] = next[k + 1]

```
 if P[k] = P[j]
 then if P[k + 1] = P[j + 1]
      then next[j + 1] = next[k + 1]
```

结合上面的结论，将代码优化，并且加入KMP代码：
```
GET-NEXT (P)
  j <- 0
  k <- -1
  lp <- length[P]
  next[0] <- -1

  while j < lp
   do
     if k = -1 || P[j] = P[k]
     then if P[k + 1] = P[j + 1]
          then next[++j] = next[++k]
          else next[++j] = ++k
     else k = next[k]

  return next


KMP (S, P)
  i <- 0
  j <- 0
  next <- GET-NEXT(P)

  while i < length[S] && j < length[P]
    if j = -1 || S[i] = P[j]
    then j++
         i++
    else j = next[j]

  if j === length[P]
  then return i - j
  else return -1
```

## 参考
[从头到尾彻底理解KMP](https://blog.csdn.net/v_july_v/article/details/7041827)
[（原创）详解KMP算法](http://www.cnblogs.com/yjiyjige/p/3263858.html)
[KMP算法的Next数组详解](http://www.cnblogs.com/tangzhengyue/p/4315393.html)
