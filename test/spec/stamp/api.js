var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/stampit::api')
var t = painless.assert
var stampit = require('../../../src/object/stamp')

test('stampit()', () => {
  t.eq(typeof stampit(), 'function', 'Should produce a function.')
})

test('stampit({})', () => {
  t.ok(stampit.isStamp(stampit({})))
})

test('incorrect stampit({ init }) args', () => {
  t.same(stampit({ init: 42 }).compose.initializers, undefined)
  t.same(stampit({ init: null }).compose.initializers, undefined)
  t.same(stampit({ init: new RegExp() }).compose.initializers, undefined)
  t.same(stampit({ init: [42] }).compose.initializers, undefined)
  t.same(stampit({ init: 'a string' }).compose.initializers, undefined)
})