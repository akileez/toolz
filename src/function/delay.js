var slice = require('../array/slice')
// the base implementation of mout.js "timeout" without a given context

// delay(displayToConsoleLog, 1000, 'hello', 'world')
// function displayToConsoleLog(text1, text2) {console.log(text1, text2)}

function delay (fn, wait, args) {
  args = slice(arguments, 2)
  return setTimeout(function () {
    fn.apply(undefined, args)
  }, wait)
}

module.exports = delay
