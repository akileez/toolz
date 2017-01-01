var readFile = require('../file/readFile')
var extend = require('../object/extend')
var YAML = require('./lib/Yaml')

var defaults = {reviver: null, throws: false}
var re = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/

function parse (file, opts, cb) {
  var ext = extName(splitPath)(file)

  if (typeof opts === 'function') {
    cb = opts
    opts = defaults
  } else {
    opts = extend(defaults, opts)
  }

  if (typeof cb === 'function') {
    if (ext === '.yml') return parseYAML(file, cb)
    if (ext === '.json') return parseJSON(file, opts, cb)
    // if not a yaml or json file, assume you are
    // extracting yaml frontmatter from the file
    return fme(file, cb)
  }

  else {
    if (ext === '.yml') return parseYAMLsync(file, opts)
    if (ext === '.json') return parseJSONsync(file, opts)
    // if not a yaml or json file, assume you are
    // extracting yaml frontmatter from the file
    return fmeSync(file)
  }
}

function splitPath (filename) {
  return re.exec(filename).slice(1)
}

function extName (splitPath) {
  return function (path) {
    return splitPath(path)[3]
  }
}

function parseYAML (file, cb) {
  return readFile(file, function (err, data) {
    if (err) return cb(err)
    try {
      var yaml = YAML.parse(data)
    } catch (err0) {
      return cb(err0)
    }

    cb(null, yaml)
  })
}

function parseYAMLsync (file, opts) {
  if (opts.throws) return YAML.parse(readFile(file))
  else {
    try {
      return YAML.parse(readFile(file))
    } catch (err) {
      return null
    }
  }
}

function parseJSON (file, opts, cb) {
  return readFile(file, function (err, data) {
    if (err) return cb(err)
    try {
      var json = JSON.parse(data, opts.reviver)
    } catch (err0) {
      return cb(err0)
    }

    cb(null, json)
  })
}

function parseJSONsync (file, opts) {
  if (opts.throws) return JSON.parse(readFile(file), opts.reviver)
  else {
    try {
      return JSON.parse(readFile(file), opts.reviver)
    } catch (err) {
      return null
    }
  }
}

function fme (input, cb) {
  readFile(input, function (err, res) {
    if (err) return cb(err)
    cb(null, extract(res))
  })
}

function fmeSync (input) {
  return extract(readFile(input))
}

function extract (input) {
  var matter = /^---$([\s\S]*)^---\s/m

  var result = {
    data    : {},
    content : input
  }

  if (input && typeof input === 'string') {
    var matches = input.match(matter)

    if (matches) {
      // yamljs implementation:
      result.data = YAML.parse(matches[1])
      result.content = input.replace(matches[0], '')
    }
  }

  return result
}

module.exports = parse
module.exports.extract = extract
// module.exports.yaml = parseYAML
// module.exports.yamlSync = parseYAMLsync
// module.exports.json = parseJSON
// module.exports.jsonSync = parseJSONsync
// module.exports.fme = fme
// module.exports.fmeSync = fmeSync
