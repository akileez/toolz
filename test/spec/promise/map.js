'use strict'

var painless = require('../../assertion/painless')
var test = painless.createGroup('Test promise/promtie::map')
var t = painless.assert
var p = painless.assert.chai

var map = require('../../../src/promise/promtie/map')

test('map(fn)', () => {
  const expected = [1, 2, 3, 4]

  return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(map((n, i, length) => {
      t.is(n, expected[i])
      t.is(length, expected.length)

      return n * 2
    }))
    .then(array => {
      t.deepEqual(array, expected.map((n) => n * 2))
    })
})

test('map(array, fn)', () => {
  const expected = [1, 2, 3, 4]

  return map([Promise.resolve(1), 2, Promise.resolve(3), 4],
      (n, i, length) => {
        t.is(n, expected[i])
        t.is(length, expected.length)

        return n * 2
      }
    )
    .then(array => {
      t.deepEqual(array, expected.map((n) => n * 2))
    })
})

test('map(array, fn): mapper function returns promise', () => {
  const expected = [1, 2, 3, 4]

  return map([Promise.resolve(1), 2, Promise.resolve(3), 4],
      (n, i, length) => {
        t.is(n, expected[i])
        t.is(length, expected.length)

        return Promise.resolve(n * 2)
      }
    )
    .then(array => {
      t.deepEqual(array, expected.map((n) => n * 2))
    })
})

test('map(array, fn): mapper function throws', () => {
  p.isRejected(
    map([Promise.resolve(1), 2, Promise.resolve(3), 4], () => {
      throw new Error('Mapper function failed')
    })
  )
})

test('map(array, fn): deal with promise failure', t => {
  const expected = [1, 2, 3, 4];

  return p.isRejected(map([Promise.resolve(1), 2, Promise.reject(new Error('Failed to fetch third value')), 4],
    (n, i, length) => {
      t.is(n, expected[i]);
      t.is(length, expected.length);

      return Promise.resolve(n * 2);
    }
  ), 'Failed to fetch third value');
});

test('map(array, fn, options): limit concurrency', () => {
  const start = Date.now()
  const expected = [1, 2, 3]

  return map([Promise.resolve(1), 2, 3], value => {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve({ n: value, time: Date.now() - start }),
          250
        )
      })
    }, { concurrency: 2 })
    .then(result => {
      t.is(result.length, 3)

      result.forEach((value, i) => {
        t.is(value.n, expected[i])
          // Only the last one should be delayed
        t.true(i >= 2 ? value.time >= 500 : value.time < 500)
      })
    })
})

test('map(array, fn, options): limit concurrency (stress test)', () => {
  const start = Date.now()
  const total = 500
  const concurrency = 50
  const input = []

  while (input.length < total) {
    input.push(input.length)
  }

  return map(input.map((n, i) => i), value => {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve({ n: value, time: Date.now() - start }),
          50
        )
      })
    }, { concurrency })
    .then(result => {
      t.is(result.length, total)

      result.forEach((value, i) => {
        const maxExpected = Math.floor(i / concurrency) * concurrency + concurrency

        t.is(value.n, i)
        t.true(value.time >= maxExpected)
      })
    })
})
