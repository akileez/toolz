function baseValues (obj, props) {
  var idx = -1
  var len = props.length
  var result = Array(len)

  while (++idx < len) {
    result[idx] = obj[props[idx]]
  }
  return result
}

module.exports = baseValues
