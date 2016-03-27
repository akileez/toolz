var painless = require('../../assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test lang/class-utils')

var utils = require('../../../src/lang/class-utils')

// isObject tests

test('test Object Is Object', function() {
  var o = new Object();
  t.is(true, utils.isObject(o))
})

test('test Object Literal Is Object', function () {
  var o = {}

  t.is(true, utils.isObject(o))
})

test('test Array Object', function () {
  var o = new Array()

  t.is(true, utils.isObject(o))
})

test('test Array Literal Is Object', function() {
  var o = []

  t.is(true, utils.isObject(o))
})

test('test String Is Not Object', function() {
  var o = "abc"

  t.is(false, utils.isObject(o))
})

test('test Function Is Not Object', function() {
  var o = function() {}

  t.is(false, utils.isObject(o))
})

// isFunction

test('test Object Is Not Function', function() {
  var o = new Object()

  t.is(false, utils.isFunction(o))
})

test('test Object Literal Is Not Function', function() {
  var o = {}

  t.is(false, utils.isFunction(o))
})


test('test Array Is Not Function', function() {
    var o = new Array()

    t.is(false, utils.isFunction(o))
})

test('test Array Literall Is Not Function', function() {
    var o = []

    t.is(false, utils.isFunction(o))
})

test('test String Is Not Function', function() {
    var o = "abc"

    t.is(false, utils.isFunction(o))
})

test('test Function Is Object', function() {
    var o = function() {}

    t.is(true, utils.isFunction(o))
})

// // isString

test('test Object Is Not String', function() {
    var o = new Object()

    t.is(false, utils.isString(o))
})

test('test Object Literal Is Not String', function() {
    var o = {}

    t.is(false, utils.isString(o))
})

test('test Array Is Not String', function() {
    var o = new Array()

    t.is(false, utils.isString(o))
})

test('test Array Literall Is Not String', function() {
    var o = []

    t.is(false, utils.isString(o))
})

test('test String Is String', function() {
    var o = "abc"

    t.is(true, utils.isString(o))
})

test('test Function Is Not String', function() {
    var o = function() {}

    t.is(false, utils.isString(o))
})

// // isMethod - TODO:
test('test isMethod', function () {
  var obj = {
    greet: 'Hello',
    say: function () {
      return this.greet
    }
  }
  t.is(utils.isMethod(obj, 'say'), true)
  t.is(utils.isMethod(obj, 'greet'), false)
})

test('test conformsToInterface', function () {
  // checking if given methods conforms to object Interface
  // does not check properties
  var obj = {
    greet: 'Hello',
    say: function () {
      return this.greet
    },
    listen: function () {
      return 'i am listening'
    }
  }

  t.is(utils.conformsToInterface(1, ['say']), false)
  t.is(utils.conformsToInterface(obj, ['say']), true)
  t.is(utils.conformsToInterface(obj, ['listen', 'say']), true)
  t.is(utils.conformsToInterface(obj, ['say', 'greet']), false)
})

// // mergeProperites
test('test Merge Properties', function () {
    var obj = { a: 1, b: 2, c: 3 };
    var props = { a: 10, d: 20 };
    var result = utils.mergeProperties(props, obj);

    t.is(true, result.hasOwnProperty('a'));
    t.is(10, result.a);

    t.is(true, result.hasOwnProperty('b'));
    t.is(2, result.b);

    t.is(true, result.hasOwnProperty('c'));
    t.is(3, result.c);

    t.is(true, result.hasOwnProperty('d'));
    t.is(20, result.d);
})

// // inherit
test('test Inherit Properties', function () {
    var props = { a: 10, d: 20 }
    var result = utils.inherit(props)

    t.is(false, result.hasOwnProperty('a'))
    t.is(true, 'a' in result)
    t.is(10, result.a)

    t.is(false, result.hasOwnProperty('d'))
    t.is(true, 'd' in result)
    t.is(20, result.d)
})

// defineSubclass - TODO
