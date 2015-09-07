var kindOf = require('../lang/kindOf')

function converObjToString (obj) {
  var str = []
  switch (kindOf(obj)) {
    case 'object':
      str.push('{')
      Object.keys(obj).forEach(function (prop, idx, arr) {
        if (idx !== arr.length - 1)
          str.push(prop, ': ', converObjToString(obj[prop]), ', ')
        else
          str.push(prop, ': ', converObjToString(obj[prop]))
      })
      str.push('}')
      return str.join('')

    case 'array' :
      str.push('[')
      Object.keys(obj).forEach(function (prop, idx, arr) {
        if (idx !== arr.length - 1)
          str.push(converObjToString(obj[prop]), ', ')
        else
          str.push(converObjToString(obj[prop]))
      })
      str.push(']')
      return str.join('')

    case 'function':
      str.push(obj.toString())
      return str.join('')

    default:
      // will do other stuff later. want to test the above.
      return obj
  }
}

module.exports = converObjToString
