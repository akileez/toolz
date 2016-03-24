var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/stampit::deep-props')
var t = painless.assert
var stampit = require('../../src/object/stampit')

// Props safety

test('Stamp deepProps deep cloned for object created', function () {
  var deep = { foo: 'foo', bar: 'bar' };
  var stamp1 = stampit().deepProps({ deep: deep, foo: 'foo' });
  // var stamp1 = stampit({ deepProps: { deep: deep, foo: 'foo' } });
  var stamp2 = stampit({ deepProps: { deep: deep, foo: 'foo' } });

  var o1 = stamp1();
  var o2 = stamp1();

  o1.foo = 'another value';
  console.log(o1)
  t.ne(o1.foo, o2.foo);
  o1.deep.foo = 'another value';
  t.ne(o1.deep.foo, o2.deep.foo);

  o1 = stamp2();
  o2 = stamp2();
  o1.foo = 'another value';
  t.ne(o1.foo, o2.foo);
  o1.deep.foo = 'another value';
  t.ne(o1.deep.foo, o2.deep.foo);
});

test('stamp(refs) does not deep merges deepProps into refs', () => {
  const deepInProps = { deepProp1: 'should not be merged', deepProp2: 'do not merge me!' };
  const stamp1 = stampit().deepProps({ deep: deepInProps, shallow1: 'should not be merged', shallow2: 'merge me!' });
  const stamp2 = stampit({ deepProps: { deep: deepInProps, shallow1: 'should not be merged', shallow2: 'merge me!' } });

  const o1 = stamp1({ deep: { deepProp1: 'leave me as is' }, shallow1: 'leave me as is' });
  const o2 = stamp2({ deep: { deepProp1: 'leave me as is' }, shallow1: 'leave me as is' });

  t.is(o1.shallow1, 'leave me as is', 'A conflicting shallow reference must not be touched by deepProps');
  t.is(o1.shallow2, 'merge me!', 'A non conflicting shallow reference must be merged from deepProps');
  t.is(o2.shallow1, 'leave me as is', 'A conflicting shallow reference must not be touched by deepProps');
  t.is(o2.shallow2, 'merge me!', 'A non conflicting shallow reference must be merged from deepProps');
  t.is(o1.deep.deepProp1, 'leave me as is', 'A conflicting deep property in refs must not be touched by deepProps');
  t.is(o1.deep.deepProp2, undefined, 'A non conflicting deep property must be merged from deepProps');
  t.is(o2.deep.deepProp1, 'leave me as is', 'A conflicting deep property in refs must not be touched by deepProps');
  t.is(o2.deep.deepProp2, undefined, 'A non conflicting deep property must be merged from deepProps');
});

test('stampit.deepProps(deepProps) deep merge into stamp', () => {
  const stamp = stampit()
    .deepProps({ deep: { foo: 'foo', bar: 'bar' }, foo: 'foo', bar: 'bar' })
    .deepProps({ deep: { foo: 'override', baz: 'baz' }, foo: 'override', baz: 'baz' });
  const o = stamp();

  t.is(o.foo, 'override');
  t.is(o.bar, 'bar');
  t.is(o.baz, 'baz');
  t.is(o.deep.foo, 'override');
  t.is(o.deep.bar, 'bar');
  t.is(o.deep.baz, 'baz');
});

test('stamp.compose() deep merge deepProps', () => {
  const stamp = stampit({ deepProps: { deep: { foo: 'foo', bar: 'bar' }, foo: 'foo', bar: 'bar' } })
    .compose(stampit({ deepProps: { deep: { foo: 'override', baz: 'baz' }, foo: 'override', baz: 'baz' } }));
  const o = stamp();

  t.is(o.foo, 'override');
  t.is(o.bar, 'bar');
  t.is(o.baz, 'baz');
  t.is(o.deep.foo, 'override');
  t.is(o.deep.bar, 'bar');
  t.is(o.deep.baz, 'baz');
});
