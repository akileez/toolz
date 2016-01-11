/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isArray = require('../lang/isArray');

module.exports = function isObject(o) {
  return o != null && typeof o === 'object' && !isArray(o);
};