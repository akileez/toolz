var painless = require('../../assertion/painless')
var test = painless.createGroup('Test process/has-flag')
var t = painless.assert

var hasFlag = require('../../../src/process/has-flag')

test('test has-flags', () => {
  t.true(hasFlag('unicorn', ['--foo', '--unicorn', '--bar']))
  t.true(hasFlag('--unicorn', ['--foo', '--unicorn', '--bar']), 'optional prefix')
  t.true(hasFlag('unicorn=rainbow', ['--foo', '--unicorn=rainbow', '--bar']))
  t.true(hasFlag('unicorn', ['--unicorn', '--', '--foo']))
  t.false(hasFlag('unicorn', ['--foo', '--', '--unicorn']), 'don\'t match flags after terminator')
  t.false(hasFlag('unicorn', ['--foo']))
})