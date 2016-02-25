// https://github.com/exponentjs/exists-async
// Copyright (c) 2015 Exponent (MIT)

var fs = require('fs')

// Present a Promise-based interface for testing if something exists or not

function promiseExists (pth) {
  return new Promise(function (resolve, reject) {
    fs.access(pth, fs.F_OK, function (err, result) {
      if (err) {
        if (err.toString().match(/^Error: ENOENT:/)) {
          resolve(false)
        } else {
          reject(err)
        }
      } else {
        resolve(true)
      }
    })
  })
}

module.exports = promiseExists
