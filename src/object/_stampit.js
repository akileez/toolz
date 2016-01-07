var forEach                = require('../collection/forEach')
var isFunction             = require('../lang/isFunction')
var slice                  = require('../array/slice')
var apply                  = require('../function/apply')
var isObject               = require('./is-object')
var mixer                  = require('./_mixer')
var mixin                  = mixer.mixin
var mixinFunctions         = mixer.mixinFunctions
var mixinChainFunctions    = mixer.mixinChainFunctions
var merge                  = mixer.merge
var mergeUnique            = mixer.mergeUnique
var mergeChainNonFunctions = mixer.mergeChainNonFunctions

var create = Object.create

function isThenable (value) {
  return value && isFunction(value.then)
}

function extractFunctions () {
  var args = slice(arguments)
  var result = []
  if (isFunction(args[0])) {
    forEach(args, function (fn) {
      if (isFunction(fn)) {
        result.push(fn)
      }
    })
  } else if (isObject(args[0])) {
    forEach(args, function (obj) {
      forEach(obj, function (fn) {
        if (isFunction(fn)) {
          result.push(fn)
        }
      })
    })
  }
  return result
}

function addMethods (fixed) {
  var methods = slice(arguments, 1)
  return apply(mixinFunctions, undefined, [fixed.methods].concat(methods))
}

function addRefs (fixed) {
  var refs = slice(arguments, 1)
  fixed.refs = fixed.state = apply(mixin, undefined, [fixed.refs].concat(refs))
  return fixed.refs
}

function addInit (fixed) {
  var inits = slice(arguments, 1)
  var extractedInits = apply(extractFunctions, undefined, inits)
  fixed.init = fixed.enclose = fixed.init.concat(extractedInits)
  return fixed.init
}

function addProps (fixed) {
  var propses = slice(arguments, 1)
  return apply(merge, undefined, [fixed.props].concat(propses))
}

function addStatic (fixed) {
  var statics = slice(arguments, 1)
  apply(mixin, undefined, [fixed['static']].concat(statics))
}

function cloneAndExtend (fixed, extensionFunction) {
  var args = slice(arguments, 2)
  var stamp = stampit(fixed)
  apply(extensionFunction, undefined, [stamp.fixed].concat(args))
  return stamp
}

function _compose () {
  var factories = slice(arguments)
  var result = stampit()

  forEach(factories, function (source) {
    if (source && source.fixed) {
      addMethods(result.fixed, source.fixed.methods);
      addRefs(result.fixed, source.fixed.refs || source.fixed.state);
      addInit(result.fixed, source.fixed.init || source.fixed.enclose);
      addProps(result.fixed, source.fixed.props);
      addStatic(result.fixed, source.fixed['static']);
    }
  })

  return mixin(result, result.fixed['static'])
}

var stampit = function stampit (options) {
  var fixed = {methods: {}, refs: {}, init: [], props: {}, 'static': {}}
  fixed.state = fixed.refs
  fixed.enclose = fixed.init

  if (options) {
    addMethods(fixed, options.methods)
    addRefs(fixed, options.refs)
    addInit(fixed, options.init)
    addProps(fixed, options.props)
    addStatic(fixed, options.static)
  }

  var factory = function Factory (refs) {
    var args = slice(arguments, 1)
    var instance = mixin(create(fixed.methods), fixed.refs, refs)
    mergeUnique(instance, fixed.props)

    var nextPromise = null

    if (fixed.init.length > 0) {
      forEach(fixed.init, function (fn) {
        if (!isFunction(fn)) {
          return
        }

        if (!nextPromise) {
          var callResult = fn.call(instance, {args: args, instance: instance, stamp: factory})

          if (!callResult) {
            return
          }

          if (!isThenable(callResult)) {
            instance = callResult
            return
          }

          nextPromise = callResult
        } else {
          nextPromise = nextPromise.then(function (newInstance) {
            instance = newInstance || instance
            var callResult = fn.call(instance, { args: args, instance: instance, stamp: factory })
            if (!callResult) {
              return instance
            }
            if (!isThenable(callResult)) {
              instance = callResult
              return instance
            }

            return callResult
          })
        }
      })
    }

    return nextPromise ? nextPromise.then(function (newInstance) {
      return newInstance || instance
    }) : instance
  }

  var refsMethod = cloneAndExtend.bind(null, fixed, addRefs)
  var initMethod = cloneAndExtend.bind(null, fixed, addInit)

  return mixin(factory, {
    create: factory,
    fixed: fixed,
    methods: cloneAndExtend.bind(null, fixed, addMethods),
    refs: refsMethod,
    state: refsMethod,
    init: initMethod,
    enclose: initMethod,
    props: cloneAndExtend.bind(null, fixed, addProps),
    'static': function _static () {
      var statics = slice(arguments)
      var newStamp = apply(cloneAndExtend, undefined, [factory.fixed, addStatic].concat(statics))
      return mixin(newStamp, newStamp.fixed['static'])
    },
    compose: function compose () {
      var factories = slice(arguments)
      return apply(_compose, undefined, [factory].concat(factories))
    }
  }, fixed['static'])
}

function isStamp (obj) {
  return (isFunction(obj)
    && isFunction(obj.methods)
    && (isFunction(obj.refs) || isFunction(obj.state))
    && (isFunction(obj.init) || isFunction(obj.enclose))
    && isFunction(obj.props)
    && isFunction(obj.static)
    && isObject(obj.fixed)
  )
}

function convertConstructor (Constructor) {
  var stamp = stampit()
  stamp.fixed.refs = stamp.fixed.state = mergeChainNonFunctions(stamp.fixed.refs, Constructor.prototype)
  mixin(stamp, mixin(stamp.fixed.static, Constructor))
  mixinChainFunctions(stamp.fixed.methods, Constructor.prototype)
  addInit(stamp.fixed, function (_ref) {
    var instance = _ref.instance
    var args = _ref.args
    return apply(Constructor, instance, args)
  })

  return stamp
}

function shortcutMethod (extensionFunction) {
  var args = slice(arguments, 1)
  var stamp = stampit()
  apply(extensionFunction, undefined, [stamp.fixed].concat(args))
  return stamp
}

module.exports = mixin(stampit, {
  methods: shortcutMethod.bind(null, addMethods),
  refs: shortcutMethod.bind(null, addRefs),
  init: shortcutMethod.bind(null, addInit),
  props: shortcutMethod.bind(null, addProps),
  compose: _compose,
  isStamp: isStamp,
  convertConstructor: convertConstructor,
  'static': function _static () {
    var statics = slice(arguments)
    var newStamp = apply(shortcutMethod, undefined, [addStatic].concat(statics))
    return mixin(newStamp, newStamp.fixed['static'])
  }
});
