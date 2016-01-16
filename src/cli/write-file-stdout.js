// https://github.com/ianstormtaylor/write-file-stdout

var writeFile = require('../file/writeFile')

// Write `contents` to a `file`, falling back to stdout.

function write (file, contents) {
  if (arguments.length === 1) {
    contents = file
    file = null
  }

  if (file) return writeFile(file, contents)
  process.stdout.write(contents)
}

module.exports = write
