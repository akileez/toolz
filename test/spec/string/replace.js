var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/replace')
var t = painless.assert

var replace = require('../../../src/string/replace')

test('should replace single string', function () {
  var result = replace('test foo', 'foo', 'result')
  t.eq(result, 'test result')
})

test('should replace multiple searches with single string', function () {
  var result = replace('test one two', ['one', 'two'], 'n')
  t.eq(result, 'test n n')
})

test('should replace multiple searches with multiple strings', function () {
  var result = replace('test one two', ['one', 'two'], ['1', '2'])
  t.eq(result, 'test 1 2')
})

test('should replace with regexp', function () {
  var result = replace('test 1 2', /\d+/g, 'n')
  t.eq(result, 'test n n')
})

test('should replace with function replacer', function () {
  function replaceNum (m) {
    return (+m) * (+m)
  }

  function replaceLetter (m) {
    return m.charCodeAt(0)
  }

  var result = replace('1 2 3 a', [/\d+/g, /[a-z]/g], [replaceNum, replaceLetter])

  t.eq(result, '1 4 9 97')
})

test('should treat null as empty string', function () {
  t.is(replace(null, 'a', 'b'), '')
})

test('should treat undefined as empty string', function () {
  t.is(replace(void 0, 'a', 'b'), '')
})

