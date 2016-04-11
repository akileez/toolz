var painless = require('../../assertion/painless')
var test = painless.createGroup('Test promise/promtie::reduce')
var t = painless.assert

var reduce = require('../../../src/promise/promtie/reduce')

test('reduce(fn, initialValue)', () => {
  const input = [1, 2, 3, 4];

  return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(reduce((acc, n, i, length) => {
      t.is(n, input[i]);
      t.is(length, input.length);

      return Promise.resolve(acc + n);
    }, 0))
    .then(result => t.is(result, 10));
});

test('reduce(fn)', () => {
  const input = [1, 2, 3, 4];

  return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(reduce((acc, n, i, length) => {
      t.is(n, input[i]);
      t.is(length, input.length);

      return Promise.resolve(acc + n);
    }))
    .then(result => t.is(result, 10));
});

test('reduce(array, fn, initialValue)', () => {
  const input = [1, 2, 3, 4];

  return reduce([Promise.resolve(1), 2, Promise.resolve(3), 4],
      (acc, n, i, length) => {
        t.is(n, input[i]);
        t.is(length, input.length);

        return acc + n;
      }, 0
    )
    .then(result => t.deepEqual(result, 10));
});

test('reduce(array, fn, initialValue): initialValue is a promise', () => {
  const input = [1, 2, 3, 4];

  return reduce([Promise.resolve(1), 2, Promise.resolve(3), 4],
      (acc, n, i, length) => {
        t.is(n, input[i]);
        t.is(length, input.length);

        return acc + n;
      }, Promise.resolve(0)
    )
    .then(result => t.deepEqual(result, 10));
});

test('reduce(array, fn): fn returns a value', () => {
  const input = [1, 2, 3, 4];

  return reduce([Promise.resolve(1), 2, Promise.resolve(3), 4],
      (acc, n, i, length) => {
        t.is(n, input[i]);
        t.is(length, input.length);

        return acc + n;
      }
    )
    .then(result => t.deepEqual(result, 10));
});

test('reduce(array, fn): deal with promise failure', () => {
  const input = [1, 2, 3, 4];

  return t.throws(reduce([Promise.resolve(1), 2, Promise.reject(new Error('Failed to fetch third value')), 4],
    (acc, n, i, length) => {
      t.is(n, input[i]);
      t.is(length, input.length);

      return acc + n;
    }
  ), 'Failed to fetch third value');
});
