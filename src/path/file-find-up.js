// find-pkg <https://github.com/jonschlinkert/find-pkg>
// Copyright (c) 2015, Jon Schlinkert.

'use strict'

var fs = require('fs');
var path = require('path');
var resolve = require('./lookup/resolve-dir');
var exists = require('../file/exists');
var cwd = process.cwd();

/**
 * Find a file, starting with the given directory
 */

module.exports = function(filename, cwd, limit, cb) {
  if (typeof cwd === 'function') {
    cb = cwd;
    cwd = null;
  }

  if (typeof limit === 'function') {
    cb = limit;
    limit = Infinity;
  }

  var dir = cwd ? resolve(cwd) : '.';
  var n = 0;

  (function find(dir, next) {
    var fp = path.resolve(dir, filename);

    exists(fp, function(exists) {
      n++;

      if (exists) {
        next(null, fp);
        return;
      }

      if (n >= limit || dir === path.sep || dir === '.') {
        next();
        return;
      }

      find(path.dirname(dir), next);
    });
  }(dir, cb));
};

module.exports.sync = function(filename, cwd, limit) {
  var dir = cwd ? resolve(cwd) : '.';
  var fp = path.join(dir, filename);
  var n = 0;

  if (exists(fp)) {
    return path.resolve(fp);
  }

  if (limit === 0) return null;

  while ((dir = path.dirname(dir))) {
    n++;

    var filepath = path.resolve(dir, filename);
    if (exists(filepath)) {
      return filepath;
    }

    if (n >= limit || dir === '.' || dir === path.sep) {
      return;
    }
  }
};
