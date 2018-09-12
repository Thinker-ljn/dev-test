function throttle (execFn, time = 0) {
  if (time === 0) return execFn
  let lastExec = 0
  return function () {
    let now = Date.now()
    let context = this
    if (now - time > lastExec) {
      lastExec = now
      execFn.apply(context, arguments)
    }
  }
}

let fn = throttle(function () {
  console.log(123)
}, 10000)

setInterval(fn, 100);
