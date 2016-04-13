'use strict'

const painless = require('../../assertion/painless')
const test = painless.createGroup('Test promise/promtie::catchIf')
const t = painless.assert
const p = painless.assert.chai

const catchIf = require('../../../src/promise/promtie/catchIf')

test('catchIf(predicateFn, fn): on predicate returning true', () => {

  return Promise.reject(new Error('ENOENT: file not found'))
  .catch(catchIf(err => err.message.indexOf('ENOENT') === 0, err => {
    t.truthy(err.message, 'ENOENT: file not found');
  }));
});

test('catchIf(predicateFn, fn): on predicate returning false', () =>
  p.isRejected(
    Promise.reject(new Error('ENOENT: file not found'))
    .catch(catchIf(() => false, () => t.fail('should not have failed'))),
    'ENOENT: file not found'
    )
  );

test('catchIf(object, fn): custom error instance match', () => {
  function CustomError(msg) { this.message = msg; }
  CustomError.prototype = Object.create(Error.prototype);
  CustomError.constructor = function () {};


  return Promise.reject(new CustomError('ENOENT: file not found'))
  .catch(catchIf(CustomError, err => {
    t.truthy(err.message, 'ENOENT: file not found');
  }));
});

test('catchIf(object, fn): custom error instance failed match', () => {
  function CustomError() {}
  CustomError.prototype = Object.create(Error.prototype);
  CustomError.constructor = function (msg) { this.message = msg; };

  return p.isRejected(
    Promise.reject(new Error('ENOENT: file not found'))
    .catch(catchIf(CustomError, () => t.fail('should not have matched CustomError'))),
    'ENOENT: file not found'
    );
});
