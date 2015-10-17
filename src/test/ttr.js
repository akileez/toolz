// adopted from: tesuto <https://github.com/dgellow/tesuto>
// copyright (c) Samuel El-Borai <samuel.elborai@gmail.com> (MIT)

// tiny test reporting

var clrz = require('../util/colorz')
var assert = require('./assert')

var countTotal = 0
var countSucc  = 0
var countFail  = 0

const nl = '\n'
const s1 = ' '
const s5 = '     '
const succ = '  ✔  '
const fail = '  ✖  '

const udl = clrz.underline
const yel = clrz.yellow
const red = clrz.red
const blu = clrz.blue
const grn = clrz.green
const mag = clrz.magenta
const gry = clrz.grey


console.log(nl, udl(yel('Tests:')), nl)


function report (name, fn) {
  assert(typeof name === 'string', 'The description must be a string')
  assert(typeof fn === 'function', 'The test must be a function')

  try {
    countTotal += 1
    fn()
    process.stdout.write(grn(succ) + mag(name) + nl)
    countSucc += 1
  } catch (err) {
    var match = err.stack.match(new RegExp(
      'at.+' + module.parent.filename + ':(\\d+):(\\d+)'
    ))
    var line = match[1]
    var char = match[2]
    countFail += 1
    process.stdout.write(red(fail) + mag(name) + s1)
    console.log(red('FAILED'), blu(line + ':' + char))
    console.log(red(s5 + err.message))
    console.error(gry(err.stack), nl)
  }
}

function result () {
  console.log(nl, udl(yel('Result:')), nl)
  console.log(s1, mag(countTotal), 'total')
  console.log(s1, grn(countSucc), 'passed')
  console.log(s1, (countFail == 0 ? grn(countFail) : red(countFail)), 'failed')
}

module.exports = report
module.exports.result = result
