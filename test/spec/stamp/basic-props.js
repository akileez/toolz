var painless = require('../../assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test object/stampit (props)')

var stampit = require('../../../src/object/stamp')

// Basics Props

test('stampit({ props })', () => {
  const obj = stampit({ props: { foo: { bar: 'bar' } } }).create();

  t.is(obj.foo.bar, 'bar',
    'Should set default props.');
});

test('stampit().props()', () => {
  const obj = stampit().props({
    foo: { bar: 'bar' },
    propsOverride: false,
    func1() {}
  }).props({
    bar: 'bar',
    propsOverride: true,
    func2() {}
  }).create();

  t.is(obj.foo.bar, 'bar',
    'Should set default props.');
  t.is(obj.bar, 'bar',
    'Should set let you add by chaining .props().');
  t.ok(obj.propsOverride,
    'Should set let you override by chaining .props().');
  t.ok(obj.func1,
    'Should mix functions.');
  t.ok(obj.func2,
    'Should mix functions.');
});

test('stampit({ props }).props()', () => {
  const obj = stampit({ props: {
    foo: { bar: 'bar' },
    propsOverride: false,
    func1() {}
  }}).props({
    bar: 'bar',
    propsOverride: true,
    func2() {}
  }).create();

  t.is(obj.foo.bar, 'bar',
    'Should set default props.');
  t.is(obj.bar, 'bar',
    'Should set let you add by chaining .props().');
  t.ok(obj.propsOverride,
    'Should set let you override by chaining .props().');
  t.ok(obj.func1,
    'Should mix functions.');
  t.ok(obj.func2,
    'Should mix functions.');
});

test('stampit().props(a, b)', () => {
  const obj = stampit().props({
    a: 'a'
  }, {
    b: 'b'
  }).create();

  t.ok(obj.a && obj.b,
    'Should mixIn objects when multiple objects are passed.');
});
