var assign           = require('./extend')
var merge            = require('./merge')
var isArray          = require('../lang/isArray')
var forEach          = require('../collection/forEach')
var slice            = require('../array/slice')
var isObject         = require('./is-object')
var isComposable     = require('./is-composable')
var extractFunctions = require('./extract-functions')
var stamp            = require('./stamp')

var isDescriptor = isObject

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

module.exports = compose
