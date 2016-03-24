var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/pluck')
var t = painless.assert
var pluck = require('../../../src/array/pluck')

test('should extract properties from items', function () {
  var users = [{
    name: 'John',
    age: 21
  }, {
    name: 'Mary',
    age: 25
  }, {
    name: 'Jane',
    age: 27
  }];
  t.same(pluck(users, 'name'), ['John', 'Mary', 'Jane']);
  t.same(pluck(users, 'age'), [21, 25, 27]);
});

test('should allow source array to be null/undefined', function () {
  t.same(pluck(null, 'foo'), []);
  t.same(pluck(undefined, 'foo'), []);
});
