var slice = require('../array/slice')

// Execute the generator function or a generator
// and return a promise.
function co (gen) {
  var ctx = this
  var args = slice(arguments, 1)

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function (resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args)
    if (!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulfilled()

    // @param {Mixed} res, @return {Promise}, @api private
    function onFulfilled (res) {
      var ret

      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }

      next(ret)
      return null
    }

    // @param {Error} err, @return {Promise}, @api private
    function onRejected (err) {
      var ret

      try {
        ret = gen.throw(err)
      } catch (e) {
        return reject(e)
      }

      next(ret)
    }

    // Get the next value in the generator, return a promise.
    function next (ret) {
      if (ret.done) return resolve(ret.value)
      var value = toPromise.call(ctx, ret.value)
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected)

      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'))
    }
  })
}

// Wrap the given generator `fn` into a function that returns a promise.
// This is a separate function so that every `co()` call doesn't create a new,
// unnecessary closure.
co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn
  return createPromise

  function createPromise () {
    var args = slice(arguments)
    return co.call(this, fn.apply(this, args))
  }
}

// Convert a `yield`ed value into a promise.
function toPromise (obj) {
  if (!obj) return obj
  if (isPromise(obj)) return obj
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj)
  if (isFunction(obj)) return thunkToPromise.call(this, obj)
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj)
  if (isObject(obj)) return objectToPromise.call(this, obj)
  return obj
}

// Convert a thunk to a promise.
function thunkToPromise (fn) {
  var ctx = this

  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err)
      if (arguments.length > 2) res = slice(arguments, 1)
      resolve(res)
    })
  })
}

// Convert an array of "yieldables" to a promise.
// Uses `Promise.all()` internally.
function arrayToPromise (obj) {
  return Promise.all(obj.map(toPromise, this))
}

// Convert an object of "yieldables" to a promise.
// Uses `Promise.all()` internally.
function objectToPromise (obj) {
  var results = new obj.constructor()
  var keys = Object.keys(obj)
  var promises = []

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var promise = toPromise.call(this, obj[key])
    if (promise && isPromise(promise)) defer(promise, key)
    else results[key] = obj[key]
  }

  return Promise.all(promises).then(function () {
    return results
  })

  function defer (promise, key) {
    // predefine the key in the result
    results[key] = undefined

    promises.push(promise.then(function (res) {
      results[key] = res
    }))
  }
}

// Check if `obj` is a promise.
function isPromise (obj) {
  return typeof obj.then === 'function'
}

// Check if `obj` is a generator.
function isGenerator (obj) {
  return typeof obj.next === 'function' && typeof obj.throw === 'function'
}

// Check if `obj` is a generator function.
function isGeneratorFunction (obj) {
  var constructor = obj.constructor
  // istanbul ignore if
  if (!constructor) return false
  if (constructor.name === 'GeneratorFunction' || constructor.displayName === 'GeneratorFunction') return true

  return isGenerator(constructor.prototype)
}

// Check for plain object.
function isObject (val) {
  return val.constructor === Object
}

// Check for a function.
function isFunction (val) {
  return typeof val === 'function'
}

module.exports = co
