var fs = require('fs')
var path = require('path')

function expandFileList (filePaths, include, exclude) {
  var output = []

  filePaths.forEach(function (filePath) {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      var dirListing = fs.readdirSync(filePath).map(function (file) {
        return path.join(filePath, file)
      })
      output = output.concat(expandFileList(dirListing, include, exclude))
    } else {
      if (fileShouldBeIncluded(filePath, include, exclude)) {
        output.push(filePath)
      }
    }
  })
  return output
}

function fileShouldBeIncluded (relativePath, include, exclude) {
  // defaults
  var included = true
  var excluded = false

  // exclude expression passed
  if (exclude) {
    if (!(exclude instanceof RegExp)) throw new Error("pass a RegExp")
    excluded = exclude.test(relativePath)
  }

  // include expression passed
  if (include) {
    if (!(include instanceof RegExp)) throw new Error("pass a RegExp")
    included = include.test(relativePath)
  }

  return included && !excluded
}