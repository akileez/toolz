'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/thunkify')
var t = painless.assert

var thunkify = require('../../../src/function/thunkify')
var fs = require('fs')

test('thunkify(fn) should work when sync', function (done) {
  function read (file, fn) {
    fn(null, 'file: ' + file)
  }

  read = thunkify(read)

  read('foo.txt')(function (err, res) {
    t.assert(!err)
    t.assert(res === 'file: foo.txt')
    done()
  })
})

test('thunkify(fn) should work when async', function (done) {
  function read(file, fn) {
    setTimeout(function () {
      fn(null, 'file: ' + file)
    }, 5)
  }

  read = thunkify(read)

  read('foo.txt')(function (err, res) {
    t.assert(!err)
    t.assert(res === 'file: foo.txt')
    done()
  })
})

test('thunkify(fn) should maintain the receiver', function (done) {
  function load (fn) {
    fn(null, this.name)
  }

  var user = {
    name: 'keith',
    load: thunkify(load)
  }

  user.load()(function (err, name) {
    if (err) return done(err)
    t.assert(name === 'keith')
    done()
  })
})

test('thunkify(fn) should catch errors', function (done) {
  function load (fn) {
    throw new Error('boom')
  }

  load = thunkify(load)

  load()(function (err) {
    t.assert(err)
    t.assert(err.message === 'boom')
    done()
  })
})

test('thunkify(fn) should ignore multiple callbacks', function (done) {
  function load (fn) {
    fn(null, 1)
    fn(null, 2)
    fn(null, 3)
  }

  load = thunkify(load)

  load()(done)
})

test('thunkify(fn) should pass all results', function (done) {
  function read (file, fn) {
    setTimeout(function () {
      fn(null, file[0], file[1])
    }, 5)
  }

  read = thunkify(read)

  read('foo.txt')(function (err, a, b) {
    t.assert(!err)
    t.assert(a === 'f')
    t.assert(b === 'o')
    done()
  })
})

test('thunkify(fn) should work with node methods', function (done) {
  fs.readFile = thunkify(fs.readFile)

  fs.readFile('lint.js')(function (err, buf) {
    t.assert(!err)
    t.assert(Buffer.isBuffer(buf))

    fs.readFile('lint.js', 'utf8')(function (err, str) {
      t.assert(!err)
      t.assert(typeof str === 'string')
      done()
    })
  })
})
