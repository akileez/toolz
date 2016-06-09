// adopted from: claim <https://github.com/kevva/claim/blob/master/index.js>
// Copyright (c) Kevin Mårtensson <kevinmartensson@gmail.com> (MIT)

// tta -- tiny test assertion

var assert = require('assert')
var AssertionError = assert.AssertionError

function create (val, expected, operator, msg, fn) {
  return {
    actual: val,
    expected: expected,
    message: msg,
    operator: operator,
    stackStartFunction: fn
  }
}

function test (ok, opts) {
  if (!ok) throw new AssertionError(opts)
}

function pass (msg) {
  test(true, create(true, true, 'pass', msg, pass))
}

function fail (msg) {
  test(false, create(false, false, 'fail', msg, fail))
}

function ok (val, msg) {
  test(val, create(val, true, '==', msg, ok))
}

function notOk (val, msg) {
  test(!val, create(val, true, '==', msg, notOk))
}

function isTrue (val, msg) {
  test(val === true, create(val, true, '===', msg, isTrue))
}

function isFalse (val, msg) {
  test(val === false, create(val, false, '===', msg, isFalse))
}

function eq (val, expected, msg) {
  test(val == expected, create(val, expected, '==', msg, eq))
}

function ne (val, expected, msg) {
  test(val != expected, create(val, expected, '!=', msg, ne))
}

function is (val, expected, msg) {
  test(val === expected, create(val, expected, '===', msg, is))
}

function not (val, expected, msg) {
  test(val !== expected, create(val, expected, '!==', msg, not))
}

function same (val, expected, msg) {
  try {
    assert.deepEqual(val, expected, msg)
  } catch (err) {
    test(false, create(val, expected, '!==', msg, same))
  }
}

function notSame (val, expected, msg) {
  try {
    assert.notDeepEqual(val, expected, msg)
  } catch (err) {
    test(false, create(val, expected, '!==', msg, notSame))
  }
}

function throws (fn, err, msg) {
  try {
    assert.throws(fn, err, msg)
  } catch (err) {
    test(false, create(err.actual, err.expected, err.operator, err.message, throws))
  }
}

function doesNotThrow (fn, msg) {
  try {
    assert.doesNotThrow(fn, msg)
  } catch (err) {
    test(false, create(err.actual, err.expected, err.operator, err.message, doesNotThrow))
  }
}

function regexTest (contents, regex, msg) {
  test(regex.test(contents), create(regex, contents, '===', msg, regexTest))
}

function ifError (err, msg) {
  test(!err, create(err, 'Error', '!==', msg, ifError))
}

module.exports = {
  pass: pass,
  fail: fail,
  ok: ok,
  assert: ok,
  notOk: notOk,
  truthy: ok,
  falsy: notOk,
  true: isTrue,
  false: isFalse,
  eq: eq,
  ne: ne,
  is: is,
  equal: is,
  not: not,
  isnt: not,
  same: same,
  deepEqual: same,
  notSame: notSame,
  diff: notSame,
  throws: throws,
  doesNotThrow: doesNotThrow,
  regexTest: regexTest,
  matches: regexTest,
  ifError: ifError,
  ifErr: ifError
}
