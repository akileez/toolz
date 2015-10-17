// adopted from: tesuto <https://github.com/dgellow/tesuto>
// copyright (c) Samuel El-Borai <samuel.elborai@gmail.com> (MIT)

// tiny test reporting

var clrz = require('../util/colorz')
var assert = require('./assert')

var countTotal = 0
var countSucc  = 0
var countFail  = 0


console.log('\n', clrz.underline(clrz.yellow('Tests:')), '\n')


function report (name, fn) {
  assert(typeof name === 'string', 'The description must be a string')
  assert(typeof fn === 'function', 'The test must be a function')
  try {
    countTotal += 1
    fn()
    process.stdout.write(clrz.green('  ✔  '))
    process.stdout.write(clrz.magenta(name + '\n'))
    countSucc += 1
  } catch (err) {
    var match = err.stack.match(new RegExp(
      'at.+' + module.parent.filename + ':(\\d+):(\\d+)'
    ))
    var line = match[1]
    var char = match[2]
    countFail += 1
    process.stdout.write(clrz.red('  ✖  '))
    process.stdout.write(clrz.magenta(name + ' '))
    console.log(clrz.red('FAILED') + ' ' + clrz.blue(line + ':' + char))
    console.log(clrz.red('     ' + err.message))
    console.error(clrz.grey(err.stack))
    console.log()
  }
}

function result () {
  console.log('\n', clrz.underline(clrz.yellow('Result:')), '\n')
  // console.log(
  //   clrz.green(countSucc),
  //   clrz.cyan('out of'),
  //   clrz.magenta(countTotal),
  //   clrz.cyan('tests passed')
  // )
  console.log('  ' + clrz.magenta(countTotal) + ' total')
  console.log('  ' + clrz.green(countSucc) + ' passed')
  process.stdout.write('  '
    + (countFail == 0 ? clrz.green(countFail) : clrz.red(countFail))
    + ' failed'
    + '\n'
  )
}

module.exports = report
module.exports.result = result
