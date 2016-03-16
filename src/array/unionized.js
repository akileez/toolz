// arr-union <https://github.com/jonschlinkert/arr-union>
// Copyright (c) 2014-2016, Jon Schlinkert. (MIT)

function unionized (arrs) {
  if (!Array.isArray(arrs)) {
    arrs = [arrs]
  }

  var len = arguments.length
  var i = 0

  while (++i < len) {
    var arg = arguments[i]
    if (!arg) continue

    if (!Array.isArray(arg)) {
      arg = [arg]
    }

    for (var j = 0; j < arg.length; j++) {
      var ele = arg[j]
      if (arrs.indexOf(ele) >= 0) continue
      arrs.push(ele)
    }
  }
  return arrs
}

module.exports = unionized
