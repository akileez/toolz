var slice            = require('../../array/slice')
var apply            = require('../../function/apply')
var extractFunctions = require('../extract-functions')
var isComposable     = require('../is-composable')
var isObject         = require('../is-object')
var assign           = require('../extend')
var merge            = require('../merge')
var compose          = require('./compose')

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
