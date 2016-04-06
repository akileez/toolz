var chalk = require('../../../src/util/colorz');
var diff = require('../variable-diff');
var figures = require('../../../src/string/FIGURES');
var helper = require('../report-helper');
var INDENT = '  ';

function indentLine(line) {
  return INDENT + '    ' + line;
}

function handleTest(test) {
  var text;
  var time = chalk.grey(' ' + test.time +  'ms');
  var output = [];

  if (test.success) {
    text = chalk.green(figures.tick);
  } else {
    text = chalk.red(figures.cross);
  }
  output.push(INDENT + text + ' ' +  test.name + time + '\n');

  if (test.error) {
    output.push(INDENT + '   ' + test.error.message + '\n');
    if (test.error.actual && test.error.expected) {
      output.push(diff(test.error.expected, test.error.actual).text.split('\n').map(indentLine).join('\n') + '\n');
    }
    output.push(test.error.stack.split('\n').map(indentLine).join('\n') + '\n');
  }

  return output.join('');
}

function handleGroupStart(info) {
  return info.name ? ('\n' + info.name + '\n') : '\n';
}

function handleEnd(info) {
  var output = [];

  output.push('\n\n'  + INDENT + chalk.grey(info.time + 'ms total\n'));
  output.push(INDENT + info.testCount + ' tests\n');
  output.push(INDENT + chalk.green((info.testCount - info.errors.length) + ' passed\n'));
  if (info.errors.length) {
    output.push(INDENT + chalk.red(info.errors.length + ' failed\n'));
  } else {
    output.push('\n' + INDENT + chalk.green('Pass!\n'));
  }

  return output.join('');
}

module.exports = helper({
  'group.start': handleGroupStart,
  'test.end': handleTest,
  'end': handleEnd
});
