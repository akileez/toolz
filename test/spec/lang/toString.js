var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/toString')
var t = painless.assert

var toString = require('../../src/lang/toString')

test('should convert null to empty string', function(){
  t.is(toString(null), '')
});

test('should convert undefined to empty string', function(){
  t.is(toString(void 0), '')
});

test('should return string unchanged', function(){
  t.is(toString(''), '')
  t.is(toString('test'), 'test')
});

test('should return number as string', function(){
  t.is(toString(0), '0')
  t.is(toString(10), '10')
});

test('should return boolean as string', function(){
  t.is(toString(false), 'false')
  t.is(toString(true), 'true')
});
