var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test lang/createObject')
var t = painless.assert

var createObject = require('../../src/lang/createObject')

test('should create an object', function(){

  var base = {foo: 'bar'};
  var result = createObject(base);

  t.same(result, base);

  result.foo = 'asd';
  t.is(result.foo, 'asd');
  t.is(base.foo, 'bar');

});

test('should mixIn new properties', function(){

  var base = {foo: 'bar'};
  var props = {lorem : 'ipsum', num:5, test:null};
  var result = createObject(base, props);

  t.same(result,  {
      foo : 'bar',
      lorem : 'ipsum',
      num : 5,
      test : null
  } );

  result.foo = 'asd';
  result.num = 9000;
  t.is(result.foo, 'asd');
  t.is(result.num, 9000);
  t.is(result.test, null);
  t.is(base.foo, 'bar');
  t.is(props.num, 5);

});
