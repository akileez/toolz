// adopted from: fast-apply <https://github.com/JayceTDE/fast-apply>
// copyright: Jayce Pulsipher <jaycemp@gmail.com> (MIT)

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

module.exports = fastApply
