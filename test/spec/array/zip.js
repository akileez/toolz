var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/zip')
var t = painless.assert

var zip = require('../../src/array/zip')

test('should group elements from different arrays', function(){
    var output = [ ['a', 1], ['b', 2], ['c', 3] ]
    t.same(zip(['a', 'b', 'c'], [1, 2, 3]), output )
})

test('should work with "n" arrays', function () {
    var output = [ ['a', 1, true, 4], ['b', 2, false, 5], ['c', 3, true, 6] ];
    t.same(zip(['a', 'b', 'c'], [1, 2, 3], [true, false, true], [4,5,6]), output)
})

test('should work with arrays of diff length', function () {
    var output = [ ['a', 1, true, 4], ['b', 2, false, undefined], ['c', 3, undefined, undefined] ]
    t.same(zip(['a', 'b', 'c'], [1, 2, 3], [true, false], [4]), output)
})

test('should use undefined for null/undefined argument values', function () {
    var output = [
        [1, undefined, undefined],
        [2, undefined, undefined]
    ]
    t.same(zip([1, 2], null, undefined), output)
    t.same(zip(null, null, undefined), [])
})
