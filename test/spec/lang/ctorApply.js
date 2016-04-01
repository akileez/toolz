var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/constrApply')
var t = painless.assert

var ctorApply = require('../../../src/lang/constrApply')

test('should call constructor only once passing arguments as array and keep prototype chain', function () {
  var _count = 0;

  var Foo = function (a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
    _count++;
  };

  //make sure prototype chain is maintained
  Foo.prototype.get = function (key) {
    return this[key];
  };

  var obj = ctorApply(Foo, ['lorem', 'ipsum', 123]);

  t.eq(_count, 1);
  t.eq(obj.get('a'), 'lorem');
  t.eq(obj.get('b'), 'ipsum');
  t.eq(obj.get('c'), 123);
});

test('should call constructor only once passing individual arguments and keep prototype chain', function () {
  var _count = 0;

  var Foo = function (a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
    _count++;
  };

  //make sure prototype chain is maintained
  Foo.prototype.get = function (key) {
    return this[key];
  };

  var obj = ctorApply(Foo, 'lorem', 'ipsum', 123);

  t.eq(_count, 1);
  t.eq(obj.get('a'), 'lorem');
  t.eq(obj.get('b'), 'ipsum');
  t.eq(obj.get('c'), 123);
});