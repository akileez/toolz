// adopted from: https://github.com/valeriangalliat/es6-denodeify

const slice = require('../array/slice')
const apply = require('../function/apply')

/*
  Usage:
    const denodeify = require('es6-denodeify')(Promise)
    const fs = require('fs')
    const readFile = denodeify(fs.readFile)

    readFile('package.json', 'utf8').then(console.log)

  If you have a global Promise constructor and you want es6-denodeify to use it, you can ommit the explicit Promise injection.

    const denodeify = require('es6-denodeify')()

  Original Code:
    export default (PromiseArg=Promise) => f =>
      (...args) =>
        new PromiseArg((resolve, reject) =>
          f(...args, (err, val) => err ? reject(err) : resolve(val))
        )

  Node version:
    module.exports = (PromiseArg=Promise) => fn => (...args) =>
      new PromiseArg((resolve, reject) =>
        fn(...args, (err, val) => err ? reject(err) : resolve(val)))
*/

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
