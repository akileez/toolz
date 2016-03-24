var painless = require('../../assertion/painless')
var test = painless.createGroup('Test text/wordwrap')
var t = painless.assert
var wrap = require('../../../src/text/wordwrap')

var bars = "I'm rapping. I'm rapping. I'm rap rap rapping. I'm rap rap rap rap rappity rapping."

test('simple', function () {
  t.is(
    wrap(bars),
    "I'm rapping. I'm rapping. I'm rap rap rapping. I'm\nrap rap rap rap rappity rapping."
  )
  // t.end(wrap(bars))
})

test('width', function () {
  t.is(
    wrap(bars, { width: 3 }),
    "I'm\nrapping.\nI'm\nrapping.\nI'm\nrap\nrap\nrapping.\nI'm\nrap\nrap\nrap\nrap\nrappity\nrapping."
  )
})

test('ignore', function () {
  t.is(
    wrap(bars, { ignore: "I'm" }),
    "I'm rapping. I'm rapping. I'm rap rap rapping. I'm rap rap rap\nrap rappity rapping."
  )
  // t.end(wrap(bars, { ignore: "I'm" }))
})

test('wrap.lines', function () {
  t.same(
    wrap.lines(bars),
    [ 'I\'m rapping. I\'m rapping. I\'m rap rap rapping. I\'m',
    'rap rap rap rap rappity rapping.' ]
  )
  // t.end(wrap.lines(bars))
})
