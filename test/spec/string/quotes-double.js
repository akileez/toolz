var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/quotes-double')
var t = painless.assert

var fn = require('../../../src/string/quotes-double')

test('convert matching single-quotes to double-quotes', () => {
  t.is(fn(''), '');
  t.is(fn('foo'), 'foo');
  t.is(fn('\'\''), '""');
  t.is(fn('""'), '""');
  t.is(fn('\'foo\''), '"foo"');
  t.is(fn('"foo"'), '"foo"');
  t.is(fn('bar "foo" baz'), 'bar "foo" baz');
  t.is(fn('\'bar\' "foo" \'baz\''), '"bar" "foo" "baz"');
  t.is(fn('\\\'foo\\\''), '"foo"');
  t.is(fn('{\'a\':\'<a href=\\\'addr\\\'>\'}'), JSON.stringify({a: '<a href=\'addr\'>'}));
  t.is(fn('{\'a\':\'aa\\n<a href=\\\'addr\\\'>\'}'), JSON.stringify({a: 'aa\n<a href=\'addr\'>'}));
  t.is(fn(JSON.stringify({a: 'b""c'})), '{"a":"b\\\"\\\"c"}');
});

test('convert matching single-quotes to double-quotes despite backslashes', () => {
  t.is(fn('\'1\\\"\''), '\"1\\\\\"\"', 'First sequence in the string');
  t.is(fn('\'\\\"\''), '\"\\\\\"\"', 'Not the first sequence in the string');
  t.is(fn('\'\\\\\"\''), '\"\\\\\\\"\"', 'Double backslash');
  t.is(fn('\'\\\\\" \\\\\"\''), '"\\\\\\" \\\\\\""', 'Repetition');
  t.is(fn('\'\\\\n \\\\\"\''), '"\\\\n \\\\\\""', 'With another backslash character');
});