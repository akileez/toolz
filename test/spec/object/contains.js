var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/contains')
var t = painless.assert

var contains = require('../../../src/object/contains')

test('should check for existence', function(){
  var list = {a:1, b:2, c:3}

  t.is(contains(list, 2), true)
  t.is(contains(list, 4), false)
})