var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/merge')
var t = painless.assert

var merge = require('../../../src/object/merge')

test('should merge object properties without affecting any object', function () {

  var obj1 = {a: 0, b: 1}
  var obj2 = {c: 2, d: 3}
  var obj3 = {a: 4, d: 5}

  var out = {a:4, b:1, c:2, d:5}

  t.same(merge(obj1, obj2, obj3), out)
  t.ne(out, obj1)
  t.ne(out, obj2)
  t.ne(out, obj3)

})

test('should do a deep merge', function () {
  var obj1 = {a: {b: 1, c: 1, d: {e: 1, f: 1}}}
  var obj2 = {a: {b: 2, d : {f : 'yeah'} }}

  t.same(merge(obj1, obj2), {a: {b : 2, c : 1, d : {e : 1, f : 'yeah'}}})
})

test('should clone objects during merge', function () {
  var obj1 = {a: {b :1}}
  var obj2 = {a: {c :2}}

  var out = merge(obj1, obj2)
  t.same(out, {a:{b:1, c:2}})
  t.diff(out.a, obj1.a)
  t.diff(out.a, obj2.a)
})

test('should deep clone arrays during merge', function () {
  var obj1 = {a: [1, 2, [3, 4]]}
  var obj2 = {b : [5, 6]}

  var out = merge(obj1, obj2)
  t.same(out.a, [1, 2, [3, 4]] )
  t.ne(out.a,  obj1.a )

  t.same(out.a[2], [3, 4] )
  t.same(out.a[2], obj1.a[2] )

  t.same(out.b, obj2.b)
  t.ne(out.b, obj2.b)
})

test('should pass lodash example', function () {
  var users = {
    'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
  }

  var ages = {
    'data': [{ 'age': 36 }, { 'age': 40 }]
  }

  var result = merge(users, ages)
  var expected = { data: [ { user: 'barney', age: 36 }, { user: 'fred', age: 40 } ] }

  t.same(result, expected)
})
