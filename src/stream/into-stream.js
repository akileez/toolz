// https://github.com/sindresorhus/into-stream
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)

'use strict';
var from = require('from2');

module.exports = function (x) {
  return from(function (size, cb) {
    if (x.length === 0) {
      cb(null, null);
      return;
    }

    if (Array.isArray(x)) {
      cb(null, x.shift());
      return;
    }

    var chunk = x.slice(0, size);
    x = x.slice(size);
    cb(null, chunk);
  });
};

module.exports.obj = function (x) {
  return from.obj(function (size, cb) {
    if (Array.isArray(x)) {
      if (x.length === 0) {
        cb(null, null);
        return;
      }

      cb(null, x.shift());
      return;
    }

    this.push(x);
    cb(null, null);
  });
};