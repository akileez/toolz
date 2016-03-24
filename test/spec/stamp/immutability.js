var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/stampit::immutability')
var t = painless.assert
var stampit = require('../../src/object/stampit')

// Immutability

test('Basic stamp immutability', () => {
  const methods = { f() {} };
  const refs = { s: { deep: 1 } };
  const props = { p: { deep: 1 } };
  const stamp1 = stampit({ methods: methods, refs: refs, deepProps: props });

  methods.f = () => {};
  refs.s.deep = 2;
  props.p.deep = 2;
  const stamp2 = stampit({ methods: methods, refs: refs, deepProps: props });

  t.ne(stamp1.compose.methods, stamp2.compose.methods);
  t.ne(stamp1.compose.methods.f, stamp2.compose.methods.f);
  t.ne(stamp1.compose.properties, stamp2.compose.properties);
  t.eq(stamp1.compose.properties.s, stamp2.compose.properties.s);
  t.eq(stamp1.compose.properties.s.deep, stamp2.compose.properties.s.deep);
  t.ne(stamp1.compose.deepProperties, stamp2.compose.properties);
  t.ne(stamp1.compose.deepProperties.p, stamp2.compose.deepProperties.p);
  t.ne(stamp1.compose.deepProperties.p.deep, stamp2.compose.deepProperties.p.deep);
  t.ne(stamp1.compose.initializers, stamp2.compose.initializers);
});

test('Stamp immutability made of same source', () => {
  const methods = { f() {} };
  const refs = { s: { deep: 1 } };
  const props = { p: { deep: 1 } };
  const stamp1 = stampit({ methods: methods, refs: refs, deepProps: props });
  const stamp2 = stampit({ methods: methods, refs: refs, deepProps: props });

  t.ne(stamp1.compose.methods, stamp2.compose.methods);
  t.ne(stamp1.compose.properties, stamp2.compose.properties);
  t.eq(stamp1.compose.properties.s, stamp2.compose.properties.s);
  t.ne(stamp1.compose.deepProperties, stamp2.compose.deepProperties);
  t.ne(stamp1.compose.deepProperties.p, stamp2.compose.deepProperties.p);
  t.ne(stamp1.compose.initializers, stamp2.compose.initializers);
});

test('Basic object immutability', () => {
  const methods = { f() {} };
  const refs = { s: { deep: 1 } };
  const props = { p: { deep: 1 } };
  const o1 = stampit({ methods: methods, refs: refs, deepProps: props })();

  methods.f = () => {};
  refs.s.deep = 2;
  props.p.deep = 2;
  const o2 = stampit({ methods: methods, refs: refs, deepProps: props })();

  t.ne(o1, o2);
  t.ne(o1.f, o2.f);
  t.eq(o1.s, o2.s);
  t.eq(o1.s.deep, o2.s.deep);
  // t.ne(o1.p, o2.p);
  // t.ne(o1.p.deep, o2.p.deep);
});

test('Stamp chaining functions immutability', () => {
  const stamp1 = stampit();
  const stamp2 = stamp1.methods({ f() {} });
  const stamp3 = stamp2.properties( { s: { deep: 1 } });
  const stamp4 = stamp3.init(() => {});
  const stamp5 = stamp2.deepProperties( { p: { deep: 1 } });
  const stamp6 = stamp4.compose(stampit());

  t.ne(stamp1, stamp2);
  t.ne(stamp2, stamp3);
  t.ne(stamp3, stamp4);
  t.ne(stamp4, stamp5);
  t.ne(stamp5, stamp6);
});
