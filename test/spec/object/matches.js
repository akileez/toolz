var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/matches')
var t = painless.assert

var matches = require('../../../src/object/matches')

test('should check if target contains all given properties', function(){
  t.same( matches({a:1,b:2,c:3}, {a:1}), true)
  t.same( matches({a:1,b:2,c:3}, {b:2}), true)
  t.same( matches({a:1,b:2,c:3}, {d:4}), false)
  t.same( matches({a:1,c:3}, {a:1, c:3}), true)
  t.same( matches({a:1,c:3}, {a:1, c:3, d:4}), false)
  t.same( matches({a:1,c:3}, {b:2}), false)
  t.same( matches({a:1}, {a:1, c:3}), false)
})