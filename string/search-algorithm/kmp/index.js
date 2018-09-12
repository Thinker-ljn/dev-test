function getNext (string) {
  let p = string.split('')

  let next = [-1]
  let k = -1
  let j = 0
  while (j < p.length - 1) {
    if (k === -1 || p[j] == p[k]) {
      if (p[j + 1] === p[k + 1])
        next[++j] = next[++k]
      else
        next[++j] = ++k
    } else {
      k = next[k]
    }
  }
  return next
}

console.log(getNext('DABCDABDA'))