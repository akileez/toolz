// https://github.com/jonschlinkert/filter-files
// Copyright (c) 2014 Jon Schlinkert. (MIT)
'use strict';

var fs = require('fs');
var path = require('path');
var iterate = require('../async/iterate');
var isDir = require('../file/isDirectory');

function filter(files, dir, fn, recurse) {
  if (typeof fn !== 'function') {
    return files;
  }
  return files.filter(function (fp) {
    return fn(fp, dir, files, recurse);
  });
};

function handle(err, next) {
  return (err.code !== 'ENOENT')
    ? next(err)
    : next();
}

module.exports = function lookup (dir, fn, recurse, cb) {
  if (typeof recurse !== 'boolean') {
    cb = recurse;
    recurse = true;
  }
  if (arguments.length === 2) {
    cb = fn;
    fn = null;
  }

  fn = Array.isArray(fn) ? fn : [fn];

  fs.exists(dir, function(exists) {
    if (!exists) {
      return cb(null, []);
    }

    fs.readdir(dir, function(err, files) {
      if (err) {
        return cb(err);
      }

      files = fn.reduce(function(acc, cb) {
        return filter(acc, dir, cb, recurse);
      }, files);

      var res = [];

      iterate.map(files, function(fp, next) {
        fp = path.join(dir, fp);

        fs.stat(fp, function(err, stats) {
          if (err) {
            return handle(err, next);
          }

          if (!stats.isDirectory()) {
            next(null, res.push(fp));
          } else {
            lookup(fp, fn, function(err, matches) {
              res = res.concat(matches);
              next(null, res);
            });
          }
        });
      }, function(err) {
        cb(err, res);
      });
    });
  });
};

module.exports.sync = function lookupSync (dir, fn, recurse) {
  if (typeof dir !== 'string') {
    throw new Error('filter-files expects the first arg to be a string, got: ', typeof dir);
  }

  if (typeof fn !== 'function' && !Array.isArray(fn)) {
    recurse = fn;
    fn = null;
  }

  fn = Array.isArray(fn) ? fn : [fn];

  var res = fn.reduce(function(acc, cb) {
    return filter(acc, dir, cb, recurse);
  }, fs.readdirSync(dir));

  return res.reduce(function (acc, fp) {
      fp = path.join(dir, fp);
      if (isDir(fp) && recurse !== false) {
        acc.push.apply(acc, lookupSync(fp, fn));
      } else {
        acc = acc.concat(fp);
      }
      return acc;
  }, []);
};