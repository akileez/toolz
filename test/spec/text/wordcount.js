var painless = require('../../assertion/painless')
var test = painless.createGroup('Test text/wordcount')
var t = painless.assert

var wordcount = require('../../../src/text/wordcount')

test('should count the words in a string.', function () {
  t.is(wordcount('Count the words in string.'), 5);
  t.is(wordcount('Count the words in string, again.'), 6);
});

test('should count the words in a cyrillic string.', function () {
  t.is(wordcount('Тест стринг кирилица.'), 3)
});

test('should count the words in mixed latin and cyrillic string', function () {
  t.is(wordcount('Тест mixed стринг кирилица and latin string.'), 7)
});

test('should count the words in mixed chinese (traditional) and latin string', function () {
  t.is(wordcount('We are 我們是 朋友 from Bulgaria'), 6);
});

test('should count the words in korean-latin-cyrillic string', function () {
  t.is(wordcount('I am from България, and speak 한국어 언어'), 8);
});
