var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/invoke')
var t = painless.assert
var invoke = require('../../src/array/invoke')

test('should call methods on each item', function () {
  var items = [
    [3, 2, 1],
    [9, 5, 2]
  ];
  invoke(items, 'sort'); //sort is done in place
  t.same(items[0], [1, 2, 3]);
  t.same(items[1], [2, 5, 9]);
});

test('allow passing custom args', function () {
  var items = [{
    count: 0,
    add: function (a, b) {
      this.count += a + b;
    }
  }, {
    count: 0,
    add: function (a, b, c) {
      this.count += a + b + c;
    }
  }];
  invoke(items, 'add', 1, 2, 3);
  t.is(items[0].count, 3);
  t.is(items[1].count, 6);
});

test('should return source array', function () {
  var arr = [
    [3, 2, 1],
    [4, 2, 8]
  ];
  t.same(invoke(arr, 'sort'), arr);
});

test('should ignore null/undefined source array', function () {
  t.is(invoke(null, 'foo'), null);
  t.is(invoke(undefined, 'foo'), undefined)
});
