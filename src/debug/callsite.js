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
      console.log();
      stack().forEach(function(site){
        console.log('  \033[36m%s\033[90m in %s:%d\033[0m'
          , site.getFunctionName() || 'anonymous'
          , site.getFileName()
          , site.getLineNumber());
      });
      console.log();
    }

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
