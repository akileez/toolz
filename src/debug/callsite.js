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

function callsite () {
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

function stack () {
  process.stdout.write('\n')
  callsite().forEach(function(site){
    process.stdout.write(`  \u001b[36m${site.getFunctionName() || 'anonymous'}\u001b[90m in ${site.getFileName()} at line \u001b[32m${site.getLineNumber()}\u001b[0m\n`)
  })
  process.stdout.write('\n')
    // console.log('  \033[36m%s\033[90m in %s at line \033[32m%d\033[0m'
    //   , site.getFunctionName() || 'anonymous'
    //   , site.getFileName()
    //   , site.getLineNumber());
}

module.exports = stack
module.exports.callr = callsite

// module.exports = function () {
//   var orig = Error.prepareStackTrace

//   Error.prepareStackTrace = function (_, stack) {
//     return stack
//   }

//   var err = new Error
//   Error.captureStackTrace(err, arguments.callee)
//   var stack = err.stack
//   Error.prepareStackTrace = orig

//   return stack
// }
