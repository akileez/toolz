// adopted from map-config <https://github.com/doowb/map-config>
// Copyright (c) 2015, Brian Woodward

var stampit  = require('../object/stampit')
var kindOf   = require('../lang/kindOf')
var flatten  = require('../array/flatten')
var slice    = require('../array/slice')
var forEach  = require('../collection/forEach')

module.exports = stampit()
  .methods({
    register: map,
    alias: alias,
    process: process,
    addKey: addKey
  })
  .init([
    function () {
      define(this, 'isQConfig', true)
      this.tasks = {}
      this.keys = []
      this.aliases = {}
      this.queue = {}
    }
  ])

function map (key, val) {
  // allow passing another map-config object in as a value
  if (isQConfig(val)) {
    this.register(key, function(cfg) {
      return val.process(cfg);
    })
    return this.addKey(key, val.keys)
  }

  if (typeof val !== 'function') {
    val = this.tasks[key] || this.aliases[key]
  }

  this.queue[key] = val
  this.addKey(key)
  return this
}

function alias (alias, key) {
  this.aliases[alias] = key
  this.addKey(alias)
  return this
}

function process (args) {
  args = args || {}
  var key

  forEach(this.aliases, (val, key) => {
    var alias = this.aliases[key]
    this.register(key, chk(this.queue[alias]) || this.tasks[alias])
  })

  forEach(args, (val, key) => {
    if (typeof this.queue[key] === 'function') {
      this.queue[key].call(this, args[key])
    }
    if (Array.isArray(this.queue[key])) {
      var len = this.queue[key].length
      var i = -1
      while (++i < len) this.queue[key][i].call(this, args[key][i])
    }
  })

  function chk (value) {
    return typeof value === 'function'
      ? value
      : undefined
  }
}

function addKey (key, arr) {
  var idx = this.keys.indexOf(key)

  if (Array.isArray(arr)) {
    if (idx === -1) {
      this.keys = this.keys.concat(arr.map(function(val) {
        return [key, val].join('.')
      }))
    } else {
      this.keys.splice(idx, 1)
      var vals = arr.map(function(val) {
        return [key, val].join('.')
      })
      .filter(function(val) {
        return this.keys.indexOf(val) === -1
      }.bind(this))

      this.keys.push.apply(this.keys, vals)
    }
  } else if (idx === -1) {
    this.keys.push(key)
  }

  return this
}

function isQConfig (val) {
  return val
    && typeof val === 'object'
    && val.isQConfig === true
}

function define (obj, prop, val) {
  Object.defineProperty(obj, prop, {
    enumerable: false,
    configurable: true,
    value: val
  })
}

