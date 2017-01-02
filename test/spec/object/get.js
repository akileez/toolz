var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/get')

var t = painless.assert

var get = require('../../../src/object/get')

// function get (object, expression) {
//   if (!(object && expression)) throw new Error('both object and expression args are required')
//   return expression.trim().split('.').reduce(function (prev, curr) {
//     var arr = curr.match(/(.*?)\[(.*?)\]/)
//     if (arr) {
//       return prev && prev[arr[1]][arr[2]]
//     } else {
//       return prev && prev[curr]
//     }
//   }, object)
// }

test('should get nested property', function () {
  var foo = {
    bar: {
      lorem: {
        ipsum: 'dolor'
      }
    }
  }
  t.is(get(foo, 'bar.lorem.ipsum'), 'dolor')
})

test('should get nested property when encountering non-primitive', function () {
  var foo = {
    bar: {
      lorem: function () {}
    }
  }

  foo.bar.lorem.ipsum = 'dolor'

  t.is(get(foo, 'bar.lorem.ipsum'), 'dolor')
})

test('should get nested property when encountering primitive', function () {
  var foo = {
    bar: {
      lorem: 'ipsum'
    }
  }

  t.is(get(foo, 'bar.lorem.toString'), foo.bar.lorem.toString)
})

test('should return undefined if non existent', function () {
  var foo = {
    bar: {
      lorem: 'ipsum'
    }
  }
  var undef
  t.is(get(foo, 'bar.dolor'), undef)
})

test('should return undefined when encountering null', function () {
  var foo = {
  bar: null
}

  var undef
  t.is(get(foo, 'foo.bar.baz'), undef)
})
