var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/plural')
var t = painless.assert

var plural = require('../../../src/string/plural')

test('testing plural', () => {
  t.is(plural('unicorn', 0), 'unicorns');
  t.is(plural('unicorn', 1), 'unicorn');
  t.is(plural('unicorn', 2), 'unicorns');
  t.is(plural('unicorn', 'horse', 0), 'horse');
  t.is(plural('unicorn', 'horse', 1), 'unicorn');
  t.is(plural('unicorn', 'horse', 2), 'horse');
  t.is(plural('bus', 2), 'buses');
  t.is(plural('box', 2), 'boxes');
  t.is(plural('fizz', 2), 'fizzes');
  t.is(plural('batch', 2), 'batches');
  t.is(plural('bush', 2), 'bushes');
  t.is(plural('guppy', 2), 'guppies');
  t.is(plural('UNICORN', 2), 'UNICORNS');
  t.is(plural('puppY', 2), 'puppIES');
  t.is(plural('man', 2), 'men');
  t.is(plural('woman', 2), 'women');
  t.is(plural('fish', 2), 'fish');
  t.is(plural('sheep', 2), 'sheep');
  t.is(plural('tooth', 2), 'teeth');
  t.is(plural('tomato', 2), 'tomatoes');
  t.is(plural('torpedo', 2), 'torpedoes');
  t.is(plural('wife', 2), 'wives');
  t.is(plural('shelf', 2), 'shelves');
  t.is(plural('day', 2), 'days');
  t.is(plural('diy', 2), 'diys');
  t.is(plural('child', 2), 'children');
  t.is(plural('child', 1), 'child');
})
