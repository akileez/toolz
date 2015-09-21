// namespace a value and assign to a given object.
// convenience function. I tend to do this often.
// enhance as necessary.

function nsp (obj, key, val) {
  if (!key && !val) return obj
  if (arguments.length === 2 && val == null) {
    val = key
    key = obj
    obj = {}
  }

  obj[key] = val
  return obj
}

module.exports = nsp
