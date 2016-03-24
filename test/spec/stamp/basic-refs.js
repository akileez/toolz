var painless = require('../../assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test object/stampit (refs)')

var stampit = require('../../src/object/stampit')

// Basics refs

test('stampit({ refs })', () => {
  const obj = stampit({ refs: { foo: { bar: 'bar' } } }).create();

  t.is(obj.foo.bar, 'bar',
    'Should set default refs.');
});

test('stampit().refs()', () => {
  const obj = stampit().refs({
    foo: { bar: 'bar' },
    refsOverride: false,
    func1() {}
  }).refs({
    bar: 'bar',
    refsOverride: true,
    func2() {}
  }).create();

  t.is(obj.foo.bar, 'bar',
    'Should set default refs.');
  t.is(obj.bar, 'bar',
    'Should set let you add by chaining .refs().');
  t.ok(obj.refsOverride,
    'Should set let you override by chaining .refs().');
  t.ok(obj.func1,
    'Should mix functions.');
  t.ok(obj.func2,
    'Should mix functions.');
});

test('stampit({ refs }).refs()', () => {
  const obj = stampit({ refs: {
    foo: { bar: 'bar' },
    refsOverride: false,
    func1() {}
  }}).refs({
    bar: 'bar',
    refsOverride: true,
    func2() {}
  }).create();

  t.is(obj.foo.bar, 'bar',
    'Should set default refs.');
  t.is(obj.bar, 'bar',
    'Should set let you add by chaining .refs().');
  t.ok(obj.refsOverride,
    'Should set let you override by chaining .refs().');
  t.ok(obj.func1,
    'Should mix functions.');
  t.ok(obj.func2,
    'Should mix functions.');
});

test('stampit().refs(a, b)', () => {
  const obj = stampit().refs({
    a: 'a'
  }, {
    b: 'b'
  }).create();

  t.ok(obj.a && obj.b,
    'Should mixIn objects when multiple properties are passed.');
});
