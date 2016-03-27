'use strict'

const slice            = require('../array/slice')
const apply            = require('../function/apply')
const merge            = require('./merge')
const assign           = require('./extend')
const compose          = require('./compose')
const isObject         = require('./is-object')
const isComposable     = require('./is-composable')
const extractFunctions = require('./extract-functions')

const rawUtilities = {
  methods : function methods() {
    let methodsObject = slice(arguments)
    return (this.compose || compose).call(this, {methods: apply(assign, undefined, [{}].concat(methodsObject))});
  },
  properties : function properties() {
    let propertiesObject = slice(arguments)
    return (this.compose || compose).call(this, {properties: apply(assign, undefined, [{}].concat(propertiesObject))});
  },
  initializers : function initializers() {
    let args = slice(arguments)
    return (this.compose || compose).call(this, {initializers: apply(extractFunctions, undefined, args)});
  },
  deepProperties : function deepProperties() {
    let propertiesObject = slice(arguments)
    return (this.compose || compose).call(this, {deepProperties: apply(merge, undefined, [{}].concat(propertiesObject))});
  },
  staticProperties : function staticProperties() {
    let propertiesObject = slice(arguments)
    return (this.compose || compose).call(this, {staticProperties: apply(assign, undefined, [{}].concat(propertiesObject))});
  },
  staticDeepProperties : function staticDeepProperties() {
    let propertiesObject = slice(arguments)
    return (this.compose || compose).call(this, {staticDeepProperties: apply(merge, undefined, [{}].concat(propertiesObject))});
  }
};

const baseStampit = compose({
  staticProperties: assign({
    refs: rawUtilities.properties,
    props: rawUtilities.properties,
    init: rawUtilities.initializers,
    deepProps: rawUtilities.deepProperties,
    statics: rawUtilities.staticProperties,

    create: function create () {
      return apply(this, undefined, arguments)
    }
  }, rawUtilities)
});

function stampit () {
  let _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0]

  let methods = _ref.methods
  let properties = _ref.properties
  let props = _ref.props
  let refs = _ref.refs
  let initializers = _ref.initializers
  let init = _ref.init
  let deepProperties = _ref.deepProperties
  let deepProps = _ref.deepProps
  let propertyDescriptors = _ref.propertyDescriptors
  let staticProperties = _ref.staticProperties
  let statics = _ref.statics
  let staticDeepProperties = _ref.deepStaticProperties
  let staticPropertyDescriptors = _ref.staticPropertyDescriptors
  let configuration = _ref.configuration
  let deepConfiguration = _ref.deepConfiguration

  let args = slice(arguments, 1)

  const p = isObject(props) || isObject(refs) || isObject(properties)
    ? assign({}, props, refs, properties)
    : undefined;

  const dp = isObject(deepProps) || isObject(deepProperties)
    ? merge({}, deepProps, deepProperties)
    : undefined;

  const sp = isObject(statics) || isObject(staticProperties)
    ? assign({}, statics, staticProperties)
    : undefined;

  return apply(baseStampit.compose, baseStampit, [{
    methods: methods,
    properties: p,
    initializers: extractFunctions(init, initializers),
    deepProperties: dp,
    staticProperties: sp,
    staticDeepProperties: staticDeepProperties,
    propertyDescriptors: propertyDescriptors,
    staticPropertyDescriptors: staticPropertyDescriptors,
    configuration: configuration,
    deepConfiguration: deepConfiguration
  }].concat(args))
}

module.exports = assign(stampit, {
  isStamp: isComposable,
  isComposable: isComposable,
  compose: baseStampit.compose,
  refs: rawUtilities.properties,
  props: rawUtilities.properties,
  init: rawUtilities.initializers,
  deepProps: rawUtilities.deepProperties,
  statics: rawUtilities.staticProperties
}, rawUtilities)
