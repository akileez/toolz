// Copyright (c) 2014 Mathias Buus (MIT)
// https://github.com/mafintosh/end-of-stream

var once = require('./once')

function noop () {}

function isRequest (stream) {
  return stream.setHeader && typeof stream.abort === 'function'
}

function isChildProcess (stream) {
  return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
}

function eos (stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts)
  if (!opts) opts = {}

  callback = once(callback || noop)

  var ws = stream._writableState
  var rs = stream._readableState
  var readable = opts.readable || (opts.readable !== false && stream.readable)
  var writable = opts.writable || (opts.writable !== false && stream.writable)

  function onlegacyfinish () {
    if (!stream.writable) onfinish()
  }

  function onfinish () {
    writable = false
    if (!readable) callback()
  }

  function onend () {
    readable = false
    if (!writable) callback()
  }

  function onexit (exitCode) {
    callback(exitCode ? new Error('exited with error code: ' + exitCode) : null)
  }

  function onclose () {
    if (readable && !(rs && rs.ended)) return callback(new Error('premature close'))
    if (writable && !(ws && ws.ended)) return callback(new Error('premature close'))
  }

  function onrequest () {
    stream.req.on('finish', onfinish)
  }

  if (isRequest(stream)) {
    stream.on('complete', onfinish)
    stream.on('abort', onclose)
    if (stream.req) onrequest()
    else stream.on('request', onrequest)
  } else if (writable && !ws) { // legacy streams
    stream.on('end', onlegacyfinish)
    stream.on('close', onlegacyfinish)
  }

  if (isChildProcess(stream)) stream.on('exit', onexit)

  stream.on('end', onend)
  stream.on('finish', onfinish)
  if (opts.error !== false) stream.on('error', callback)
  stream.on('close', onclose)

  return function() {
    stream.removeListener('complete', onfinish)
    stream.removeListener('abort', onclose)
    stream.removeListener('request', onrequest)
    if (stream.req) stream.req.removeListener('finish', onfinish)
    stream.removeListener('end', onlegacyfinish)
    stream.removeListener('close', onlegacyfinish)
    stream.removeListener('finish', onfinish)
    stream.removeListener('exit', onexit)
    stream.removeListener('end', onend)
    stream.removeListener('error', callback)
    stream.removeListener('close', onclose)
  }
}

module.exports = eos