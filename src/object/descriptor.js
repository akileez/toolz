'use strict'

const isObject         = require('./is-object')
const extractFunctions = require('./extract-functions')
const merge            = require('./merger')
const assign           = require('./assign')

function stdesc () {
  let ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0]

  let methods                   = ref.methods
  let properties                = ref.properties
  let props                     = ref.props
  let refs                      = ref.refs
  let initializers              = ref.initializers
  let init                      = ref.init
  let deepProperties            = ref.deepProperties
  let deepProps                 = ref.deepProps
  let propertyDescriptors       = ref.propertyDescriptors
  let staticProperties          = ref.staticProperties
  let statics                   = ref.statics
  let staticDeepProperties      = ref.staticDeepProperties
  let deepStatics               = ref.deepStatics
  let staticPropertyDescriptors = ref.staticPropertyDescriptors
  let configuration             = ref.configuration
  let conf                      = ref.conf
  let deepConfiguration         = ref.deepConfiguration
  let deepConf                  = ref.deepConf

  const p = isObject(props) || isObject(refs) || isObject(properties)
    ? assign({}, props, refs, properties)
    : undefined

  let dp = isObject(deepProps)
    ? merge({}, deepProps)
    : undefined

  dp = isObject(deepProperties)
    ? merge(dp, deepProperties)
    : dp

  const sp = isObject(statics) || isObject(staticProperties)
    ? assign({}, statics, staticProperties)
    : undefined

  let dsp = isObject(deepStatics)
    ? merge({}, deepStatics)
    : undefined

  dsp = isObject(staticDeepProperties)
    ? merge(dsp, staticDeepProperties)
    : dsp

  const c = isObject(conf) || isObject(configuration)
    ? assign({}, conf, configuration)
    : undefined

  let dc = isObject(deepConf)
    ? merge({}, deepConf)
    : undefined

  dc = isObject(deepConfiguration)
    ? merge(dc, deepConfiguration)
    : dc

  return {
    methods: methods,
    properties: p,
    initializers: extractFunctions(init, initializers),
    deepProperties: dp,
    staticProperties: sp,
    staticDeepProperties: dsp,
    propertyDescriptors: propertyDescriptors,
    staticPropertyDescriptors: staticPropertyDescriptors,
    configuration: c,
    deepConfiguration: dc
  }
}

module.exports = stdesc
