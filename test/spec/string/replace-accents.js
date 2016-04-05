var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/replace-accents')
var t = painless.assert

var replaceAccents = require('../../../src/string/replace-accents')

test('should replace all Basic Latin and Latin-1 accented chars with regular ones', function () {
  var accents = 'áÁâÂàÀåÅãÃäÄçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒØõÕöÖÐþúÚûÛùÙüÜýÝÿ'
  var regular = 'aAaAaAaAaAaAcCeEeEeEeEiIiIiIiInNoOoOoOOoOoODpuUuUuUuUyYy'
  t.eq(replaceAccents(accents), regular)
})

test('should treat null as empty string', function () {
  t.eq(replaceAccents(null), '')
})

test('should treat undefined as empty string', function () {
  t.eq(replaceAccents(void 0), '')
})
