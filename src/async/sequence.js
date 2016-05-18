// asynquence <https://github.com/getify/asynquence>
// v0.9.0 (c) Kyle Simpson
// MIT License: http://getify.mit-license.org

var slice   = require('../array/slice')
var forEach = require('../array/forEach')
var map     = require('../array/map')
var some    = require('../array/some')
var keys    = require('../object/keys')
var apply   = require('../function/apply')

module.exports = (function DEF (name, context) {
  'use strict'

  var cycle
  var scheduling_queue
  var timer = (typeof setImmediate !== 'undefined')
    ? function $$timer (fn) { return setImmediate(fn) }
    : process.nextTick

  // Note: using a queue instead of array for efficiency
  function Queue () {
    var first
    var last
    var item

    function Item (fn) {
      this.fn = fn
      this.next = void 0
    }

    return {
      add: function $$add (fn) {
        item = new Item(fn)
        if (last) last.next = item
        else first = item
        last = item
        item = void 0
      },
      drain: function $$drain () {
        var f = first
        first = last = cycle = null

        while (f) {
          f.fn()
          f = f.next
        }
      }
    }
  }

  scheduling_queue = Queue()

  function schedule (fn) {
    scheduling_queue.add(fn)
    if (!cycle) cycle = timer(scheduling_queue.drain)
  }

  function tapSequence (def) {
    // temporary `trigger` which, if called before being replaced
    // above, creates replacement proxy sequence with the
    // success/error message(s) pre-injected
    function trigger () {
      def.seq = apply(createSequence, ø, arguments).defer()
    }

    // fail trigger
    trigger.fail = function $$trigger$fail () {
      var args = slice(arguments)

      def.seq = createSequence(function $$create$sequence (done) {
        apply(done.fail, ø, args)
      }).defer()
    }

    // listen for signals from the sequence
    def.seq
    // note: cannot use `seq.pipe(trigger)` because we
    // need to be able to update the shared closure
    // to change `trigger`
    .val(function $$val () {
      apply(trigger, ø, arguments)
      return apply(ASQmessages, ø, arguments)
    })
    .or(function $$or () {
      apply(trigger.fail, ø, arguments)
    })

    // make a sequence to act as a proxy to the original
    // sequence
    def.seq = createSequence(function $$create$sequence (done) {
      // replace the temporary trigger (created below)
      // with this proxy's trigger
      trigger = done
    })
    .defer()
  }

  function createSequence () {

    function scheduleSequenceTick () {
      if (seq_aborted) sequenceTick()
      else if (!seq_tick) seq_tick = schedule(sequenceTick)
    }

    function throwSequenceErrors () {
      throw (sequence_errors.length === 1 ? sequence_errors[0] : sequence_errors)
    }

    function sequenceTick () {
      var fn
      var args

      seq_tick = null
      // remove the temporary `unpause()` hook, if any
      delete sequence_api.unpause

      if (seq_aborted) {
        clearTimeout(seq_tick)
        seq_tick = null
        then_queue.length = or_queue.length = sequence_messages.length = sequence_errors.length = 0
      } else if (seq_error) {
        if (or_queue.length === 0 && !error_reported) {
          error_reported = true
          throwSequenceErrors()
        }

        while (or_queue.length) {
          error_reported = true
          fn = or_queue.shift()
          try {
            apply(fn, ø, sequence_errors)
          }
          catch (err) {
            if (isMessageWrapper(err)) sequence_errors = sequence_errors.concat(err)
            else {
              sequence_errors.push(err)
              if (err.stack) { sequence_errors.push(err.stack) }
            }
            if (or_queue.length === 0) throwSequenceErrors()
          }
        }
      } else if (then_ready && then_queue.length > 0) {
        then_ready = false
        fn = then_queue.shift()
        args = sequence_messages.slice()
        sequence_messages.length = 0
        args.unshift(createStepCompletion())

        try {
          apply(fn, ø, args)
        }
        catch (err) {
          if (isMessageWrapper(err)) sequence_errors = sequence_errors.concat(err)
          else sequence_errors.push(err)
          seq_error = true
          scheduleSequenceTick()
        }
      }
    }

    function createStepCompletion () {

      function done () {
        // ignore this call?
        if (seq_error || seq_aborted || then_ready) return

        then_ready = true
        apply(sequence_messages.push, sequence_messages, arguments)
        sequence_errors.length = 0

        scheduleSequenceTick()
      }

      done.fail = function $$step$fail () {
        // ignore this call?
        if (seq_error || seq_aborted || then_ready) return

        seq_error = true
        sequence_messages.length = 0
        apply(sequence_errors.push, sequence_errors, arguments)

        scheduleSequenceTick()
      }

      done.abort = function $$step$abort () {
        if (seq_error || seq_aborted) return

        then_ready = false
        seq_aborted = true
        sequence_messages.length = sequence_errors.length = 0

        scheduleSequenceTick()
      }

      done.errfcb = function $$step$errfcb (err) {
        if (err) done.fail(err)
        else apply(done, ø, slice(arguments, 1))
      }

      return done
    }

    function createGate (stepCompletion, segments, seqMessages) {

      function resetGate () {
        clearTimeout(gate_tick)
        gate_tick = segment_completion = segment_messages = segment_error_message = null
      }

      function scheduleGateTick () {
        if (gate_aborted) return gateTick()
        if (!gate_tick) gate_tick = schedule(gateTick)
      }

      function gateTick () {
        if (seq_error || seq_aborted || gate_completed) return

        var msgs = []

        gate_tick = null

        if (gate_error) {
          apply(stepCompletion.fail, ø, segment_error_message)

          resetGate()
        } else if (gate_aborted) {
          stepCompletion.abort()

          resetGate()
        } else if (checkGate()) {
          gate_completed = true

          // collect all the messages from the gate segments
          forEach(segment_completion, function $$each (sc, i) {
            msgs.push(segment_messages['s' + i])
          })

          apply(stepCompletion, ø, msgs)

          resetGate()
        }
      }

      function checkGate () {
        if (segment_completion.length === 0) return

        var fulfilled = true

        some(segment_completion, function $$some (segcom) {
          if (segcom === null) {
            fulfilled = false
            return true
          }
        })

        return fulfilled
      }

      function createSegmentCompletion () {

        function done () {
          // ignore this call?
          if (seq_error
            || seq_aborted
            || gate_error
            || gate_aborted
            || gate_completed
            || segment_completion[segment_completion_idx]
          ) return

          // put gate-segment messages into `messages`-branded
          // container
          var args = apply(ASQmessages, ø, arguments)

          segment_messages['s' + segment_completion_idx] = args.length > 1
            ? args
            : args[0]

          segment_completion[segment_completion_idx] = true

          scheduleGateTick()
        }

        var segment_completion_idx = segment_completion.length

        done.fail = function $$segment$fail () {
          // ignore this call?
          if (seq_error
            || seq_aborted
            || gate_error
            || gate_aborted
            || gate_completed
            || segment_completion[segment_completion_idx]
          ) return

          gate_error = true
          segment_error_message = slice(arguments)

          scheduleGateTick()
        }

        done.abort = function $$segment$abort () {
          if (seq_error
            || seq_aborted
            || gate_error
            || gate_aborted
            || gate_completed
          ) return

          gate_aborted = true

          // abort() is an immediate/synchronous action
          gateTick()
        }

        // handles "error-first" (aka "node-style") callbacks
        done.errfcb = function $$segment$errfcb (err) {
          if (err) done.fail(err)
          else apply(done, ø, slice(arguments, 1))
        }

        // placeholder for when a gate-segment completes
        segment_completion[segment_completion_idx] = null

        return done
      }

      var gate_error = false
      var gate_aborted = false
      var gate_completed = false
      var args
      var err_msg
      var segment_completion = []
      var segment_messages = {}
      var segment_error_message
      var gate_tick

      some(segments, function $$some (seg) {
        if (gate_error || gate_aborted) return true // break

        args = seqMessages.slice()
        args.unshift(createSegmentCompletion())
        try {
          apply(seg, ø, args)
        }
        catch (err) {
          err_msg = err
          gate_error = true
          return true // break
        }
      })

      if (err_msg) {
        if (isMessageWrapper(err_msg)) apply(stepCompletion.fail, ø, err_msg)
        else stepCompletion.fail(err_msg)
      }
    }

    function then () {
      if (seq_error || seq_aborted || arguments.length === 0) return sequence_api

      forEach(wrapArgs(arguments, thenWrapper), function $$each (v) {
        if (isSequence(v)) seq(v)
        else then_queue.push(v)
      })

      scheduleSequenceTick()

      return sequence_api
    }

    function or () {
      if (seq_aborted || arguments.length === 0) return sequence_api

      apply(or_queue.push, or_queue, arguments)

      scheduleSequenceTick()

      return sequence_api
    }

    function gate () {
      if (seq_error || seq_aborted || arguments.length === 0) return sequence_api

      var fns = map(slice(arguments), function $$map (v) {
        // map any sequences to gate segments
        var def

        // is 'v' a sequence or iterable-sequence?
        if (isSequence(v)) {
          def = {seq: v}
          tapSequence(def)
          return function $$segment (done) {
            def.seq.pipe(done)
          }
        } else {
          return v
        }
      })

      then(function $$then (done) {
        var args = slice(arguments, 1)
        createGate(done, fns, args)
      })

      return sequence_api
    }

    function pipe () {
      if (seq_aborted || arguments.length === 0) return sequence_api

      forEach(slice(arguments), function $$each (trigger) {
        then(function $$then (done) {
          apply(trigger, ø, slice(arguments, 1))
          done()
        })
        .or(trigger.fail)
      })

      return sequence_api
    }

    function seq () {
      if (seq_error || seq_aborted || arguments.length === 0) return sequence_api

      forEach(slice(arguments), function $$each (v) {
        var def = {seq: v}

        // is `fn` a sequence or iterable-sequence?
        if (isSequence(v)) tapSequence(def)

        then(function $$then (done) {
          var _v = def.seq
          // check if this argument is not already a sequence?
          // if not, assume a function to invoke that will return
          // a sequence.
          if (!isSequence(_v)) {
            _v = apply(def.seq, ø, slice(arguments, 1))
          }
          // pipe the provided sequence into our current sequence
          _v.pipe(done)
        })
      })

      return sequence_api
    }

    function val () {
      if (seq_error || seq_aborted || arguments.length === 0) return sequence_api

      forEach(slice(wrapArgs(arguments, valWrapper)), function $$each (fn) {
        then(function $$then (done) {
          var msgs = apply(fn, ø, slice(arguments, 1))
          if (!isMessageWrapper(msgs)) msgs = ASQmessages(msgs)
          apply(done, ø, msgs)
        })
      })

      return sequence_api
    }

    function promise () {
      function wrap (fn) {
        return function $$fn () {
          apply(fn, ø, isMessageWrapper(arguments[0]) ? arguments[0] : arguments)
        }
      }

      if (seq_error || seq_aborted || arguments.length === 0) return sequence_api

      forEach(slice(arguments), function $$each (pr) {
        then(function $$then (done) {
          var _pr = pr
          // check if this argument is a non-thenable function, and
          // if so, assume we shold invoke it to return a promise
          // NOTE: `then` duck-typing of promises is stupid.
          if (typeof pr === "function" && typeof pr.then !== "function") {
            _pr = apply(pr, ø, slice(arguments, 1))
          }
          // now, hook up the promise to the sequence
          _pr.then(
            wrap(done),
            wrap(done.fail)
          )
        })
      })

      return sequence_api
    }

    function fork () {
      var trigger

      // listen for success at this point in the sequence
      val(function $$val () {
        if (trigger) apply(trigger, ø, arguments)
        else trigger = apply(createSequence, ø, arguments).defer()

        return apply(ASQmessages, ø, arguments)
      })
      // listen for error at this point in the sequence
      or(function $$or () {
        if (trigger) apply(trigger.fail, ø, arguments)
        else {
          var args = slice(arguments)
          trigger = createSequence().then(function $$then (done) {
            apply(done.fail, ø, args)
          })
          .defer()
        }
      })

      // create the forked sequence which will receive
      // the success/error stream from the main sequence
      return createSequence()
        .then(function $$then (done) {
          if (!trigger) trigger = done
          else trigger.pipe(done)
        })
        .defer()
    }

    function abort () {
      if (seq_error) return sequence_api
      seq_aborted = true
      sequenceTick()
      return sequence_api
    }

    function duplicate () {
      var sq
      // var template
      template = {
        then_queue: then_queue.slice(),
        or_queue: or_queue.slice()
      }
      sq = createSequence()
      template = null

      return sq
    }

    function unpause() {
      apply(sequence_messages.push, sequence_messages, arguments)
      if (seq_tick === true) seq_tick = null
      scheduleSequenceTick()
    }

    // opt-out of global error reporting for this sequence
    function defer() {
      or_queue.push(function ignored () {})
      return sequence_api
    }

    function internals (name, value) {
      var set = (arguments.length > 1)

      switch (name) {
        case 'seq_error':
          if (set) seq_error = value
          else return seq_error
          break

        case 'seq_aborted':
          if (set) seq_aborted = value
          else return seq_aborted
          break

        case 'then_ready':
          if (set) then_ready = value
          else return then_ready
          break

        case 'then_queue':
          return then_queue

        case 'or_queue':
          return or_queue

        case 'sequence_messages':
          return sequence_messages

        case 'sequence_errors':
          return sequence_errors
      }
    }

    function includeExtensions () {
      forEach(keys(extensions), function $$each (name) {
        sequence_api[name] = sequence_api[name] || extensions[name](sequence_api, internals)
      })
    }

    var seq_error = false
    var error_reported = false
    var seq_aborted = false
    var then_ready = true

    var then_queue = []
    var or_queue = []

    var sequence_messages = []
    var sequence_errors = []

    var seq_tick

    // brand the sequence API so we can detect ASQ instances
    var sequence_api = brandIt({
      then: then,
      or: or,
      // alias of `or(..)` to `onerror(..)`
      onerror: or,
      gate: gate,
      // alias of `gate(..)` to `all(..)` for symmetry
      // with native ES6 promises
      all: gate,
      pipe: pipe,
      seq: seq,
      val: val,
      promise: promise,
      fork: fork,
      abort: abort,
      duplicate: duplicate,
      defer: defer
    })

    // include any extensions
    includeExtensions()

    // templating the sequence setup?
    if (template) {
      then_queue = template.then_queue.slice()
      or_queue = template.or_queue.slice()

      // templating a sequence starts it out paused
      // add temporary `unpause()` API hook
      sequence_api.unpause = unpause
      seq_tick = true
    }

    // treat ASQ() constructor parameters as having been
    // passed to `then()`
    apply(sequence_api.then, ø, arguments)

    return sequence_api
  }

  // ***********************************************
  // Object branding utilities
  // ***********************************************
  function brandIt (obj) {
    return Object.defineProperty(obj, brand, {
      enumerable: false,
      value: true
    })
  }

  function checkBranding (val) {
    return !!(val != null && typeof val === "object" && val[brand])
  }

  // ***********************************************
  // Value messages utilities
  // ***********************************************
  // wrapper helpers
  function valWrapper (numArgs) {
    // `numArgs` indicates how many pre-bound arguments
    // will be sent in.
    return apply(ASQmessages, ø,
      // pass along only the pre-bound arguments
      slice(arguments).slice(1, numArgs + 1)
    )
  }

  function thenWrapper (numArgs) {
    // Because of bind() partial-application, will
    // receive pre-bound arguments before the `done()`,
    // rather than it being first as usual.
    // `numArgs` indicates how many pre-bound arguments
    // will be sent in.

     // the `done()`
    apply(arguments[numArgs + 1], ø,
      // pass along only the pre-bound arguments
      slice(arguments).slice(1, numArgs + 1)
    )
  }

  function wrapArgs (args, wrapper) {
    var i
    var j
    args = slice(args)

    for (i=0; i<args.length; i++) {
      if (isMessageWrapper(args[i])) {
        args[i] = wrapper.bind.apply(wrapper,
          // partial-application of arguments
          [/*this=*/null,/*numArgs=*/args[i].length]
          .concat(
            // pre-bound arguments
            args[i]
          )
        )
      }
      else if (typeof args[i] !== "function" &&
        (
          wrapper === valWrapper ||
          !isSequence(args[i])
        )
      ) {
        for (j=i+1; j<args.length; j++) {
          if (typeof args[j] === "function" ||
            checkBranding(args[j])
          ) {
            break;
          }
        }
        args.splice(
          /*start=*/i,
          /*howMany=*/j-i,
          /*replace=*/wrapper.bind.apply(wrapper,
            // partial-application of arguments
            [/*this=*/null,/*numArgs=*/(j-i)]
            .concat(
              // pre-bound arguments
              args.slice(i,j)
            )
          )
        );
      }
    }
    return args;
  }

  var extensions = {}
  var template
  var old_public_api = (context || {})[name]
  var brand = "__ASQ__"
  var ø = Object.create(null)
  var ASQmessages
  var isSequence
  var isMessageWrapper

  // ***********************************************
  // Setup the public API
  // ***********************************************
  createSequence.failed = function $$public$failed () {
    var args = apply(ASQmessages, ø, arguments)
    return createSequence(function $$failed () {
      throw args
    }).defer()
  }

  createSequence.extend = function $$public$extend (name, build) {
    extensions[name] = build

    return createSequence
  }

  createSequence.messages = ASQmessages = function $$public$messages () {
    var ret = slice(arguments)

    // brand the message wrapper so we can detect
    return brandIt(ret)
  }

  createSequence.isSequence = isSequence = function $$public$isSequence (val) {
    return checkBranding(val) && !Array.isArray(val)
  }

  createSequence.isMessageWrapper = isMessageWrapper = function $$public$isMessageWrapper (val) {
    return checkBranding(val) && Array.isArray(val)
  }

  createSequence.unpause = function $$public$unpause (sq) {
    if (sq.unpause) sq.unpause()
    return sq
  }

  createSequence.noConflict = function $$public$noConflict () {
    if (context) context[name] = old_public_api

    return createSequence
  }

  // create a clone of the *asynquence* API
  // Note: does *not* include any registered extensions
  createSequence.clone = function $$public$clone () {
    return DEF(name, context)
  }

  // private utility exports: only for internal/plugin use!
  createSequence.__schedule = schedule
  createSequence.__tapSequence = tapSequence

  return createSequence
})('ASQ', this)
