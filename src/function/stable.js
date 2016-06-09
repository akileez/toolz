// stable-fn <https://github.com/sindresorhus/stable-fn>
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)

'use strict'

/*
  Ensure a function is stable, meaning the same input always produces the same output.
  Useful for stress testing functions in unit tests to ensure behavior is consistent.

  API:
  stableFn([count], fn)
  Returns a boolean whether the output of fn was stable. by default false
  is passed as the first arg via bind. TRUE will result if the function returns
  a constant output. FASLE if not.

  stableFn.val([count], fn)
  Returns the first differing output of fn or the first output if stable. by
  default, true is passed as the first arg (val) via bind

  @val [Boolean]:: passed via bind
  @count [Number]:: 1000 Number of times to call the fn
  @fn [Function] Function to be tested

  my ah-ha moment for `bind`.
  essentially you want to bind a context and any arguments passed to a function
  which will be called at a later time with possibly additional arguments
  (almost like a curried function), within an entirely different
  context/function/module/situation which said context is different.
*/

function stable (val, count, fn) {
  if (fn === undefined) {
    fn = count
    count = 1000
  }

  var current;
  var first = fn()
  var i = 0

  while (++i < count) {
    current = fn()
    if (current !== first) return val ? current : false
  }

  return val ? first : true
}

module.exports = stable.bind(null, false)
module.exports.val = stable.bind(null, true)
