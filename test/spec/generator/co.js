var painless = require('../../assertion/painless')
var t = painless.assert
var testArgs = painless.createGroup('Test generator/co: Arguments')
var testProm = painless.createGroup('Test generator/co: Promises')
var testArr  = painless.createGroup('Test generator/co: Arrays')
var testCtx  = painless.createGroup('Test generator/co: Context')
var testGFx  = painless.createGroup('Test generator/co: Generator Functions')
var testInv  = painless.createGroup('Test generator/co: Invalid')

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
