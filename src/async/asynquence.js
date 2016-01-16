/*! asynquence-contrib
    v0.24.0 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

var ASQ   = require('./aseq')

module.exports = (function DEF(ASQ){
  "use strict";

  var ARRAY_SLICE = Array.prototype.slice,
    ø = Object.create(null),
    brand = "__ASQ__",
    schedule = ASQ.__schedule,
    tapSequence = ASQ.__tapSequence
  ;

  function wrapGate(api,fns,success,failure,reset) {
    fns = fns.map(function $$map(v,idx){
      var def;
      // tap any directly-provided sequences immediately
      if (ASQ.isSequence(v)) {
        def = { seq: v };
        tapSequence(def);
        return function $$fn(next) {
          def.seq.val(function $$val(){
            success(next,idx,ARRAY_SLICE.call(arguments));
          })
          .or(function $$or(){
            failure(next,idx,ARRAY_SLICE.call(arguments));
          });
        };
      }
      else {
        return function $$fn(next) {
          var args = ARRAY_SLICE.call(arguments);
          args[0] = function $$next() {
            success(next,idx,ARRAY_SLICE.call(arguments));
          };
          args[0].fail = function $$fail() {
            failure(next,idx,ARRAY_SLICE.call(arguments));
          };
          args[0].abort = function $$abort() {
            reset();
          };
          args[0].errfcb = function $$errfcb(err) {
            if (err) {
              failure(next,idx,[err]);
            }
            else {
              success(next,idx,ARRAY_SLICE.call(arguments,1));
            }
          };

          v.apply(ø,args);
        };
      }
    });

    api.then(function $$then(){
      var args = ARRAY_SLICE.call(arguments);

      fns.forEach(function $$each(fn){
        fn.apply(ø,args);
      });
    });
  }

  function isPromise(v) {
    var val_type = typeof v;

    return (
      v !== null &&
      (
        val_type == "object" ||
        val_type == "function"
      ) &&
      !ASQ.isSequence(v) &&
      // NOTE: `then` duck-typing of promises is stupid
      typeof v.then == "function"
    );
  }

// "after"
ASQ.extend("after",function $$extend(api,internals){
  return function $$after(num) {
    var orig_args = arguments.length > 1 ?
      ARRAY_SLICE.call(arguments,1) :
      void 0
    ;
    num = +num || 0;

    api.then(function $$then(done){
      var args = orig_args || ARRAY_SLICE.call(arguments,1);

      setTimeout(function $$set$timeout(){
        done.apply(ø,args);
      },num);
    });

    return api;
  };
});

ASQ.after = function $$after() {
  return ASQ().after.apply(ø,arguments);
};
// "any"
ASQ.extend("any",function $$extend(api,internals){
  return function $$any() {
    if (internals("seq_error") || internals("seq_aborted") ||
      arguments.length === 0
    ) {
      return api;
    }

    var fns = ARRAY_SLICE.call(arguments);

    api.then(function $$then(done){
      function reset() {
        finished = true;
        error_messages.length = 0;
        success_messages.length = 0;
      }

      function complete(trigger) {
        if (success_messages.length > 0) {
          // any successful segment's message(s) sent
          // to main sequence to proceed as success
          success_messages.length = fns.length;
          trigger.apply(ø,success_messages);
        }
        else {
          // send errors into main sequence
          error_messages.length = fns.length;
          trigger.fail.apply(ø,error_messages);
        }

        reset();
      }

      function success(trigger,idx,args) {
        if (!finished) {
          completed++;
          success_messages[idx] =
            args.length > 1 ?
            ASQ.messages.apply(ø,args) :
            args[0]
          ;

          // all segments complete?
          if (completed === fns.length) {
            finished = true;

            complete(trigger);
          }
        }
      }

      function failure(trigger,idx,args) {
        if (!finished &&
          !(idx in error_messages)
        ) {
          completed++;
          error_messages[idx] =
            args.length > 1 ?
            ASQ.messages.apply(ø,args) :
            args[0]
          ;
        }

        // all segments complete?
        if (!finished &&
          completed === fns.length
        ) {
          finished = true;

          complete(trigger);
        }
      }

      var completed = 0, error_messages = [], finished = false,
        success_messages = [],
        sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1))
      ;

      wrapGate(sq,fns,success,failure,reset);

      sq.pipe(done);
    });

    return api;
  };
});
// "errfcb"
ASQ.extend("errfcb",function $$extend(api,internals){
  return function $$errfcb() {
    // create a fake sequence to extract the callbacks
    var sq = {
      val: function $$then(cb){ sq.val_cb = cb; return sq; },
      or: function $$or(cb){ sq.or_cb = cb; return sq; }
    };

    // trick `seq(..)`s checks for a sequence
    sq[brand] = true;

    // immediately register our fake sequence on the
    // main sequence
    api.seq(sq);

    // provide the "error-first" callback
    return function $$errorfirst$callback(err) {
      if (err) {
        sq.or_cb(err);
      }
      else {
        sq.val_cb.apply(ø,ARRAY_SLICE.call(arguments,1));
      }
    };
  };
});
// "failAfter"
ASQ.extend("failAfter",function $$extend(api,internals){
  return function $$failAfter(num) {
    var args = arguments.length > 1 ?
      ARRAY_SLICE.call(arguments,1) :
      void 0
    ;
    num = +num || 0;

    api.then(function $$then(done){
      setTimeout(function $$set$timeout(){
        done.fail.apply(ø,args);
      },num);
    });

    return api;
  };
});

ASQ.failAfter = function $$fail$after() {
  return ASQ().failAfter.apply(ø,arguments);
};
// "first"
ASQ.extend("first",function $$extend(api,internals){
  return function $$first() {
    if (internals("seq_error") || internals("seq_aborted") ||
      arguments.length === 0
    ) {
      return api;
    }

    var fns = ARRAY_SLICE.call(arguments);

    api.then(function $$then(done){
      function reset() {
        error_messages.length = 0;
      }

      function success(trigger,idx,args) {
        if (!finished) {
          finished = true;

          // first successful segment triggers
          // main sequence to proceed as success
          trigger(
            args.length > 1 ?
            ASQ.messages.apply(ø,args) :
            args[0]
          );

          reset();
        }
      }

      function failure(trigger,idx,args) {
        if (!finished &&
          !(idx in error_messages)
        ) {
          completed++;
          error_messages[idx] =
            args.length > 1 ?
            ASQ.messages.apply(ø,args) :
            args[0]
          ;

          // all segments complete without success?
          if (completed === fns.length) {
            finished = true;

            // send errors into main sequence
            error_messages.length = fns.length;
            trigger.fail.apply(ø,error_messages);

            reset();
          }
        }
      }

      var completed = 0, error_messages = [], finished = false,
        sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1))
      ;

      wrapGate(sq,fns,success,failure,reset);

      sq.pipe(done);
    });

    return api;
  };
});
// "ASQ.iterable()"
"use strict";

(function IIFE() {
  var template;

  ASQ.iterable = function $$iterable() {
    function throwSequenceErrors() {
      throw sequence_errors.length === 1 ? sequence_errors[0] : sequence_errors;
    }

    function notifyErrors() {
      var fn;

      seq_tick = null;

      if (seq_error) {
        if (or_queue.length === 0 && !error_reported) {
          error_reported = true;
          throwSequenceErrors();
        }

        while (or_queue.length > 0) {
          error_reported = true;
          fn = or_queue.shift();
          try {
            fn.apply(ø, sequence_errors);
          } catch (err) {
            if (checkBranding(err)) {
              sequence_errors = sequence_errors.concat(err);
            } else {
              sequence_errors.push(err);
            }
            if (or_queue.length === 0) {
              throwSequenceErrors();
            }
          }
        }
      }
    }

    function val() {
      if (seq_error || seq_aborted || arguments.length === 0) {
        return sequence_api;
      }

      var args = ARRAY_SLICE.call(arguments).map(function mapper(arg) {
        if (typeof arg != "function") return function $$val() {
          return arg;
        };else return arg;
      });

      val_queue.push.apply(val_queue, args);

      return sequence_api;
    }

    function or() {
      if (seq_aborted || arguments.length === 0) {
        return sequence_api;
      }

      or_queue.push.apply(or_queue, arguments);

      if (!seq_tick) {
        seq_tick = schedule(notifyErrors);
      }

      return sequence_api;
    }

    function pipe() {
      if (seq_aborted || arguments.length === 0) {
        return sequence_api;
      }

      ARRAY_SLICE.call(arguments).forEach(function $$each(fn) {
        val(fn).or(fn.fail);
      });

      return sequence_api;
    }

    function next() {
      if (seq_error || seq_aborted || val_queue.length === 0) {
        if (val_queue.length > 0) {
          $throw$("Sequence cannot be iterated");
        }
        return { done: true };
      }

      try {
        return { value: val_queue.shift().apply(ø, arguments) };
      } catch (err) {
        if (ASQ.isMessageWrapper(err)) {
          $throw$.apply(ø, err);
        } else {
          $throw$(err);
        }

        return {};
      }
    }

    function $throw$() {
      if (seq_error || seq_aborted) {
        return sequence_api;
      }

      sequence_errors.push.apply(sequence_errors, arguments);
      seq_error = true;
      if (!seq_tick) {
        seq_tick = schedule(notifyErrors);
      }

      return sequence_api;
    }

    function $return$(val) {
      if (seq_error || seq_aborted) {
        val = void 0;
      }

      abort();

      return { done: true, value: val };
    }

    function abort() {
      if (seq_error || seq_aborted) {
        return;
      }

      seq_aborted = true;

      clearTimeout(seq_tick);
      seq_tick = null;
      val_queue.length = or_queue.length = sequence_errors.length = 0;
    }

    function duplicate() {
      var isq;

      template = {
        val_queue: val_queue.slice(),
        or_queue: or_queue.slice()
      };
      isq = ASQ.iterable();
      template = null;

      return isq;
    }

    // opt-out of global error reporting for this sequence
    function defer() {
      or_queue.push(function $$ignored() {});
      return sequence_api;
    }

    // ***********************************************
    // Object branding utilities
    // ***********************************************
    function brandIt(obj) {
      Object.defineProperty(obj, brand, {
        enumerable: false,
        value: true
      });

      return obj;
    }

    var sequence_api,
        seq_error = false,
        error_reported = false,
        seq_aborted = false,
        seq_tick,
        val_queue = [],
        or_queue = [],
        sequence_errors = [];

    // ***********************************************
    // Setup the ASQ.iterable() public API
    // ***********************************************
    sequence_api = brandIt({
      val: val,
      then: val,
      or: or,
      pipe: pipe,
      next: next,
      "throw": $throw$,
      "return": $return$,
      abort: abort,
      duplicate: duplicate,
      defer: defer
    });

    // useful for ES6 `for..of` loops,
    // add `@@iterator` to simply hand back
    // our iterable sequence itself!
    sequence_api[typeof Symbol == "function" && Symbol.iterator || "@@iterator"] = function $$iter() {
      return sequence_api;
    };

    // templating the iterable-sequence setup?
    if (template) {
      val_queue = template.val_queue.slice(0);
      or_queue = template.or_queue.slice(0);
    }

    // treat ASQ.iterable() constructor parameters as having been
    // passed to `val()`
    sequence_api.val.apply(ø, arguments);

    return sequence_api;
  };
})();// "last"
ASQ.extend("last",function $$extend(api,internals){
  return function $$last() {
    if (internals("seq_error") || internals("seq_aborted") ||
      arguments.length === 0
    ) {
      return api;
    }

    var fns = ARRAY_SLICE.call(arguments);

    api.then(function $$then(done){
      function reset() {
        finished = true;
        error_messages.length = 0;
        success_messages = null;
      }

      function complete(trigger) {
        if (success_messages != null) {
          // last successful segment's message(s) sent
          // to main sequence to proceed as success
          trigger(
            success_messages.length > 1 ?
            ASQ.messages.apply(ø,success_messages) :
            success_messages[0]
          );
        }
        else {
          // send errors into main sequence
          error_messages.length = fns.length;
          trigger.fail.apply(ø,error_messages);
        }

        reset();
      }

      function success(trigger,idx,args) {
        if (!finished) {
          completed++;
          success_messages = args;

          // all segments complete?
          if (completed === fns.length) {
            finished = true;

            complete(trigger);
          }
        }
      }

      function failure(trigger,idx,args) {
        if (!finished &&
          !(idx in error_messages)
        ) {
          completed++;
          error_messages[idx] =
            args.length > 1 ?
            ASQ.messages.apply(ø,args) :
            args[0]
          ;
        }

        // all segments complete?
        if (!finished &&
          completed === fns.length
        ) {
          finished = true;

          complete(trigger);
        }
      }

      var completed = 0, error_messages = [], finished = false,
        sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1)),
        success_messages
      ;

      wrapGate(sq,fns,success,failure,reset);

      sq.pipe(done);
    });

    return api;
  };
});
// "map"
ASQ.extend("map",function $$extend(api,internals){
  return function $$map(pArr,pEach) {
    if (internals("seq_error") || internals("seq_aborted")) {
      return api;
    }

    api.seq(function $$seq(){
      var tmp, args = ARRAY_SLICE.call(arguments),
        arr = pArr, each = pEach;

      // if missing `map(..)` args, use value-messages (if any)
      if (!each) each = args.shift();
      if (!arr) arr = args.shift();

      // if arg types in reverse order (each,arr), swap
      if (typeof arr === "function" && Array.isArray(each)) {
        tmp = arr;
        arr = each;
        each = tmp;
      }

      return ASQ.apply(ø,args)
      .gate.apply(ø,arr.map(function $$map(item){
        return function $$segment(){
          each.apply(ø,[item].concat(ARRAY_SLICE.call(arguments)));
        };
      }));
    })
    .val(function $$val(){
      // collect all gate segment output into one value-message
      // Note: return a normal array here, not a message wrapper!
      return ARRAY_SLICE.call(arguments);
    });

    return api;
  };
});
// "none"
ASQ.extend("none",function $$extend(api,internals){
  return function $$none() {
    if (internals("seq_error") || internals("seq_aborted") ||
      arguments.length === 0
    ) {
      return api;
    }

    var fns = ARRAY_SLICE.call(arguments);

    api.then(function $$then(done){
      function reset() {
        finished = true;
        error_messages.length = 0;
        success_messages.length = 0;
      }

      function complete(trigger) {
        if (success_messages.length > 0) {
          // any successful segment's message(s) sent
          // to main sequence to proceed as **error**
          success_messages.length = fns.length;
          trigger.fail.apply(ø,success_messages);
        }
        else {
          // send errors as **success** to main sequence
          error_messages.length = fns.length;
          trigger.apply(ø,error_messages);
        }

        reset();
      }

      function success(trigger,idx,args) {
        if (!finished) {
          completed++;
          success_messages[idx] =
            args.length > 1 ?
            ASQ.messages.apply(ø,args) :
            args[0]
          ;

          // all segments complete?
          if (completed === fns.length) {
            finished = true;

            complete(trigger);
          }
        }
      }

      function failure(trigger,idx,args) {
        if (!finished &&
          !(idx in error_messages)
        ) {
          completed++;
          error_messages[idx] =
            args.length > 1 ?
            ASQ.messages.apply(ø,args) :
            args[0]
          ;
        }

        // all segments complete?
        if (!finished &&
          completed === fns.length
        ) {
          finished = true;

          complete(trigger);
        }
      }

      var completed = 0, error_messages = [], finished = false,
        sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1)),
        success_messages = []
      ;

      wrapGate(sq,fns,success,failure,reset);

      sq.pipe(done);
    });

    return api;
  };
});
// "pThen"
ASQ.extend("pThen",function $$extend(api,internals){
  return function $$pthen(success,failure) {
    if (internals("seq_aborted")) {
      return api;
    }

    var ignore_success_handler = false, ignore_failure_handler = false;

    if (typeof success === "function") {
      api.then(function $$then(done){
        if (!ignore_success_handler) {
          var ret, msgs = ASQ.messages.apply(ø,arguments);
          msgs.shift();

          if (msgs.length === 1) {
            msgs = msgs[0];
          }

          ignore_failure_handler = true;

          try {
            ret = success(msgs);
          }
          catch (err) {
            if (!ASQ.isMessageWrapper(err)) {
              err = [err];
            }
            done.fail.apply(ø,err);
            return;
          }

          // returned a sequence?
          if (ASQ.isSequence(ret)) {
            ret.pipe(done);
          }
          // returned a message wrapper?
          else if (ASQ.isMessageWrapper(ret)) {
            done.apply(ø,ret);
          }
          // returned a promise/thenable?
          else if (isPromise(ret)) {
            ret.then(done,done.fail);
          }
          // just a normal value to pass along
          else {
            done(ret);
          }
        }
        else {
          done.apply(ø,ARRAY_SLICE.call(arguments,1));
        }
      });
    }
    if (typeof failure === "function") {
      api.or(function $$or(){
        if (!ignore_failure_handler) {
          var ret, msgs = ASQ.messages.apply(ø,arguments), smgs,
            or_queue = ARRAY_SLICE.call(internals("or_queue"))
          ;

          if (msgs.length === 1) {
            msgs = msgs[0];
          }

          ignore_success_handler = true;

          // NOTE: if this call throws, that'll automatically
          // be handled by core as we'd want it to be
          ret = failure(msgs);

          // if we get this far:
          // first, inject return value (if any) as
          // next step's sequence messages
          smgs = internals("sequence_messages");
          smgs.length = 0;
          if (typeof ret !== "undefined") {
            if (!ASQ.isMessageWrapper(ret)) {
              ret = [ret];
            }
            smgs.push.apply(smgs,ret);
          }

          // reset internal error state, because we've exclusively
          // handled any errors up to this point of the sequence
          internals("sequence_errors").length = 0;
          internals("seq_error",false);
          internals("then_ready",true);

          // temporarily empty the or-queue
          internals("or_queue").length = 0;

          // make sure to schedule success-procession on the chain
          api.val(function $$val(){
            // pass thru messages
            return ASQ.messages.apply(ø,arguments);
          });

          // at next cycle, reinstate the or-queue (if any)
          if (or_queue.length > 0) {
            schedule(function $$schedule(){
              api.or.apply(ø,or_queue);
            });
          }
        }
      });
    }
    return api;
  };
});

// "pCatch"
ASQ.extend("pCatch",function $$extend(api,internals){
  return function $$pcatch(failure) {
    if (internals("seq_aborted")) {
      return api;
    }

    api.pThen(void 0,failure);

    return api;
  };
});
// "race"
ASQ.extend("race",function $$extend(api,internals){
  return function $$race() {
    if (internals("seq_error") || internals("seq_aborted") ||
      arguments.length === 0
    ) {
      return api;
    }

    var fns = ARRAY_SLICE.call(arguments)
    .map(function $$map(v){
      var def;
      // tap any directly-provided sequences immediately
      if (ASQ.isSequence(v)) {
        def = { seq: v };
        tapSequence(def);
        return function $$fn(done) {
          def.seq.pipe(done);
        };
      }
      else return v;
    });

    api.then(function $$then(done){
      var args = ARRAY_SLICE.call(arguments);

      fns.forEach(function $$each(fn){
        fn.apply(ø,args);
      });
    });

    return api;
  };
});
// "runner"
ASQ.extend("runner",function $$extend(api,internals){

  return function $$runner() {
    if (internals("seq_error") || internals("seq_aborted") ||
      arguments.length === 0
    ) {
      return api;
    }

    var args = ARRAY_SLICE.call(arguments);

    api
    .then(function $$then(mainDone){

      function wrap(v) {
        // function? expected to produce an iterator
        // (like a generator) or a promise
        if (typeof v === "function") {
          // call function passing in the control token
          // note: neutralize `this` in call to prevent
          // unexpected behavior
          v = v.call(ø,token);

          // promise returned (ie, from async function)?
          if (isPromise(v)) {
            // wrap it in iterable sequence
            v = ASQ.iterable(v);
          }
        }
        // an iterable sequence? duplicate it (in case of multiple runs)
        else if (ASQ.isSequence(v) && "next" in v) {
          v = v.duplicate();
        }
        // wrap anything else in iterable sequence
        else {
          v = ASQ.iterable(v);
        }

        // a sequence to tap for errors?
        if (ASQ.isSequence(v)) {
          // listen for any sequence failures
          v.or(function $$or(){
            // signal iteration-error
            mainDone.fail.apply(ø,arguments);
          });
        }

        return v;
      }

      function addWrapped() {
        iterators.push.apply(
          iterators,
          ARRAY_SLICE.call(arguments).map(wrap)
        );
      }

      function iterateOrQuit(iterFn,now) {
        // still have some co-routine runs to process?
        if (iterators.length > 0) {
          if (now) iterFn();
          else schedule(iterFn);
        }
        // all done!
        else {
          // previous value message?
          if (typeof next_val !== "undefined") {
            // not a message wrapper array?
            if (!ASQ.isMessageWrapper(next_val)) {
              // wrap value for the subsequent `apply(..)`
              next_val = [next_val];
            }
          }
          else {
            // nothing to affirmatively pass along
            next_val = [];
          }

          // signal done with all co-routine runs
          mainDone.apply(ø,next_val);
        }
      }

      var iterators = args,
        token = {
          messages: ARRAY_SLICE.call(arguments,1),
          add: addWrapped
        },
        iter, ret, next_val = token
      ;

      // map co-routines to round-robin list of iterators
      iterators = iterators.map(wrap);

      // async iteration of round-robin list
      (function iterate(){
        // get next co-routine in list
        iter = iterators.shift();

        // process the iteration
        try {
          // multiple messages to send to an iterable
          // sequence?
          if (ASQ.isMessageWrapper(next_val) &&
            ASQ.isSequence(iter)
          ) {
            ret = iter.next.apply(iter,next_val);
          }
          else {
            ret = iter.next(next_val);
          }
        }
        catch (err) {
          return mainDone.fail(err);
        }

        // bail on run in aborted sequence
        if (internals("seq_aborted")) return;

        // was the control token yielded?
        if (ret.value === token) {
          // round-robin: put co-routine back into the list
          // at the end where it was so it can be processed
          // again on next loop-iteration
          if (!ret.done) {
            iterators.push(iter);
          }
          next_val = token;
          iterateOrQuit(iterate,/*now=*/false);
        }
        else {
          // not a recognized ASQ instance returned?
          if (!ASQ.isSequence(ret.value)) {
            // received a thenable/promise back?
            if (isPromise(ret.value)) {
              // wrap in a sequence
              ret.value = ASQ().promise(ret.value);
            }
            // thunk yielded?
            else if (typeof ret.value === "function") {
              // wrap thunk call in a sequence
              var fn = ret.value;
              ret.value = ASQ(function $$ASQ(done){
                fn(done.errfcb);
              });
            }
            // message wrapper returned?
            else if (ASQ.isMessageWrapper(ret.value)) {
              // wrap message(s) in a sequence
              ret.value = ASQ.apply(ø,
                // don't let `apply(..)` discard an empty message
                // wrapper! instead, pass it along as its own value
                // itself.
                ret.value.length > 0 ? ret.value : ASQ.messages(undefined)
              );
            }
            // non-undefined value returned?
            else if (typeof ret.value !== "undefined") {
              // wrap the value in a sequence
              ret.value = ASQ(ret.value);
            }
            else {
              // make an empty sequence
              ret.value = ASQ();
            }
          }

          ret.value
          .val(function $$val(){
            // bail on run in aborted sequence
            if (internals("seq_aborted")) return;

            if (arguments.length > 0) {
              // save any return messages for input
              // to next iteration
              next_val = arguments.length > 1 ?
                ASQ.messages.apply(ø,arguments) :
                arguments[0]
              ;
            }

            // still more to iterate?
            if (!ret.done) {
              // was the control token passed along?
              if (next_val === token) {
                // round-robin: put co-routine back into the list
                // at the end, so that the the next iterator can be
                // processed on next loop-iteration
                iterators.push(iter);
              }
              else {
                // put co-routine back in where it just
                // was so it can be processed again on
                // next loop-iteration
                iterators.unshift(iter);
              }
            }

            iterateOrQuit(iterate,/*now=*/true);
          })
          .or(function $$or(){
            // bail on run in aborted sequence
            if (internals("seq_aborted")) return;

            try {
              // if an error occurs in the step-continuation
              // promise or sequence, throw it back into the
              // generator or iterable-sequence
              iter["throw"].apply(iter,arguments);
            }
            catch (err) {
              // if an error comes back out of after the throw,
              // pass it out to the main sequence, as iteration
              // must now be complete
              mainDone.fail(err);
            }
          });
        }
      })();
    });

    return api;
  };
});
// "toPromise"
ASQ.extend("toPromise",function $$extend(api,internals){
  return function $$to$promise() {
    return new Promise(function $$executor(resolve,reject){
      api
      .val(function $$val(){
        var args = ARRAY_SLICE.call(arguments);
        resolve.call(ø,args.length > 1 ? args : args[0]);
        return ASQ.messages.apply(ø,args);
      })
      .or(function $$or(){
        var args = ARRAY_SLICE.call(arguments);
        reject.call(ø,args.length > 1 ? args : args[0]);
      });
    });
  };
});
// "try"
ASQ.extend("try",function $$extend(api,internals){
  return function $$try() {
    if (internals("seq_error") || internals("seq_aborted") ||
      arguments.length === 0
    ) {
      return api;
    }

    var fns = ARRAY_SLICE.call(arguments)
    .map(function $$map(fn){
      return function $$then(mainDone) {
        var main_args = ARRAY_SLICE.call(arguments),
          sq = ASQ.apply(ø,main_args.slice(1))
        ;

        sq
        .then(function $$inner$then(){
          fn.apply(ø,arguments);
        })
        .val(function $$val(){
          mainDone.apply(ø,arguments);
        })
        .or(function $$inner$or(){
          var msgs = ASQ.messages.apply(ø,arguments);
          // failed, so map error(s) as `catch`
          mainDone({
            "catch": msgs.length > 1 ? msgs : msgs[0]
          });
        });
      };
    });

    api.then.apply(ø,fns);

    return api;
  };
});
// "until"
ASQ.extend("until",function $$extend(api,internals){
  return function $$until() {
    if (internals("seq_error") || internals("seq_aborted") ||
      arguments.length === 0
    ) {
      return api;
    }

    var fns = ARRAY_SLICE.call(arguments)
    .map(function $$map(fn){
      return function $$then(mainDone) {
        var main_args = ARRAY_SLICE.call(arguments),
          sq = ASQ.apply(ø,main_args.slice(1))
        ;

        sq
        .then(function $$inner$then(){
          var args = ARRAY_SLICE.call(arguments);
          args[0]["break"] = function $$break(){
            mainDone.fail.apply(ø,arguments);
            sq.abort();
          };

          fn.apply(ø,args);
        })
        .val(function $$val(){
          mainDone.apply(ø,arguments);
        })
        .or(function $$inner$or(){
          // failed, retry
          $$then.apply(ø,main_args);
        });
      };
    });

    api.then.apply(ø,fns);

    return api;
  };
});
// "waterfall"
ASQ.extend("waterfall",function $$extend(api,internals){
  return function $$waterfall() {
    if (internals("seq_error") || internals("seq_aborted") ||
      arguments.length === 0
    ) {
      return api;
    }

    var fns = ARRAY_SLICE.call(arguments);

    api.then(function $$then(done){
      var msgs = ASQ.messages(),
        sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1))
      ;

      fns.forEach(function $$each(fn){
        sq.then(fn)
        .val(function $$val(){
          var args = ASQ.messages.apply(ø,arguments);
          msgs.push(args.length > 1 ? args : args[0]);
          return msgs;
        });
      });

      sq.pipe(done);
    });

    return api;
  };
});
// "wrap"
"use strict";

ASQ.wrap = function $$wrap(fn, opts) {
  function checkThis(t, o) {
    return !t || typeof window != "undefined" && t === window || typeof global != "undefined" && t === global ? o : t;
  }

  function paramSpread(gen) {
    return regeneratorRuntime.mark(function paramSpread(token) {
      return regeneratorRuntime.wrap(function paramSpread$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            return context$3$0.delegateYield(gen.apply(this, token.messages), "t0", 1);

          case 1:
          case "end":
            return context$3$0.stop();
        }
      }, paramSpread, this);
    });
  }

  var errfcb, params_first, act, this_obj;

  opts = opts && typeof opts == "object" ? opts : {};

  if (opts.errfcb && opts.splitcb || opts.errfcb && opts.simplecb || opts.splitcb && opts.simplecb || "errfcb" in opts && !opts.errfcb && !opts.splitcb && !opts.simplecb || opts.params_first && opts.params_last || opts.spread && !opts.gen) {
    throw Error("Invalid options");
  }

  // initialize default flags
  this_obj = opts["this"] && typeof opts["this"] == "object" ? opts["this"] : ø;
  errfcb = opts.errfcb || !(opts.splitcb || opts.simplecb);
  params_first = !!opts.params_first || !opts.params_last && !("params_first" in opts || opts.params_first) || "params_last" in opts && !opts.params_first && !opts.params_last;

  if (params_first) {
    act = "push";
  } else {
    act = "unshift";
  }

  if (opts.gen) {
    if (opts.spread) {
      fn = paramSpread(fn);
    }
    return function $$wrapped$gen() {
      return ASQ.apply(ø, arguments).runner(fn);
    };
  }
  if (errfcb) {
    return function $$wrapped$errfcb() {
      var args = ARRAY_SLICE.call(arguments),
          _this = checkThis(this, this_obj);

      return ASQ(function $$asq(done) {
        args[act](done.errfcb);
        fn.apply(_this, args);
      });
    };
  }
  if (opts.splitcb) {
    return function $$wrapped$splitcb() {
      var args = ARRAY_SLICE.call(arguments),
          _this = checkThis(this, this_obj);

      return ASQ(function $$asq(done) {
        args[act](done, done.fail);
        fn.apply(_this, args);
      });
    };
  }
  if (opts.simplecb) {
    return function $$wrapped$simplecb() {
      var args = ARRAY_SLICE.call(arguments),
          _this = checkThis(this, this_obj);

      return ASQ(function $$asq(done) {
        args[act](done);
        fn.apply(_this, args);
      });
    };
  }
};

  // just return `ASQ` itself for convenience sake
  return ASQ;
})(ASQ)
