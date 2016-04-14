var painless = require('../../assertion/painless')
var test = painless.createGroup('Test text/cli-columns')
var t = painless.assert

var columns = require('../../../src/text/cli-columns')
var clr = require('../../../src/util/colorz')

function stripAnsi (str) {
  return typeof str === 'string' ? str.replace(ansiRegex(), '') : str
}

function ansiRegex () {
  return /\u001b\[(?:[0-9]{1,3}(?:;[0-9]{1,3})*)?[m|K]/g
}

test('should print one column list', () => {
  var cols = columns(['foo', ['bar', 'baz'], ['bat', 'qux']], {
    width: 1
  });

  var expected =
    'bar\n' +
    'bat\n' +
    'baz\n' +
    'foo\n' +
    'qux';

  t.is(cols, expected);
});

test('should print three column list', () => {
  var cols = columns(['foo', ['bar', 'baz'], ['bat', 'qux']], {
    width: 16
  });

  var expected =
    'bar  baz  qux  \n' +
    'bat  foo  ';

  t.is(cols, expected);
});

test('should print complex list', () => {
  var cols = columns(
    [
      'foo', 'bar', 'baz',
      clr.cyan('嶜憃撊') + ' 噾噿嚁',
      'blue' + clr.bgBlue('berry'),
      clr.red('apple'), 'pomegranate',
      'durian', clr.green('star fruit'),
      'apricot', 'banana pineapple'
    ],
    {
      width: 80
    }
  );

  // Visual test
  console.log(clr.yellow(cols) + '\n');

  var expected =
    'apple             bar               durian            star fruit        \n' +
    'apricot           baz               foo               嶜憃撊 噾噿嚁     \n' +
    'banana pineapple  blueberry         pomegranate       ';

  t.is(stripAnsi(cols), expected);
});