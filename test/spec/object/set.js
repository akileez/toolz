var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/set')

var t = painless.assert

var set = require('../../../src/object/set')

test('should create nested properties if not existent and set the value', function () {
  var o = {};
  set(o, 'foo.bar', 123);
  t.is(o.foo.bar, 123);
  set(o, ['baz', 'boom'], 456)
  t.is(o.baz.boom, 456)
});

test('should not create nested properties if it does exist', function () {
  var f = {
      lorem: 'ipsum'
    },
    o = {
      foo: f
    };
  set(o, 'foo.bar', 123);
  t.is(o.foo.bar, 123);
  t.is(o.foo, f);
  t.is(o.foo.lorem, 'ipsum');
});

test('shold work even if not nested path', function () {
  var o = {};
  set(o, 'foo', 'bar');
  t.is(o.foo, 'bar');
});

test('should return obj param if not typeof object', function () {
  var o = 'a'
  set(o, 'foo', 'bar')
  t.is(o, 'a')
  t.is(o.foo, undefined)
})
