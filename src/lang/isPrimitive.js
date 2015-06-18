// checks if the object is a primitive

function isPrimitive (value) {
  // using switch falltrhrough because its simple to read and its
  // generally fast : http://jsperf.com/testing-value-is-primitive/5
  switch (typeof value) {
    case 'string' :
    case 'number' :
    case 'boolean' :
      return true
  }
  return value == null
}

module.exports = isPrimitive
