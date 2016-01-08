var yaml = require('./lib/Yaml')

function extract (input) {
  var matter = /^---$([\s\S]*)^---\s/m

  var result = {
    data: {},
    content: input
  }

  if (input && typeof input === 'string') {
    var matches = input.match(matter)

    if (matches) {
      // js-yaml implementation:
      // result.data = yaml.safeLoad(matches[1])

      // yamljs implementation:
      result.data = yaml.parse(matches[1])

      result.content = input.replace(matches[0], '')
    }
  }

  return result
}

// Exposing yamljs
module.exports = yaml
module.exports.extract = extract

// methods on yamljs:
// exports.load = yaml.load
// exports.parse = yaml.parse
// exports.stringify = yaml.stringify
