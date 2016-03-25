// adopted from: fast-apply <"https://github.com/JayceTDE/fast-apply>
// copyright: Jayce Pulsipher <jaycemp@gmail.com> (MIT)

// add type check for `function` to prevent errors by using identity

function fastApply (fn, context, args) {
  switch (args ? args.length : 0) {
    case 0:
      return context
        ? fn.call(context)
        : fn()
    case 1:
      return context
        ? fn.call(context, args[0])
        : fn(args[0])
    case 2:
      return context
        ? fn.call(context, args[0], args[1])
        : fn(args[0], args[1])
    case 3:
      return context
        ? fn.call(context, args[0], args[1], args[2])
        : fn(args[0], args[1], args[2])
    case 4:
      return context
        ? fn.call(context, args[0], args[1], args[2], args[3])
        : fn(args[0], args[1], args[2], args[3])
    case 5:
      return context
        ? fn.call(context, args[0], args[1], args[2], args[3], args[4])
        : fn(args[0], args[1], args[2], args[3], args[4])
    case 6:
      return context
        ? fn.call(context, args[0], args[1], args[2], args[3], args[4], args[5])
        : fn(args[0], args[1], args[2], args[3], args[4], args[5])
    default: return fn.apply(context, args)
  }
}

// concept adopted from: https://github.com/wilmoore/apply-or.js
// reasoning: Function.prototype.apply is normally sufficient; however, there are situations where it is useful to treat a value as a Function (invoke it) only if it is indeed a Function; otherwise, return it as-is. Calling .apply on a value that is not a function would cause an error.
function fastApplyNoThrow (fn, context, args) {
  fn = (typeof fn !== 'function')
    ? identity
    : fn

  return fastApply(fn, context, args)
}

function identity (value) {
  return value
}

module.exports = fastApply
module.exports.Or = fastApplyNoThrow
