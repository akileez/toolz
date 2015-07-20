// Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk) (MIT)
// is-async-function <https://github.com/tunnckoCore/is-async-function>

'use strict'

function isAsyncFn (fn, max) {
  if (typeof fn !== 'function')
    throw new TypeError('isAsyncFn expects a function')

  var fnStr = fn.toString().slice(8, Number(max) || 100)
  return fnStr.indexOf('callback') !== -1
    || fnStr.indexOf('cb') !== -1
    || fnStr.indexOf('done') !== -1
    || fnStr.indexOf('next') !== -1
}

module.exports = isAsyncFn
