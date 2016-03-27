var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/stampit::init')
var t = painless.assert
var stampit = require('../../../src/object/stamp')



test('stamp.init() arguments are passed', () => {
  'use strict'
  let initStamp = undefined
  const outerStamp = stampit().init((options, _ref) => {
    let instance = _ref.instance
    let stamp = _ref.stamp
    let args = _ref.args

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
