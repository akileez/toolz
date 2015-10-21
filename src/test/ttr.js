// adopted from: tesuto <https://github.com/dgellow/tesuto>
// copyright (c) Samuel El-Borai <samuel.elborai@gmail.com> (MIT)

// ttr -- tiny test reporting

// async functions? maybe. but doubt it if everything runs well inside present setup
// promise functions? same as above.

var clrz = require('../util/colorz')
var assert = require('./assert')
var slice = require('../array/slice')

var countTotal = 0
var countSucc  = 0
var countFail  = 0

var nl = '\n'
var s1 = ' '
var s4 = '    '
var succ = '  ✔ '
var fail = '  ✖ '

var udl = clrz.underline
var yel = clrz.yellow
var red = clrz.red
var blu = clrz.blue
var grn = clrz.green
var mag = clrz.magenta
var gry = clrz.grey

function log () {
  var args = slice(arguments).join(' ') + '\n'
  process.stdout.write(args)
}

log(nl, udl(yel('Tests:')), nl)

function report (name, fn) {
  assert(typeof name === 'string', 'The description must be a string')
  assert(typeof fn === 'function', 'The test must be a function')

  try {
    countTotal += 1
    fn()
    log(grn(succ), mag(name))
    countSucc += 1
  } catch (err) {
    var match = err.stack.match(new RegExp(
      'at.+' + module.parent.filename + ':(\\d+):(\\d+)'
    ))
    var line = match[1]
    var char = match[2]
    countFail += 1
    log(red(fail), mag(name), red('FAILED'), blu(line + ':' + char))
    // if err.message is multiple lines, you must deal with the formatting
    // of the message. cross that bridge when I come to it.
    log(s4, red(err.message))
    log(gry(err.stack), nl)
  }
}

function result () {
  log(nl, udl(yel('Result:')), nl)
  log(s1, mag(countTotal), 'total')
  log(s1, grn(countSucc), 'passed')
  log(s1, (countFail == 0 ? grn(countFail) : red(countFail)), 'failed')
}

module.exports = report
module.exports.result = result
