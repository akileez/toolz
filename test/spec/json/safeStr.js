var memo = require('../../../src/path/memo')
var root = require('../../../src/path/find-root')

var cwd = memo(root())
var src = cwd('src')
var tsa = cwd('test/assertion')
// var tss = cwd('test/spec')

var painless = require(`${tsa()}/painless`)
var test = painless.createGroup('Test json/safeStr')
var expect = painless.expect

var circular = require(`${src()}/json/safeStr`)

test('should stringify circular reference', function (done) {
  var a = {undef: undefined}
  var b = {a: a}
  a.b = b
  var str = JSON.stringify(a, circular())
  var obj = JSON.parse(str)
  expect(obj.b.a).to.eql('[Circular]')
  done()
})

test('should stringify circular reference (ref function)', function (done) {
  function ref (value) {
    return value.toString()
  }
  var a = {undef: undefined, toString: function () {
    return '#a'
  }}
  var b = {a: a}
  a.b = b
  var str = JSON.stringify(a, circular(ref))
  var obj = JSON.parse(str)
  expect(obj.b.a).to.eql('#a')
  done()
})

test('should stringify reference to function', function (done) {
  function ref (value) {
    return value.toString()
  }
  var a = {undef: undefined, toString: function () {
    return '#a'
  }}
  var b = {a: a, foo: function bar () {}}
  a.b = b
  var str = JSON.stringify(a, circular(ref, true))
  var obj = JSON.parse(str)
  expect(obj.b.a).to.eql('#a')
  expect(obj.b.foo).to.be.a('string')
  expect(obj.b.foo).to.eql('function bar() {}')
  done()
})

test('should stringify helper', function (done) {
  var a = {undef: undefined}
  var b = {a: a}
  a.b = b
  var str = circular.stringify(a)
  var obj = JSON.parse(str)
  expect(obj.b.a).to.eql('[Circular]')
  done()
})
