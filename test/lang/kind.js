var test = require('../../src/assertion/ttr')
var kind = require('../../src/lang/kind')

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

test('kind Nil', function (t) {
  // No kind.objs() test. null and undefined throws.
  // default
  t.is(kind.Of(nul), 'null')
  t.is(kind.Of(null), 'null')
  t.is(kind.Of(udf), 'undefined')
  t.is(kind.Of(undefined), 'undefined')
  // base
  t.is(kind.base(nul), 'null')
  t.is(kind.base(null), 'null')
  t.is(kind.base(udf), 'undefined')
  t.is(kind.base(undefined), 'undefined')
  // type
  t.is(kind(nul), 'null')
  t.is(kind(null), 'null')
  t.is(kind(udf), 'undefined')
  t.is(kind(undefined), 'undefined')
  // safe
  t.is(kind.safe(nul), 'null')
  t.is(kind.safe(null), 'null')
  t.is(kind.safe(udf), 'undefined')
  t.is(kind.safe(undefined), 'undefined')
})

test('kind Booleans', function (t) {
  // default
  t.is(kind.Of(bol), 'boolean')
  t.is(kind.Of(true), 'boolean')
  t.is(kind.Of(false), 'boolean')
  t.is(kind.Of(new Boolean(true)), 'boolean')
  // base
  t.is(kind.base(bol), 'boolean')
  t.is(kind.base(true), 'boolean')
  t.is(kind.base(false), 'boolean')
  t.is(kind.base(new Boolean(true)), 'boolean')
  // type
  t.is(kind(bol), 'boolean')
  t.is(kind(true), 'boolean')
  t.is(kind(false), 'boolean')
  t.is(kind(new Boolean(true)), 'boolean')
  // objs
  t.is(kind.objs(bol), 'boolean')
  t.is(kind.objs(true), 'boolean')
  t.is(kind.objs(false), 'boolean')
  t.is(kind.objs(new Boolean(true)), 'boolean')
  // safe
  t.is(kind.safe(bol), 'boolean')
  t.is(kind.safe(true), 'boolean')
  t.is(kind.safe(false), 'boolean')
  t.is(kind.safe(new Boolean(true)), 'boolean')
})

test('kind Numbers', function (t) {
  // default
  t.is(kind.Of(num), 'number')
  t.is(kind.Of(42), 'number')
  t.is(kind.Of(new Number(-9)), 'number')
  t.is(kind.Of(nan), 'number')
  t.is(kind.Of(NaN), 'number')
  t.is(kind.Of(Infinity), 'number')
  t.is(kind.Of(0), 'number')
  t.is(kind.Of(1.342), 'number')
  // base
  t.is(kind.base(num), 'number')
  t.is(kind.base(42), 'number')
  t.is(kind.base(new Number(-9)), 'number')
  t.is(kind.base(nan), 'number')
  t.is(kind.base(NaN), 'number')
  t.is(kind.base(Infinity), 'number')
  t.is(kind.base(0), 'number')
  t.is(kind.base(1.342), 'number')
  // type
  t.is(kind(num), 'number')
  t.is(kind(42), 'number')
  t.is(kind(new Number(-9)), 'number')
  t.is(kind(nan), 'number')
  t.is(kind(NaN), 'number')
  t.is(kind(Infinity), 'number')
  t.is(kind(0), 'number')
  t.is(kind(1.342), 'number')
  // objs
  t.is(kind.objs(num), 'number')
  t.is(kind.objs(42), 'number')
  t.is(kind.objs(new Number(-9)), 'number')
  t.is(kind.objs(nan), 'number')
  t.is(kind.objs(NaN), 'number')
  t.is(kind.objs(Infinity), 'number')
  t.is(kind.objs(0), 'number')
  t.is(kind.objs(1.342), 'number')
  // safe
  t.is(kind.safe(num), 'number')
  t.is(kind.safe(42), 'number')
  t.is(kind.safe(new Number(-9)), 'number')
  t.is(kind.safe(nan), 'number')
  t.is(kind.safe(NaN), 'number')
  t.is(kind.safe(Infinity), 'number')
  t.is(kind.safe(0), 'number')
  t.is(kind.safe(1.342), 'number')
})

test('kind Symbols', function (t) {
  // default
  t.is(kind.Of(sym), 'symbol')
  // t.eq(kind.Of(new Symbol('a')), 'symbol')
  // base
  t.is(kind.base(sym), 'symbol')
  // t.is(kind.base(new Symbol('a')), 'symbol')
  // type
  t.is(kind(sym), 'symbol')
  // t.is(kind(new Symbol('a')), 'symbol')
  // objs
  t.is(kind.objs(sym), 'symbol')
  // t.is(kind.objs(new Symbol('a')), 'symbol')
  // safe
  t.is(kind.safe(sym), 'symbol')
  // t.is(kind.safe(new Symbol('a')), 'symbol')
  t.end('symbols need more work')
})

test('kind Strings', function (t) {
  // default
  t.is(kind.Of(str), 'string')
  t.is(kind.Of('str'), 'string')
  t.is(kind.Of(new String('a')), 'string')
  // base
  t.is(kind.base(str), 'string')
  t.is(kind.base('str'), 'string')
  t.is(kind.base(new String('a')), 'string')
  // type
  t.is(kind(str), 'string')
  t.is(kind('str'), 'string')
  t.is(kind(new String('a')), 'string')
  // objs
  t.is(kind.objs(str), 'string')
  t.is(kind.objs('str'), 'string')
  t.is(kind.objs(new String('a')), 'string')
  // safe
  t.is(kind.safe(str), 'string')
  t.is(kind.safe('str'), 'string')
  t.is(kind.safe(new String('a')), 'string')
})

test('kind Arrays', function (t) {
  // default
  t.is(kind.Of(arr), 'array')
  t.is(kind.Of([]), 'array')
  t.is(kind.Of([1, 2, 3]), 'array')
  t.is(kind.Of(new Array()), 'array')
  // base
  t.is(kind.base(arr), 'array')
  t.is(kind.base([]), 'array')
  t.is(kind.base([1, 2, 3]), 'array')
  t.is(kind.base(new Array()), 'array')
  // type
  t.is(kind(arr), 'array')
  t.is(kind([]), 'array')
  t.is(kind([1, 2, 3]), 'array')
  t.is(kind(new Array()), 'array')
  // objs
  t.is(kind.objs(arr), 'array')
  t.is(kind.objs([]), 'array')
  t.is(kind.objs([1, 2, 3]), 'array')
  t.is(kind.objs(new Array()), 'array')
  // safe
  t.is(kind.safe(arr), 'array')
  t.is(kind.safe([]), 'array')
  t.is(kind.safe([1, 2, 3]), 'array')
  t.is(kind.safe(new Array()), 'array')
})

test('kind Functions', function (t) {
  // default
  t.is(kind.Of(fun), 'function')
  t.is(kind.Of(function () {}), 'function')
  t.is(kind.Of(new Function ()), 'function')
  // base
  t.is(kind.base(fun), 'function')
  t.is(kind.base(function () {}), 'function')
  t.is(kind.base(new Function ()), 'function')
  // type
  t.is(kind(fun), 'function')
  t.is(kind(function () {}), 'function')
  t.is(kind(new Function ()), 'function')
  // objs
  t.is(kind.objs(fun), 'function')
  t.is(kind.objs(function () {}), 'function')
  t.is(kind.objs(new Function ()), 'function')
  // safe
  t.is(kind.safe(fun), 'function')
  t.is(kind.safe(function () {}), 'function')
  t.is(kind.safe(new Function ()), 'function')
})

test('kind Dates', function (t) {
  // default
  t.is(kind.Of(dat), 'date')
  t.is(kind.Of(new Date()), 'date')
  t.is(kind.Of(new Date(2017, 2, 19)), 'date')
  // base
  t.is(kind.base(dat), 'date')
  t.is(kind.base(new Date()), 'date')
  t.is(kind.base(new Date(2017, 2, 19)), 'date')
  // type
  t.is(kind(dat), 'date')
  t.is(kind(new Date()), 'date')
  t.is(kind(new Date(2017, 2, 19)), 'date')
  // objs
  t.is(kind.objs(dat), 'date')
  t.is(kind.objs(new Date()), 'date')
  t.is(kind.objs(new Date(2017, 2, 19)), 'date')
  // safe
  t.is(kind.safe(dat), 'date')
  t.is(kind.safe(new Date()), 'date')
  t.is(kind.safe(new Date(2017, 2, 19)), 'date')
})

test('kind RegExps', function (t) {
  // default
  t.is(kind.Of(rex), 'regexp')
  t.is(kind.Of(/[\w\s]+/), 'regexp')
  t.is(kind.Of(new RegExp('^' + 'apple', 'g')), 'regexp')
  // base
  t.is(kind.base(rex), 'regexp')
  t.is(kind.base(/[\w\s]+/), 'regexp')
  t.is(kind.base(new RegExp('^' + 'apple', 'g')), 'regexp')
  // type
  t.is(kind(rex), 'regexp')
  t.is(kind(/[\w\s]+/), 'regexp')
  t.is(kind(new RegExp('^' + 'apple', 'g')), 'regexp')
  // objs
  t.is(kind.objs(rex), 'regexp')
  t.is(kind.objs(/[\w\s]+/), 'regexp')
  t.is(kind.objs(new RegExp('^' + 'apple', 'g')), 'regexp')
  // safe
  t.is(kind.safe(rex), 'regexp')
  t.is(kind.safe(/[\w\s]+/), 'regexp')
  t.is(kind.safe(new RegExp('^' + 'apple', 'g')), 'regexp')
})

test('kind Objects', function (t) {
  // no create test with base, type or objs.
  function Test() {}
  var instance = new Test()
  var literal = {}
  var create = Object.create(null)

  // default
  t.is(kind.Of(obj), 'object')
  t.is(kind.Of({a: 1, b: 2}), 'object')
  t.is(kind.Of(literal), 'object')
  t.is(kind.Of(instance), 'object')
  t.is(kind.Of(create), 'object')
  // base
  t.is(kind.base(obj), 'object')
  t.is(kind.base({a: 1, b: 2}), 'object')
  t.is(kind.base(literal), 'object')
  t.is(kind.base(instance), 'test')
  // type
  t.is(kind(obj), 'object')
  t.is(kind({a: 1, b: 2}), 'object')
  t.is(kind(literal), 'object')
  t.is(kind(instance), 'test')
  // objs
  t.is(kind.objs(obj), 'object')
  t.is(kind.objs({a: 1, b: 2}), 'object')
  t.is(kind.objs(literal), 'object')
  t.is(kind.objs(instance), 'test')
  // safe
  t.is(kind.safe(obj), 'object')
  t.is(kind.safe({a: 1, b: 2}), 'object')
  t.is(kind.safe(literal), 'object')
  t.is(kind.safe(instance), 'test')
  t.is(kind.safe(create), 'object')
})

test('kind Arguments', function (t) {
  // default
  t.is(kind.Of(arg), 'arguments')
  t.is(kind.Of(arguments), 'arguments')
  t.is((function () {
    return kind.Of(arguments)
  })(), 'arguments')
  // base
  t.is(kind.base(arg), 'object')
  t.is(kind.base(arguments), 'object')
  t.is((function () {
    return kind.base(arguments)
  })(), 'object')
  // type
  t.is(kind(arg), 'object')
  t.is(kind(arguments), 'object')
  t.is((function () {
    return kind(arguments)
  })(), 'object')
  // objs
  t.is(kind.objs(arg), 'object')
  t.is(kind.objs(arguments), 'object')
  t.is((function () {
    return kind.objs(arguments)
  })(), 'object')
  // safe
  t.is(kind.safe(arg), 'arguments')
  t.is(kind.safe(arguments), 'arguments')
  t.is((function () {
    return kind.safe(arguments)
  })(), 'arguments')
})

test('kind Constructors', function (t) {
  function Foo () {}
  var foo = new Foo()

  // default
  t.is(kind.Of(foo), 'object')
  t.is(kind.Of(new Foo()), 'object')
  // base
  t.is(kind.base(foo), 'foo')
  t.is(kind.base(new Foo()), 'foo')
  // type
  t.is(kind(foo), 'foo')
  t.is(kind(new Foo()), 'foo')
  // objs
  t.is(kind.objs(foo), 'foo')
  t.is(kind.objs(new Foo()), 'foo')
  // safe
  t.is(kind.safe(foo), 'foo')
  t.is(kind.safe(new Foo()), 'foo')
})

test('kind Buffer', function (t) {
  // default
  t.is(kind.Of(buf), 'object')
  t.is(kind.Of(new Buffer(' ')), 'object')
  // base
  t.is(kind.base(buf), 'buffer')
  t.is(kind.base(new Buffer(' ')), 'buffer')
  // type
  t.is(kind(buf), 'buffer')
  t.is(kind(new Buffer(' ')), 'buffer')
  // objs
  t.is(kind.objs(buf), 'buffer')
  t.is(kind.objs(new Buffer(' ')), 'buffer')
  // safe
  t.is(kind.safe(buf), 'buffer')
  t.is(kind.safe(new Buffer(' ')), 'buffer')
})

test('kind Map', function (t) {
  // t.is(kind.Of(map,'map'))
  // t.is(kind.Of(map.set,'function'))
  // t.is(kind.Of(map.get,'function'))
  // t.is(kind.Of(map.add,'undefined'))
  t.end('Map is not defined. Test after upgrading')
})

test.result()