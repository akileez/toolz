var asyncDone = require('./asyncDone')
var nowAndLater = require('./nowAndLater')
var last = require('') // make last function
var initial = require('') // make initial function

var helpers = require('./helpers')

function buildParallel () {
  var args = helpers.verifyArguments(arguments)
  var extensions = helpers.getExtensions(last(args))

  if (extensions) args = initial(args)

  function parallel (done) {
    nowAndLater.map(args, asyncDone, extensions, done)
  }

  return parallel
}

module.exports = buildParallel
