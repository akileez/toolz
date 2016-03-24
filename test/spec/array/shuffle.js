var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/shuffle')
var t = painless.assert

var shuffle = require('../../src/array/shuffle')
var mockRandom = require('../../src/random/mockRandom')

test.beforeEach(function (){
  mockRandom.start()
})

test.afterEach(function () {
  mockRandom.end()
})

test('should return new array with shuffled items', function () {
  var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  var arr2 = arr.slice()
  var result = shuffle(arr)

  t.ne(result, arr )
  t.not(result, arr2 )

})

test('should return empty array if source array is null/undefined', function () {
  t.same(shuffle(null), [])
  t.same(shuffle(undefined), [])
})