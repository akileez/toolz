'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/bind')
var t = painless.assert

var bind = require('../../../src/function/bind')

var o1 = {val : 'bar'}
var o2 = {val : 123}

function getVal () {
  return this.val
}

function doIt (a, b, c) {
  var str = ''
  str += a ? a : ''
  str += b ? b : ''
  str += c ? c : ''
  return this.val + str
}

test('should change execution context', function () {
  var a = bind(getVal, o1)
  var b = bind(getVal, o2)

  t.is(a(), 'bar')
  t.is(b(), 123)
})

test('should curry args', function () {
  var a = bind(doIt, o1, ' a', 'b', 'c')
  var b = bind(doIt, o2, '456')

  t.is(a(), 'bar abc')
  t.is(b(), '123456')
})
