var painless = require('../../assertion/painless')
var test = painless.createGroup('Test text/abbrev')
var t = painless.assert

var abbrev = require('../../../src/text/abbrev')

test('test one', function () {
  t.same(abbrev('ruby', 'rules'), {
    rub: 'ruby',
    ruby: 'ruby',
    rul: 'rules',
    rule: 'rules',
    rules: 'rules'
  })
})

test('test two', function () {
  t.same(abbrev('fool', 'foom', 'pool', 'pope'), {
    fool: 'fool',
    foom: 'foom',
    poo: 'pool',
    pool: 'pool',
    pop: 'pope',
    pope: 'pope'
  })
})

test('test three', function () {
  t.same(abbrev('a', 'ab', 'abc', 'abcd', 'abcde', 'acde'), {
    a: 'a',
    ab: 'ab',
    abc: 'abc',
    abcd: 'abcd',
    abcde: 'abcde',
    ac: 'acde',
    acd: 'acde',
    acde: 'acde'
  })
})
