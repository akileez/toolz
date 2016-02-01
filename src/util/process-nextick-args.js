'use strict';

/*
https://github.com/calvinmetcalf/process-nextick-args
Copyright (c) 2015 Calvin Metcalf (MIT)

Always be able to pass arguments to process.nextTick, no matter the platform

var nextTick = require('process-nextick-args');

nextTick(function (a, b, c) {
  console.log(a, b, c);
}, 'step', 3,  'profit');

*/

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn) {
  var args = new Array(arguments.length - 1);
  var i = 0;
  while (i < args.length) {
    args[i++] = arguments[i];
  }
  process.nextTick(function afterTick() {
    fn.apply(null, args);
  });
}