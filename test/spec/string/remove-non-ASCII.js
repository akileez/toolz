var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/remove-non-ASCII')
var t = painless.assert

var removeNonASCII = require('../../../src/string/remove-non-ASCII')

test('should remove non-printable chars', function () {
  var accents = 'áÁâÂàÀåÅãÃäÄçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒØõÕöÖÐþúÚûÛùÙüÜýÝÿ'
  var printable = 'lorem ~!@#$%^&*()_+`-={}[]|\\:";\'/?><., ipsum'
  var str = accents + printable

  t.eq(removeNonASCII(str), printable)
})

test('should treat null as empty string', function () {
  t.is(removeNonASCII(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(removeNonASCII(void 0), '')
})
