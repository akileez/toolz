var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/longish')
var t = painless.assert
var longish = require('../../../src/array/longish')

var arr = [{a: 'b'}, {a: 'bb'}, {a: 'bbbb'}, {a: 'bbb'}, {a: 'bb'}]
var obj = {a: 'b', c: 'dd', e: 'fff', g: 'hhhh', i: 'jjjjj', k: 'k', l: 'l'}


test('should return the longest item in the array', ()=> {
  t.eq(longish(['a', 'Keith', 'foo']), 'Keith')
  t.eq(longish(['a', 'Keith', 'foo']).length, 5)
})

test('should return null', ()=> {
  t.is(longish(), null)
  t.is(longish(null), null)
})

test('should return the longest value for the given property:', function () {
  t.eq(longish.value(arr, 'a'), 'bbbb');
});

test('should return the longest value in the given object:', function () {
  t.eq(longish.value(obj), 'jjjjj');
  t.eq(longish.value({a: 'b', c: 'dd', e: 'fff', g: 'h'}), 'fff');
});
