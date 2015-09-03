var readFile  = require('../file/readFile')
var writeFile = require('../file/writeFile')

// for use with revAssets or make generic

function revReplace (files, manifest) {
  files = Array.isArray(files) ? files : [files]

  return files.forEach(function (file) {
    var revision
    var matches
    var original

    revision = readFile(file, 'utf8')
    original = revision

    matches = revision.match(/url\(\s*['"]?([^'"\)]+)['"]?\s*\)/g)
      || revision.match(/(?:src|href)="(\S+)"/g)

    if (!matches) return

    matches.forEach(function (item) {
      var key
      var results = []

      for (key in manifest) {
        results.push(revision = revision.replace(key, manifest[key].path))
      }
      return results
    })

    if (original !== revision) {
      return writeFile(file, revision)
    }
  })
}

module.exports = revReplace
