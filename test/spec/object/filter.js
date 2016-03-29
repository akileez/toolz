var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/filter')
var t = painless.assert

var filter = require('../../../src/object/filter')
var collection = require('../../../src/collection/filter')

test('should include values where callback returns true', function() {
  var obj = {
      foo: true,
      bar: false
  };

  var result = filter(obj, function(v) { return v; });
  t.same(result, { foo: true })
});

test('should include values where return value is truthy', function() {
  var obj = { foo: 'value' };

  var result = filter(obj, function(v) { return 1; });
  t.same(result, obj)
});

test('should exclude values where return value is falsy', function() {
  var obj = { foo: 'value' };

  var result = filter(obj, function(v) { return 0; });
  t.same(result, {})
});

test('should pass key name as second parameter', function() {
  var obj = {
      foo: null,
      bar: null
  };

  var result = filter(obj, function(v, k) { return k === 'foo'; });
  t.same(result, { foo: null })
});

test('should pass original object as third parameter', function() {
  var obj = { foo: null };

  var result = filter(obj, function(v, k, data) {
      t.same(data, obj);
      return true;
  });
  t.same(result, obj)
});

test('should use provided this object', function() {
  var obj = { foo: null },
      thisObj = {};

  var result = collection(obj, function() {
      t.same(this, thisObj);
      return true;
  }, thisObj);
  t.same(result, obj)
});


test('should support shorthand syntax', function () {
  var obj = {
      a : {foo:'bar', lorem:'ipsum', id:1},
      b : {foo:'bar', lorem:'ipsum', id:2},
      c : {foo:'bar', lorem:'ipsum', id:4}
  };
  t.same( collection(obj, {foo:'bar', lorem:'ipsum'}) ,  obj )
  t.same( collection(obj, {lorem:'ipsum', id:1}) ,  {a:obj.a} )
  t.same( collection(obj, {amet:123}) ,  {} )
});


test('should allow string shorthand syntax', function () {
  var obj = {
      a : {foo:'bar', lorem:'ipsum', id:1},
      b : {foo:'bar', lorem:'ipsum', id:2},
      c : {foo:'bar', lorem:'ipsum', id:0}
  };
  t.same( collection(obj, 'foo') ,  obj )
  t.same( collection(obj, 'id') ,  {a:obj.a, b:obj.b} )
  t.same( collection(obj, 'amet') ,  {} )
});