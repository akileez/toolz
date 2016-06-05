var painless = require('../../assertion/painless')
var t = painless.assert
var testArgs  = painless.createGroup('Test generator/co: Arguments')
var testProm  = painless.createGroup('Test generator/co: Promises')
var testArr   = painless.createGroup('Test generator/co: Arrays')
var testCtx   = painless.createGroup('Test generator/co: Context')
var testGFx   = painless.createGroup('Test generator/co: Generator Functions')
var testInv   = painless.createGroup('Test generator/co: Invalid')
var testObj   = painless.createGroup('Test generator/co: Objects')
var testRecur = painless.createGroup('Test generator/co: Recursion')
var testWrap  = painless.createGroup('Test generator/co: Wrap')

var co = require('../../../src/generator/co')
var pify = require('../../../src/promise/pify')
var read = require('fs').readFile

// pify(read)

function getPromise (val, err) {
  return new Promise(function (resolve, reject) {
    if (err) reject(err)
    else resolve(val)
  })
}

testArgs('co(gen, args) should pass the rest of the arguments', () => {
  return co(function * (num, str, arr, obj, fn) {
    t.assert(num === 42)
    t.assert(str === 'forty-two')
    t.assert(arr[0] === 42)
    t.assert(obj.value === 42)
    t.assert(fn instanceof Function)
  }, 42, 'forty-two', [42], {value: 42}, function () {})
})

testProm('co(* -> yield <promise>) with one promise yield', () => {
  return co(function * () {
    var a = yield getPromise(1)
    t.is(1, a)
  })
})

testProm('co(* -> yield <promise>) with several promise yields', () => {
  return co(function * () {
    var a = yield getPromise(1)
    var b = yield getPromise(2)
    var c = yield getPromise(3)

    t.same([1, 2, 3], [a, b, c])
  })
})

testProm('co(* -> yield <promise>) should throw and resume when a promise is rejected', () => {
  var error

  return co(function* () {
    try {
      yield getPromise(1, new Error('boom'))
    } catch (err) {
      error = err
    }

    t.assert(error.message === 'boom')
    var ret = yield getPromise(1)
    t.assert(ret === 1)
  })
})

testProm('co(* -> yield <promise>) should return a real Promise when yielding a non-standard promise-like', function () {
  t.assert(co(function* () {
    yield {then: function () {}}
  }) instanceof Promise)
})

testProm('co(function) -> promise should return a value', function (done) {
  co(function () {
    return 1
  }).then(function (data) {
    t.is(data, 1)
    done()
  })
})

testProm('co(function) -> promise should return a resolve promise', function () {
  return co(function () {
    return Promise.resolve(1)
  }).then(function (data) {
    t.is(data, 1)
  })
})

testProm('co(function) -> promise should return a reject promise', function () {
  return co(function () {
    return Promise.reject(1)
  }).catch(function (data) {
    t.is(data, 1)
  })
})

testProm('co(function) -> promise should catch errors', function () {
  return co(function () {
    throw new Error('boom')
  }).then(function () {
    throw new Error('nope')
  }).catch(function (err) {
    t.is(err.message, 'boom')
  })
})

testArr('co(* -> yield []) should aggregate several promises', function () {
  return co(function * () {
    var a = pify(read)('../package.json', 'utf8').then(data => data)
    var b = pify(read)('../LICENSE', 'utf8').then(data => data)
    var c = pify(read)('../package.json', 'utf8').then(data => data)

    var res = yield [a, b, c]
    t.is(3, res.length)
    // console.log(res)
    t.assert(~res[0].indexOf('description'))
    t.assert(~res[1].indexOf('ISC'))
    t.assert(~res[2].indexOf('devDependencies'))
  })
})

testArr('co(* -> yield []) should noop with no args', function () {
  return co(function * () {
    var res = yield []
    t.equal(0, res.length)
  })
})

testArr('co(* -> yield []) should support an array of generators', function () {
  return co(function * () {
    var val = yield [function * () { return 1 }()]
    t.same(val, [1])
  })
})

var ctx = {some: 'thing'}

testCtx('co.call(this) should pass the context', function () {
  return co.call(ctx, function * () {
    t.assert(ctx === this)
  })
})

function sleep (ms) {
  return function (done) {
    setTimeout(done, ms)
  }
}

function * work () {
  yield sleep(50)
  return 'yay'
}

testGFx('co(fn*) should wrap with co', function () {
  return co(function * () {
    var a = yield work
    var b = yield work
    var c = yield work

    t.assert(a === 'yay')
    t.assert(b === 'yay')
    t.assert(c === 'yay')

    var res = yield [work, work, work]
    t.same(res, ['yay', 'yay', 'yay'])
  })
})

testGFx('co(fn*) should catch errors', function () {
  return co(function * () {
    yield function * () {
      throw new Error('boom')
    }
  }).then(function () {
    throw new Error('wtf')
  }, function (err) {
    t.assert(err)
    t.assert(err.message === 'boom')
  })
})

testInv('yield <invalid> should throw an error', function () {
  return co(function * () {
    try {
      yield null
      throw new Error('lol')
    } catch (err) {
      t.assert(err instanceof TypeError)
      t.assert(~err.message.indexOf('You may only yield'))
    }
  })
})

testObj('co(* -> yield {}) should aggregate several promises', function () {
  return co(function * () {
    var a = pify(read)('../package.json', 'utf8').then(data => data)
    var b = pify(read)('../LICENSE', 'utf8').then(data => data)
    var c = pify(read)('../package.json', 'utf8').then(data => data)

    var res = yield {
      a: a,
      b: b,
      c: c
    }
    t.is(Object.keys(res).length, 3)
    // console.log(res)
    t.assert(~res.a.indexOf('description'))
    t.assert(~res.b.indexOf('ISC'))
    t.assert(~res.c.indexOf('devDependencies'))
  })
})

function Pet (name) {
  this.name = name
  this.something = function () {}
}

testObj('co(* -> yield {}) should ignore non-thunkable properties', function () {
  return co(function* () {
    var foo = {
      name: { first: 'tobi' },
      age: 2,
      // should read the lint.js file from the test directory
      address: pify(read)('./lint.js', 'utf8').then(data => data),
      tobi: new Pet('tobi'),
      now: new Date(),
      falsey: false,
      nully: null,
      undefiney: undefined
    }

    var res = yield foo

    t.eq('tobi', res.name.first)
    t.eq(2, res.age)
    t.eq('tobi', res.tobi.name)
    t.eq(foo.now, res.now)
    t.eq(false, foo.falsey)
    t.eq(null, foo.nully)
    t.eq(undefined, foo.undefiney)
    t.assert(~res.address.indexOf('exports'))
  })
})

testObj('co(* -> yield {}) should preserve key order', function () {
  function timedThunk (time) {
    return function (cb) {
      setTimeout(cb, time)
    }
  }

  return co(function* () {
    var before = {
      sun: timedThunk(30),
      rain: timedThunk(20),
      moon: timedThunk(10)
    }

    var after = yield before

    var orderBefore = Object.keys(before).join(',')
    var orderAfter = Object.keys(after).join(',')
    t.is(orderBefore, orderAfter)
  })
})

testRecur('co() recursion should aggregate arrays within array', function () {
  return co(function* () {
    var a = pify(read)('../package.json', 'utf8').then(data => data)
    var b = pify(read)('../LICENSE', 'utf8').then(data => data)
    var c = pify(read)('../package.json', 'utf8').then(data => data)

    var res = yield [a, [b, c]]

    t.is(res.length, 2)
    t.assert(~res[0].indexOf('description'))
    t.is(res[1].length, 2)
    t.assert(~res[1][0].indexOf('ISC'))
    t.assert(~res[1][1].indexOf('devDependencies'))
  })
})

testRecur('co() recursion should aggregate objects within objects', function () {
  return co(function* () {
    var a = pify(read)('../package.json', 'utf8').then(data => data)
    var b = pify(read)('../LICENSE', 'utf8').then(data => data)
    var c = pify(read)('../package.json', 'utf8').then(data => data)

    var res = yield {
      0: a,
      1: {
        0: b,
        1: c
      }
    }

    t.assert(~res[0].indexOf('description'))
    t.assert(~res[1][0].indexOf('ISC'))
    t.assert(~res[1][1].indexOf('devDependencies'))
  })
})

testWrap('co.wrap(fn*) should pass context', function () {
  var ctx = {
    some: 'thing'
  }

  return co.wrap(function* () {
    t.is(ctx, this)
  }).call(ctx)
})

testWrap('co.wrap(fn*) should pass arguments', function () {
  return co.wrap(function* (a, b, c) {
    t.same([1, 2, 3], [a, b, c])
  })(1, 2, 3)
})

testWrap('co.wrap(fn*) should expose the underlying generator function', function () {
  var wrapped = co.wrap(function* (a, b, c) {})
  var source = Object.toString.call(wrapped.__generatorFunction__)
  t.assert(source.indexOf('function*') === 0)
})
