var toString = require('../lang/toString')
var get = require('../object/get')

var stache = /\{\{([^\}]+)\}\}/g // mustache-like

function interpolate (template, replacements, syntax) {
  template = toString(template)
  var replaceFn = function (match, prop) {
    // return toString(get(replacements, prop))
    var template = toString(get(replacements, prop))
    return stache.test(template)
      ? template.replace(syntax || stache, replaceFn)
      : toString(get(replacements, prop))
  }

  return template.replace(syntax || stache, replaceFn)
}

module.exports = interpolate
