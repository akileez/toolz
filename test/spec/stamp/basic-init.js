var painless = require('../../assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test object/stampit (init)')
var log      = require('../../../src/util/jcolorz')

var stampit = require('../../../src/object/stamp')

test('stampit({ init }) -- syntax no longer in use -- adjustments made', function () {
  var obj = stampit().init((opts, {instance}) => {
    var secret = 'foo'
    instance.getSecret = () => {
      return secret
    }
  }).create()

  var results = obj.getSecret()
  var expected = 'foo'

  t.is(results, expected, 'should set closure')
})

test('should work with init keyword -- stampit().init()', function () {
  var obj = stampit()
    // using `this` with anon func.
    .init(function () {
      var secret = 'foo'
      this.getSecret = function () {
        return secret
      }
    })
    // using `instance` with ES6 func
    .init((opts, {instance, stamp, args}) => {
      instance.a = 'a'
    })
    // init takes an array of functions or an anons functions
    // no functions in object literals
    .init([
      function bar () { this.b = 'b' },
      function baz () { this.c = 'c' }
    ])
    .create()

  var results = obj.getSecret()
  var expected = 'foo'

  t.is(results, expected, 'should set closure')
  t.ok(obj.a && obj.b && obj.c, 'should allow chaining and take object literals.')
})

test('stampit({ init }).init() -- syntax no longer in use -- adjustments made', () => {
  var obj = stampit()
  .init(function () {
    var secret = 'foo'
    this.getSecret = () => { return secret }
  })
  .init(function () {
    this.a = 'a'
  })
  .init([
    function bar () { this.b = 'b' },
    function baz () { this.c = 'c' }
  ])
  .create()

  t.is(obj.getSecret(), 'foo', 'should set closure')
  t.ok(obj.a && obj.b && obj.c, 'should allow chaining and take object literals.')
})

test('should work with initializers keyword stampit().initializers', function () {
  var obj = stampit()
    .initializers (
      function () {
        var secret = 'foo'
        this.getSecret = function () {
          return secret
        }
      }
    ).create()

  var results = obj.getSecret()
  var expected = 'foo'

  t.is(results, expected, 'should set closure')
})

test('stampit().initializers()', function () {
  var obj = stampit()
    .initializers((opts, {instance, stamp, args}) => {
      var secret = 'foo'
      instance.getSecret = function () {
        return secret
      }
    })
    .initializers((opts, {instance}) => {
      instance.a = 'a'
    })
    .initializers([
      function bar () { this.b = 'b' },
      function baz () { this.c = 'c' }
    ]).create()

  var results = obj.getSecret()
  var expected = 'foo'

  t.is(results, expected, 'should set closure')
  t.ok(obj.a && obj.b && obj.c, 'should allow chaining and take object literals.')
})

test('stampit({ initializers }).initializers()', () => {
  var obj = stampit()
  .initializers(function () {
      var secret = 'foo'
     this.getSecret = () => { return secret }
    }
  )
  .initializers(function () {
    this.a = 'a'
  })
  .initializers([
    function bar () { this.b = 'b' },
    function baz () { this.c = 'c' }
  ])
  .create()

  t.is(obj.getSecret(), 'foo', 'should set closure')
  t.ok(obj.a && obj.b && obj.c, 'should allow chaining and take object literals.')
})
