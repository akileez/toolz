var painless = require('../../assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test object/stampit (basic)')

var stampit = require('../../../src/object/stamp')

// Basics
//

test('.create()', () => {
  const stamp = stampit({ methods: {
    foo() { return 'foo'; }
  }});

  t.is(stamp.create().foo(), 'foo',
    'Should produce an object from specified prototypes.');
});

