var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/exists')
var t = painless.assert

var exists = require('../../src/array/exists')

var f = {
  recordset: [
    { result: false, number: 1 },
    { result: false, number: 2 }
  ],
  arr: [ 1, 2, 'three' ]
}

test('.exists(recordset, query)', function () {
  t.eq(exists(f.recordset, { result: true }), false)
  t.eq(exists(f.recordset, { result: false }), true)
  t.eq(exists(f.recordset, { result: false, number: 3 }), false)
  t.eq(exists(f.recordset, { result: false, number: 2 }), true)

})

test('.exists(array, primitive)', function () {
  t.eq(exists(f.arr, 0), false)
  t.eq(exists(f.arr, 1), true)
  t.eq(exists(f.arr, '1'), false)
  t.eq(exists(f.arr, 'three'), true)

})