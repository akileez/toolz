var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isBlank')
var t = painless.assert

var isBlank = require('../../../src/lang/isBlank')

test('#isBlank', function(){
  t.ok(isBlank(''))
  t.ok(isBlank(' '))
  t.ok(isBlank('\n'))
  t.ok(!isBlank('a'))
  t.ok(!isBlank('0'))
  t.ok(!isBlank(0))
  t.ok(isBlank(''))
  t.ok(isBlank(null))
  t.ok(isBlank(undefined))
  t.ok(!isBlank(false))
})
