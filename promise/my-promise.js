/**
 * function executor (resolve, reject) {
 *
 * }
 *
*/

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise (executor) {
  let that = this
  this.onFulfilled = null
  this.onRejected = null
  this.status = PENDING

  let resolve = function (value) {
    this.status = FULFILLED
    this.value = value
    if (this.onFulfilled) this.onFulfilled(value)
  }

  let reject = function (reason) {
    this.status = REJECTED
    this.reason = reason
    if (this.onRejected) this.onRejected(reason)
  }

  if (typeof executor === 'function') {
    executor(resolve, reject)
  } else {
    resolve(executor)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === PENDING) {
    if (typeof onFulfilled === 'function') {
      this.onFulfilled = onFulfilled
    }
    if (typeof onRejected === 'function') {
      this.onRejected = onRejected
    }
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value)
  } else {
    onRejected(this.reason)
  }

  return new Promise
}
