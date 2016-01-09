// interface to yamljs -- front matter extraction

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
      // yamljs implementation:
      result.data = yaml.parse(matches[1])
      result.content = input.replace(matches[0], '')
    }
  }

  return result
}

module.exports = extract
