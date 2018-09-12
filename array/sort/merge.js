function entry (arr) {
  let s = 0
  let e = arr.length - 1
  sort(arr, s, e)

  return arr
}

function sort (arr, s, e) {
  if (s < e) {
    let mid = Math.floor((s + e) / 2)
    sort(arr, s, mid)
    sort(arr, mid + 1, e)
    merge(arr, s, mid, e)
  }
  return arr
}

function merge (arr, s, mid, e) {
  let tmp = []
  let i = s, j = mid + 1

  while (i <= mid || j <= e) {
    if (i > mid) {
      tmp.push(arr[j++])
    } else if (j > e) {
      tmp.push(arr[i++])
    } else if (arr[i] < arr[j]) {
      tmp.push(arr[i++])
    } else {
      tmp.push(arr[j++])
    }
  }

  for (let i = 0; i < tmp.length; i++) {
    arr[s + i] = tmp[i]
  }
}

module.exports = entry
