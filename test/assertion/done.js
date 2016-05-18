'use strict';

var domain = require('domain');

var eos = require('../../src/stream/end-of-stream');
var setAsap = require('../../src/process/set-asap');
var co = require('../../src/generator/co'); // co-with-promise
var once = require('../../src/glob/glob/once');
var exhaust = require('../../src/stream/exhaust');

var eosConfig = {
  error: false
};

function functionDone(fn, cb) {
  var paramCount = fn.length;
  cb = once(cb);

  var d = domain.create();
  var calledCb = false
  d.once('error', onError);
  var domainBoundFn = d.bind(fn);

  function done() {
    // Avoid calling callback twice
    if (calledCb) return;

    var args = arguments;

    d.removeListener('error', onError);
    d.exit();
    calledCb = true;
    cb.apply(null, args);
  }

  function onSuccess(result) {
    done(null, result);
  }

  function onError(error) {
    done(error);
  }

  function asyncRunner() {
    var result = domainBoundFn(done);

    function onNext(state) {
      onNext.state = state;
    }

    function onCompleted() {
      return onSuccess(onNext.state);
    }

    if (result) {
      if (typeof result.on === 'function') {

        // Assume node stream
        d.add(result);
        eos(exhaust(result), eosConfig, done);
        return;
      }

      if (typeof result.subscribe === 'function') {

        // Compat with RX and ES Observables
        result.subscribe({
          next: onNext,
          error: onError,
          complete: onCompleted,
          onNext: onNext,
          onError: onError,
          onCompleted: onCompleted
        });
        return;
      }

      if (typeof result.then === 'function') {

        // Assume promise
        result.then(onSuccess, onError);
        return;
      }

      if (typeof result.next === 'function' && typeof result.throw === 'function') {

        // Assume generator
        co(result).then(onSuccess, onError);
        return;
      }
    }


    if (paramCount === 0) {
      onSuccess(result);
    }
  }

  setAsap(asyncRunner);
}

module.exports = functionDone;