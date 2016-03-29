var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/bindAll')
var t = painless.assert

var bindAll = require('../../../src/object/bindAll')

test('should bind all methods by default', function(){
  var obj = {
    foo : 'bar',
    a : function(){
        return this.foo;
    },
    bar : 'baz',
    b : function(){
        return this.bar;
    },
    lorem : 'ipsum',
    c : function(){
        return this.lorem;
    }
  };

  bindAll(obj);

  t.is(obj.a.call(null), 'bar')
  t.is(obj.b.call(this), 'baz')
  t.is(obj.c.call(this), 'ipsum')
});


test('should allow binding just a few methods', function(){
  var obj = {
      foo : 'bar',
      a : function(){
          return this.foo;
      },
      bar : 'baz',
      b : function(){
          return this.bar;
      },
      lorem : 'ipsum',
      c : function(){
          return this.lorem;
      }
  };

  bindAll(obj, 'a', 'c');

  t.is(obj.a.call(null), 'bar')
  t.is(obj.b.call(this), undefined)
  t.is(obj.c.call(this), 'ipsum')
});