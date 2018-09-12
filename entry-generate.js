let fs = require('fs')
const EXCEPTION = ['__', '.git']

let temp = '<a href="{{href}}">{{name}}</a>'
let links = []

const walk = function (path) {
  let list = fs.readdirSync(path)

  list.forEach((filename) => {
    let needIgnore = EXCEPTION && EXCEPTION.includes(filename)
    let isDir = fs.statSync(path + '/' + filename).isDirectory()

    if (isDir && !needIgnore) {
      let dirPath = path + '/' + filename
      let indexTarget = dirPath + '/index.html'
      let hasIndex = fs.existsSync(indexTarget)
      if (hasIndex) {
        let content = fs.readFileSync(indexTarget, 'utf-8')
        let titleMatch = content.match(/<title>([^<]+)<\/title>/)
        let name = titleMatch && titleMatch[1] ? titleMatch[1] : dirPath
        links.push({href: indexTarget, name: name})
      }

      walk(path + '/' + filename)
    }
  })
}

walk('.')


let linksString = ''
links.forEach(function (link) {
  let item = temp.replace('{{href}}', link.href).replace('{{name}}', link.name)
  linksString += item
})

if (!linksString) {
  console.log('no index.html')
  return
}

fs.readFile('./entry-template.html', {'encoding': 'utf8'}, function (err, data) {
  if(err) return reject(err)
  let indexFileContent = data.replace('{{content}}', linksString)
  fs.writeFileSync('./index.html', indexFileContent)
})