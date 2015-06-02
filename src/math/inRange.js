// checks if value is inside the range

function inRange (val, min, max, theshold) {
  theshold = theshold || 0
  return (val + theshold >= min && val - theshold <= max)
}

module.exports = inRange
