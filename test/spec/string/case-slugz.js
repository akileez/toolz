var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-slugz')
var t = painless.assert

var slugs = require('../../../src/string/case-slugz')

test('should-not-modify-string', function () {
  t.equal(slugs('thisisasafestring'), 'thisisasafestring');
})

test('should-replace-spaces-but-nothing-else', function () {
  t.equal(slugs('this is a string with spaces'), 'this-is-a-string-with-spaces');
})

test('should-replace-periods-with-hashes', function () {
  //Shouldn't allow trailing hash
  t.equal(slugs('thisisastring.with.aperiod.'), 'thisisastring-with-aperiod');
})

test('should-not-have-forward-or-trailing-hash', function () {
  t.equal(slugs(' space in front and in back '), 'space-in-front-and-in-back');
})

test('should-convert-everything-to-lower-case', function () {
  t.equal(slugs('This should all be in LowEr Case'), 'this-should-all-be-in-lower-case');
})

test('should-preserve-numbers-and-characters', function () {
  t.equal(slugs('Please keep m4h numb3r5'), 'please-keep-m4h-numb3r5');
})

test('should-not-contain-duplicate-hashes-for-multiple-spaces', function () {
  t.equal(slugs('SHOULD-LOOK-NORMAL------'), 'should-look-normal');
})

test('should-not-include-unsafe-characters', function () {
  t.equal(slugs('%^T%^~!@##$$#%^$^/?????.'), 't');
})

test('should-override-separator-character', function () {
  t.equal(slugs('this is a string with spaces', '+'), 'this+is+a+string+with+spaces');
})

test('should-override-preserved-characters', function () {
  t.equal(slugs('this.is=a-string.without=spaces', '-', []), 'thisisastringwithoutspaces');
})
