// tjholowaychuk callsite
/*
  Access to v8's "raw" `CallSite`s. Because you can do weird, stupid, clever, wacky things

    var stack = require('callsite');

    foo();

    function foo() {
      bar();
    }

    function bar() {
      baz();
    }

    function baz() {
      stack()
    }

    baz in /Volumes/BigStor/Developer/tmp/tmp/mix/idx20.js:15
    bar in /Volumes/BigStor/Developer/tmp/tmp/mix/idx20.js:10
    foo in /Volumes/BigStor/Developer/tmp/tmp/mix/idx20.js:6
    anonymous in /Volumes/BigStor/Developer/tmp/tmp/mix/idx20.js:3
    Module._compile in module.js:397
    Module._extensions..js in module.js:404
    Module.load in module.js:343
    Module._load in module.js:300
    Module.runMain in module.js:429
    startup in node.js:139

*/

module.exports = function () {
  var orig = Error.prepareStackTrace

  Error.prepareStackTrace = function (_, stack) {
    return stack
  }

  var err = new Error
  Error.captureStackTrace(err, arguments.callee)
  var stack = err.stack
  Error.prepareStackTrace = orig

  return stack
}
