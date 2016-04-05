var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/crop-right')
var t = painless.assert

var crop = require('../../../src/string/crop-right')

var str = 'lorem ipsum dolor sit amet'

test('should limit number of chars', function () {
  var r1 = crop(str, 10)
  t.assert(r1.length < 11)
  t.eq(r1, 'lorem…')

  var r2 = crop(str, 14)
  t.assert(r2.length < 15)
  t.eq(r2, 'lorem ipsum…')
})

test('should append string param', function () {
  var r1 = crop(str, 10, '--')
  t.assert(r1.length < 11)
  t.eq(r1, 'lorem--')

  var r2 = crop(str, 14, '=')
  t.assert(r2.length < 15)
  t.eq(r2, 'lorem ipsum=')
})

test('should treat null as empty string', function () {
  t.is(crop(null, 1), '')
})

test('should treat undefined as empty string', function () {
  t.is(crop(void 0, 1), '')
})
