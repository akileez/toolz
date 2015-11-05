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
  t.is(kindIs.args(nul), 'null')
  t.is(kindIs.args(null), 'null')
  t.is(kindIs.args(udf), 'undefined')
  t.is(kindIs.args(undefined), 'undefined')
  t.is(kindIs.safe(nul), 'null')
  t.is(kindIs.safe(null), 'null')
  t.is(kindIs.safe(udf), 'undefined')
  t.is(kindIs.safe(undefined), 'undefined')
})

test('kindIs Booleans', function (t) {
  t.is(kindIs(bol), 'boolean')
  t.is(kindIs(true), 'boolean')
  t.is(kindIs(false), 'boolean')
  t.is(kindIs(new Boolean(true)), 'boolean')
  t.is(kindIs.args(bol), 'boolean')
  t.is(kindIs.args(true), 'boolean')
  t.is(kindIs.args(false), 'boolean')
  t.is(kindIs.args(new Boolean(true)), 'boolean')
  t.is(kindIs.objs(bol), 'boolean')
  t.is(kindIs.objs(true), 'boolean')
  t.is(kindIs.objs(false), 'boolean')
  t.is(kindIs.objs(new Boolean(true)), 'boolean')
  t.is(kindIs.safe(bol), 'boolean')
  t.is(kindIs.safe(true), 'boolean')
  t.is(kindIs.safe(false), 'boolean')
  t.is(kindIs.safe(new Boolean(true)), 'boolean')
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
  t.is(kindIs.args(num), 'number')
  t.is(kindIs.args(42), 'number')
  t.is(kindIs.args(new Number(-9)), 'number')
  t.is(kindIs.args(nan), 'number')
  t.is(kindIs.args(NaN), 'number')
  t.is(kindIs.args(Infinity), 'number')
  t.is(kindIs.args(0), 'number')
  t.is(kindIs.args(1.342), 'number')
  t.is(kindIs.objs(num), 'number')
  t.is(kindIs.objs(42), 'number')
  t.is(kindIs.objs(new Number(-9)), 'number')
  t.is(kindIs.objs(nan), 'number')
  t.is(kindIs.objs(NaN), 'number')
  t.is(kindIs.objs(Infinity), 'number')
  t.is(kindIs.objs(0), 'number')
  t.is(kindIs.objs(1.342), 'number')
  t.is(kindIs.safe(num), 'number')
  t.is(kindIs.safe(42), 'number')
  t.is(kindIs.safe(new Number(-9)), 'number')
  t.is(kindIs.safe(nan), 'number')
  t.is(kindIs.safe(NaN), 'number')
  t.is(kindIs.safe(Infinity), 'number')
  t.is(kindIs.safe(0), 'number')
  t.is(kindIs.safe(1.342), 'number')
})

test('kindIs Symbols', function (t) {

})

test('kindIs Strings', function (t) {
  t.is(kindIs(str), 'string')
  t.is(kindIs('str'), 'string')
  t.is(kindIs(new String('a')), 'string')
  t.is(kindIs.args(str), 'string')
  t.is(kindIs.args('str'), 'string')
  t.is(kindIs.args(new String('a')), 'string')
  t.is(kindIs.objs(str), 'string')
  t.is(kindIs.objs('str'), 'string')
  t.is(kindIs.objs(new String('a')), 'string')
  t.is(kindIs.safe(str), 'string')
  t.is(kindIs.safe('str'), 'string')
  t.is(kindIs.safe(new String('a')), 'string')
})

test('kindIs Arrays', function (t) {
  t.is(kindIs(arr), 'array')
  t.is(kindIs([]), 'array')
  t.is(kindIs([1, 2, 3]), 'array')
  t.is(kindIs(new Array()), 'array')
  t.is(kindIs.args(arr), 'array')
  t.is(kindIs.args([]), 'array')
  t.is(kindIs.args([1, 2, 3]), 'array')
  t.is(kindIs.args(new Array()), 'array')
  t.is(kindIs.objs(arr), 'array')
  t.is(kindIs.objs([]), 'array')
  t.is(kindIs.objs([1, 2, 3]), 'array')
  t.is(kindIs.objs(new Array()), 'array')
  t.is(kindIs.safe(arr), 'array')
  t.is(kindIs.safe([]), 'array')
  t.is(kindIs.safe([1, 2, 3]), 'array')
  t.is(kindIs.safe(new Array()), 'array')
})

test('kindIs Functions', function (t) {
  t.is(kindIs(fun), 'function')
  t.is(kindIs(function () {}), 'function')
  t.is(kindIs(new Function ()), 'function')
  t.is(kindIs.args(fun), 'function')
  t.is(kindIs.args(function () {}), 'function')
  t.is(kindIs.args(new Function ()), 'function')
  t.is(kindIs.objs(fun), 'function')
  t.is(kindIs.objs(function () {}), 'function')
  t.is(kindIs.objs(new Function ()), 'function')
  t.is(kindIs.safe(fun), 'function')
  t.is(kindIs.safe(function () {}), 'function')
  t.is(kindIs.safe(new Function ()), 'function')
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
  t.is(kindIs.safe(create), 'object')
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
  t.is(kindIs.safe(arg), 'arguments')
  t.is(kindIs.safe(arguments), 'arguments')
  t.is((function () {
    return kindIs.safe(arguments)
  })(), 'arguments')
})

test('kindIs Buffer', function (t) {
  t.is(kindIs(buf), 'buffer')
  t.is(kindIs(new Buffer(' ')), 'buffer')
  // make note of difference
  t.isnt(kindIs.args(buf), 'buffer')
  t.isnt(kindIs.args(new Buffer(' ')), 'buffer')

  t.is(kindIs.objs(buf), 'buffer')
  t.is(kindIs.objs(new Buffer(' ')), 'buffer')
  t.is(kindIs.safe(buf), 'buffer')
  t.is(kindIs.safe(new Buffer(' ')), 'buffer')
})

test('kindIs Map', function (t) {
  // t.is(kindIs(map,'map'))
  // t.is(kindIs(map.set,'function'))
  // t.is(kindIs(map.get,'function'))
  // t.is(kindIs(map.add,'undefined'))
  t.end('Map is not defined. Test after upgrading')
})

test.result()