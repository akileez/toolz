'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/stable')
var t = painless.assert

var stable = require('../../../src/function/stable')

test('stableFn()', () => {
  t.true(stable(() => true))

  let i = 0
  t.false(stable(() => {
    if (++i === 10) {
      return 'bar'
    }

    return 'foo'
  }))
})

test('stableFn.val()', () => {
  t.truthy(stable.val(() => true))

  let i = 0
  t.is(stable.val(() => {
    if (++i === 10) {
      return 'bar'
    }

    return 'foo'
  }), 'bar')
})
