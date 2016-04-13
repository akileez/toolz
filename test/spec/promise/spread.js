var painless = require('../../assertion/painless')
var test = painless.createGroup('Test promise/promtie::spread')
var t = painless.assert
var p = painless.assert.chai

var spread = require('../../../src/promise/promtie/spread')

test('spread(fn)', () =>
  Promise.resolve([1, 2, Promise.resolve(3), Promise.resolve(4)])
  .then(spread((n1, n2, n3, n4) => {
    t.is(n1, 1)
    t.is(n2, 2)
    t.is(n3, 3)
    t.is(n4, 4)
  }))
)

test('spread(fn): deal with promise failure', () =>
  p.isRejected(
    Promise.resolve([1, 2, Promise.reject(new Error('error: 3')), Promise.resolve(4)])
    .then(spread(() => {})),
    'error: 3'
  )
)

test('spread(array, fn)', () =>
  spread([1, 2, Promise.resolve(3), Promise.resolve(4)], (n1, n2, n3, n4) => {
    t.is(n1, 1)
    t.is(n2, 2)
    t.is(n3, 3)
    t.is(n4, 4)
  })
)

test('spread(array, fn): deal with promise failure', () =>
  p.isRejected(
    spread([1, 2, Promise.reject(new Error('error: 3')), Promise.resolve(4)]),
    'error: 3'
  )
)
