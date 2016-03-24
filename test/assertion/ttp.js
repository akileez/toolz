// adopted from: tt <https://github.com/isaacs/tt>
// Copyright (c) Isaac Z. Schlueter and Contributors (ISC)

// tiny-test-protocol (tiny node-tap lookalike)
// why dupe? learning!
//    incorporate assert into test framework
//    async framework
//    use %d and %s which I never use
//    another reason to use toolz
//    get better understanding of testing from a different viewpoint
//    its small and basic
//    its ttr and tta combined which is what I planned to do

var assert = require('assert')
var map    = require('../array/map')
var reduce = require('../array/reduce2')
var keys   = require('../object/keys')

var tests = []
var ran = false
var id = 0
var fail = 0
var pass = 0

function test (name, fn) {
  tests.push([name, fn])
  if (ran) return
  ran = true
  process.nextTick(run)
}

// my backwards-arse chaining method.
var t = reduce(map(keys(assert), function (k) {
    if (typeof assert[k] !== 'function') return
    return [k, function () {
      var s = null
      id++
      try {
        assert[k].apply(assert, arguments)
        pass++
        console.log('ok %d %s', id, k)
        console.log('')
      } catch (e) {
        fail++
        // ignore everything up to the run() function
        Error.captureStackTrace(e, t[k])
        s = e.stack
        if (s) {
          s = s.trim().split(/\n/)
          // bottom two frames are nextTick and this file
          s.pop()
          s.pop()
        }

        if (s && !e.message)
          e.message = s[0]

        console.log('not ok %d %s', id, s ? s.shift() : e.message)
        if (s && s.length) {
          s = map(s, function (s) {
            return s.trim() + '\n'
          })
          console.log('# ' + s.join('# '))
        }
        console.log('')
      }
    }]
  }), {}, function (set, kv) {
  set[kv[0]] = kv[1]
  return set
})

t.pass = function (m) {
  t.ok(true, m)
}

t.fail = function (m) {
  t.ok(false, m)
}

t.comment = function (m) {
  console.log('# %s\n', m.replace(/^#\s*/, ''))
}

t.end = run

var children = []
t.test = function (name, fn) {
  children.push([name, fn])
}

function run () {
  if (children.length) {
    tests.unshift.apply(tests, children)
    children.length = 0
  }

  var next = tests.shift()
  if (!next) {
    console.log('1..%d', id)
    console.log('')
    console.log('# pass %d/%d', pass, pass + fail)
    console.log('# fail %d/%d', fail, pass + fail)
    process.exit(fail)
    return
  }

  var name = next[0]
  var fn = next[1]
  console.log('# %s\n', name)
  process.nextTick(function () {
    fn(t)
  })
}

module.exports = test
module.exports.tests = tests