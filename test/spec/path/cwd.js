var painless = require('../../assertion/painless')
var test = painless.createGroup('Test path/cwd')
var t = painless.assert

var path = require('path')
var cwd = require('../../../src/path/cwd')
var normalize = require('../../../src/glob/normalize-path')
var contains = require('../../../src/string/contains')

function absolute(fp) {
  return normalize(path.join(process.cwd(), fp || ''))
}


test('should return the absolute filepath to the cwd', function() {
  t.eq(normalize(cwd()), absolute())
  t.eq(normalize(cwd('')), absolute())
  t.eq(normalize(cwd(process.cwd())), absolute())

  if (contains(process.cwd(), 'spec')) {
    t.eq(normalize(cwd(__dirname)), absolute())
  }
})

test('should return the absolute filepath to the given file', function() {
  t.eq(normalize(cwd('package.json')), absolute('package.json'))

  if (contains(process.cwd(), 'spec')) {
    t.eq(normalize(cwd(__filename)), absolute('cwd.js'))
  }
})

test('should work with multiple arguments', function() {
  t.eq(normalize(cwd('.', 'package.json')), absolute('package.json'))
})

test('should return the absolute path relative to the cwd', function() {
  t.eq(normalize(cwd('fixtures', 'a', 'b', 'c')), absolute('fixtures/a/b/c'))
})
