function replaceExt (file, ext) {
  return file.replace(/\.\w+$/, '.' + ext)
}

module.exports = replaceExt
