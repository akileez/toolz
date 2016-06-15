var painless = require('../../assertion/painless')
var test = painless.createGroup('Test path/memo')
var t = painless.assert

var path = require('path')
var memo = require('../../../src/path/memo')

test('should expose a function', function () {
  t.eq(typeof memo, 'function')
})

test('should return a function', function () {
  t.eq(typeof memo('foo'), 'function')
})

test('should continue returning a function when a string is passed', function () {
  var foo = memo('foo')
  var bar = foo('bar')
  var baz = bar('baz')
  var qux = baz('qux')
  t.eq(typeof qux, 'function')
})

test('should return a memoized filepath when called with no arguments', function () {
  var foo = memo('foo')
  var bar = foo('bar')
  var baz = bar('baz')
  var qux = baz('qux')

  t.eq(foo(), path.resolve('foo'))
  t.eq(bar(), path.resolve('foo/bar'))
  t.eq(baz(), path.resolve('foo/bar/baz'))
  t.eq(qux(), path.resolve('foo/bar/baz/qux'))
})

// skip test. removed functionality
// test('should expose the memoized filepath on the `.path` property', function () {
//   var foo = memo('foo')
//   var bar = foo('bar')
//   var baz = bar('baz')
//   var qux = baz('qux')

//   t.eq(foo.path, path.resolve('foo'))
//   t.eq(bar.path, path.resolve('foo/bar'))
//   t.eq(baz.path, path.resolve('foo/bar/baz'))
//   t.eq(qux.path, path.resolve('foo/bar/baz/qux'))
// })

test('should return process.cwd', function () {
  var memoPath = memo()

  t.eq(memo()(), process.cwd())
  // t.eq(memoPath.path, process.cwd())
})

test('should return a file path when called', function () {
  var src = memo('foo')
  t.eq(src(), path.resolve('foo'))
})
