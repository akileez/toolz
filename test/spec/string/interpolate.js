var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/interpolate')
var t = painless.assert

var interpolate = require('../../../src/string/interpolate')

test('should replace values', function () {
  t.eq(interpolate('{{a}} ipsum {{b}}', {
    a: 'lorem',
    b: 'dolor'
  }), 'lorem ipsum dolor')

  t.eq(interpolate('{{0}} ipsum {{1}}', ['lorem', 'dolor']), 'lorem ipsum dolor')
})

test('should remove undefined tokens', function () {
  t.eq(interpolate('{{a}}{{b}}{{c}}', {
    a: 'lorem',
    b: 'ipsum'
  }), 'loremipsum')

  t.eq(interpolate('{{0}}{{1}}{{2}}', ['lorem', 'ipsum']), 'loremipsum')
})

test('should allow a different syntax', function () {
  var syntax = /\$\{([^}]+)\}/g

  t.eq(interpolate('${a} ipsum ${b}', {
    a: 'lorem',
    b: 'dolor'
  }, syntax), 'lorem ipsum dolor')

  t.eq(interpolate('${0} ipsum ${1}', ['lorem', 'dolor'], syntax), 'lorem ipsum dolor')
})

test('should treat null as empty string', function () {
  t.is(interpolate('{{a}}', {a: null}), '')
  t.is(interpolate(null, {}), '')
})

test('should treat undefined as empty string', function () {
  t.is(interpolate('{{a}}', {a: void 0}), '')
  t.is(interpolate(null, {}), '')
})

test('should treat false as string "false"', function () {
  t.is(interpolate('{{a}} {{b}}', {a: false, b: true}), 'false true')
})

test('should allow nested replacement objects', function () {
  var replacements = {
    a: {b: {c: 'lorem ipsum'}}
  }

  t.eq(interpolate('{{a.b.c}}', replacements), 'lorem ipsum')
  t.eq(interpolate('{{a.b.d}}', replacements), '')
})

test('should allow nested complex key names', function () {
  var replacements = {
    '-#$&@_': 'foo bar'
  }

  t.eq(interpolate('{{-#$&@_}}', replacements), 'foo bar')
})

test('should allow for nested tokens', function () {
  var obj = {
    a: 'foo',
    b: '{{c}}',
    c: 'baz'
  }

  t.eq(interpolate('{{b}}', obj), 'baz')
})

