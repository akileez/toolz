'use strict';

module.exports = (function () {
  if (typeof process === 'undefined') return '/'
  if (!process) return '/'
  if (typeof process.cwd !== 'function') return '/'
  return process.cwd()
}())
