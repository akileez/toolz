var painless = require('../../assertion/painless')
var test = painless.createGroup('Test promise/pify')
var t = painless.assert
var p = painless.assert.chai

var pify = require('../../../src/promise/pify')
var pinkiePromise = require('../../../src/promise/pinkie-promise')
var fs = require('fs')

// using generator functions because async/await is not yet part
// of node and I don't use babel

var fixture  = (cb) => setImmediate(() => cb(null, 'unicorn'))
var fixture2 = (x, cb) => setImmediate(() => cb(null, x))
var fixture3 = (cb) => setImmediate(() => cb(null, 'unicorn', 'rainbow'))
var fixture4 = (cb) => setImmediate(() => {
  cb(null, 'unicorn')
  return 'rainbow'
})

fixture4.meow = (cb) => {
  setImmediate(() => {
    cb(null, 'unicorn')
  })
}

var fixture5 = () => 'rainbow'

var fixtureModule = {
  method1: fixture,
  method2: fixture,
  method3: fixture5
}

test('main', function* () {
  t.is(typeof pify(fixture)().then, 'function')
  // check to ensure generator is working properly.
  // for failing test change isnt to `is`
  t.isnt(yield pify(fixture)(), 'happy')
  t.is(yield pify(fixture)(), 'unicorn')
})

test('pass argument', function* () {
  t.is(yield pify(fixture2)('rainbow'), 'rainbow')
})

test('custom Promise module', function* () {
  t.is(yield pify(fixture, pinkiePromise)(), 'unicorn')
  t.isnt(yield pify(fixture, pinkiePromise)(), 'happy')
})

test('multiArgs options', function* () {
  t.same(yield pify(fixture3, {multiArgs: true})(), ['unicorn', 'rainbow'])
})

test('wrap core method', function* () {
  // must be run from the test directory
  // REMINDER: resolve file module to mitigate this recurring issue
  t.is(JSON.parse(yield pify(fs.readFile)('../package.json')).name, 'toolz')
})

test('module support', function* () {
  t.is(JSON.parse(yield pify(fs).readFile('../package.json')).name, 'toolz')
})

test('module support - doesn\'t trasform *Sync methods by default', function () {
  t.is(JSON.parse(pify(fs).readFileSync('../package.json')).name, 'toolz')
})


