'use strict'

const painless = require('../../assertion/painless')
const test = painless.createGroup('Test random/randProp')
const t = painless.assert

const randProp = require('../../../src/random/randProp')
const stable = require('../../../src/function/stable')

const fix = {
  foo: 'a',
  bar: 'b',
  baz: 'c',
  bam: 'd'
}

// const constant = require('../../../src/function/constant')
// console.log(constant(randProp(fix))())

// function stable (val, count, fn) {
//   if (fn === undefined) {
//     fn = count
//     count = 1000
//   }

//   var current
//   var first = fn()
//   var i = 0

//   while (++i < count) {
//     current = fn()
//     if (current !== first) return val ? current : false
//   }

//   return val ? first : true
// }

test('should not be a stable function', () => {
  t.false(stable(() => randProp(fix)))
})

test('should pass a random property from an object', () => {
  for(let j = 0; j < 1000; j++) {
    t.is(typeof randProp(fix), 'string')
  }
})