// a recursive method to add multiple ansi colored styles to
// a string of text. extracted from jsome/json-colorz

/*
    var str = 'Hello World'
    var showMe = useColorProvider(str, ['bold', 'red'])
    console.log(showMe)
    --> prints 'Hello World' in bold red text
*/

var colorz = require('../util/colorz')

function useColorProvider (str, style) {
  if (!style) return str

  if (Array.isArray(style) && style.length > 1) {
    return useColorProvider(colorz[style[0]](str), style.slice(1))
  } else {
    return colorz[Array.isArray(style) ? style[0] : style](str)
  }
}

module.exports = useColorProvider
