/*
  https://github.com/tmpfs/circular
  Copyright (c) 2014 Freeform Systems (MIT)

  Utility to safely stringify objects with circular references.

  Replace all circular references with the string [Circular];

    var circular = require('circular');
    var obj = {}; var child = {parent: obj}; obj.child = child;
    var str = JSON.stringify(obj, circular());
    // => {"child":{"parent":"[Circular]"}}

  If you prefer you can pass an alternative string to use:

    var str = JSON.stringify(obj, circular('#ref'));

  Or a function that returns a string:

    function ref(value){return '' + value};
    var str = JSON.stringify(obj, circular(ref));

  As of version 1.0.4 you can also pass an additional boolean that will convert function references to strings, useful for converting javascript modules to couchdb design documents.

    var str = JSON.stringify(obj, circular(null, true));

*/

function circular (ref, methos) {
  ref = ref || '[Circular]'
  var seen = []

  return function (key, val) {
    if (typeof val === 'function' && methos) val = val.toString()
    if (!val || typeof (val) !== 'object') return val
    if (~seen.indexOf(val)) {
      if (typeof ref === 'function') return ref(val)
      return ref
    }

    seen.push(val)
    return val
  }
}

function stringify (obj, indent, ref, methos) {
  return JSON.stringify(obj, circular(ref, methos), indent)
}

module.exports = circular
module.exports.stringify = stringify
