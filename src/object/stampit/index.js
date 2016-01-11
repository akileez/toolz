var slice       = require('../../array/slice')
var apply       = require('../../function/apply')
var assign      = require('../extend')
var merge       = require('../merge')
var isArray     = require('../../lang/isArray')
var forEach     = require('../../collection/forEach')
var isFunction  = require('../../lang/isFunction')
var isUndefined = require('../../lang/isUndefined')

var isDescriptor = isObject

function isObject (value) {
  return !!value && (typeof value === 'object' || typeof value === 'function')
}

function extractFunctions (args) {
  args = slice(arguments)
  // console.log('argument extraction of fuctions: ', args)
  var result = []

  if (isFunction(args[0])) {
    forEach(args, function (fn) {
      if (isFunction(fn)) result.push(fn)
    })
  } else if (args.length > 0) {
    forEach(args, function (obj) {
      forEach(obj, function (fn) {
        if (isFunction(fn)) result.push(fn)
      })
    })
  } else {
    return undefined
  }
  return result.length === 0 ? undefined : result
}

function isComposable (obj) {
  return isFunction(obj) && isFunction(obj.compose)
}

function safeMutateProp (dst, src, propName, mutator) {
  var srcObj = src[propName]
  if (!isObject(srcObj)) return

  var dstObj = dst[propName]
  if (!isObject(dstObj)) {
    dst[propName] = mutator({}, srcObj)
    return
  }
  mutator(dstObj, srcObj)
}

function appendDescriptor (dst, src) {
  if (!isDescriptor(src)) return

  if (isArray(src.initializers)) {
    dst.initializers = extractFunctions(dst.initializers, src.initializers)
  }

  safeMutateProp(dst, src, 'methods', assign)
  safeMutateProp(dst, src, 'properties', assign)
  safeMutateProp(dst, src, 'deepProperties', merge)
  safeMutateProp(dst, src, 'staticProperties', assign)
  safeMutateProp(dst, src, 'deepStaticProperties', merge)
  safeMutateProp(dst, src, 'propertyDescriptors', assign)
  safeMutateProp(dst, src, 'staticPropertyDescriptors', assign)
  safeMutateProp(dst, src, 'configuration', merge)
}

function compose () {
  var args = slice(arguments)
  // console.log('compose arguments passed: ', args)
  // creating stamp
  var factoryContext = {}
  var factory = stamp.bind(factoryContext) // makes a copy of the `stamp` function object
  var descriptor = compose.bind(factory) // makes a copy of the `compose` function

  factory.compose = factoryContext.compose = descriptor
  factoryContext.stamp = factory

  // composing
  if (isComposable(this)) {
    appendDescriptor(descriptor, this.compose)
  }

  forEach(args, function (arg) {
    appendDescriptor(descriptor, isComposable(arg) ? arg.compose : arg)
  })

  // static properties
  if (isObject(descriptor.deepStaticProperties)) {
    merge(factory, descriptor.deepStaticProperties)
  }

  if (isObject(descriptor.staticProperties)) {
    assign(factory, descriptor.staticProperties)
  }

  if (isObject(descriptor.staticPropertyDescriptors)) {
    Object.defineProperties(factory, descriptor.staticPropertyDescriptors)
  }

  return factory
}

function stamp (args) {
  var _this = this

  var args = slice(arguments)

  var descriptor = this.compose

  var instance = isObject(descriptor.methods)
    ? Object.create(descriptor.methods)
    : {}

  if (isObject(descriptor.properties)) {
    assign(instance, descriptor.properties)
  }

  if (isObject(descriptor.deepProperties)) {
    merge(instance, descriptor.deepProperties)
  }

  if (isObject(descriptor.propertyDescriptors)) {
    Object.defineProperties(instance, descriptor.propertyDescriptors)
  }

  if (isArray(descriptor.initializers)) {
    (function () {
      var options = args[0]
      forEach(descriptor.initializers, function (initializer) {
        if (isFunction(initializer)) {
          var result = initializer.call(instance, options, {instance: instance, stamp: _this.stamp, args: args})
          if (!isUndefined(result)) instance = result
        }
      })
    })()
  }

  return instance
}

var rawUtils = {
  methods: function _methods () {
    var args = slice(arguments)
    return (this.compose || compose)({methods: apply(assign, undefined, [{}].concat(args))})
  },
  properties: function _properties () {
    var args = slice(arguments)
    return (this.compose || compose)({properties: apply(assign, undefined, [{}].concat(args))})
  },
  initializers: function _initializers () {
    return (this.compose || compose)({initializers: apply(extractFunctions, undefined, arguments)})
  },
  deepProperties: function _deepProperties () {
    var args = slice(arguments)
    return (this.compose || compose)({deepProperties: apply(merge, undefined, [{}].concat(args))})
  },
  staticProperties: function _staticProperties () {
    var args = slice(arguments)
    return (this.compose || compose)({staticProperties: apply(assign, undefined, [{}].concat(args))})
  },
  deepStaticProperties: function _deepStaticProperties () {
    var args = slice(arguments)
    return (this.compose || compose)({staticDeepProperties: apply(merge, undefined, [{}].concat(args))})
  }
}

var baseStampit = compose({
  initializers: [function(options) {
    assign(this, options);
  }],
  staticProperties: assign({
    refs: rawUtils.properties,
    props: rawUtils.properties,
    init: rawUtils.initializers,
    deepProps: rawUtils.deepProperties,
    statics: rawUtils.staticProperties,
    create: function create() {
      return apply(this, undefined, arguments)
    }
  }, rawUtils)
})

function stampit () {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0]

  var methods = _ref.methods
  var properties = _ref.properties
  var props = _ref.props
  var refs = _ref.refs
  var initializers = _ref.initializers
  var init = _ref.init
  var deepProperties = _ref.deepProperties
  var deepProps = _ref.deepProps
  var propertyDescriptors = _ref.propertyDescriptors
  var staticProperties = _ref.staticProperties
  var statics = _ref.statics
  var deepStaticProperties = _ref.deepStaticProperties
  var staticPropertyDescriptors = _ref.staticPropertyDescriptors
  var configuration = _ref.configuration

  var args = slice(arguments, 1)

  var p = isObject(props) || isObject(refs) || isObject(properties)
    ? assign({}, props, refs, properties)
    : undefined

  var dp = isObject(deepProps) || isObject(deepProperties)
    ? merge({}, deepProps, deepProperties)
    : undefined

  var sp = isObject(statics) || isObject(staticProperties)
    ? assign({}, statics, staticProperties)
    : undefined

  return apply(baseStampit.compose, baseStampit, [{
    methods: methods,
    properties: p,
    initializers: extractFunctions(init, initializers),
    deepProperties: dp,
    staticProperties: sp,
    deepStaticProperties: deepStaticProperties,
    propertyDescriptors: propertyDescriptors,
    staticPropertyDescriptors: staticPropertyDescriptors,
    configuration: configuration
  }].concat(args))
}

module.exports = assign(stampit, {
  isStamp: isComposable,
  isComposable: isComposable,
  compose: baseStampit.compose,
  refs: rawUtils.properties,
  props: rawUtils.properties,
  init: rawUtils.initializers,
  deepProps: rawUtils.deepProperties,
  statics: rawUtils.staticProperties
}, rawUtils)
