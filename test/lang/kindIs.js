var test = require('../../src/assertion/ttr')
var kindOf = require('../../src/lang/kindOf')
var kindIs = require('../../src/lang/kindIs')

var arr = []
var obj = {}
var num = 3
var str = 'i am'
var rex = /(a)/
var bol = true
var dat = new Date()
var udf
var nul = null
var arg = arguments
var fun = function () {}
var sym = Symbol('str')
var buf = new Buffer(' ')
var nan = NaN

test('kindIs Nil', function (t) {
  t.is(kindIs(nul), 'null')
  t.is(kindIs(null), 'null')
  t.is(kindIs(udf), 'undefined')
  t.is(kindIs(undefined), 'undefined')
})

test('kindIs Strings', function (t) {
  t.is(kindIs(str), 'string')
  t.is(kindIs('str'), 'string')
  t.is(kindIs(new String('a')), 'string')
})

test('kindIs Booleans', function (t) {
  t.is(kindIs(bol), 'boolean')
  t.is(kindIs(true), 'boolean')
  t.is(kindIs(false), 'boolean')
  t.is(kindIs(new Boolean(true)), 'boolean')
})

test('kindIs Numbers', function (t) {
  t.is(kindIs(num), 'number')
  t.is(kindIs(42), 'number')
  t.is(kindIs(new Number(-9)), 'number')
  t.is(kindIs(nan), 'number')
  t.is(kindIs(NaN), 'number')
  t.is(kindIs(Infinity), 'number')
  t.is(kindIs(0), 'number')
  t.is(kindIs(1.342), 'number')
})

test('kindIs Symbols', function (t) {

})

test('kindIs Arrays', function (t) {
  t.is(kindIs(arr), 'array')
  t.is(kindIs([]), 'array')
  t.is(kindIs([1, 2, 3]), 'array')
  t.is(kindIs(new Array()), 'array')
})

test('kindIs Functions', function (t) {

})

test('kindIs Dates', function (t) {

})

test('kindIs RegExps', function (t) {

})

test('kindIs Objects', function (t) {
  function Test() {}
  var instance = new Test()
  var literal = {}
  var create = Object.create(null)

  t.is(kindIs(obj), 'object')
  t.is(kindIs({a: 1, b: 2}), 'object')
  t.is(kindIs(literal), 'object')
  // make note of difference: the Instance
  t.is(kindIs(instance), 'test')
  // make note of difference: the Creation
  t.is(kindOf(create), 'object')
  // make note of difference: the Arguments
  t.is(kindIs(arg), 'object')
  // make note of difference
  t.is(kindIs(arguments), 'object')
})

test('kindIs Arguments', function (t) {
  // make note of difference
  t.is(kindIs(arg), 'object')
  // make note of difference
  t.is(kindIs(arguments), 'object')
  t.is(kindIs.args(arg), 'arguments')
  t.is(kindIs.args(arguments), 'arguments')
  t.is((function () {
    return kindIs.args(arguments)
  })(), 'arguments')
})

test('kindIs Buffer', function (t) {
  t.is(kindIs(buf), 'buffer')
  t.is(kindIs(new Buffer(' ')), 'buffer')
})

test('kindIs Map', function (t) {
  // t.is(kindIs(map,'map'))
  // t.is(kindIs(map.set,'function'))
  // t.is(kindIs(map.get,'function'))
  // t.is(kindIs(map.add,'undefined'))
  t.end('Map is not defined. Test after upgrading')
})

test.result()