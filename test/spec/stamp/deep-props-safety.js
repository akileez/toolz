var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/stampit::deep-props')
var t = painless.assert
var stampit = require('../../../src/object/stamp')

// Props safety

test('Stamp deepProps deep cloned for object created', function () {
  var deep = {foo: 'foo', bar: 'bar'}
  var stamp1 = stampit().deepProps({deep: deep, foo: 'foo'})
  var stamp2 = stampit().deepProps({deep: deep, foo: 'foo'})

  var o1 = stamp1()
  var o2 = stamp1()

  o1.foo = 'another value'
  t.ne(o1.foo, o2.foo)
  o1.deep.foo = 'another value'
  t.ne(o1.deep.foo, o2.deep.foo)

  o1 = stamp2()
  o2 = stamp2()
  o1.foo = 'another value'
  t.ne(o1.foo, o2.foo)
  o1.deep.foo = 'another value'
  t.ne(o1.deep.foo, o2.deep.foo)
})

test('stamp.deepProps(deepProps) deep merge into stamp', () => {
  const stamp = stampit()
    .deepProps({deep: {foo: 'foo', bar: 'bar'}, foo: 'foo', bar: 'bar'})
    .deepProps({deep: {foo: 'override', baz: 'baz'}, foo: 'override', baz: 'baz'})
  const o = stamp()

  t.is(o.foo, 'override')
  t.is(o.bar, 'bar')
  t.is(o.baz, 'baz')
  t.is(o.deep.foo, 'override')
  t.is(o.deep.bar, 'bar')
  t.is(o.deep.baz, 'baz')
})

test('stamp.compose() deep merge deepProps', () => {
  const stamp = stampit()
    .deepProps({deep: {foo: 'foo', bar: 'bar'}, foo: 'foo', bar: 'bar'})
    .compose(stampit().deepProps({deep: {foo: 'override', baz: 'baz'}, foo: 'override', baz: 'baz'}))

  const o = stamp()

  t.is(o.foo, 'override')
  t.is(o.bar, 'bar')
  t.is(o.baz, 'baz')
  t.is(o.deep.foo, 'override')
  t.is(o.deep.bar, 'bar')
  t.is(o.deep.baz, 'baz')
})
