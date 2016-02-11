/**
 * Stylistic Issues
 */
module.exports = {
  // enforce spacing inside array brackets
  'array-bracket-spacing': 2,

  // disallow or enforce spaces inside of single line blocks
  'block-spacing': [2, 'always'],

  // enforce one true brace style
  'brace-style': [2,
    '1tbs', {
    'allowSingleLine': true
  }],

  // require camel case names
  'camelcase': [2, {
    'properties': 'never'
  }],

  // enforce spacing before and after comma
  'comma-spacing': [2, {
    'before': false,
    'after': true
  }],

  // enforce one true comma style
  'comma-style': [2, 'last'],

  // require or disallow padding inside computed properties
  'computed-property-spacing': 2,

  // enforce consistent naming when capturing the current execution context
  'consistent-this': 2,

  // enforce newline at the end of file, with no multiple empty lines
  'eol-last': 2,

  // require function expressions to have a name
  'func-names': 1,

  // enforce use of function declarations or expressions
  'func-style': 0,

  // require identifiers to match the provided regular expression
  'id-match': 2,

  // specify tab or space width for your code
  'indent': [2, 2, {'SwitchCase': 1}],
  // specify whether double or single quotes should be used in JSX attributes
  'jsx-quotes': [2, 'prefer-double'],

  // enforce spacing between keys and values in object literal properties
  'key-spacing': [2, {
    'beforeColon': false,
    'afterColon': true
  }],

  // enforce empty lines around comments
  'lines-around-comment': 2,

  // disallow mixed 'LF' and 'CRLF' as linebreaks
  'linebreak-style': 2,

  // specify the maximum depth callbacks can be nested
  'max-nested-callbacks': 2,

  // require a capital letter for constructors
  'new-cap': [2, {
    'newIsCap': true,
    'capIsNew': false
  }],

  // disallow the omission of parentheses when invoking a constructor with no arguments
  'new-parens': 2,

  // require or disallow an empty newline after variable declarations
  'newline-after-var': 0,

  // disallow use of the Array constructor
  'no-array-constructor': 2,

  // disallow use of the continue statement
  'no-continue': 2,

  // disallow comments inline after code
  'no-inline-comments': 2,

  // disallow if as the only statement in an else block
  'no-lonely-if': 2,

  // disallow mixed spaces and tabs for indentation
  'no-mixed-spaces-and-tabs': 2,

  // disallow multiple empty lines
  'no-multiple-empty-lines': [2, {
    'max': 2
  }],

  // disallow nested ternary expressions
  'no-nested-ternary': 2,

  // disallow negated conditions
  'no-negated-condition': 2,

  // disallow the use of the Object constructor
  'no-new-object': 2,

  // disallow use of certain syntax in code
  'no-restricted-syntax': [2, 'WithStatement'],

  // disallow space between function identifier and application
  'no-spaced-func': 2,

  // disallow the use of ternary operators
  'no-ternary': 0,

  // disallow trailing whitespace at the end of lines
  'no-trailing-spaces': 2,

  // disallow dangling underscores in identifiers
  'no-underscore-dangle': 0,

  // disallow the use of Boolean literals in conditional expressions
  'no-unneeded-ternary': 2,

  // require or disallow padding inside curly braces
  'object-curly-spacing': 2,

  // require or disallow one variable declaration per function
  'one-var': [2, {
    'uninitialized': 'always',
    'initialized': 'never'
  }],

  // require assignment operator shorthand where possible or prohibit it entirely
  'operator-assignment': 2,

  // enforce operators to be placed before or after line breaks
  'operator-linebreak': 2,

  // enforce padding within blocks
  'padded-blocks': [2, 'never'],

  // require quotes around object literal property names
  'quote-props': [2, 'consistent-as-needed'],

  // specify whether backticks, double or single quotes should be used
  'quotes': [2, 'single', 'avoid-escape'],

  // require JSDoc comment
  'require-jsdoc': 0,

  // enforce spacing before and after semicolons
  'semi-spacing': [2, {
    'before': false,
    'after': true
  }],

  // require or disallow use of semicolons instead of ASI
  'semi': [2, 'always'],

  // sort variables within the same declaration block
  'sort-vars': 2,

  // require a space after certain keywords
  'space-after-keywords': 2,

  // require a space before certain keywords
  'space-before-keywords': 2,

  // require or disallow a space before blocks
  'space-before-blocks': 2,

  // require or disallow a space before function opening parenthesis
  'space-before-function-paren': [2, 'never'],

  // require or disallow spaces inside parentheses
  'space-in-parens': 2,

  // require spaces around operators
  'space-infix-ops': 2,

  // require a space after return, throw, and case
  'space-return-throw-case': 2,

  // require or disallow spaces before/after unary operators
  'space-unary-ops': 2,

  // require or disallow a space immediately following the // or /* in a comment
  'spaced-comment': [2, 'always', {
    'exceptions': ['-', '+'],
    'markers': ['=', '!'] // space here to support sprockets directives
  }],

  // require regex literals to be wrapped in parentheses
  'wrap-regex': 2
};