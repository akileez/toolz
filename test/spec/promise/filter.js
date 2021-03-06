var painless = require('../../assertion/painless')
var test = painless.createGroup('Test promise/promtie::filter')
var t = painless.assert

var filter = require('../../../src/promise/promtie/filter')

test('filter(fn)', () => {
  const input = [1, 2, 3, 4]

  return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(filter((n, i, array) => {
      t.is(n, input[i])
      t.deepEqual(array, input)

      return n > 2
    }))
    .then(array => {
      t.deepEqual(array, input.slice(2, input.length))
    })
})

test('filter(array, fn)', () => {
  const input = [1, 2, 3, 4]

  return filter([Promise.resolve(1), 2, Promise.resolve(3), 4],
      (n, i, array) => {
        t.is(n, input[i])
        t.deepEqual(array, input)

        return n > 2
      }
    )
    .then(array => {
      t.deepEqual(array, input.slice(2, input.length))
    })
})

test('filter(array, fn): filter function returns promise', () => {
  const input = [1, 2, 3, 4]

  return filter([Promise.resolve(1), 2, Promise.resolve(3), 4],
      (n, i, array) => {
        t.is(n, input[i])
        t.deepEqual(array, input)

        return Promise.resolve(n > 2)
      }
    )
    .then(array => {
      t.deepEqual(array, input.slice(2, input.length))
    })
})

test('filter(array, fn, options): limit concurrency', () => {
  const start = Date.now()

  return filter([Promise.resolve(1), 2, 3, 4], () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve((Date.now() - start) >= 500), 250)
      })
  }, {concurrency: 2})
    .then(result => {
      t.deepEqual(result, [3, 4])
    })
})
