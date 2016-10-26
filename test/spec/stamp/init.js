var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/stampit::init')
var t = painless.assert
var stampit = require('../../../src/object/stamp')

test('stamp.init() arguments are passed', () => {
  'use strict'
  let initStamp
  const outerStamp = stampit().init((options, {instance, stamp, args}) => {
    t.ok(instance, '{ instance } should exist')
    t.eq(typeof instance, 'object', '{ instance } should be object')
    t.ok(stamp, '{ stamp } should exist')
    t.eq(typeof stamp, 'function', '{ stamp } should be function')
    t.ok(args, '{ args } should exist')
    t.ok(Array.isArray(args), '{ args } should be array')
    initStamp = stamp
  })

  outerStamp()

  t.is(outerStamp, initStamp, '{ stamp } === stamp returned')
})

test('stamp.init() should assign stamp to `{ stamp }`', () => {
  const outerStamp = stampit().init((options, {stamp}) => {
    t.ok(outerStamp === stamp, '{ stamp } should equal stamp')
  })

  outerStamp()
})

test('stamp.init() should assign arguments to `{ args }`', () => {
  const stamp = stampit().init((options, {args}) => {
    t.eq(args[0], 'arg1', '{ args } should equal arguments')
    t.eq(args[1], undefined, '{ args } should equal arguments')
    t.eq(args[2], 'arg3', '{ args } should equal arguments')
  })

  stamp('arg1', undefined, 'arg3')
})

test('stamp.init() can handle multiple init functions', () => {
  let init1
  let init2
  let init3

  const stamp = stampit()
    .init(() => {
      init1 = true
    }).init(() => {
      init2 = true
    }).init(() => {
      init3 = true
    })

  stamp()

  t.ok(init1, 'init 1 fired')
  t.ok(init2, 'init 2 fired')
  t.ok(init3, 'init 3 fired')
})

test('stamp.init() can handle multiple init functions assigned with array', () => {
  let init1
  let init2
  let init3

  const stamp = stampit().init([
    () => {
      init1 = true
    },
    () => {
      init2 = true
    },
    () => {
      init3 = true
    }
  ])

  stamp()

  t.ok(init1, 'init 1 fired')
  t.ok(init2, 'init 2 fired')
  t.ok(init3, 'init 3 fired')
})

test('stamp.init() should call composed init functions in order', () => {
  const result = []

  const stamp = stampit().init(() => {
    result.push('a')
  }).init(() => {
    result.push('b')
  }).init(() => {
    result.push('c')
  })

  const stamp2 = stampit().init([
    () => {
      result.push('d')
    },
    () => {
      result.push('e')
    }
  ])

  const stamp3 = stampit.compose(stamp, stamp2)

  stamp3()
  t.same(result, ['a', 'b', 'c', 'd', 'e'], 'init called in order')
})

test('explicit push wrong object to stamp.compose.initializers[]', () => {
  const stamp = stampit().init(function () {
    const secret = 'foo'
    this.getSecret = () => { return secret }
  })

  stamp.compose.initializers.push(42) // breaking the stamp.
  const obj = stamp()

  t.eq(obj.getSecret(), 'foo', 'Should omit malformed compose.initializers[] elements.')
})

test('stamp.compose.initializers malformed object', () => {
  const stamp = stampit().refs({ref: 42}).init(function () {
    const secret = 'foo'
    this.getSecret = () => { return secret }
  })

  stamp.compose.initializers = 42 // breaking the stamp badly
  const obj = stamp()

  t.ok(obj.ref, 42, 'Should be okay with malformed compose.init.')
})
