function toArray (value) {
  if (value === null || value === undefined) return []
  else if (typeof value.length === 'number' &&  isArguments(value)) return Array.prototype.slice.call(value)
  else return Array.isArray(value) ? value : [ value ]
}

module.exports = toArray
