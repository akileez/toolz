var test = require('../../src/assertion/ttr')
var kindOf = require('../../src/lang/kindOf')

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

test('kindOf Nil', function (t) {
  t.is(kindOf(nul), 'null')
  t.is(kindOf(null), 'null')
  t.is(kindOf(udf), 'undefined')
  t.is(kindOf(undefined), 'undefined')

  t.is(kindOf.type(nul), 'null')
  t.is(kindOf.type(null), 'null')
  t.is(kindOf.type(udf), 'undefined')
  t.is(kindOf.type(undefined), 'undefined')

  t.is(kindOf.safe(nul), 'null')
  t.is(kindOf.safe(null), 'null')
  t.is(kindOf.safe(udf), 'undefined')
  t.is(kindOf.safe(undefined), 'undefined')
})

test('kindOf Booleans', function (t) {
  t.is(kindOf(bol), 'boolean')
  t.is(kindOf(true), 'boolean')
  t.is(kindOf(false), 'boolean')
  t.is(kindOf(new Boolean(true)), 'boolean')

  t.is(kindOf.type(bol), 'boolean')
  t.is(kindOf.type(true), 'boolean')
  t.is(kindOf.type(false), 'boolean')
  t.is(kindOf.type(new Boolean(true)), 'boolean')

  t.is(kindOf.objs(bol), 'boolean')
  t.is(kindOf.objs(true), 'boolean')
  t.is(kindOf.objs(false), 'boolean')
  t.is(kindOf.objs(new Boolean(true)), 'boolean')

  t.is(kindOf.safe(bol), 'boolean')
  t.is(kindOf.safe(true), 'boolean')
  t.is(kindOf.safe(false), 'boolean')
  t.is(kindOf.safe(new Boolean(true)), 'boolean')
})

test('kindOf Numbers', function (t) {
  t.is(kindOf(num), 'number')
  t.is(kindOf(42), 'number')
  t.is(kindOf(new Number(-9)), 'number')
  t.is(kindOf(nan), 'number')
  t.is(kindOf(NaN), 'number')
  t.is(kindOf(Infinity), 'number')
  t.is(kindOf(0), 'number')
  t.is(kindOf(1.342), 'number')

  t.is(kindOf.type(num), 'number')
  t.is(kindOf.type(42), 'number')
  t.is(kindOf.type(new Number(-9)), 'number')
  t.is(kindOf.type(nan), 'number')
  t.is(kindOf.type(NaN), 'number')
  t.is(kindOf.type(Infinity), 'number')
  t.is(kindOf.type(0), 'number')
  t.is(kindOf.type(1.342), 'number')

  t.is(kindOf.objs(num), 'number')
  t.is(kindOf.objs(42), 'number')
  t.is(kindOf.objs(new Number(-9)), 'number')
  t.is(kindOf.objs(nan), 'number')
  t.is(kindOf.objs(NaN), 'number')
  t.is(kindOf.objs(Infinity), 'number')
  t.is(kindOf.objs(0), 'number')
  t.is(kindOf.objs(1.342), 'number')

  t.is(kindOf.safe(num), 'number')
  t.is(kindOf.safe(42), 'number')
  t.is(kindOf.safe(new Number(-9)), 'number')
  t.is(kindOf.safe(nan), 'number')
  t.is(kindOf.safe(NaN), 'number')
  t.is(kindOf.safe(Infinity), 'number')
  t.is(kindOf.safe(0), 'number')
  t.is(kindOf.safe(1.342), 'number')
})

test('kindOf Symbols', function (t) {

})

test('kindOf Strings', function (t) {
  t.is(kindOf(str), 'string')
  t.is(kindOf('str'), 'string')
  t.is(kindOf(new String('a')), 'string')

  t.is(kindOf.type(str), 'string')
  t.is(kindOf.type('str'), 'string')
  t.is(kindOf.type(new String('a')), 'string')

  t.is(kindOf.objs(str), 'string')
  t.is(kindOf.objs('str'), 'string')
  t.is(kindOf.objs(new String('a')), 'string')

  t.is(kindOf.safe(str), 'string')
  t.is(kindOf.safe('str'), 'string')
  t.is(kindOf.safe(new String('a')), 'string')
})

test('kindOf Arrays', function (t) {
  t.is(kindOf(arr), 'array')
  t.is(kindOf([]), 'array')
  t.is(kindOf([1, 2, 3]), 'array')
  t.is(kindOf(new Array()), 'array')

  t.is(kindOf.type(arr), 'array')
  t.is(kindOf.type([]), 'array')
  t.is(kindOf.type([1, 2, 3]), 'array')
  t.is(kindOf.type(new Array()), 'array')

  t.is(kindOf.objs(arr), 'array')
  t.is(kindOf.objs([]), 'array')
  t.is(kindOf.objs([1, 2, 3]), 'array')
  t.is(kindOf.objs(new Array()), 'array')

  t.is(kindOf.safe(arr), 'array')
  t.is(kindOf.safe([]), 'array')
  t.is(kindOf.safe([1, 2, 3]), 'array')
  t.is(kindOf.safe(new Array()), 'array')
})

test('kindOf Functions', function (t) {
  t.is(kindOf(fun), 'function')
  t.is(kindOf(function () {}), 'function')
  t.is(kindOf(new Function ()), 'function')

  t.is(kindOf.type(fun), 'function')
  t.is(kindOf.type(function () {}), 'function')
  t.is(kindOf.type(new Function ()), 'function')

  t.is(kindOf.objs(fun), 'function')
  t.is(kindOf.objs(function () {}), 'function')
  t.is(kindOf.objs(new Function ()), 'function')

  t.is(kindOf.safe(fun), 'function')
  t.is(kindOf.safe(function () {}), 'function')
  t.is(kindOf.safe(new Function ()), 'function')
})

test('kindOf Dates', function (t) {
  t.is(kindOf(dat), 'date')
  t.is(kindOf(new Date()), 'date')
  t.is(kindOf(new Date(2017, 2, 19)), 'date')

  t.is(kindOf.type(dat), 'date')
  t.is(kindOf.type(new Date()), 'date')
  t.is(kindOf.type(new Date(2017, 2, 19)), 'date')

  t.is(kindOf.objs(dat), 'date')
  t.is(kindOf.objs(new Date()), 'date')
  t.is(kindOf.objs(new Date(2017, 2, 19)), 'date')

  t.is(kindOf.safe(dat), 'date')
  t.is(kindOf.safe(new Date()), 'date')
  t.is(kindOf.safe(new Date(2017, 2, 19)), 'date')
})

test('kindOf RegExps', function (t) {
  t.is(kindOf(rex), 'regexp')
  t.is(kindOf(/[\w\s]+/), 'regexp')
  t.is(kindOf(new RegExp('^' + 'apple', 'g')), 'regexp')

  t.is(kindOf.type(rex), 'regexp')
  t.is(kindOf.type(/[\w\s]+/), 'regexp')
  t.is(kindOf.type(new RegExp('^' + 'apple', 'g')), 'regexp')

  t.is(kindOf.objs(rex), 'regexp')
  t.is(kindOf.objs(/[\w\s]+/), 'regexp')
  t.is(kindOf.objs(new RegExp('^' + 'apple', 'g')), 'regexp')

  t.is(kindOf.safe(rex), 'regexp')
  t.is(kindOf.safe(/[\w\s]+/), 'regexp')
  t.is(kindOf.safe(new RegExp('^' + 'apple', 'g')), 'regexp')
})

test('kindOf Objects', function (t) {
  function Test() {}
  var instance = new Test()
  var literal = {}
  var create = Object.create(null)

  t.is(kindOf(obj), 'object')
  t.is(kindOf({a: 1, b: 2}), 'object')
  t.is(kindOf(literal), 'object')
  t.is(kindOf(instance), 'object')
  t.is(kindOf(create), 'object')

  t.is(kindOf.type(obj), 'object')
  t.is(kindOf.type({a: 1, b: 2}), 'object')
  t.is(kindOf.type(literal), 'object')
  // make note of difference
  t.is(kindOf.type(instance), 'test')

  t.is(kindOf.objs(obj), 'object')
  t.is(kindOf.objs({a: 1, b: 2}), 'object')
  t.is(kindOf.objs(literal), 'object')
  t.is(kindOf.objs(instance), 'test')

  t.is(kindOf.safe(obj), 'object')
  t.is(kindOf.safe({a: 1, b: 2}), 'object')
  t.is(kindOf.safe(literal), 'object')
  t.is(kindOf.safe(instance), 'test')
  t.is(kindOf.safe(create), 'object')
})

test('kindOf Arguments', function (t) {
  t.is(kindOf(arg), 'arguments')
  t.is(kindOf(arguments), 'arguments')
  t.is((function () {
    return kindOf(arguments)
  })(), 'arguments')

  t.is(kindOf.type(arg), 'object')
  t.is(kindOf.type(arguments), 'object')
  t.is((function () {
    return kindOf.type(arguments)
  })(), 'object')

  t.is(kindOf.objs(arg), 'object')
  t.is(kindOf.objs(arguments), 'object')
  t.is((function () {
    return kindOf.objs(arguments)
  })(), 'object')

  t.is(kindOf.safe(arg), 'object')
  t.is(kindOf.safe(arguments), 'object')
  t.is((function () {
    return kindOf.safe(arguments)
  })(), 'object')
})

test('kindOf Buffer', function (t) {
  t.is(kindOf(buf), 'object')
  t.is(kindOf(new Buffer(' ')), 'object')
  // make note of difference
  t.is(kindOf.type(buf), 'buffer')
  t.is(kindOf.type(new Buffer(' ')), 'buffer')

  t.is(kindOf.objs(buf), 'buffer')
  t.is(kindOf.objs(new Buffer(' ')), 'buffer')

  t.is(kindOf.safe(buf), 'buffer')
  t.is(kindOf.safe(new Buffer(' ')), 'buffer')
})

test('kindOf Map', function (t) {
  // t.is(kindOf(map,'map'))
  // t.is(kindOf(map.set,'function'))
  // t.is(kindOf(map.get,'function'))
  // t.is(kindOf(map.add,'undefined'))
  t.end('Map is not defined. Test after upgrading')
})

test.result()