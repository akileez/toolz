var painless = require('../../assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test object/stampit (methods)')

var stampit = require('../../src/object/stampit')

test('stampit({ methods })', () => {
  const obj = stampit({ methods: {
    foo() { return 'foo'; }
  }}).create();

  t.ok(obj.foo() && !obj.hasOwnProperty('foo'),
    'Should set the new object\'s prototype.');
});

test('stampit().methods()', () => {
  const obj = stampit().methods({
    foo() { return 'foo'; },
    methodOverride() { return false; },
    prop1: 1
  }).methods({
    bar() { return 'bar'; },
    methodOverride() { return true; },
    prop2: 2
  }).create();

  t.ok(obj.foo() && !obj.hasOwnProperty('foo'),
    'Should set the new object\'s prototype.');
  t.ok(obj.bar() && !obj.hasOwnProperty('bar'),
    'Should let you chain .methods() to add more.');
  t.ok(obj.methodOverride() && !obj.hasOwnProperty('methodOverride'),
    'Should let you override by chaining .methods().');
  t.ok(obj.prop1 && !obj.hasOwnProperty('prop1'),
    'Should mix properties.');
  t.ok(obj.prop2 && !obj.hasOwnProperty('prop1'),
    'Should mix properties.');
});

test('stampit({ methods }).methods()', () => {
  const obj = stampit({ methods: {
    foo() { return 'foo'; },
    methodOverride() { return false; },
    prop1: 1
  }}).methods({
    bar() { return 'bar'; },
    methodOverride() { return true; },
    prop2: 2
  }).create();

  t.ok(obj.foo() && !obj.hasOwnProperty('foo'),
    'Should set the new object\'s prototype.');
  t.ok(obj.bar() && !obj.hasOwnProperty('bar'),
    'Should let you chain .methods() to add more.');
  t.ok(obj.methodOverride() && !obj.hasOwnProperty('methodOverride'),
    'Should let you override by chaining .methods().');
  t.ok(obj.prop1 && !obj.hasOwnProperty('prop1'),
    'Should mix properties.');
  t.ok(obj.prop2 && !obj.hasOwnProperty('prop1'),
    'Should mix properties.');
});

test('stampit().methods(a, b)', () => {
  const obj = stampit().methods({
    a() { return 'a'; }
  }, {
    b() { return 'b'; }
  }).create();

  t.ok(obj.a() === 'a' && obj.b() === 'b',
    'Should mixIn objects when multiple methods are passed.');
});
