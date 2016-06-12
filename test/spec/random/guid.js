var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/guid')
var t = painless.assert

var guid = require('../../../src/random/guid')
var mockRandom = require('../../../src/random/mockRandom')

test.beforeEach(function () {
  mockRandom.start()
})

test.afterEach(function () {
  mockRandom.end()
})

test('returns a random guid each call', function () {
  var a = guid()
  var b = guid()

  // match guid v4 format e.g. 3f2504e0-2f89-41d3-9a0c-0305e82c3301
  t.matches(a, /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[ab89][a-f0-9]{3}-[a-f0-9]{12}/)
  t.ne(a, b)
})
