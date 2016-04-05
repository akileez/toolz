var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/truncate')
var t = painless.assert

var truncate = require('../../../src/string/truncate')

var str = 'lorem ipsum dolor sit amet';

test('should limit number of chars', function () {
  var r1 = truncate(str, 10);
  t.assert(r1.length < 11);
  t.eq(r1, 'lorem ips…');

  var r2 = truncate(str, 14);
  t.assert(r2.length < 15);
  t.eq(r2, 'lorem ipsum d…');
});

test('should append string param', function () {
  var r1 = truncate(str, 10, '--');
  t.assert(r1.length < 11);
  t.eq(r1, 'lorem ip--');
});

test('last char before append shouldn\'t be a whitespace', function () {
  var r1 = truncate(str, 12, '=');
  var r2 = truncate(str, 13, '=');

  t.assert(r2.length < 14);
  t.eq(r2, 'lorem ipsum=');
  t.eq(r1, r2);
});

test('should allow cropping at full words', function () {
  var r1 = truncate(str, 10, null, true);
  t.assert(r1.length < 11);
  t.eq(r1, 'lorem…');

  var r2 = truncate(str, 14, null, true);
  t.assert(r2.length < 15);
  t.eq(r2, 'lorem ipsum…');
});

test('should treat null as empty string', function () {
  t.is(truncate(null, 1), '');
});

test('should treat undefined as empty string', function () {
  t.is(truncate(void 0, 1), '');
});
