// returns the input string clipped from the left side
// in order to meet the specified `width`

function clipLeft (str, width, prefix) {
  prefix = prefix || '…'

  return (str.length > width)
    ? prefix + str.slice(width - prefix.length)
    : str
}

module.exports = clipLeft
