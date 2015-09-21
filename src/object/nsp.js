// namespace a value and assign to a given object.
// convenience function. I tend to do this often.
// enhance as necessary.

function nsp (obj, key, val) {
  obj[key] = val
  return obj
}

module.exports = nsp
