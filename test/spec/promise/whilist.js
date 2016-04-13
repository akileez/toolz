'use strict'

var painless = require('../../assertion/painless')
var test = painless.createGroup('Test promise/promtie::whilst')
var t = painless.assert

var whilst = require('../../../src/promise/promtie/whilst')

test('whilst(conditionFn, fn)', () => {
  let count = 0;
  let lastCount = count;

  setInterval(() => {
    count += 1;
  }, 20);

  return whilst(() => {
      lastCount = count;

      return count <= 3;
    }, () => t.truthy(count <= 3))
    .then(() => t.truthy(lastCount > 3));
});

test('whilst(conditionFn, fn, options)', () => {
  const start = Date.now();
  let count = 0;
  let lastCount = count;

  setInterval(() => {
    count += 1;
  }, 20);

  return whilst(() => {
      lastCount = count;

      return count <= 3;
    }, () => t.truthy(count <= 3), { delay: 125 })
    .then(() => {
      t.truthy(lastCount > 3);
      t.truthy((Date.now() - start) > 100);
    });
});

test('whilst(conditionFn, fn): conditionFn returns promise', () => {
  let count = 0;
  let lastCount = count;

  setInterval(() => {
    count += 1;
  }, 20);

  return whilst(() => {
      lastCount = count;

      return Promise.resolve(count <= 3);
    }, () => t.truthy(count <= 3))
    .then(() => t.truthy(lastCount > 3));
});

test('whilst(conditionFn, fn): fn returns promise', () => {
  let count = 0;
  let lastCount = count;

  setInterval(() => {
    count += 1;
  }, 20);

  return whilst(() => {
      lastCount = count;

      return count <= 3;
    }, () => {
      t.truthy(count <= 3);

      return Promise.resolve();
    })
    .then(() => t.truthy(lastCount > 3));
});

test('whilst(conditionFn, fn): conditionFn and fn return promises', () => {
  let count = 0;
  let lastCount = count;

  setInterval(() => {
    count += 1;
  }, 20);

  return whilst(() => {
      lastCount = count;

      return Promise.resolve(count <= 3);
    }, () => {
      t.truthy(count <= 3);

      return Promise.resolve();
    })
    .then(() => t.truthy(lastCount > 3));
});

test('whilst(conditionFn, fn): conditionFn throws', () => {
  return whilst(() => {
      throw new Error('condition not met'); }, () => t.fail('should not have run this'))
    .then(() => t.fail('expected to fail'), err => t.is(err.message, 'condition not met'));
});

test('whilst(conditionFn, fn): fn throws', () => {
  return whilst(() => true, () => {
      throw new Error('condition not met'); })
    .then(() => t.fail('expected to fail'), err => t.is(err.message, 'condition not met'));
});
