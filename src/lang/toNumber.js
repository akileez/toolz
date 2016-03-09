function toNumber (value) {
  if (typeof value === 'number') return value
  if (!value) return 0
  if (typeof value === 'string') return parseFloat(value)
  if (Array.isArray(value)) return NaN
  return Number(value)
}

module.exports = toNumber
