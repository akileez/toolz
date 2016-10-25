'use strict'

/*
  This is an example implementation of the Stamp Specifications.
  See https://github.com/stampit-org/stamp-specification
  and https://github.com/stampit-org/stampit <stamp-it version 3>
  The code is optimized to be as readable as possible.

  createFactory: Creates new factory instance.
    @param {object} descriptor The information about the object the factory will be creating.
    @returns {Function} The new factory function.

  createStamp: Returns a new stamp given a descriptor and a compose function implementation.
    @param {object} [descriptor={}] The information about the object the stamp will be creating.
    @param {Function} composeFunction The "compose" function implementation.
    @returns {Function}

  mergeComposable: Mutates the dstDescriptor by merging the srcComposable data into it.
    @param {object} dstDescriptor The descriptor object to merge into.
    @param {object} [srcComposable] The composable (either descriptor or stamp) to merge data form.
    @returns {object} Returns the dstDescriptor argument.

  compose: Given the list of composables (stamp descriptors and stamps) returns a new stamp (composable factory function).
    @param {...(object|Function)} [composables] The list of composables.
    @returns {Function} A new stamp (aka composable factory function).
*/

const isFunction   = require('../lang/isFunction')
const isObject     = require('./is-object')
const isComposable = require('./is-composable')
const merge        = require('./merger')
const assign       = require('./assign')
const slice        = require('../array/slice')
const reduce       = require('../array/reduce')
const filter       = require('../array/filter')
const apply        = require('../function/apply')

function createFactory (descriptor) {
  return function Stamp (options) {
    let args = slice(arguments, 1)
    const obj = Object.create(descriptor.methods || {})

    merge(obj, descriptor.deepProperties)
    assign(obj, descriptor.properties)
    Object.defineProperties(obj, descriptor.propertyDescriptors || {})

    if (!descriptor.initializers || descriptor.initializers.length === 0) return obj

    if (options === undefined) options = {}

    return reduce(filter(descriptor.initializers, isFunction), (resultingObj, initializer) => {
      const returnedValue = initializer.call(resultingObj, options,
        {instance: resultingObj, stamp: Stamp, args: [options].concat(args)})

      return returnedValue === undefined
        ? resultingObj
        : returnedValue
    }, obj)
  }
}

function createStamp (descriptor, composeFunction) {
  const Stamp = createFactory(descriptor)

  merge(Stamp, descriptor.staticDeepProperties)
  assign(Stamp, descriptor.staticProperties)
  Object.defineProperties(Stamp, descriptor.staticPropertyDescriptors || {})

  const composeImplementation = isFunction(Stamp.compose)
    ? Stamp.compose
    : composeFunction

  Stamp.compose = function _compose () {
    let args = slice(arguments)
    return apply(composeImplementation, this, args)
  }

  assign(Stamp.compose, descriptor)

  return Stamp
}

function mergeComposable (dstDescriptor, srcComposable) {
  const srcDescriptor = (srcComposable && srcComposable.compose) || srcComposable
  if (!isComposable(srcDescriptor)) return dstDescriptor

  const combineProperty = (propName, action) => {
    if (!isObject(srcDescriptor[propName])) return
    if (!isObject(dstDescriptor[propName])) dstDescriptor[propName] = {}
    action(dstDescriptor[propName], srcDescriptor[propName])
  }

  combineProperty('methods', assign)
  combineProperty('properties', assign)
  combineProperty('deepProperties', merge)
  combineProperty('propertyDescriptors', assign)
  combineProperty('staticProperties', assign)
  combineProperty('staticDeepProperties', merge)
  combineProperty('staticPropertyDescriptors', assign)
  combineProperty('configuration', assign)
  combineProperty('deepConfiguration', merge)

  if (Array.isArray(srcDescriptor.initializers)) {
    dstDescriptor.initializers = reduce(srcDescriptor.initializers, (result, init) => {
      if (isFunction(init) && result.indexOf(init) < 0) result.push(init)
      return result
    }, Array.isArray(dstDescriptor.initializers) ? dstDescriptor.initializers : [])
  }

  return dstDescriptor
}

module.exports = function compose () {
  let composables = slice(arguments)
  const descriptor = reduce(filter([this].concat(composables), isObject), mergeComposable, {})
  return createStamp(descriptor, compose)
}
