var rename = require('./rename')

function revPath (fp, hash) {
  return rename(fp, function (filename, ext) {
    return [filename, '-', hash, ext].join('')
  })
}

function revert (fp, hash) {
  return rename(fp, function (filename, ext) {
    return filename.replace(new RegExp('-' + hash + '$'), '') + ext
  })
}

module.exports = revPath
module.exports.revert = revert
