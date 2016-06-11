// https://github.com/therealklanni/browser-fingerprint (MIT)
// this module will be deprecated in this library. use actual module
// for use in the browser

'use strict'

const pad = (str, size) => (new Array(size + 1).join('0') + str).slice(-size)

const globalCount = () => {
  let count = 0
  const window = window || global

  for (let i in window) {
    count++
  }

  return count
}

// for testing purposes only!!!
let ver = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3`
let platform = `AppleWebKit/537.36 (KHTML, like Gecko)`
let ext = `Chrome/43.0.2357.130 Safari/537.36`

global.navigator = {
  mimeTypes: new Array(8),
  userAgent: `${ver} ${platform} ${ext}`
}

const navi = navigator.mimeTypes.length + navigator.userAgent.length

const fingerprint = pad(navi.toString(36) + globalCount.toString(36), 4)

module.exports = () => fingerprint