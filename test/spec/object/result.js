var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/result')

var t = painless.assert

var result = require('../../../src/object/result')

var object = {
  attribute: 'attribute',
  anotherAttribute: 'anotherAttribute',
  falsey: '',
  method: function () {
    return this.anotherAttribute
  }
}

test('should return nothing for undefined object properties.', function () {
  t.is(result(object, 'non-existant'), undefined)
})

test('should evaluate a method with object context and return its result.', function () {
  t.is(result(object, 'method'), 'anotherAttribute')
})

test('should evaluate an attribute and return its result.', function () {
  t.is(result(object, 'attribute'), 'attribute')
  t.is(result(object, 'falsey'), '')
})
