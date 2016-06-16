var memo = require('../../../src/path/memo')
var root = require('../../../src/path/find-root')

var cwd = memo(root())
var src = cwd('src')
var tsa = cwd('test/assertion')
var tss = cwd('test/spec')

var painless = require(`${tsa()}/painless`)
var test = painless.createGroup('Test random/randBytes')
var t = painless.assert

var rng = require(`${src()}/random/randBytes`)

test('random bytes', function () {
  var expected = rng()
  var other = rng()

  t.is(expected.toString('hex').length, 32)
  t.not(expected, other)
})
