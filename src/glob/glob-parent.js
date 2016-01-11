'use strict';

var path = require('path');
var isglob = require('./is-glob')

function globParent (str) {
  str += 'a' // preserves full path in case of trailing path separator
  do {str = path.dirname(str)} while (isglob(str))
  return str
}

module.exports = globParent
