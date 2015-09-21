// namespace a value and assign to a given object.
// convenience function. I tend to do this often.

// set a top-level (flatten) object property
// differs from `set` in that `obj` is optional and does
// not create nested properties

function nsp (obj, key, val) {
  if (!key && !val) return obj
  if (val == null) {
    val = key
    key = obj
    obj = {}
  }

  obj[key] = val
  return obj
}

module.exports = nsp
