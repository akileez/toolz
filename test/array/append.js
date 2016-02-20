var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/append')
var t = painless.assert

var append = require('../../src/array/append')

var execa = require('child_process').execFile

test('failing test', () => {
  t.same({a: 1}, {a:1}, 'expact {a: 1} to be {a: 1}')
  t.same({a: 1}, {a:1}, 'bad code')
})
test('append all items of second array to end of first array', function () {
  var arr1 = [1, 2, 3]
  var arr2 = [3, 4, 5]
  var res

  res = append(arr1, arr2)
  t.is(arr1, res)
  t.same(arr1, [1,2,3,3,4,5])
})

// test('another failing test', function () {
//   t.same({a: 1}, {a:2}, 'bad code')
// })

test('append null array', function () {
  var arr1 = [1, 2]

  append(arr1, null)
  t.same(arr1, [1, 2])
})

test('append undefined array', function () {
  var arr1 = [1, 2, 3]

  append(arr1, undefined)
  t.same(arr1, [1, 2, 3])
})

// test('failing test', function () {
//   t.same({a: 1}, {a:2}, 'bad code')
// })

// test('lint', function (cb) {
//   execa('eslint', ['append.js'], {cwd: '../../src/array'}, function (err, stdout, stderr) {
//     if (err) {
//       t.fail(err)
//     }
//     else t.pass('yes')
//     cb()
//   })
// })
