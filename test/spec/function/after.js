var painless = require('../../assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test function/after')

var after   = require('../../../src/function/after')

var count = 0;

function tick() {
  count++;
}

test.beforeEach(function() {
  count = 0;
});

test('should the callback after appropriate calls', function(){

  var callback = after(tick, 3);

  callback();
  callback();
  callback();

  t.is( count, 1 )
});

test('should not call closure before', function(){
  var callback = after(tick, 5);

  callback();
  callback();
  callback();
  callback();

  t.eq( count, 0 )
});

test('should continue calling the callback after the minimum amount of calls', function(){
  var callback = after(tick, 3);

  callback();
  callback();
  callback();
  callback();
  callback();

  t.eq( count, 3 )
});
