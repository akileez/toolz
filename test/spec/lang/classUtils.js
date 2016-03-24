var painless = require('../../assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test lang/classUtils')

var cu       = require('../../../src/lang/classUtils')

test('cu should extend', function () {
  var Parent;
  var Ctor;
  // var proto;

  Parent = function() {}
  Parent.foo = 'bar';
  Parent.prototype.a = function() {};
  Parent.prototype.b = function() {};
  Parent.prototype.c = function() {};
  Object.defineProperty(Parent.prototype, 'count', {
    get: function() {
      return Object.keys(this).length;
    },
    set: function() {}
  });
  Ctor = function() {
    Parent.call(this);
  };
  // proto = App.prototype;
  var extend = cu.extend(Parent)
  extend(Ctor)
  t.assert(typeof Ctor.extend === 'function')
  t.assert(Ctor.foo === 'bar')
  t.assert(typeof Ctor.prototype.a === 'function');
  t.assert(typeof Ctor.prototype.b === 'function');
  t.assert(typeof Ctor.prototype.c === 'function');
})
