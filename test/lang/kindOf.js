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
  // No kindOf.objs() test. null and undefined throws.
  // default
  t.is(kindOf(nul), 'null')
  t.is(kindOf(null), 'null')
  t.is(kindOf(udf), 'undefined')
  t.is(kindOf(undefined), 'undefined')
  // base
  t.is(kindOf.base(nul), 'null')
  t.is(kindOf.base(null), 'null')
  t.is(kindOf.base(udf), 'undefined')
  t.is(kindOf.base(undefined), 'undefined')
  // type
  t.is(kindOf.type(nul), 'null')
  t.is(kindOf.type(null), 'null')
  t.is(kindOf.type(udf), 'undefined')
  t.is(kindOf.type(undefined), 'undefined')
  // safe
  t.is(kindOf.safe(nul), 'null')
  t.is(kindOf.safe(null), 'null')
  t.is(kindOf.safe(udf), 'undefined')
  t.is(kindOf.safe(undefined), 'undefined')
})

test('kindOf Booleans', function (t) {
  // default
  t.is(kindOf(bol), 'boolean')
  t.is(kindOf(true), 'boolean')
  t.is(kindOf(false), 'boolean')
  t.is(kindOf(new Boolean(true)), 'boolean')
  // base
  t.is(kindOf.base(bol), 'boolean')
  t.is(kindOf.base(true), 'boolean')
  t.is(kindOf.base(false), 'boolean')
  t.is(kindOf.base(new Boolean(true)), 'boolean')
  // type
  t.is(kindOf.type(bol), 'boolean')
  t.is(kindOf.type(true), 'boolean')
  t.is(kindOf.type(false), 'boolean')
  t.is(kindOf.type(new Boolean(true)), 'boolean')
  // objs
  t.is(kindOf.objs(bol), 'boolean')
  t.is(kindOf.objs(true), 'boolean')
  t.is(kindOf.objs(false), 'boolean')
  t.is(kindOf.objs(new Boolean(true)), 'boolean')
  // safe
  t.is(kindOf.safe(bol), 'boolean')
  t.is(kindOf.safe(true), 'boolean')
  t.is(kindOf.safe(false), 'boolean')
  t.is(kindOf.safe(new Boolean(true)), 'boolean')
})

test('kindOf Numbers', function (t) {
  // default
  t.is(kindOf(num), 'number')
  t.is(kindOf(42), 'number')
  t.is(kindOf(new Number(-9)), 'number')
  t.is(kindOf(nan), 'number')
  t.is(kindOf(NaN), 'number')
  t.is(kindOf(Infinity), 'number')
  t.is(kindOf(0), 'number')
  t.is(kindOf(1.342), 'number')
  // base
  t.is(kindOf.base(num), 'number')
  t.is(kindOf.base(42), 'number')
  t.is(kindOf.base(new Number(-9)), 'number')
  t.is(kindOf.base(nan), 'number')
  t.is(kindOf.base(NaN), 'number')
  t.is(kindOf.base(Infinity), 'number')
  t.is(kindOf.base(0), 'number')
  t.is(kindOf.base(1.342), 'number')
  // type
  t.is(kindOf.type(num), 'number')
  t.is(kindOf.type(42), 'number')
  t.is(kindOf.type(new Number(-9)), 'number')
  t.is(kindOf.type(nan), 'number')
  t.is(kindOf.type(NaN), 'number')
  t.is(kindOf.type(Infinity), 'number')
  t.is(kindOf.type(0), 'number')
  t.is(kindOf.type(1.342), 'number')
  // objs
  t.is(kindOf.objs(num), 'number')
  t.is(kindOf.objs(42), 'number')
  t.is(kindOf.objs(new Number(-9)), 'number')
  t.is(kindOf.objs(nan), 'number')
  t.is(kindOf.objs(NaN), 'number')
  t.is(kindOf.objs(Infinity), 'number')
  t.is(kindOf.objs(0), 'number')
  t.is(kindOf.objs(1.342), 'number')
  // safe
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
  // default
  t.is(kindOf(sym), 'symbol')
  // t.eq(kindOf(new Symbol('a')), 'symbol')
  // base
  t.is(kindOf.base(sym), 'symbol')
  // t.is(kindOf.base(new Symbol('a')), 'symbol')
  // type
  t.is(kindOf.type(sym), 'symbol')
  // t.is(kindOf.type(new Symbol('a')), 'symbol')
  // objs
  t.is(kindOf.objs(sym), 'symbol')
  // t.is(kindOf.objs(new Symbol('a')), 'symbol')
  // safe
  t.is(kindOf.safe(sym), 'symbol')
  // t.is(kindOf.safe(new Symbol('a')), 'symbol')
  t.end('symbols need more work')
})

test('kindOf Strings', function (t) {
  // default
  t.is(kindOf(str), 'string')
  t.is(kindOf('str'), 'string')
  t.is(kindOf(new String('a')), 'string')
  // base
  t.is(kindOf.base(str), 'string')
  t.is(kindOf.base('str'), 'string')
  t.is(kindOf.base(new String('a')), 'string')
  // type
  t.is(kindOf.type(str), 'string')
  t.is(kindOf.type('str'), 'string')
  t.is(kindOf.type(new String('a')), 'string')
  // objs
  t.is(kindOf.objs(str), 'string')
  t.is(kindOf.objs('str'), 'string')
  t.is(kindOf.objs(new String('a')), 'string')
  // safe
  t.is(kindOf.safe(str), 'string')
  t.is(kindOf.safe('str'), 'string')
  t.is(kindOf.safe(new String('a')), 'string')
})

test('kindOf Arrays', function (t) {
  // default
  t.is(kindOf(arr), 'array')
  t.is(kindOf([]), 'array')
  t.is(kindOf([1, 2, 3]), 'array')
  t.is(kindOf(new Array()), 'array')
  // base
  t.is(kindOf.base(arr), 'array')
  t.is(kindOf.base([]), 'array')
  t.is(kindOf.base([1, 2, 3]), 'array')
  t.is(kindOf.base(new Array()), 'array')
  // type
  t.is(kindOf.type(arr), 'array')
  t.is(kindOf.type([]), 'array')
  t.is(kindOf.type([1, 2, 3]), 'array')
  t.is(kindOf.type(new Array()), 'array')
  // objs
  t.is(kindOf.objs(arr), 'array')
  t.is(kindOf.objs([]), 'array')
  t.is(kindOf.objs([1, 2, 3]), 'array')
  t.is(kindOf.objs(new Array()), 'array')
  // safe
  t.is(kindOf.safe(arr), 'array')
  t.is(kindOf.safe([]), 'array')
  t.is(kindOf.safe([1, 2, 3]), 'array')
  t.is(kindOf.safe(new Array()), 'array')
})

test('kindOf Functions', function (t) {
  // default
  t.is(kindOf(fun), 'function')
  t.is(kindOf(function () {}), 'function')
  t.is(kindOf(new Function ()), 'function')
  // base
  t.is(kindOf.base(fun), 'function')
  t.is(kindOf.base(function () {}), 'function')
  t.is(kindOf.base(new Function ()), 'function')
  // type
  t.is(kindOf.type(fun), 'function')
  t.is(kindOf.type(function () {}), 'function')
  t.is(kindOf.type(new Function ()), 'function')
  // objs
  t.is(kindOf.objs(fun), 'function')
  t.is(kindOf.objs(function () {}), 'function')
  t.is(kindOf.objs(new Function ()), 'function')
  // safe
  t.is(kindOf.safe(fun), 'function')
  t.is(kindOf.safe(function () {}), 'function')
  t.is(kindOf.safe(new Function ()), 'function')
})

test('kindOf Dates', function (t) {
  // default
  t.is(kindOf(dat), 'date')
  t.is(kindOf(new Date()), 'date')
  t.is(kindOf(new Date(2017, 2, 19)), 'date')
  // base
  t.is(kindOf.base(dat), 'date')
  t.is(kindOf.base(new Date()), 'date')
  t.is(kindOf.base(new Date(2017, 2, 19)), 'date')
  // type
  t.is(kindOf.type(dat), 'date')
  t.is(kindOf.type(new Date()), 'date')
  t.is(kindOf.type(new Date(2017, 2, 19)), 'date')
  // objs
  t.is(kindOf.objs(dat), 'date')
  t.is(kindOf.objs(new Date()), 'date')
  t.is(kindOf.objs(new Date(2017, 2, 19)), 'date')
  // safe
  t.is(kindOf.safe(dat), 'date')
  t.is(kindOf.safe(new Date()), 'date')
  t.is(kindOf.safe(new Date(2017, 2, 19)), 'date')
})

test('kindOf RegExps', function (t) {
  // default
  t.is(kindOf(rex), 'regexp')
  t.is(kindOf(/[\w\s]+/), 'regexp')
  t.is(kindOf(new RegExp('^' + 'apple', 'g')), 'regexp')
  // base
  t.is(kindOf.base(rex), 'regexp')
  t.is(kindOf.base(/[\w\s]+/), 'regexp')
  t.is(kindOf.base(new RegExp('^' + 'apple', 'g')), 'regexp')
  // type
  t.is(kindOf.type(rex), 'regexp')
  t.is(kindOf.type(/[\w\s]+/), 'regexp')
  t.is(kindOf.type(new RegExp('^' + 'apple', 'g')), 'regexp')
  // objs
  t.is(kindOf.objs(rex), 'regexp')
  t.is(kindOf.objs(/[\w\s]+/), 'regexp')
  t.is(kindOf.objs(new RegExp('^' + 'apple', 'g')), 'regexp')
  // safe
  t.is(kindOf.safe(rex), 'regexp')
  t.is(kindOf.safe(/[\w\s]+/), 'regexp')
  t.is(kindOf.safe(new RegExp('^' + 'apple', 'g')), 'regexp')
})

test('kindOf Objects', function (t) {
  // no create test with base, type or objs.
  function Test() {}
  var instance = new Test()
  var literal = {}
  var create = Object.create(null)

  // default
  t.is(kindOf(obj), 'object')
  t.is(kindOf({a: 1, b: 2}), 'object')
  t.is(kindOf(literal), 'object')
  t.is(kindOf(instance), 'object')
  t.is(kindOf(create), 'object')
  // base
  t.is(kindOf.base(obj), 'object')
  t.is(kindOf.base({a: 1, b: 2}), 'object')
  t.is(kindOf.base(literal), 'object')
  t.is(kindOf.base(instance), 'test')
  // type
  t.is(kindOf.type(obj), 'object')
  t.is(kindOf.type({a: 1, b: 2}), 'object')
  t.is(kindOf.type(literal), 'object')
  t.is(kindOf.type(instance), 'test')
  // objs
  t.is(kindOf.objs(obj), 'object')
  t.is(kindOf.objs({a: 1, b: 2}), 'object')
  t.is(kindOf.objs(literal), 'object')
  t.is(kindOf.objs(instance), 'test')
  // safe
  t.is(kindOf.safe(obj), 'object')
  t.is(kindOf.safe({a: 1, b: 2}), 'object')
  t.is(kindOf.safe(literal), 'object')
  t.is(kindOf.safe(instance), 'test')
  t.is(kindOf.safe(create), 'object')
})

test('kindOf Arguments', function (t) {
  // default
  t.is(kindOf(arg), 'arguments')
  t.is(kindOf(arguments), 'arguments')
  t.is((function () {
    return kindOf(arguments)
  })(), 'arguments')
  // base
  t.is(kindOf.base(arg), 'object')
  t.is(kindOf.base(arguments), 'object')
  t.is((function () {
    return kindOf.base(arguments)
  })(), 'object')
  // type
  t.is(kindOf.type(arg), 'object')
  t.is(kindOf.type(arguments), 'object')
  t.is((function () {
    return kindOf.type(arguments)
  })(), 'object')
  // objs
  t.is(kindOf.objs(arg), 'object')
  t.is(kindOf.objs(arguments), 'object')
  t.is((function () {
    return kindOf.objs(arguments)
  })(), 'object')
  // safe
  t.is(kindOf.safe(arg), 'arguments')
  t.is(kindOf.safe(arguments), 'arguments')
  t.is((function () {
    return kindOf.safe(arguments)
  })(), 'arguments')
})

test('kindOf Buffer', function (t) {
  // default
  t.is(kindOf(buf), 'object')
  t.is(kindOf(new Buffer(' ')), 'object')
  // base
  t.is(kindOf.base(buf), 'buffer')
  t.is(kindOf.base(new Buffer(' ')), 'buffer')
  // type
  t.is(kindOf.type(buf), 'buffer')
  t.is(kindOf.type(new Buffer(' ')), 'buffer')
  // objs
  t.is(kindOf.objs(buf), 'buffer')
  t.is(kindOf.objs(new Buffer(' ')), 'buffer')
  // safe
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