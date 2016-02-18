'use strict';

var helper = require('../report-helper');
var diff = require('../variable-diff');

function handleEnd(info) {
  var ouput = [];
  var errLen = info.errors.length;

  function push(text) {
    ouput.push(text);
  }

  push('\n1..' + info.testCount + '\n');
  push('# tests ' + info.testCount + '\n');
  push('# pass  ' + (info.testCount - errLen) + '\n');
  if (errLen) {
    push('# fail  ' + errLen + '\n');
  }
  push('# time ' + info.time + 'ms\n');
  push('# ' + (info.success ? 'passed' : 'failed') + '!\n');

  return ouput.join('');
}

function createhandleTest() {
  var count = 1;
  return function handleTest(test) {
    var output = [];
    var outer;
    var inner;
    var lines;
    var i;

    function push(text) {
      output.push(text);
    }
    if (count === 1) {
      push('TAP version 13\n');
    }

    push((test.success ? 'ok ' : 'not ok ') + count);
    push(' ' + test.name.toString().replace(/\s+/g, ' ') + '\n');

    if (!test.success) {
      outer = '  ';
      inner = outer + '  ';
      push(outer + '---\n');

      push(inner + 'error: \n');
      inner += '  ';
      push(inner + 'message: ' + test.error.message + '\n');
      if (test.error.actual && test.error.expected) {
        push(inner + 'diff: >\n');
        lines = diff(test.error.expected, test.error.actual).text.split('\n');
        for (i = 0; i < lines.length; i++) {
          push(inner + '  ' + lines[i] + '\n');
        }
      }
      if (test.error.stack) {
        lines = String(test.error.stack).split('\n');
        push(inner + 'stack:\n');
        for (i = 0; i < lines.length; i++) {
          push(inner + '  ' +  lines[i] + '\n');
        }
      }

      push(outer + '...\n');
    }
    count++;

    return output.join('');
  };
}

module.exports = helper({
  'test.end': createhandleTest(),
  'end': handleEnd
});
