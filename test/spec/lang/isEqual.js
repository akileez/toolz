var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isEqual')
var t = painless.assert


var isEqual = require('../../../src/lang/isEqual')

var map = require('../../../src/array/map')
var create = require('../../../src/lang/createObject')
var each = require('../../../src/array/forEach')
var constant = require('../../../src/function/constant')
var times = require('../../../src/function/times')
var every = require('../../../src/array/every')
var partial = require('../../../src/function/partial')

var root = (typeof global == 'object' && global) || this;

var ArrayBuffer = root.ArrayBuffer,
      Buffer = root.Buffer,
      DataView = root.DataView,
      Promise = root.Promise,
      Map = root.Map,
      Set = root.Set,
      Symbol = root.Symbol,
      Uint8Array = root.Uint8Array,
      WeakMap = root.WeakMap,
      WeakSet = root.WeakSet;

var realm = {}
var promise = Promise ? Promise.resolve(1) : undefined
var set = Set ? new Set : undefined

/** Math helpers. */
  var add = function(x, y) { return x + y; },
      doubled = function(n) { return n * 2; },
      isEven = function(n) { return n % 2 == 0; },
      square = function(n) { return n * n; };

  /** Constant functions. */
  var alwaysA = function() { return 'a'; },
      alwaysB = function() { return 'b'; },
      alwaysC = function() { return 'c'; };

  var alwaysTrue = function() { return true; },
      alwaysFalse = function() { return false; };

  var alwaysNaN = function() { return NaN; },
      alwaysNull = function() { return null; },
      alwaysUndefined = function() { return undefined; };

  var alwaysZero = function() { return 0; },
      alwaysOne = function() { return 1; },
      alwaysTwo = function() { return 2; },
      alwaysThree = function() { return 3; },
      alwaysFour = function() { return 4; };

  var alwaysEmptyArray = function() { return []; },
      alwaysEmptyObject = function() { return {}; },
      alwaysEmptyString = function() { return ''; };
  /** Used to check whether methods support typed arrays. */
  // var typedArrays = [
  //   'Float32Array',
  //   'Float64Array',
  //   'Int8Array',
  //   'Int16Array',
  //   'Int32Array',
  //   'Uint8Array',
  //   'Uint8ClampedArray',
  //   'Uint16Array',
  //   'Uint32Array'
  // ];

  // /** Used to check whether methods support array views. */
  // var arrayViews = typedArrays.concat('DataView');

var symbol1 = Symbol ? Symbol('a') : true
var symbol2 = Symbol ? Symbol('b') : false

test('should compare primitives', function() {
  var pairs = [
    [1, 1, true], [1, Object(1), true], [1, '1', false], [1, 2, false],
    [-0, -0, true], [0, 0, true], [0, Object(0), true], [Object(0), Object(0), true], [-0, 0, true], [0, '0', false], [0, null, false],
    [NaN, NaN, true], [NaN, Object(NaN), true], [Object(NaN), Object(NaN), true], [NaN, 'a', false], [NaN, Infinity, false],
    ['a', 'a', true], ['a', Object('a'), true], [Object('a'), Object('a'), true], ['a', 'b', false], ['a', ['a'], false],
    [true, true, true], [true, Object(true), true], [Object(true), Object(true), true], [true, 1, false], [true, 'a', false],
    [false, false, true], [false, Object(false), true], [Object(false), Object(false), true], [false, 0, false], [false, '', false],
    [symbol1, symbol1, true], [symbol1, Object(symbol1), true], [Object(symbol1), Object(symbol1), true], [symbol1, symbol2, false],
    [null, null, true], [null, undefined, false], [null, {}, false], [null, '', false],
    [undefined, undefined, true], [undefined, null, false], [undefined, '', false]
  ]

  var expected = map(pairs, function(pair) {
    return pair[2]
  })

  var actual = map(pairs, function(pair) {
    return isEqual(pair[0], pair[1])
  })

  t.same(actual, expected)
})

test('should compare arrays', function() {
  var array1 = [true, null, 1, 'a', undefined],
      array2 = [true, null, 1, 'a', undefined];

  t.is(isEqual(array1, array2), true);

  array1 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { 'e': 1 }];
  array2 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { 'e': 1 }];

  t.is(isEqual(array1, array2), true);

  array1 = [1];
  array1[2] = 3;

  array2 = [1];
  array2[1] = undefined;
  array2[2] = 3;

  t.is(isEqual(array1, array2), true);

  array1 = [Object(1), false, Object('a'), /x/, new Date(2012, 4, 23), ['a', 'b', [Object('c')]], { 'a': 1 }];
  array2 = [1, Object(false), 'a', /x/, new Date(2012, 4, 23), ['a', Object('b'), ['c']], { 'a': 1 }];

  t.is(isEqual(array1, array2), true);

  array1 = [1, 2, 3];
  array2 = [3, 2, 1];

  t.is(isEqual(array1, array2), false);

  array1 = [1, 2];
  array2 = [1, 2, 3];

  t.is(isEqual(array1, array2), false);
});

test('should treat arrays with identical values but different non-index properties as equal', function() {
  var array1 = [1, 2, 3],
      array2 = [1, 2, 3];

  array1.every = array1.filter = array1.forEach =
  array1.indexOf = array1.lastIndexOf = array1.map =
  array1.some = array1.reduce = array1.reduceRight = null;

  array2.concat = array2.join = array2.pop =
  array2.reverse = array2.shift = array2.slice =
  array2.sort = array2.splice = array2.unshift = null;

  t.is(isEqual(array1, array2), true);

  array1 = [1, 2, 3];
  array1.a = 1;

  array2 = [1, 2, 3];
  array2.b = 1;

  t.is(isEqual(array1, array2), true);

  array1 = /c/.exec('abcde');
  array2 = ['c'];

  t.is(isEqual(array1, array2), true);
});

test('should compare sparse arrays', function() {
  var array = Array(1);

  t.is(isEqual(array, Array(1)), true);
  t.is(isEqual(array, [undefined]), true);
  t.is(isEqual(array, Array(2)), false);
});

test('should compare plain objects', function() {
  var object1 = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined },
      object2 = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined };

  t.is(isEqual(object1, object2), true);

  object1 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };
  object2 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };

  t.is(isEqual(object1, object2), true);

  object1 = { 'a': 1, 'b': 2, 'c': 3 };
  object2 = { 'a': 3, 'b': 2, 'c': 1 };

  t.is(isEqual(object1, object2), false);

  object1 = { 'a': 1, 'b': 2, 'c': 3 };
  object2 = { 'd': 1, 'e': 2, 'f': 3 };

  t.is(isEqual(object1, object2), false);

  object1 = { 'a': 1, 'b': 2 };
  object2 = { 'a': 1, 'b': 2, 'c': 3 };

  t.is(isEqual(object1, object2), false);
});

test('should compare objects regardless of key order', function() {
  var object1 = { 'a': 1, 'b': 2, 'c': 3 },
      object2 = { 'c': 3, 'a': 1, 'b': 2 };

  t.is(isEqual(object1, object2), true);
});

test('should compare nested objects', function() {
  function noop () {}

  var object1 = {
    'a': [1, 2, 3],
    'b': true,
    'c': Object(1),
    'd': 'a',
    'e': {
      'f': ['a', Object('b'), 'c'],
      'g': Object(false),
      'h': new Date(2012, 4, 23),
      'i': noop,
      'j': 'a'
    }
  };

  var object2 = {
    'a': [1, Object(2), 3],
    'b': Object(true),
    'c': 1,
    'd': Object('a'),
    'e': {
      'f': ['a', 'b', 'c'],
      'g': false,
      'h': new Date(2012, 4, 23),
      'i': noop,
      'j': 'a'
    }
  };

  t.is(isEqual(object1, object2), true);
});

test('should compare object instances', function () {
  function Foo() {
    this.a = 1;
  }
  Foo.prototype.a = 1;

  function Bar() {
    this.a = 1;
  }
  Bar.prototype.a = 2;

  t.is(isEqual(new Foo, new Foo), true);
  t.is(isEqual(new Foo, new Bar), false);
  t.is(isEqual({ 'a': 1 }, new Foo), false);
  t.is(isEqual({ 'a': 2 }, new Bar), false);
});

test('should compare objects with constructor properties', function () {
  t.is(isEqual({ 'constructor': 1 },   { 'constructor': 1 }), true);
  t.is(isEqual({ 'constructor': 1 },   { 'constructor': '1' }), false);
  t.is(isEqual({ 'constructor': [1] }, { 'constructor': [1] }), true);
  t.is(isEqual({ 'constructor': [1] }, { 'constructor': ['1'] }), false);
  t.is(isEqual({ 'constructor': Object }, {}), false);
});

test('should compare arrays with circular references', function () {
  var array1 = [],
      array2 = [];

  array1.push(array1);
  array2.push(array2);

  t.is(isEqual(array1, array2), true);

  array1.push('b');
  array2.push('b');

  t.is(isEqual(array1, array2), true);

  array1.push('c');
  array2.push('d');

  t.is(isEqual(array1, array2), false);

  array1 = ['a', 'b', 'c'];
  array1[1] = array1;
  array2 = ['a', ['a', 'b', 'c'], 'c'];

  t.is(isEqual(array1, array2), false);
});

test('should compare objects with circular references', function () {
  var object1 = {},
      object2 = {};

  object1.a = object1;
  object2.a = object2;

  t.is(isEqual(object1, object2), true);

  object1.b = 0;
  object2.b = Object(0);

  t.is(isEqual(object1, object2), true);

  object1.c = Object(1);
  object2.c = Object(2);

  t.is(isEqual(object1, object2), false);

  object1 = { 'a': 1, 'b': 2, 'c': 3 };
  object1.b = object1;
  object2 = { 'a': 1, 'b': { 'a': 1, 'b': 2, 'c': 3 }, 'c': 3 };

  t.is(isEqual(object1, object2), false);
});

test('should compare objects with multiple circular references', function () {
  var array1 = [{}],
      array2 = [{}];

  (array1[0].a = array1).push(array1);
  (array2[0].a = array2).push(array2);

  t.is(isEqual(array1, array2), true);

  array1[0].b = 0;
  array2[0].b = Object(0);

  t.is(isEqual(array1, array2), true);

  array1[0].c = Object(1);
  array2[0].c = Object(2);

  t.is(isEqual(array1, array2), false);
});

test('should compare objects with complex circular references', function () {
  var object1 = {
    'foo': { 'b': { 'c': { 'd': {} } } },
    'bar': { 'a': 2 }
  };

  var object2 = {
    'foo': { 'b': { 'c': { 'd': {} } } },
    'bar': { 'a': 2 }
  };

  object1.foo.b.c.d = object1;
  object1.bar.b = object1.foo.b;

  object2.foo.b.c.d = object2;
  object2.bar.b = object2.foo.b;

  t.is(isEqual(object1, object2), true);
});

test('should compare objects with shared property values', function () {
  var object1 = {
    'a': [1, 2]
  };

  var object2 = {
    'a': [1, 2],
    'b': [1, 2]
  };

  object1.b = object1.a;

  t.is(isEqual(object1, object2), true);
});

test('should treat objects created by `Object.create(null)` like a plain object', function () {
  function Foo() {
    this.a = 1;
  }
  Foo.prototype.constructor = null;

  var object2 = { 'a': 1 };
  t.is(isEqual(new Foo, object2), false);

  if (create)  {
    var object1 = create(null);
    object1.a = 1;
    t.is(isEqual(object1, object2), true);
  }
  else {
    skipAssert(assert);
  }
});

test('should return `false` for objects with custom `toString` methods', function () {
  var primitive,
      object = { 'toString': function() { return primitive; } },
      values = [true, null, 1, 'a', undefined],
      expected = map(values, alwaysFalse);

  var actual = map(values, function(value) {
    primitive = value;
    return isEqual(object, value);
  });

  t.same(actual, expected);
});

test('should avoid common type coercions', function () {
  t.is(isEqual(true, Object(false)), false);
  t.is(isEqual(Object(false), Object(0)), false);
  t.is(isEqual(false, Object('')), false);
  t.is(isEqual(Object(36), Object('36')), false);
  t.is(isEqual(0, ''), false);
  t.is(isEqual(1, true), false);
  t.is(isEqual(1337756400000, new Date(2012, 4, 23)), false);
  t.is(isEqual('36', 36), false);
  t.is(isEqual(36, '36'), false);
});

test('should compare `arguments` objects', function () {
  var args1 = (function() { return arguments; }(1, 2, 3)),
      args2 = (function() { return arguments; }(1, 2, 3)),
      args3 = (function() { return arguments; }(1, 2));

  t.is(isEqual(args1, args2), true);
  t.is(isEqual(args1, args3), false);
});

test('should treat `arguments` objects like `Object` objects', function () {
  var args = (function() { return arguments; }(1, 2, 3)),
      object = { '0': 1, '1': 2, '2': 3 };

  function Foo() {}
  Foo.prototype = object;

  t.is(isEqual(args, object), true);
  t.is(isEqual(object, args), true);

  t.is(isEqual(args, new Foo), false);
  t.is(isEqual(new Foo, args), false);
});

test('should compare array buffers', function () {
  if (ArrayBuffer) {
    var buffer1 = new ArrayBuffer(4),
        buffer2 = new ArrayBuffer(8);

    t.is(isEqual(buffer1, buffer2), false);

    buffer1 = new Int8Array([-1]).buffer;
    buffer2 = new Uint8Array([255]).buffer;

    t.is(isEqual(buffer1, buffer2), true);
  }
  else {
    skipAssert(assert, 2);
  }
});

test('should compare date objects', function () {
  var date = new Date(2012, 4, 23);

  t.is(isEqual(date, new Date(2012, 4, 23)), true);
  t.is(isEqual(date, new Date(2013, 3, 25)), false);
  t.is(isEqual(date, { 'getTime': constant(+date) }), false);
  t.is(isEqual(new Date('a'), new Date('a')), false);
});

test('should compare error objects', function () {
  var pairs = map([
    'Error',
    'EvalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError'
  ], function(type, index, errorTypes) {
    var otherType = errorTypes[++index % errorTypes.length],
        CtorA = root[type],
        CtorB = root[otherType];

    return [new CtorA('a'), new CtorA('a'), new CtorB('a'), new CtorB('b')];
  });

  var expected = map(pairs, constant([true, false, false]));

  var actual = map(pairs, function(pair) {
    return [isEqual(pair[0], pair[1]), isEqual(pair[0], pair[2]), isEqual(pair[2], pair[3])];
  });

  t.same(actual, expected);
});

test('should compare functions', function () {
  function a() { return 1 + 2; }
  function b() { return 1 + 2; }

  t.is(isEqual(a, a), true);
  t.is(isEqual(a, b), false);
});

test('should compare maps with circular references', function () {
  if (Map) {
    var map1 = new Map,
        map2 = new Map;

    map1.set('a', map1);
    map2.set('a', map2);
    t.is(isEqual(map1, map2), true);

    map1.set('b', 1);
    map2.set('b', 2);
    t.is(isEqual(map1, map2), false);
  }
  else {
    skipAssert(assert, 2);
  }
});

test('should compare regexes', function () {
  t.is(isEqual(/x/gim, /x/gim), true);
  t.is(isEqual(/x/gim, /x/mgi), true);
  t.is(isEqual(/x/gi, /x/g), false);
  t.is(isEqual(/x/, /y/), false);
  t.is(isEqual(/x/g, { 'global': true, 'ignoreCase': false, 'multiline': false, 'source': 'x' }), false);
});

test('should compare sets with circular references', function () {
  if (Set) {
    var set1 = new Set,
        set2 = new Set;

    set1.add(set1);
    set2.add(set2);
    t.is(isEqual(set1, set2), true);

    set1.add(1);
    set2.add(2);
    t.is(isEqual(set1, set2), false);
  }
  else {
    skipAssert(assert, 2);
  }
});

test('should work as an iteratee for `_.every`', function () {
  var actual = every([1, 1, 1], partial(isEqual, 1));
  t.ok(actual);
});
