// someFunction(aa, bb, cc, (a, b, c) => {
//   console.log(a); // 5
//   console.log(b); // 'some string'
//   console.log(c); // {someProperty: 'someValue'}
// });

var Rx = require('rxjs/Rx')
var someFunction = function (aa, bb, cc, cb) {
  console.log(aa, bb, cc)
  cb(5, 'some string', {someProperty: 'someValue'})
}

const boundSomeFunction = Rx.Observable.bindCallback(someFunction);
boundSomeFunction(1, 2, 3).subscribe(values => {
  console.log(values) // [5, 'some string', {someProperty: 'someValue'}]
});