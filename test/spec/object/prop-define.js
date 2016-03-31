var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/prop-define')

var t = painless.assert

var define = require('../../../src/object/prop-define')

test('should define a property and make it non-enumerable:', function () {
  var obj = {};
  var cfg = {value: (val) => val.toUpperCase(), enumerable: false}

  define(obj, 'foo', cfg);

  t.same(obj, {});
  t.eq(obj.foo('bar'), 'BAR');
});

test('should allow any arbitrary value to be assigned:', function () {
  var obj = {};
  define(obj, 'foo', null);
  define(obj, 'bar');
  define(obj, 'baz', {});
  t.eq(obj.foo, null);
  t.eq(obj.bar, undefined);
  t.same(obj.baz, {});
});

test('should define a property with accessor descriptors:', function () {
  var obj = { bar: 'baz' };
  define(obj, 'foo', {
    configurable: true,
    enumerable: false,
    get: function () {
      return this._val;
    },
    set: function (key) {
      define(this, '_val', {value: this[key]});
    }
  });
  obj.foo = 'bar';
  t.eq(obj.foo, 'baz');
});
