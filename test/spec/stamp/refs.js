var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/stampit::refs')
var t = painless.assert
var stampit = require('../../../src/object/stamp')

test('Stamp refs shallow copied for object created', () => {
  'use strict'
  const deep = { foo: 'foo', bar: 'bar' }
  const stamp1 = stampit().refs({ deep: deep, foo: 'foo' })
  const stamp2 = stampit().refs({ deep: deep, foo: 'foo' })

  const o1 = stamp1()
  const o2 = stamp2()
  o1.deep.foo = 'another value'
  t.eq(o1.foo, o2.foo)
  t.eq(o1.deep, o2.deep)
  t.eq(o1.deep.foo, o2.deep.foo)
})

test('stampit.refs(refs) shallow copied into stamp', () => {
  const stamp = stampit()
    .refs({ deep: { foo: '1', bar: '1' }, foo: '1', bar: '1' })
    .refs({ deep: { foo: 'override', baz: 'baz' }, foo: 'override', baz: 'baz' })
  const o = stamp()

  t.eq(o.foo, 'override')
  t.eq(o.bar, '1')
  t.eq(o.baz, 'baz')
  t.eq(o.deep.foo, 'override')
  t.eq(o.deep.bar, undefined)
  t.eq(o.deep.baz, 'baz')
})

test('stamp.compose() shallow copy refs', () => {
  const stamp = stampit()
  .refs({ deep: { foo: '1', bar: '1' }, foo: '1', bar: '1' })
    .compose(stampit().refs({ deep: { foo: 'override', baz: 'baz' }, foo: 'override', baz: 'baz' }))
  const o = stamp()

  t.eq(o.foo, 'override')
  t.eq(o.bar, '1')
  t.eq(o.baz, 'baz')
  t.eq(o.deep.foo, 'override')
  t.eq(o.deep.bar, undefined)
  t.eq(o.deep.baz, 'baz')
})
