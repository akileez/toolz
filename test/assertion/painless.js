var setAsap        = require('../../src/process/set-asap')
var minimist       = require('../../src/process/minimist')
var tap            = require('./reporters/tap')
var dot            = require('./reporters/dot')
var spec           = require('./reporters/spec')
var mspec          = require('./reporters/mspec')
var none           = require('./reporters/none')
var createHarness  = require('./lib/create-harness')
var claim          = require('./claim')
var chai           = require('./chai')
var chaiAsPromised = require('./chai/chai-as-promised');
var sinon          = require('./sinon')
var path           = require('path')

var canExit = typeof process !== 'undefined'
  && process && typeof process.exit === 'function'

/* istanbul ignore next */
var argv = canExit ? minimist(process.argv.slice(2), {
  boolean: ['async'],
  alias: {
    a: 'async',
    b: 'bunch',
    r: 'reporter',
    t: 'tap'
  }
}) : {};

/**
  @deprecated
 */
/* istanbul ignore next */
if (argv.tap) {
  argv.reporter = 'tap';
}

var reporters = {
  dot   : dot,
  tap   : tap,
  spec  : spec,
  mspec : mspec,
  none  : none
};

chai.use(chaiAsPromised)

var harness = createHarness();

// Allow browser runners to control painless, like karma
/* istanbul ignore next  */
if (typeof window === 'object' && window && window.__PAINLESS__) {
  window.__PAINLESS__.push(harness);
} else {
  setAsap(function asap() {
    var groupOutput = harness.run(argv);
    var processOutput;
    var reporter;
    if (argv.reporter) {
      if (reporters[argv.reporter]) {
        reporter = reporters[argv.reporter];
      } else {
        reporter = require(argv.reporter.indexOf('.') === 0 ? path.resolve(process.cwd(), argv.reporter) : argv.reporter);
      }
      processOutput = reporter(groupOutput);
    } else {
      processOutput = mspec(groupOutput);
    }


    var hasError = false;
    groupOutput.on('data', function onData(info) {
      if (info.type === 'end' && info.data.errors.length) {
        hasError = true;
      }
    });

    /* istanbul ignore else */
    if (canExit) {
      groupOutput.on('end', function onEnd() {
        process.exit(hasError ? 1 : 0);
      });
      processOutput.pipe(process.stdout);
    } else {
      processOutput.on('data', function onInfo(result) {
        console.log(result); // eslint-disable-line no-console
      });
    }
  });
}

// Ignore coverage, this is just in case there is an error in painless. Not testable
/* istanbul ignore next */
if (canExit) {
  process.on('unhandledRejection', function onUnhandled(reason) {
    console.error('Unhandled Rejection:', reason.stack); // eslint-disable-line no-console
  });
}

module.exports.createGroup = harness.createGroup
module.exports.chai = chai
module.exports.assert = claim
module.exports.assert.claim = claim
module.exports.assert.chai = chai.assert
module.exports.expect = chai.expect
module.exports.spy = sinon.spy
module.exports.stub = sinon.stub
module.exports.mock = sinon.mock
module.exports.sinon = sinon
