'use strict';

module.exports = function (str) {
  var reAstral = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

  return stripAnsi(str).replace(reAstral, ' ').length;
};

function stripAnsi (str) {
  return typeof str === 'string' ? str.replace(ansiRegex(), '') : str;
};

function ansiRegex () {
  return /\u001b\[(?:[0-9]{1,3}(?:;[0-9]{1,3})*)?[m|K]/g;
};