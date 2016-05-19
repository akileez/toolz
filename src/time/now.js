// get the current time in milliseconds

// function now () {
//   return now.get()
// }

// now.get = (typeof Date.now === 'function') ? Date.now : function () {
//   return +(new Date())
// }

function now () {
  return +(new Date())
}

module.exports = now
