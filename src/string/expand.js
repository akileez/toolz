// really basic version of ./expander.js. focused solely
// on string replacements within objects/arrays/strings.

var kindOf = require('../lang/kindOf')
var look   = require('../object/look')

function interpolate (template, replacements, syntax) {
  return resolve(template, replacements || template, syntax)

  function resolve (template, data, opts) {
    switch (kindOf(template)) {
      case 'array' :
      case 'object': return resolveObject(template, data, opts)
      case 'string': return resolveString(template, data, opts)
      default      : return template
    }
  }

  function resolveObject (obj, data, opts) {
    Object.keys(obj).forEach(function (key, idx, arr) {
      obj[key] = resolve(obj[key], data, opts)
    })
    return obj
  }

  function resolveString (str, data, opts) {
    var stache = opts || /\{\{([^\}]+)\}\}/g // mustache-like

    function replaceFn (match, prop) {
      var template = look(data, prop)

      return stache.test(template)
        ? template.replace(stache, replaceFn)
        : template
    }

    return str.replace(stache, replaceFn)
  }
}

module.exports = interpolate
