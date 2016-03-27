var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/stampit::isStamp')
var t = painless.assert
var stampit = require('../../../src/object/stamp')

test('stampit.isStamp() with stamps', () => {
  'use strict'
  const emptyStamp = stampit();
  const refsOnlyStamp = stampit().refs({ a: 'b' });
  const methodsOnlyStamp = stampit({ methods: {
    method() {}
  }});
  const closureOnlyStamp = stampit().init(() => {});

  t.ok(stampit.isStamp(emptyStamp), 'Empty stamp should be seen as stamp.');
  t.ok(stampit.isStamp(refsOnlyStamp), 'Refs only stamp should be seen as stamp.');
  t.ok(stampit.isStamp(methodsOnlyStamp), 'Methods only stamp should be seen as stamp.');
  t.ok(stampit.isStamp(closureOnlyStamp), 'Closure only stamp should be seen as stamp.');
});

test('stampit.isStamp() with non stamps', () => {
  'use strict'
  const obj1 = undefined
  const obj2 = { refs: {}, methods: {}, init: {}, compose: {}, props: {} }
  const obj3 = function() {
    this.init = this;
  }
  const obj4 = function() {
    this.compose = () => {};
  }

  t.ok(!stampit.isStamp(obj1) && !stampit.isStamp(obj2) && !stampit.isStamp(obj3) && !stampit.isStamp(obj4),
    'Should not be seen as stamp.')
})
