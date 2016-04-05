var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/map')
var t = painless.assert

var map = require('../../../src/string/map')

test('#map', function() {
  t.eq(map('Hello world', function(x) {
    return x;
  }), 'Hello world');
  t.eq(map(12345, function(x) {
    return x;
  }), '12345');
  t.eq(map('Hello world', function(x) {
    if (x === 'o') x = 'O';
    return x;
  }), 'HellO wOrld');
  t.eq(map('', function(x) {
    return x;
  }), '');
  t.eq(map(null, function(x) {
    return x;
  }), '');
  t.eq(map(undefined, function(x) {
    return x;
  }), '');
  t.eq(map('Hello world', ''), 'Hello world');
  t.eq(map('Hello world', null), 'Hello world');
  t.eq(map('Hello world', undefined), 'Hello world');
  t.eq(map('', ''), '');
  t.eq(map(null, null), '');
  t.eq(map(undefined, undefined), '');
});