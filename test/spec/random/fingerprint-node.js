var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/fingerprint-node')
var t = painless.assert

var fprnt = require('../../../src/random/fingerprint-node')

test('should return a string', function () {
  t.eq(typeof fprnt(process.pid), 'string')
})

test('should match', function () {
  t.eq(fprnt(process.pid), fprnt(process.pid))
})
