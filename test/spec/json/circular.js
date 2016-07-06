var memo = require('../../../src/path/memo')
var root = require('../../../src/path/find-root')

var cwd = memo(root())
var src = cwd('src')
var tsa = cwd('test/assertion')
var tss = cwd('test/spec')

var painless = require(`${tsa()}/painless`)
var test = painless.createGroup('Test json/circular')
var t = painless.assert

var dc = require(`${src()}/json/circular`)

test('should destroy circular references', function () {
  var obj = {}
  var child = { parent: obj }
  obj.child = child

  var destroyed = dc(obj)
  t.eq(typeof destroyed, 'object')
  t.eq(destroyed.child.parent, '[Circular]')
})

test('should not affect the original object', function () {
  var obj = {}
  var child = { parent: obj }
  obj.child = child

  var destroyed = dc(obj)
  t.assert(destroyed != obj)
  t.assert(obj.child.parent == obj)
})

test('should only destroy parent references', function () {
  var obj = {}
  var common = { thing: obj }
  obj.one = { firstThing: common }
  obj.two = { secondThing: common }

  var d = dc(obj)
  t.assert(typeof d.one.firstThing == 'object')
  t.assert(typeof d.two.secondThing == 'object')
  t.eq(d.one.firstThing.thing, '[Circular]')
  t.eq(d.two.secondThing.thing, '[Circular]')
})

test('should work on arrays', function () {
  var obj = {}
  var common = [obj]
  var x = [common]
  var y = [
    ['test'], common
  ]
  y[0][1] = y
  obj.a = { x: x }
  obj.b = { y: y }

  var d = dc(obj)
  t.assert(Array.isArray(d.a.x))
  t.eq(d.a.x[0][0], '[Circular]')
  t.eq(d.b.y[0][0], 'test')
  t.eq(d.b.y[1][0], '[Circular]')
  t.eq(d.b.y[0][1], '[Circular]')
})
