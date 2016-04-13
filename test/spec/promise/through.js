var painless = require('../../assertion/painless')
var test = painless.createGroup('Test promise/promtie::through')
var t = painless.assert
var p = painless.assert.chai

var through = require('../../../src/promise/promtie/through')

test('through(fn)', () =>
  Promise.resolve('unicorns')
  .then(through(value => {
    t.is(value, 'unicorns')
  }))
  .then(value => {
    t.is(value, 'unicorns')
  })
)

test('through(fn): fn returns promise', () =>
  Promise.resolve('unicorns')
  .then(through(value => {
    t.is(value, 'unicorns')

    return Promise.resolve('fancy unicorn')
  }))
  .then(value => {
    t.is(value, 'unicorns')
  })
)

test('through(fn): deal with promise failure', () =>
  p.isRejected(
    Promise.reject(new Error('unicorn is sad'))
    .then(null, through(err => t.is(err.message, 'unicorn is sad'))),
    'unicorn is sad'
  )
)

test('through(fn): deal with promise failure when fn returns promise', () =>
  p.isRejected(
    Promise.reject(new Error('unicorn is sad'))
    .then(null, through(err => {
      t.is(err.message, 'unicorn is sad')

      return Promise.resolve()
    })),
    'unicorn is sad'
  )
)
