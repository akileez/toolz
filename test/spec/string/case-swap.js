var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-swap')
var t = painless.assert

var swapCase = require('../../../src/string/case-swap')

test('#swapCase', function(){
  t.eq(swapCase('AaBbCcDdEe'), 'aAbBcCdDeE')
  t.eq(swapCase('Hello World'), 'hELLO wORLD')
  t.eq(swapCase(''), '')
  t.eq(swapCase(null), '')
  t.eq(swapCase(undefined), '')
})
