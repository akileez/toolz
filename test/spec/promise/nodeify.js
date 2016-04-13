'use strict'

const painless = require('../../assertion/painless')
const test = painless.createGroup('Test promise/promtie::nodeify')
const t = painless.assert
const p = painless.assert.chai

const nodeify = require('../../../src/promise/promtie/nodeify')

test('nodeify(fn)', () => {
  const unicorn = cb => Promise.resolve(1).then(nodeify(cb), nodeify(cb));

  unicorn((err, value) => {
    t.is(value, 1);
    t.falsy(err);

  });
});

test('nodeify(fn): deal with promise failure', () => {
  const unicorn = cb => Promise.reject(new Error('Failed promise')).then(nodeify(cb), nodeify(cb));

  unicorn((err, value) => {
    t.is(err.message, 'Failed promise');
    t.falsy(value);

  });
});

// TODO: Propose this method to AVA
function throwsUncaughtException(fn) {
  const listeners = process.listeners('uncaughtException');
  // const avaListener = listeners[listeners.length - 1];

  // Remove AVA listener & track uncaught exception
  // process.removeListener('uncaughtException', avaListener);
  process.once('uncaughtException', err => {
    // Restore listeners exactly how they were, including order
    process.removeAllListeners('uncaughtException');
    listeners.forEach(listener => process.on('uncaughtException', listener));

    fn(err);
  });
}

test('nodeify(fn): deal with fn throwing when called on failure', () => {
  throwsUncaughtException(err => {
    t.is(err.message, 'Failed promise');
  });

  Promise.resolve('unicorn')
    .then(nodeify((err, value) => {
      t.is(value, 'unicorn');
      t.falsy(err);

      throw new Error('Failed promise');
    }), null);
});

test('nodeify(fn): deal with fn throwing when called with success', () => {
  throwsUncaughtException(err => {
    t.is(err.message, 'Failed promise');
  });

  Promise.reject(new Error('Failed promise'))
    .then(null, nodeify((err, value) => {
      t.is(err.message, 'Failed promise');
      t.falsy(value);

      throw err;
    }));
});

test('nodeify()', () =>
  Promise.resolve(1)
  .then(nodeify())
  .then(value => t.is(value, 1))
);

test('nodeify(): deal with failure', () =>
  p.isRejected(
    Promise.reject(new Error('Bad unicorn'))
    .then(nodeify(), nodeify()),
    'Bad unicorn'
  )
);
