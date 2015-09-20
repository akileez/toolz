// adopted from: app-base <https://github.com/jonschlinkert/app-base
// Copyright (c) 2015, Jon Schlinkert (MIT)

var util = require('util')
var set = require('../object/set')
var get = require('../object/get')
var del = require('../object/unset')
var define = require('../lang/defineProperty')

function App (options) {
  if (!(this instanceof App)) return new App(options)
  if (typeof options === 'object') this.visit('set', options)
}

App.prototype = {
  constructor: App,
  set: setter,
  get: getter,
  del: unset,
  define: demarcate,
  visit: visitor
}

App.extend = function (Ctor, proto) {
  util.inherits(Ctor, App)
  var key
  for (key in App) {
    Ctor[key] = App[key]
  }

  if (typeof proto === 'object') {
    var obj = Object.create(proto)
    var k
    for (k in obj) {
      Ctor.prototype[k] = obj[k]
    }
  }
}

function setter (key, value) {
  if (typeof key === 'object') this.visit('set', key, value)
  else set(this, key, value)
  return this
}

function getter (key) {
  return key ? get(this, key) : this
}

function unset (key) {
  if (typeof key === 'object') this.visit('del', key)
  else del(this, key)
  return this
}

function demarcate (key, value) {
  define(this, key, value)
  return this
}

function visitor (methos, val) {
  if (Array.isArray(val)) return val.forEach(this.visit.bind(this, methos))
  for (var key in val) this[methos](key, val[key])
  return this
}

module.exports = App
