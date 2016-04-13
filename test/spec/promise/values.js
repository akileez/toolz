var painless = require('../../assertion/painless')
var test = painless.createGroup('Test promise/promtie::values')
var t = painless.assert
var p = painless.assert.chai

var values = require('../../../src/promise/promtie/values')

test('values(object)', () =>
    values({
      key1: 'value1',
      key2: Promise.resolve('value2'),
      key3: Promise.resolve('value3'),
      key4: 'value4',
    })
    .then(result => t.deepEqual(result, {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
      key4: 'value4',
    }))
)

test('values(object): deal with not native promises', () =>
    values({
      key1: 'value1',
      key2: {then: (cb) => cb('value2')},
      key3: Promise.resolve('value3'),
      key4: 'value4',
    })
    .then(result => t.deepEqual(result, {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
      key4: 'value4',
    }))
)

test('values(fn)', () =>
    Promise.resolve({
      key1: 'value1',
      key2: Promise.resolve('value2'),
      key3: Promise.resolve('value3'),
      key4: 'value4',
    })
    .then(values(result => t.deepEqual(result, {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
      key4: 'value4',
    })))
)

test('values(object): deal with promise rejection', () =>
    p.isRejected(values({
      key1: 'value1',
      key2: Promise.resolve('value2'),
      key3: Promise.reject(new Error('error: value3')),
      key4: 'value4',
    }), 'error: value3')
)

test('values(fn): deal with promise rejection', () =>
    p.isRejected(Promise.resolve({
      key1: 'value1',
      key2: Promise.resolve('value2'),
      key3: Promise.reject(new Error('error: value3')),
      key4: 'value4',
    }).then(values(() => t.fail('expected to fail'))), 'error: value3')
);
