// basic version of ./expander.js but enhanced version of ./interpolate.js
// focused solely on string replacements within objects/arrays/strings.

var kindOf = require('../lang/kindOf')
var get    = require('../object/get')

function interpolate (template, replacements, syntax) {
  return resolve(template, replacements || template, syntax)

  function resolve (template, data, opts) {
    switch (kindOf(template)) {
      case 'array' : return resolveArray(template, data, opts)
      case 'object': return resolveObject(template, data, opts)
      case 'string': return resolveString(template, data, opts)
      default      : return template
    }
  }

  function resolveObject (obj, data, opts) {
    var key
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = resolve(obj[key], data, opts)
      }
    }
    return obj
  }

  function resolveArray (arr, data, opts) {
    var len = arr.length
    var i = -1

    while (++i < len) {
      arr[i] = resolve(arr[i], data, opts)
    }
    return arr
  }

  function resolveString (str, data, opts) {
    var stache = opts || /\{\{([^\}]+)\}\}/g // mustache-like

    function replaceFn (match, prop) {
      var template = get(data, prop)

      return stache.test(template)
        ? template.replace(stache, replaceFn)
        : template
    }

    return str.replace(stache, replaceFn)
  }
}

module.exports = interpolate
