// https://github.com/jmversteeg/extrakt
// MIT © JM Versteeg

'use strict';

const gunzipMaybe = require('./gunzip-maybe')
const fstream     = require('../file/fstream')
const pify        = require('../async/pify')
const mkdirp      = pify(require('../file/mkdirp'))
const which       = pify(require('../file/which'))

// rewired in test
let exec = require('child-process-promise').exec
let tar  = require('./tar-fs')

// Extract .tar and .tar.gz using the system's binary (fast!), with a javascript fallback (portable!)

let hasBinaryTar = function () {
  if (process.platform === 'win32')
    return Promise.reject()
  else return which('tar')
};

const extrakt = function (archive, extractTo) {
  return hasBinaryTar()
    .then(() => true, () => false)
    .then(hasTar => {
      return hasTar
        ? extrakt.system(archive, extractTo)
        : extrakt.native(archive, extractTo)
    })
}

extrakt.system = function (archive, extractTo) {
  return mkdirp(extractTo)
    .then(() => exec(['tar', '-xvf', archive, '-C', extractTo].join(' ')))
}

extrakt.native = function (archive, extractTo) {
  let extract = tar.extract(extractTo)

  fstream
    .Reader(archive)
    .pipe(gunzipMaybe())
    .pipe(extract)

  return new Promise((resolve, reject) => {
    extract.on('finish', resolve)
    extract.on('error', reject)
  })
}

module.exports = extrakt
