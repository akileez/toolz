var painless = require('../../assertion/painless')
var test = painless.createGroup('Test promise/promtie::each')
var t = painless.assert

var each = require('../../../src/promise/promtie/each')

test('each(fn)', () => {
  const input = [1, 2, 3, 4]

  return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(each((n, i, length) => {
      t.is(n, input[i])
      t.is(length, input.length)

      return n * 10
    }))
    .then(array => {
      t.deepEqual(array, input)
    })
})

test('each(array, fn)', () => {
  const input = [1, 2, 3, 4]

  return each([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, length) => {
          t.is(n, input[i])
          t.is(length, input.length)

          return n * 10
        }
    )
    .then(array => {
      t.deepEqual(array, input)
    })
})

test('each(array, fn): iterator function returns promise', () => {
  const input = [1, 2, 3, 4]

  return each([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, length) => {
          t.is(n, input[i])
          t.is(length, input.length)

          return Promise.resolve(n * 10)
        }
    )
    .then(array => {
      t.deepEqual(array, input)
    })
})

test('each(fn): fn throws', () => {
  return Promise.resolve([Promise.resolve(1), 2, 3, 4])
    .then(each(() => { throw new Error('Failed') }))
    .then(() => t.fail('Promise expected to reject'), err => t.is(err.message, 'Failed'))
})

test('each(array, fn): deal with promise failure', () => {
  return each([Promise.resolve(1), 2, 3, 4], () => {
      return Promise.reject(new Error('Failure'))
    })
    .then(() => t.fail('Promise expected to reject'), err => t.is(err.message, 'Failure'))
});
