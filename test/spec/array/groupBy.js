var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/groupBy')
var t = painless.assert
var groupBy = require('../../src/array/groupBy')

test('should bucket appropriately', function () {
  function floor(num) {
    return Math.floor(num);
  }
  // Test case borrowed from lodash.
  t.same(groupBy([4.2, 6.1, 6.4], floor), {
    '4': [4.2],
    '6': [6.1, 6.4]
  });
});

test('should accept thisArg', function () {
  var x = { '1': 'left', '2': 'left', '3': 'left', '4': 'right', '5': 'left' };
  t.same(
      groupBy([1, 2, 3, 4, 5], function (key) {
        return this[key];
      }, x), { 'left': [1, 2, 3, 5], 'right': [4] });
});

test('should default to identity function', function () {
  t.same(groupBy([1, 2, 2, 1, 1]), { '1': [1, 1, 1], '2': [2, 2] });
});

test('should categorize by property', function () {
  t.same(
      groupBy(['green', 'eggs', 'and', 'ham'], 'length'), { '3': ['and', 'ham'], '4': ['eggs'], '5': ['green'] });
});
