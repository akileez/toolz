/*!
 * read-source-stream <https://github.com/tunnckoCore/read-source-stream>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var path = require('path')
var exists = require('path-exists')
var through2 = require('through2')
var simpleGet = require('simple-get')
var isObject = require('is-real-object')

module.exports = function readSourceStream (fp, opts) {
  if (typeof fp !== 'string') {
    throw new TypeError('read-source-stream expect `fp` be string')
  }
  opts = isObject(opts) ? opts : {}

  var cwd = opts.cwd || process.cwd()
  var filepath = path.join(cwd, fp)

  if (exists.sync(filepath)) {
    return fs.createReadStream(filepath, opts)
  }
  if (/^\/\//.test(fp)) {
    fp = 'http:' + fp
  }
  if (!/http(?:s)?:\/\//.test(fp)) {
    fp = 'http://' + fp
  }

  var stream = through2()
  opts.url = opts.url || fp // may leads to hacks?
  simpleGet(opts, function (err, res) {
    if (err) return stream.emit('error', err)
    res.pipe(stream)
  })

  return stream
}