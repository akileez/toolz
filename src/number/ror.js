function ror (val, shift) {
  return (val >> shift) | (val << (32 - shift))
}

module.exports = ror
