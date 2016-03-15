var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/extract')
var t = painless.assert

var extract = require('../../src/array/extract')

test('extract where test returns true', function () {
  var arr = [
    { result: false, number: 1 },
    { result: false, number: 2 },
    { result: true, number: 3 },
    { result: true, number: 4 }
  ]
  function isTrueResult (item) {
    return item.result === true
  }
  var result = extract(arr, isTrueResult)
  t.same(result, [
    { result: true, number: 3 },
    { result: true, number: 4 }
  ])
  t.same(arr, [
    { result: false, number: 1 },
    { result: false, number: 2 }
  ])
})

test('extract where query matches', function () {
  var arr = [
    { result: false, number: 1 },
    { result: false, number: 2 },
    { result: true, number: 3 },
    { result: true, number: 4 }
  ]
  var result = extract(arr, { result: false})
  t.same(result, [
    { result: false, number: 1 },
    { result: false, number: 2 }
  ])
  t.same(arr, [
    { result: true, number: 3 },
    { result: true, number: 4 }
  ])
})

test('extract where query matches, 1 item in array', function () {
  var arr = [
    { result: false, number: 1 }
  ]
  var result = extract(arr, { result: false})
  t.same(result, [
    { result: false, number: 1 }
  ])
  t.same(arr, [])
})

test('extract where query matches, 1 item in array', function () {
  var q = [ 1, 2, 3 ]
  var w = [ 4, 5, 6 ]
  var arr = [ q, w ]

  var result = extract(arr, q)
  t.same(result, [ q ])
  t.same(arr, [ w ])
})