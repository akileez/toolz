// adopted from:
//   object-visit <https://github.com/jonschlinkert/object-visit>
//   map-visit <https://github.com/jonschlinkert/map-visit>
//   collection-visit <https://github.com/jonschlinkert/collection-visit>
// Copyright (c) 2015, Jon Schlinkert -- MIT

// var isObjectLike = require('../lang/isObjectLike')
// var assert = require('assert')

function visit (collection, method, target) {
  // assert(isObjectLike(target), 'Expected an array or object as the target')

  if (Array.isArray(target)) {
    visitArr(collection, method, target)
  } else {
    visitObj(collection, method, target)
  }

  return collection
}

function visitArr (collection, method, target) {
  target.forEach(function (val) {
    visitObj(collection, method, val)
  })
}

function visitObj (collection, method, target) {
  for (var key in target) {
    if (target.hasOwnProperty(key)) {
      collection[method](key, target[key])
    }
  }
  return collection
}

module.exports = visit
