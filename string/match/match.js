var s = 'aaa123ccca234ddd'

var re1 = /a(\d+)/
console.log(s.match(re1)) // [ 'a123', '123', index: 2, input: 'aaa123ccca234ddd' ]

var re2 = /a(\d+)/g
console.log(s.match(re2)) // [ 'a123', 'a234' ]


// regx exec
console.log(re2.exec(s)) // [ 'a123', '123', index: 2, input: 'aaa123ccca234ddd' ]
console.log(re2.exec(s)) // [ 'a234', '234', index: 9, input: 'aaa123ccca234ddd' ]



var url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled#start'

var uRe = /[\?|&]([^=#]+)(=([^&#]+))?/g

let result = {}
let match = uRe.exec(url)

function parseValue (v) {
  if (!v) return true
  v = decodeURIComponent(v)
  if (/^d+&/.test(v)) {
    v = Number(v)
  }
  return v
}

while (match) {
  let key = match[1]
  let value = parseValue(match[3])

  if (!result[key]) {
    result[key] = value
  } else {
    if (Array.isArray(result[key])) {
      result[key].push(result[key])
    } else {
      let tmp = [result[key], value]
      result[key] = tmp
    }
  }

  match = uRe.exec(url)
}

console.log(result)
