// stamp-it version 3 <https://github.com/stampit-org/stampit>
// stamp-specification <https://github.com/stampit-org/stamp-specification>

'use strict'

const compose          = require('./compose')
const isComposable     = require('./is-composable')
const isStamp          = require('./is-stamp')
const stampDescriptor  = require('./descriptor')
const extractFunctions = require('./extract-functions')
const merge            = require('./merger')
const assign           = require('./assign')
const apply            = require('../function/apply')
const slice            = require('../array/slice')
const filter           = require('../array/filter')
const map              = require('../array/map')

function composeArgsCall (self, propName, action, args) {
  const descriptor = {}
  descriptor[propName] = apply(action, undefined, [{}].concat(args))
  return ((self && self.compose) || baseStampit.compose).call(self, descriptor)
}

function methods () {
  let args = slice(arguments)
  return composeArgsCall(this, 'methods', assign, args)
}

function properties () {
  let args = slice(arguments)
  return composeArgsCall(this, 'properties', assign, args)
}

function initializers () {
  let args = slice(arguments)
  return ((this && this.compose) || baseStampit.compose).call(this, {
    initializers: apply(extractFunctions, undefined, args)
  })
}

function deepProperties () {
  let args = slice(arguments)
  return composeArgsCall(this, 'deepProperties', merge, args)
}

function staticProperties () {
  let args = slice(arguments)
  return composeArgsCall(this, 'staticProperties', assign, args)
}

function staticDeepProperties () {
  let args = slice(arguments)
  return composeArgsCall(this, 'staticDeepProperties', merge, args)
}

function configuration () {
  let args = slice(arguments)
  return composeArgsCall(this, 'configuration', assign, args)
}

function deepConfiguration () {
  let args = slice(arguments)
  return composeArgsCall(this, 'deepConfiguration', merge, args)
}

function propertyDescriptors () {
  let args = slice(arguments)
  return composeArgsCall(this, 'propertyDescriptors', assign, args)
}

function staticPropertyDescriptors () {
  let args = slice(arguments)
  return composeArgsCall(this, 'staticPropertyDescriptors', assign, args)
}

const allUtilities = {
  methods: methods,
  properties: properties,
  refs: properties,
  props: properties,
  initializers: initializers,
  init: initializers,
  deepProperties: deepProperties,
  deepProps: deepProperties,
  staticProperties: staticProperties,
  statics: staticProperties,
  staticDeepProperties: staticDeepProperties,
  deepStatics: staticDeepProperties,
  configuration: configuration,
  conf: configuration,
  deepConfiguration: deepConfiguration,
  deepConf: deepConfiguration,
  propertyDescriptors: propertyDescriptors,
  staticPropertyDescriptors: staticPropertyDescriptors
}

const baseStampit = compose({
  staticProperties: assign({
    create: function _create () {
      let args = slice(arguments)
      return this(args)
    },
    compose: function _compose () {
      let args = slice(arguments)
      args = map(filter(args, isComposable), (arg) => isStamp(arg) ? arg : stampDescriptor(arg))
      return apply(compose, this || baseStampit, args)
    }
  }, allUtilities)
})

function stampit () {
  let args = slice(arguments)
  return baseStampit.compose(args)
}

module.exports = assign(stampit, {
  isStamp: isStamp,
  isComposable: isComposable,
  compose: baseStampit.compose
}, allUtilities)

module.exports.methods                   = methods
module.exports.properties                = properties
module.exports.refs                      = properties
module.exports.props                     = properties
module.exports.initializers              = initializers
module.exports.init                      = initializers
module.exports.deepProperties            = deepProperties
module.exports.deepProps                 = deepProperties
module.exports.staticProperties          = staticProperties
module.exports.statics                   = staticProperties
module.exports.staticDeepProperties      = staticDeepProperties
module.exports.deepStatics               = staticDeepProperties
module.exports.configuration             = configuration
module.exports.conf                      = configuration
module.exports.deepConfiguration         = deepConfiguration
module.exports.deepConf                  = deepConfiguration
module.exports.propertyDescriptors       = propertyDescriptors
module.exports.staticPropertyDescriptors = staticPropertyDescriptors
module.exports.compose                   = compose
module.exports.isComposable              = isComposable
module.exports.isStamp                   = isStamp
