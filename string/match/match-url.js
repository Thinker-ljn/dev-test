const urls = [
  'http://abc.bbc.com:8888/a/b/c?a=1&b=2&c#ccc',
  'http://abc.bbc.com/a/b/c?a=1&b=2',
  'abc.bbc.com:8888/a/b/#ccc',
  'abc.bbc.com/b/c?a=1&b=2&c#ccc',
  'http://abc.bbc.com:8888/a/b/c?a=1&b=2&c#!ccc',
  'http://abc.bbc.com?a=1&b=2&c'
]

const commonMatch = '\\w\\.\\-'
const paramMatch = `[?|&][${commonMatch}]+(?:=[${commonMatch}]+)?`

let matchs = {
  protocol: `(?:([${commonMatch}]+:)(?:\\/\\/))?`,
  userPassword: `((?:[${commonMatch}]+):(?:[${commonMatch}]+)@)?`,
  domain: `([${commonMatch}]+)`,
  port: '(?::([\\d]+))?',
  path: `([\\/${commonMatch}]+)?`,
  params: `((?:${paramMatch})*)`,
  anchor: `(#!?[${commonMatch}]+)?`
}

const match = '^' + Object.keys(matchs).map(mk => matchs[mk]).join('') + '$'

const regx = new RegExp(match)

urls.forEach(function (url) {
  console.log(url.match(regx))
})



function parseUri (str) {
  var o   = parseUri.options,
    m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i   = 14;

  while (i--) uri[o.key[i]] = m[i] || "";

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });

  return uri;
};

parseUri.options = {
  strictMode: false,
  key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
  q:   {
    name:   "queryKey",
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};