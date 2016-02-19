function fnName (val) {
  function named (fn) {
    // regex from `parse-function@2.2.x`
    var re = /(?:function\s*([\w$]*)\s*)*\(*(?:[\w\s,$]*)\)*(?:[\s=>]*)(?:[\s\S]*)/
    var type = Object.prototype.toString.call(fn).slice(8, -1)

    if (type === 'Function') return (re.exec(fn) || [])[1]
    if (type === 'Object'
      && fn.constructor
      && typeof fn.constructor.name === 'string'
    ) return fn.constructor.name

    return type
  }

  return val.displayName
    || val.name
    || named(val)
    || 'anonymous'
}

module.exports = fnName
