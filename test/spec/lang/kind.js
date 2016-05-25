var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/kind')
var t = painless.assert
var kind = require('../../../src/lang/kind')

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

test('kind Nil', function () {
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
  // objs
  t.is(kind.objs(nul), 'null')
  t.is(kind.objs(null), 'null')
  t.is(kind.objs(udf), 'undefined')
  t.is(kind.objs(undefined), 'undefined')
  // safe
  t.is(kind.safe(nul), 'null')
  t.is(kind.safe(null), 'null')
  t.is(kind.safe(udf), 'undefined')
  t.is(kind.safe(undefined), 'undefined')
})

test('kind Booleans', function () {
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

test('kind Numbers', function () {
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

test('kind Symbols', function () {
  // default
  t.is(kind.Of(sym), 'symbol')
  t.eq(kind.Of(Symbol('a')), 'symbol')
  t.is(kind.Of(Symbol.prototype), 'symbol')
  // base
  t.is(kind.base(sym), 'symbol')
  t.is(kind.base(Symbol('a')), 'symbol')
  t.is(kind.base(Symbol.prototype), 'symbol')
  // type
  t.is(kind(sym), 'symbol')
  t.is(kind(Symbol('a')), 'symbol')
  t.is(kind(Symbol.prototype), 'symbol')
  // objs
  t.is(kind.objs(sym), 'symbol')
  t.is(kind.objs(Symbol('a')), 'symbol')
  t.is(kind.objs(Symbol.prototype), 'symbol')
  // safe
  t.is(kind.safe(sym), 'symbol')
  t.is(kind.safe(Symbol('a')), 'symbol')
  t.is(kind.safe(Symbol.prototype), 'symbol')

})

test('kind Strings', function () {
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

test('kind Arrays', function () {
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

test('kind Functions', function () {
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

test('kind Dates', function () {
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

test('kind RegExps', function () {
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

test('kind Objects', function () {
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

test('kind Arguments', function () {
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

test('kind Constructors', function () {
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

test('kind Buffer', function () {
  // default
  t.is(kind.Of(buf), 'uint8array')
  t.is(kind.Of(new Buffer(' ')), 'uint8array')
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

test('kind Map', function () {
  var map = new Map()
  t.is(kind.Of(map), 'map')
  t.is(kind.Of(map.set), 'function')
  t.is(kind.Of(map.get), 'function')
  t.is(kind.Of(map.add), 'undefined')

  t.is(kind.base(map), 'map')
  t.is(kind.base(map.set), 'function')
  t.is(kind.base(map.get), 'function')
  t.is(kind.base(map.add), 'undefined')

  t.is(kind(map), 'map')
  t.is(kind(map.set), 'function')
  t.is(kind(map.get), 'function')
  t.is(kind(map.add), 'undefined')

  t.is(kind.objs(map), 'map')
  t.is(kind.objs(map.set), 'function')
  t.is(kind.objs(map.get), 'function')
  t.is(kind.objs(map.add), 'undefined')

  t.is(kind.safe(map), 'map')
  t.is(kind.safe(map.set), 'function')
  t.is(kind.safe(map.get), 'function')
  t.is(kind.safe(map.add), 'undefined')
})

test('kind WeakMap', function () {
  var weakmap = new WeakMap()
  t.is(kind.Of(weakmap), 'weakmap')
  t.is(kind.Of(weakmap.set), 'function')
  t.is(kind.Of(weakmap.get), 'function')
  t.is(kind.Of(weakmap.add), 'undefined')

  t.is(kind.base(weakmap), 'weakmap')
  t.is(kind.base(weakmap.set), 'function')
  t.is(kind.base(weakmap.get), 'function')
  t.is(kind.base(weakmap.add), 'undefined')

  t.is(kind(weakmap), 'weakmap')
  t.is(kind(weakmap.set), 'function')
  t.is(kind(weakmap.get), 'function')
  t.is(kind(weakmap.add), 'undefined')

  t.is(kind.objs(weakmap), 'weakmap')
  t.is(kind.objs(weakmap.set), 'function')
  t.is(kind.objs(weakmap.get), 'function')
  t.is(kind.objs(weakmap.add), 'undefined')

  t.is(kind.safe(weakmap), 'weakmap')
  t.is(kind.safe(weakmap.set), 'function')
  t.is(kind.safe(weakmap.get), 'function')
  t.is(kind.safe(weakmap.add), 'undefined')
})

test('kind Set', function () {
  var set = new Set()
  t.is(kind.Of(set), 'set')
  t.is(kind.Of(set.add), 'function')
  t.is(kind.Of(set.set), 'undefined')
  t.is(kind.Of(set.get), 'undefined')

  t.is(kind.base(set), 'set')
  t.is(kind.base(set.add), 'function')
  t.is(kind.base(set.set), 'undefined')
  t.is(kind.base(set.get), 'undefined')

  t.is(kind(set), 'set')
  t.is(kind(set.add), 'function')
  t.is(kind(set.set), 'undefined')
  t.is(kind(set.get), 'undefined')

  t.is(kind.objs(set), 'set')
  t.is(kind.objs(set.add), 'function')
  t.is(kind.objs(set.set), 'undefined')
  t.is(kind.objs(set.get), 'undefined')

  t.is(kind.safe(set), 'set')
  t.is(kind.safe(set.add), 'function')
  t.is(kind.safe(set.set), 'undefined')
  t.is(kind.safe(set.get), 'undefined')

})

test('kind WeakSet', function () {
  var weakset = new WeakSet()
  t.is(kind.Of(weakset), 'weakset')
  t.is(kind.Of(weakset.add), 'function')
  t.is(kind.Of(weakset.set), 'undefined')
  t.is(kind.Of(weakset.get), 'undefined')

  t.is(kind.base(weakset), 'weakset')
  t.is(kind.base(weakset.add), 'function')
  t.is(kind.base(weakset.set), 'undefined')
  t.is(kind.base(weakset.get), 'undefined')

  t.is(kind(weakset), 'weakset')
  t.is(kind(weakset.add), 'function')
  t.is(kind(weakset.set), 'undefined')
  t.is(kind(weakset.get), 'undefined')

  t.is(kind.objs(weakset), 'weakset')
  t.is(kind.objs(weakset.add), 'function')
  t.is(kind.objs(weakset.set), 'undefined')
  t.is(kind.objs(weakset.get), 'undefined')

  t.is(kind.safe(weakset), 'weakset')
  t.is(kind.safe(weakset.add), 'function')
  t.is(kind.safe(weakset.set), 'undefined')
  t.is(kind.safe(weakset.get), 'undefined')
})


test('kind Int8Array', function () {
  var int8array = new Int8Array();
  t.is(kind.Of(int8array), 'int8array')
  t.is(kind.base(int8array), 'int8array')
  t.is(kind(int8array), 'int8array')
  t.is(kind.objs(int8array), 'int8array')
  t.is(kind.safe(int8array), 'int8array')
});

test('kind Uint8Array', function () {
  var uint8array = new Uint8Array();
  t.is(kind.Of(uint8array), 'uint8array')
  t.is(kind.base(uint8array), 'uint8array')
  t.is(kind(uint8array), 'uint8array')
  t.is(kind.objs(uint8array), 'uint8array')
  t.is(kind.safe(uint8array), 'uint8array')
});

test('kind Uint8ClampedArray', function () {
  var uint8clampedarray = new Uint8ClampedArray();
  t.is(kind.Of(uint8clampedarray), 'uint8clampedarray')
  t.is(kind.base(uint8clampedarray), 'uint8clampedarray')
  t.is(kind(uint8clampedarray), 'uint8clampedarray')
  t.is(kind.objs(uint8clampedarray), 'uint8clampedarray')
  t.is(kind.safe(uint8clampedarray), 'uint8clampedarray')
});

test('kind Int16Array', function () {
  var int16array = new Int16Array();
  t.is(kind.Of(int16array), 'int16array')
  t.is(kind.base(int16array), 'int16array')
  t.is(kind(int16array), 'int16array')
  t.is(kind.objs(int16array), 'int16array')
  t.is(kind.safe(int16array), 'int16array')
});

test('kind Uint16Array', function () {
  var uint16array = new Uint16Array();
  t.is(kind.Of(uint16array), 'uint16array')
  t.is(kind.base(uint16array), 'uint16array')
  t.is(kind(uint16array), 'uint16array')
  t.is(kind.objs(uint16array), 'uint16array')
  t.is(kind.safe(uint16array), 'uint16array')
});

test('kind Int32Array', function () {
  var int32array = new Int32Array();
  t.is(kind.Of(int32array), 'int32array')
  t.is(kind.base(int32array), 'int32array')
  t.is(kind(int32array), 'int32array')
  t.is(kind.objs(int32array), 'int32array')
  t.is(kind.safe(int32array), 'int32array')
});

test('kind Uint32Array', function () {
  var uint32array = new Uint32Array();
  t.is(kind.Of(uint32array), 'uint32array')
  t.is(kind.base(uint32array), 'uint32array')
  t.is(kind(uint32array), 'uint32array')
  t.is(kind.objs(uint32array), 'uint32array')
  t.is(kind.safe(uint32array), 'uint32array')
});

test('kind Float32Array', function () {
  var float32array = new Float32Array();
  t.is(kind.Of(float32array), 'float32array')
  t.is(kind.base(float32array), 'float32array')
  t.is(kind(float32array), 'float32array')
  t.is(kind.objs(float32array), 'float32array')
  t.is(kind.safe(float32array), 'float32array')
});

test('kind Float64Array', function () {
  var float64array = new Float64Array();
  t.is(kind.Of(float64array), 'float64array')
  t.is(kind.base(float64array), 'float64array')
  t.is(kind(float64array), 'float64array')
  t.is(kind.objs(float64array), 'float64array')
  t.is(kind.safe(float64array), 'float64array')
});
