var painless = require('../../assertion/painless')
var test = painless.createGroup('Test promise/promtie::times')
var t = painless.assert

var times = require('../../../src/promise/promtie/times')

test('times(n, fn)', () => {
  return times(5, (i) => Promise.resolve(i * 10))
    .then((result) => t.deepEqual(result, [10, 20, 30, 40, 50]))
})

test('times(n, fn): when fn throws, promise should reject', () => {
  return times(5, () => {
    throw new Error('error expected')
  })
  .then(t.fail, (error) => t.is(error.message, 'error expected'))
})
