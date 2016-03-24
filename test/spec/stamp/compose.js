var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test object/stampit::compose')
var t = painless.assert
var stampit = require('../../src/object/stampit')

// Compose

test('stampit().compose()', () => {
  var closuresCalled = 0;
  const a = stampit({
    methods: {
      method() {
        return false;
      }
    },
    refs: {ref: false},
    init() {
      closuresCalled++;
    },
    props: {prop: false}
  });
  const b = stampit({
    methods: {
      method() {
        return true;
      }
    },
    refs: {ref: true},
    init() {
      closuresCalled++;
    },
    props: {prop: true}
  });
  const d = a.compose(b).create();

  t.ok(d.method() && d.ref && d.prop, 'Last stamp must win.');
  t.is(closuresCalled, 2, 'Each stamp closure must be called.');
});

test('stampit.compose()', () => {
  const a = stampit({
    methods: {
      methodA() {
        return true;
      }
    },
    refs: {refA: true},
    init() {
      const secret = 'a';
      this.getA = () => {
        return secret;
      };
    },
    props: {propA: '1'}
  });
  const b = stampit({
    methods: {
      methodB() {
        return true;
      }
    },
    refs: {refB: true},
    init() {
      const secret = true;
      this.getB = () => {
        return secret;
      };
    },
    props: {propB: '1'}
  });
  const c = stampit({
    methods: {
      methodC() {
        return true;
      }
    },
    refs: {refC: true},
    init() {
      const secret = true;
      this.getC = () => {
        return secret;
      };
    },
    props: {propC: '1'}
  });
  const d = stampit.compose(a, b, c).create();

  t.ok(d.methodA && d.refA && d.getA && d.propA &&
    d.methodB && d.refB && d.getB && d.propB &&
    d.methodC && d.refC && d.getC && d.propC,
    'Should compose all factory prototypes');
});
