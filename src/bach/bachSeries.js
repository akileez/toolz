var asyncDone = require('./asyncDone')
var nowAndLater = require('./nowAndLater')
var last = require('') // make last function
var initial = require('') // make initial function

var helpers = require('./helpers')

function buildSeries () {
  var args = helpers.verifyArguments(arguments)
  var extensions = helpers.getExtensions(last(args))

  if (extensions) args = initial(args)

  function series (done) {
    nowAndLater.mapSeries(args, asyncDone, extensions, done)
  }

  return series
}

module.exports = buildSeries
