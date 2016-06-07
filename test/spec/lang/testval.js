var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/testval')
var t = painless.assert

var testval = require('../../../src/lang/testval')

function TestClass () {
  this.one = 1
}

var testClass = new TestClass()

var fixture = {
  result: 'clive',
  hater: true,
  colour: 'red-ish',
  deep: {
    name: 'Zhana',
    favourite: {
      colour: [ 'white', 'red' ]
    },
    arr: [ 1, 2, 3 ]
  },
  nullVal: null,
  boolTrue: true,
  number: 5,
  testClass: testClass,
  arr: [ 1, 2, 3 ],
  arrObjects: [
    { number: 1 },
    { number: 2 }
  ]
}

test('testval(obj, {property: primative})', function () {
  t.is(testval(fixture, { result: 'clive' }), true)
  t.is(testval(fixture, { hater: true }), true)
  t.is(testval(fixture, { result: 'clive', hater: true }), true)
  t.is(testval(fixture, { ibe: true }), false)
})

test('testval(obj, {!property: primative})', function () {
  t.is(testval(fixture, { '!result': 'clive' }), false)
  t.is(testval(fixture, { '!result': 'ian' }), true)
  t.is(testval(fixture, { '!result': 'ian', '!hater': false }), true)
})

test('testval(obj, {property: primative[]})', function () {
  t.is(testval(fixture, { arr: [ 1, 2, 3 ] }), true)
  t.is(testval(fixture, { arr: [ /1/ ] }), true)
  t.is(testval(fixture, { arr: [ /4/ ] }), false)
  t.is(testval(fixture, { colour: [ 1, 2, 3 ] }), false, 'querying a string with array')
  t.is(testval(fixture, { undefinedProperty: [ 1, 2, 3 ] }), false, 'querying undefined property')
  t.is(testval(fixture, { undefinedProperty: [ undefined ] }), true)
  t.is(testval(fixture, { undefinedProperty: [ null ] }), false)
})

test('testval(obj, {property: {property: primative[]}})', function () {
  t.is(testval(fixture, { deep: { arr: [ 1, 2 ] } }), true)
  t.is(testval(fixture, { deep: { arr: [ 3, 4 ] } }), true)
  t.is(testval(fixture, { deep: { favourite: { colour: [ 'white', 'red' ] } } }), true)
})

test('testval(obj, {property: undefined, property: regex })', function () {
  t.is(testval(fixture.deep, { undefinedProperty: undefined, name: /.+/ }), true)
})

test('testval(obj, {property: /regex/ })', function () {
  t.is(testval(fixture, { colour: /red/ }), true)
  t.is(testval(fixture, { colour: /black/ }), false)
  t.is(testval(fixture, { colour: /RED/i }), true)
  t.is(testval(fixture, { colour: /.+/ }), true)
  t.is(testval(fixture, { undefinedProperty: /.+/ }), false, 'testing undefined val')
  t.is(testval(fixture, { deep: /.+/ }), false, 'testing an object val')
  t.is(testval(fixture, { nullVal: /.+/ }), false, 'testing a null val')
  t.is(testval(fixture, { boolTrue: /true/ }), true, 'testing a boolean val')
  t.is(testval(fixture, { boolTrue: /addf/ }), false, 'testing a boolean val')
})

test('testval(obj, {!property: /regex/})', function () {
  t.is(testval(fixture, { '!colour': /red/ }), false)
  t.is(testval(fixture, { '!colour': /black/ }), true)
  t.is(testval(fixture, { '!colour': /blue/ }), true)
})

test('testval(obj, {property: function})', function () {
  t.is(testval(fixture, { number: function (n) { return n < 4 } }), false, '< 4')
  t.is(testval(fixture, { number: function (n) { return n < 10 } }), true, '< 10')
})

test('testval(obj, {!property: function})', function () {
  t.is(testval(fixture, { '!number': function (n) { return n < 10 } }), false, '< 10')
})

test('testval(obj, {property: object})', function () {
  t.is(testval(fixture, { testClass: { one: 1 } }), true, 'querying a plain object')
  t.is(testval(fixture, { testClass: testClass }), true, 'querying an object instance')
})

test('testval(obj, {+property: primitive})', function () {
  t.is(testval(fixture, { arr: 1 }), false)
  t.is(testval(fixture, { '+arr': 1 }), true)
})

test('testval(obj, {property: { +property: query}})', function () {
  t.is(testval(fixture, { deep: { favourite: { '+colour': 'red' } } }), true)
  t.is(testval(fixture, { deep: { favourite: { '+colour': /red/ } } }), true)
  t.is(testval(fixture, { deep: { favourite: { '+colour': function (c) {
    return c === 'red'
  } } } }), true)
  t.is(testval(fixture, { deep: { favourite: { '+colour': /green/ } } }), false)
})

test('testval(obj, {+property: query})', function () {
  t.is(testval(fixture, { arrObjects: { number: 1 } }), false)
  t.is(testval(fixture, { '+arrObjects': { number: 1 } }), true)
})

test('object deep exists, summary', function () {
  var query = {
    one: {
      one: {
        three: 'three',
        '!four': 'four'
      },
      two: {
        one: {
          one: 'one'
        },
        '!two': undefined,
        '!three': [ { '!one': { '!one': '110' } } ]
      }
    }
  }

  var obj1 = {
    one: {
      one: {
        one: 'one',
        two: 'two',
        three: 'three'
      },
      two: {
        one: {
          one: 'one'
        },
        two: 2
      }
    }
  }

  var obj2 = {
    one: {
      one: {
        one: 'one',
        two: 'two'
      },
      two: {
        one: {
          one: 'one'
        },
        two: 2
      }
    }
  }

  var obj3 = {
    one: {
      one: {
        one: 'one',
        two: 'two',
        three: 'three'
      },
      two: {
        one: {
          one: 'one'
        },
        two: 2,
        three: [
          { one: { one: '100' } },
          { one: { one: '110' } }
        ]
      }
    }
  }

  var obj4 = {
    one: {
      one: {
        one: 'one',
        two: 'two',
        three: 'three'
      },
      two: {
        one: {
          one: 'one'
        },
        two: 2,
        three: [
          { one: { one: '100' } }
        ]
      }
    }
  }

  t.is(testval(obj1, query), true, 'true obj1')
  t.is(testval(obj2, query), false, 'false obj2')
  t.is(testval(obj3, query), false, 'false in obj3')
  t.is(testval(obj4, query), true, 'true in obj4')
})

test('testval.where({property: primative})', function () {
  var arr = [
    { num: 1 }, { num: 2 }, { num: 3 }
  ]
  t.is(arr.some(testval.where({ num: 2 })), true)
  t.is(arr.some(testval.where({ num: 4 })), false)
  t.same(arr.filter(testval.where({ num: 2 })), [ { num: 2 } ])
  t.same(arr.filter(testval.where({ num: 4 })), [])
})