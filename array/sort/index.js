const generate = require('./generate')
const type = 'merge'
const sortFn = require('./' + type)

let randomArr = generate(15)
console.log('randomArr:', randomArr)

let sortArr = sortFn(randomArr)
console.log('sortArr:', sortArr)
