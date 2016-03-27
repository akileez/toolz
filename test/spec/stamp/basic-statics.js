var painless = require('../../assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test object/stampit (statics)')

var stampit = require('../../../src/object/stamp')

// Basics statics

test('stampit().statics()', () => {
  const stamp1 = stampit()
    .statics({
      foo() {
        return 42;
      },
      bar: 'space'
    });

  t.ok(stamp1.foo, 'Should add statics props to factory.');
  t.is(stamp1.foo(), 42, 'Should set proper reference.');
  t.is(stamp1.bar, 'space', 'Should set proper reference.');
});

test('stampit({statics})', () => {
  const stamp1 = stampit({
    statics: {
      foo: 42
    }
  });

  t.is(stamp1.foo, 42, 'Should accept statics in options.');
});

test('stampit().statics() last override', () => {
  const stamp1 = stampit()
    .statics({
      foo() {
        return 'override';
      }
    });

  const stamp2 = stampit()
    .statics({
      foo() {}
    }).compose(stamp1);

  t.is(stamp2.foo(), 'override', 'Should override props during composition.');
});

test('stampit().statics(arg1, arg2)', () => {
  const stamp1 = stampit().statics(
    {
      foo1() {}
    },
    {
      foo2() {}
    }
  );

  t.ok(stamp1.foo1, 'Should accept multiple args.');
  t.ok(stamp1.foo2, 'Should accept multiple args.');
});

test('stampit.statics(arg1, arg2)', () => {
  const stamp1 = stampit.statics(
    {
      foo1() {}
    },
    {
      foo2() {}
    }
  );

  t.ok(stamp1.foo1, 'Should accept multiple args.');
  t.ok(stamp1.foo2, 'Should accept multiple args.');
});

test('stampit({statics}).statics()', () => {
  const stamp1 = stampit({
    statics: {
      foo1: 'foo1 value'
    }
  })
    .statics({
      foo2() {
        return 'foo2 value';
      }
    });

  t.is(stamp1.foo1, 'foo1 value', 'Should have statics from options.');
  t.is(stamp1.foo2(), 'foo2 value', 'Should have statics form chain method.');
});
