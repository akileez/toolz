var test = require('../../src/assertion/ttr')
var stampit = require('../../src/object/stampit')

test('stampit({ init })', function (t) {
  var obj = stampit({
    init() {
      var secret = 'foo'
      this.getSecret = function () {
        return secret
      }
    }
  }).create()

  var results = obj.getSecret()
  var expected = 'foo'

  t.is(results, expected, 'should set closure')
})

test('stampit().init()', function (t) {
  var obj = stampit()
    .init(function () {
      var secret = 'foo'
      this.getSecret = function () {
        return secret
      }
    })
    .init(function () {
      this.a = 'a'
    })
    .init({
      bar () { this.b = 'b' }
    }, {
      baz () { this.c = 'c' }
    })
    .create()

  var results = obj.getSecret()
  var expected = 'foo'

  t.is(results, expected, 'should set closure')
  t.ok(obj.a && obj.b && obj.c, 'should allow chaining and take object literals.')
})

test('stampit({ init }).init()', (t) => {
  var obj = stampit({init() {
    var secret = 'foo'
    this.getSecret = () => { return secret }
  }})
  .init(function () {
    this.a = 'a'
  })
  .init({
    bar () { this.b = 'b' }
  }, {
    baz () { this.c = 'c' }
  })
  .create()

  t.is(obj.getSecret(), 'foo', 'should set closure')
  t.ok(obj.a && obj.b && obj.c, 'should allow chaining and take object literals.')
})

test('stampit({ initializers })', function (t) {
  var obj = stampit({
    initializers: {
      function () {
        var secret = 'foo'
        this.getSecret = function () {
          return secret
        }
      }
    }
  }).create()

  var results = obj.getSecret()
  var expected = 'foo'

  t.is(results, expected, 'should set closure')
})

test('stampit().initializers()', function (t) {
  var obj = stampit()
    .initializers(function () {
      var secret = 'foo'
      this.getSecret = function () {
        return secret
      }
    })
    .initializers(function () {
      this.a = 'a'
    })
    .initializers({
      bar () { this.b = 'b' }
    }, {
      baz () { this.c = 'c' }
    })
    .create()

  var results = obj.getSecret()
  var expected = 'foo'

  t.is(results, expected, 'should set closure')
  t.ok(obj.a && obj.b && obj.c, 'should allow chaining and take object literals.')
})

test('stampit({ initializers }).initializers()', (t) => {
  var obj = stampit({ initializers: {
    function () {
      var secret = 'foo'
     this.getSecret = () => { return secret }
    }
  }})
  .initializers(function () {
    this.a = 'a'
  })
  .initializers({
    bar () { this.b = 'b' }
  }, {
    baz () { this.c = 'c' }
  })
  .create()

  t.is(obj.getSecret(), 'foo', 'should set closure')
  t.ok(obj.a && obj.b && obj.c, 'should allow chaining and take object literals.')
})

test.result()