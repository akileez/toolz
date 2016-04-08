// https://github.com/landau/merge-with
// Copyright (c) 2014 Trevor Landau (ISC)

'use strict';

var assert = require('assert')
var reduce = require('../array/reduce')

/*
  Returns a map that consists of the rest of the maps transformed into
  the first.  If a key occurs in more than one map, the mapping(s)
  from the latter (left-to-right) will be combined with the mapping in
  the result by calling `fn(val-in-result, val-in-latter)`.

    @param {array} maps - an array of maps
    @param {function} fn
    @return {object}
*/

function mergeWith (maps, fn) {
  assert(Array.isArray(maps), 'object maps must be an Array')
  assert(isFn(fn), 'fn must be of type Function')

  function setKey (obj, val, key) {
    obj[key] = exists(obj[key]) ? fn(obj[key], val) : val
    return obj
  }

  function merge (obj, obj2) {
    return reduce(Object.keys(obj2), (acc, key) => {
      return setKey(acc, obj2[key], key)
    }, obj || {})
  }

  return reduce(maps, merge, {})
}

function exists (val) {
  return val != null;
}

function isFn (fn) {
  return typeof fn === 'function';
}

module.exports = mergeWith
