var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/chop')
var t = painless.assert

var chop = require('../../../src/string/chop')

test('#chop', function(){
  t.ok(chop(null, 2).length === 0, 'output []');
  t.ok(chop('whitespace', 2).length === 5, 'output [wh, it, es, pa, ce]');
  t.ok(chop('whitespace', 3).length === 4, 'output [whi, tes, pac, e]');
  t.ok(chop('whitespace')[0].length === 10, 'output [whitespace]');
  t.ok(chop(12345, 1).length === 5, 'output [1, 2, 3,  4, 5]');
});