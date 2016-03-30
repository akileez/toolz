var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/pluck')

var t = painless.assert

var pluck = require('../../../src/object/pluck')

test('should extract properties from items', function () {
  var users = {
    first: {
      name: 'John',
      age: 21
    },
    second: {
      name: 'Mary',
      age: 25
    },
    third: {
      name: 'Jane',
      age: 27
    }
  }

  t.same(pluck(users, 'name'), {first: 'John', second: 'Mary', third: 'Jane'})
  t.same(pluck(users, 'age'), {first: 21, second: 25, third: 27})
})
