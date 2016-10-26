var painless = require('../../assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test object/stampit (basic)')

var stampit = require('../../../src/object/stamp')

// Basics
//

test('.create()', () => {
  const stamp = stampit().methods({
    foo () { return 'foo' }
  })

  t.is(stamp.create().foo(), 'foo',
    'Should produce an object from specified prototypes.')
})

test('.create(options)', () => {
  const stamp = stampit().init((options) => {
    // options is passed in as an array. I need to check this portion of the code.
    t.same(options[0], {foo: 'bar'},
      'Should pass options object to initializer.')
  })
  t.ok(stamp.create)
  stamp.create({foo: 'bar'})
})
