var painless = require('../../assertion/painless')
var test = painless.createGroup('Test promise/promtie::attempt')
var t = painless.assert

var attempt = require('../../../src/promise/promtie/attempt')

test('attempt(fn)', () => {
  return attempt(() => {
      return 'unicorn'
  })
  .then((unicorn) => t.is(unicorn, 'unicorn'))
})

test('attempt(fn): deal with promise failure', () => {
  attempt(() => { throw new Error('Bad unicorn') })
  .then(() => t.fail('Promise expected to reject'), err => {
      t.truthy(err instanceof Error)
  })
})
