// adopted from: https://github.com/valeriangalliat/es6-denodeify

const slice = require('../array/slice')
const apply = require('../function/apply')

module.exports = function denode () {
  // Note to self: this provides the hook from the outsdie function
  var PromiseArg = arguments.length <= 0 || arguments[0] === undefined
    ? Promise
    : arguments[0]

  return function (f) {
    return function () {
      var args = slice(arguments)
      return new PromiseArg((resolve, reject) => {
        return apply(f, null, args.concat([function (err, val) {
          return err ? reject(err) : resolve(val)
        }]))
      })
    }
  }
}
