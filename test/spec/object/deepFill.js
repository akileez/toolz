var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/deepFill')
var t = painless.assert

var deepFill = require('../../../src/object/deepFill')

test('should copy missing properties', function () {
  var a = {
      foo : 'bar',
      lorem : 123,
      b : {
          c : 'd'
      }
  };
  var obj = deepFill({lorem : 'ipsum'}, a);
  t.is( obj.foo, 'bar' );
  t.is( obj.lorem, 'ipsum' );
  t.is(obj.b, a.b );
});


test('should copy nested properties', function () {
  var a = {
      foo : 'bar',
      lorem : 123,
      b : {
          c : 'd',
          dolor : {
              '3' : 789
          }
      }
  };
  var b = {
      e : 'f',
      dolor : {
          '1' : 456
      }
  };
  var obj = deepFill({
      lorem : 'ipsum',
      b : b
  }, a);
  t.is( obj.foo, 'bar' );
  t.is( obj.lorem, 'ipsum' );
  t.is(obj.b, b );
  t.is(obj.b.c, 'd' );
  t.is(obj.b.e, 'f' );
  t.is(obj.b.dolor, b.dolor );
  t.is(obj.b.dolor[1], 456 );
  t.is( obj.b.dolor[2], undefined )
  t.is(obj.b.dolor[3], 789 );
});


test('should allow multiple default objects', function () {

  var a = {lorem : 'ipsum', dolor : { sit : 'amet' }};
  var b = {foo : 'bar', lorem : 'dolor', dolor : { sit : 456, it : 78 }};
  var c = {num : 123, foo : null, dolor : {maecennas : 'ullamcor'}};

  var obj = deepFill(a, b, c);

  t.same( obj, {
      lorem : 'ipsum',
      dolor : {
          sit : 'amet',
          it : 78,
          maecennas : 'ullamcor'
      },
      foo : 'bar',
      num : 123
  } );

});

test('should copy values that are not plain objects by reference', function() {
  function Custom() { }
  var defaults = {
      custom: new Custom(),
      items: [1, 2, 3]
  };

  var target = {};
  deepFill(target, defaults);

  t.same( target.custom, defaults.custom);
  t.same( target.items, defaults.items);
});