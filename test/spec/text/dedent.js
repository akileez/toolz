'use strict'

const painless = require('../../assertion/painless')
const test = painless.createGroup('Test text/dedent')
const t = painless.assert
const expect = painless.expect

const dd = require('../../../src/text/dedent')

test('works without interpolation', () => {
  const result = dd`first
                    second
                    third`

  t.is(result, 'first\nsecond\nthird')
})

test('works with interpolation', () => {
  const result = dd`first ${'line'}
                    ${'second'}
                    third`

  t.is(result, 'first line\nsecond\nthird')
})

test('works with suppressed newlines', () => {
  const result = dd`first \
                    ${'second'}
                    third`

  t.is(result, 'first second\nthird')
})

test('works with blank first line', () => {
  const result = dd`
  Some text that I might want to indent:
    * reasons
    * fun
  That's all.
  `

  t.is(result,
    'Some text that I might want to indent:\n' +
    '  * reasons\n' +
    '  * fun\n' +
    'That\'s all.')
})

test('works with multiple blank first lines', () => {
  const result = dd`


                    first
                    second
                    third`

  t.is(result, 'first\nsecond\nthird')
})

test('works with removing same number of spaces', () => {
  const result = dd`
                    first
                        second
                           third
                    `

  t.is(result, 'first\nsecond\n   third')
})


const expected = 'A single line of input.'

test('works with single line input', () => {
  const result = dd`A single line of input.`
  t.is(result, expected)
})

test('works with single line and closing backtick on newline', () => {
  const result = dd`
  A single line of input.
  `

  t.is(result, expected)
})

test('works with single line and inline closing backtick', () => {
  const result = dd`
  A single line of input.`

  t.is(result, expected)
})

test('can be used as a function', () => {
  const arg = `
  A test argument.
  `

  t.is(dd(arg), 'A test argument.')
})

test('escapes backticks', () => {
  t.is(dd`\``, '`')
})

test('doesn\'t strip exlicit newlines', () => {
  const result = dd`
  <p>Hello world!</p>\n
  `

  t.is(result, '<p>Hello world!</p>\n')
})

test('doesn\'t strip exlicit newlines with mindent', () => {
  const result = dd`
    <p>
      Hello world!
    </p>\n
  `

  t.is(result, '<p>\n  Hello world!\n</p>\n')
})


  test('should work with tabs', () => {
    expect(dd`Line #1
      Line #2
      Line #3`).to.equal('Line #1\nLine #2\nLine #3');

    expect(dd`Line #${1}
      Line #${2}
      Line #${3}`).to.equal('Line #1\nLine #2\nLine #3');

    expect(dd`${1}. line #${1}
      ${2}. line #${2}
      ${3}. line`).to.equal('1. line #1\n2. line #2\n3. line');
  });

  test('should work with spaces', () => {
    expect(dd`Line #1
            Line #2
            Line #3`).to.equal('Line #1\nLine #2\nLine #3');

    expect(dd`Line #${1}
            Line #${2}
            Line #${3}`).to.equal('Line #1\nLine #2\nLine #3');

    expect(dd`${1}. line #${1}
            ${2}. line #${2}
            ${3}. line`).to.equal('1. line #1\n2. line #2\n3. line');
  });

  test('should remove leading/trailing line break', () => {
    expect(
      dd`
      Line #1
      Line #2
      Line #3
      `
    ).to.equal('Line #1\nLine #2\nLine #3');

    expect(
      dd`
      Line #${1}
      Line #${2}
      Line #${3}
      `
    ).to.equal('Line #1\nLine #2\nLine #3');

    expect(
      dd`
      ${1}. line #${1}
      ${2}. line #${2}
      ${3}. line
      `
    ).to.equal('1. line #1\n2. line #2\n3. line');
  });

test('should not remove more than one leading/trailing line break', () => {
  expect(
    dd`
    Line #1
    Line #2
    Line #3
    `
  ).to.equal('Line #1\nLine #2\nLine #3');

  expect(
    dd`
    Line #${1}
    Line #${2}
    Line #${3}
    `
  ).to.equal('Line #1\nLine #2\nLine #3');

  expect(
    dd`
    ${1}. line #${1}
    ${2}. line #${2}
    ${3}. line
    `
  ).to.equal('1. line #1\n2. line #2\n3. line');
});

test('should remove the same number of tabs/spaces from each line', () => {
  expect(dd`
    Line #1
      Line #2
        Line #3
    `
  ).to.equal('Line #1\nLine #2\n  Line #3');

  expect(
    dd`
    Line #${1}
      Line #${2}
        Line #${3}
    `
  ).to.equal('Line #1\nLine #2\n  Line #3');

  expect(
    dd`
    ${1}. line #${1}
      ${2}. line #${2}
        ${3}. line
    `
  ).to.equal('1. line #1\n2. line #2\n  3. line');
});

test('should ignore the last line if it doesn\'t contain anything else than whitespace', () => {
  expect(
    function () {
      return dd`
        Line #1
        Line #2
        Line #3
      `;
    }()
  ).to.equal('Line #1\nLine #2\nLine #3');

  expect(
    function () {
      return dd`
        Line #${1}
        Line #${2}
        Line #${3}
      `;
    }()
  ).to.equal('Line #1\nLine #2\nLine #3');

  expect(
    function () {
      return dd`
        ${1}. line #${1}
        ${2}. line #${2}
        ${3}. line
      `;
    }()
  ).to.equal('1. line #1\n2. line #2\n3. line');
});
