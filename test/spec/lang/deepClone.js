var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/deepClone')
var t = painless.assert

var deepClone = require('../../../src/lang/deepClone')

test('should create a new object and copy properties', function () {
  var a = {a:1, b:2, c:'foo'}
  var b = deepClone(a)
  t.same(b, a)
  t.ne(b, a)
})

test('should deep clone objects', function () {
  var a = {
    a : 1,
    b : {
        c : 'lorem',
        d : {
          e : 'ipsum',
          f : 2
        }
      }
  }
  var b = deepClone(a)

  t.same(b, a)
  t.ne(b, a)
  t.same(b.b, a.b)
  t.ne(b.b, a.b)
  t.same(b.b.d, a.b.d)
  t.ne(b.b.d, a.b.d)
})

test('should deep clone arrays', function () {
  var a = {
    a : 1,
    b : [1, 2, ['lorem', {c : 'ipsum', d: ['dolor', 'amet']}]]
  }

  var b = deepClone(a)

  t.same(b, a)
  t.ne(b, a)
  t.same(b.b, a.b)
  t.ne(b.b, a.b)
  t.same(b.b[2], a.b[2])
  t.ne(b.b[2], a.b[2])
  t.same(b.b[2][1], a.b[2][1])
  t.ne(b.b[2][1], a.b[2][1])
})

test('should handle RegExp', function () {
  var a = {
    a : 1,
    b : /foo\/bar\/(.+)/
  }
  var b = deepClone(a)

  t.same(b, a)
  t.ne(b, a)
  t.is(b.b.test('foo/bar/ipsum-123'), true)
  t.ne(b.b, a.b)
})

test('should handle Date', function () {
  var a = {
    a : 1,
    b : new Date()
  }
  var b = deepClone(a)

  t.same(b, a)
  t.ne(b, a)
  t.same(b.b, a.b)
  t.ne(b.b, a.b)
})

test('should invoke function to clone instances', function () {
  function CustomType () {}

  var a = {
    test: new CustomType()
  }

  var result = deepClone(a, function (x) {
    t.is(x, a.test)
    return 1
  })

  t.eq(result.test, 1)
})

test('should copy custom instances by reference by default', function () {
  function CustomType () { }
  var a = {
    test: new CustomType()
  }

  var result = deepClone(a)
  t.same(result.test, a.test)
})
