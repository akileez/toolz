var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/functions')

var t = painless.assert

var functions = require('../../../src/object/functions')

test('should return a sorted list of all enumerable properties that have function values', function () {
  function Foo () {
    this.a = 123
    this.b = 'qwe'
    this.amet = function () {}
  }

  Foo.prototype.lorem = function () {}
  Foo.prototype.dolor = function () {}

  t.same(functions(new Foo()), ['amet', 'dolor', 'lorem'])
})

test('should return an empty array if no functions found', function () {
  t.same(functions({a: 123, b: '123', c: [1], d: {e: '123'}}), [])
})
