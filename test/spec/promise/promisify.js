'use strict'

const painless = require('../../assertion/painless')
const test = painless.createGroup('Test promise/promtie::promisify')
const t = painless.assert
const p = painless.assert.chai

const promisify = require('../../../src/promise/promtie/promisify')

test('promisify(fn): callback called on success', () => {
  const feedUnicorn = (unicorn, rainbow, callback) => callback(null, `${unicorn} ate the whole ${rainbow}!`);
  const feedUnicornAsync = promisify(feedUnicorn);

  return feedUnicornAsync('kip', 'purple and blue')
    .then(result => t.is(result, 'kip ate the whole purple and blue!'));
});

test('promisify(fn): callback called on failure', () => {
  const feedUnicorn = (unicorn, rainbow, callback) =>
    callback(new Error('UnicornNotHungry: time until meal time: 1h12'));
  const feedUnicornAsync = promisify(feedUnicorn);

  return p.isRejected(
    feedUnicornAsync('kip', 'purple and blue').then(() => t.fail('should not have failed')),
    'UnicornNotHungry: time until meal time: 1h12'
  );
});

test('promisify(fn): callback throws', () => {
  const feedUnicorn = () => {
    throw new Error('Unicorns do not exist :"('); };
  const feedUnicornAsync = promisify(feedUnicorn);

  return p.isRejected(
    feedUnicornAsync('kip', 'purple and blue').then(() => t.fail('should not have failed')),
    'Unicorns do not exist :"('
  );
});
