function apply (fn) {
  var args = baseSlice(arguments, 1)
  return function () {
    return fn.apply(null, args.concat(baseSlice(arguments)))
  }
}