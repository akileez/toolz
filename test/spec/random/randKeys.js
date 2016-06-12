'use strict'

const painless = require('../../assertion/painless')
const test = painless.createGroup('Test random/randKeys')
const t = painless.assert

const randKeys = require('../../../src/random/randKeys')
const stable = require('../../../src/function/stable')

const fix = {
  a: true,
  b: true,
  c: true,
  d: true,
  e: true
}

test('should not be a stable function', () => {
  t.false(stable(() => randKeys(fix)))
})

test('should pass a random property from an object', () => {
  for(let j = 0; j < 1000; j++) {
    t.is(typeof randKeys(fix), 'string')
  }
})