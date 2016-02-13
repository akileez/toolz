// Node and Common JS

module.exports = {
  // enforce return after a callback
  'callback-return': [2, [
    'callback',
    'cb',
    'next',
    'done'
  ]],

  'global-require': 1,

  // enforce error handling in callbacks
  'handle-callback-err': [2, '^(err|error)$'],

  // disallow mixing regular variable and require declarations
  'no-mixed-requires': 2,

  // disallow use of new operator with the require function
  'no-new-require': 2,

  // disallow string concatenation with __dirname and __filename
  'no-path-concat': 2,

  // disallow process.exit()
  'no-process-exit': 2,

  // restrict usage of specified node imports
  'no-restricted-imports': 0,

  // restrict usage of specified node modules
  'no-restricted-modules': 0,

  // disallow use of synchronous methods
  'no-sync': 1
}
