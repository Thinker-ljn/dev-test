function quick (arr) {
  if (arr.length <= 1) return arr
  let s = arr[0]
  let left = []
  let right = []
  let eq = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < s) left.push(arr[i])
    else if (arr[i] > s) right.push(arr[i])
    else eq.push(arr[i])
  }

  return quick(left).concat(eq, quick(right))
}

function quick2 (arr) {
  sort(arr, 0, arr.length - 1)
  return arr
}

function sort (a, lo, hi) {
  if (hi <= lo) return
  let lt = lo, gt = hi
  let v = a[lo]
  let i = lo + 1
  while (i <= gt) {
      if      (a[i] < v) exch(a, lt++, i++)
      else if (a[i] > v) exch(a, i, gt--)
      else              i++
  }

  // a[lo..lt-1] < v = a[lt..gt] < a[gt+1..hi].
  sort(a, lo, lt-1)
  sort(a, gt+1, hi)
}

function exch (arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

module.exports = quick2
