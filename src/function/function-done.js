'use strict';

var domain = require('domain');

var eos = require('../stream/end-of-stream');
var setAsap = require('../process/set-asap');
var co = require('../generator/co');
var once = require('../glob/glob/once');
var exhaust = require('../stream/exhaust');

var eosConfig = {
  error: false
};

function functionDone(fn, cb) {
  var paramCount = fn.length;
  cb = once(cb);

  var d = domain.create();
  d.once('error', onError);
  var domainBoundFn = d.bind(fn);

  function done() {
    d.removeListener('error', onError);
    d.exit();
    return cb.apply(null, arguments);
  }

  function onSuccess(result) {
    return done(null, result);
  }

  function onError(error) {
    return done(error);
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