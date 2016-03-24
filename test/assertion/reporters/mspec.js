// var chalk = require('../../../../util/colorz');
var clrz = require('../../util/colorz')
var map = require('../../array/map')
var diff = require('../variable-diff');
var figures = require('../../string/figures');
var helper = require('../report-helper');
// var INDENT = '  ';

// Color Assignment
var udl = clrz.underline
var yel = clrz.yellow
var red = clrz.red
var blu = clrz.blue
var grn = clrz.green
var mag = clrz.magenta
var gry = clrz.grey
// Formatting
var nl = '\n'
var s1 = ' '
var s2 = '  '
var s4 = '    '
// var succ = s2 + figures.tick + s1 // '  ✔ '
// var fail = s2 + figures.cross + s1 // '  ✖ '
var succ = figures.tick
var fail = figures.cross

function indentLine (line) {
  return s4 + s4 + gry(line)
}

// function indentLine(line) {
//   return INDENT + '    ' + line;
// }

function handleTest (test) {
  var text
  var time = gry(s1 + test.time +  'ms')
  var output = []

  if (test.success) text = grn(succ)
  else  text = red(fail)

  output.push(s2 + text + s2 + test.name + time + nl)

  if (test.error) {
    output.push(s4 + s2 + red(test.error.message) + nl)

    if (test.error.actual && test.error.expected) {
      output.push(map(diff(test.error.expected, test.error.actual).text.split('\n'), indentLine).join('\n') + '\n')
    }

    output.push(map(test.error.stack.split('\n'), indentLine).join('\n') + '\n')
  }

  return output.join('')
}

// function handleTest(test) {
//   var text;
//   var time = chalk.grey(' ' + test.time +  'ms');
//   var output = [];

//   if (test.success) {
//     text = chalk.green(figures.tick);
//   } else {
//     text = chalk.red(figures.cross);
//   }
//   output.push(INDENT + text + ' ' +  test.name + time + '\n');

//   if (test.error) {
//     output.push(INDENT + '   ' + test.error.message + '\n');
//     if (test.error.actual && test.error.expected) {
//       output.push(diff(test.error.expected, test.error.actual).text.split('\n').map(indentLine).join('\n') + '\n');
//     }
//     output.push(test.error.stack.split('\n').map(indentLine).join('\n') + '\n');
//   }

//   return output.join('');
// }

function handleGroupStart(info) {
  return info.name ? (nl + mag(info.name) + nl) : nl
}

// function handleGroupStart(info) {
//   return info.name ? ('\n' + info.name + '\n') : '\n';
// }

function handleEnd(info) {
  var output = []

  output.push(nl + nl)
  // output.push(s2 + udl(yel('Results')) + nl + nl)
  output.push(s2 + info.testCount + ' tests\n')
  output.push(s2 + grn((info.testCount - info.errors.length) + ' passed\n'))

  if (info.errors.length) {
    output.push(s2 + red(info.errors.length + ' failed\n'))
  } else {
    output.push('\n' + s2 + grn('Pass!\n'))
  }

  output.push(nl + '  time elapsed:' + s1 + gry(info.time + 'ms\n'))
  return output.join('')
}

// function handleEnd(info) {
//   var output = [];

//   output.push('\n\n'  + INDENT + chalk.grey(info.time + 'ms total\n'));
//   output.push(INDENT + info.testCount + ' tests\n');
//   output.push(INDENT + chalk.green((info.testCount - info.errors.length) + ' passed\n'));
//   if (info.errors.length) {
//     output.push(INDENT + chalk.red(info.errors.length + ' failed\n'));
//   } else {
//     output.push('\n' + INDENT + chalk.green('Pass!\n'));
//   }

//   return output.join('');
// }

module.exports = helper({
  'group.start' : handleGroupStart,
  'test.end'    : handleTest,
  'end'         : handleEnd
})
