/**
Copyright (c) hemanth <hemanth.hm@gmail.com> (h3manth.com)
https://github.com/hemanth/timeout-thunk

USAGE:
  if (!conf.meta.noPush) {
    process.stdout.write(blk('  repo: ') + red('username and password needed for https push') + '\n\n')
    tim(200)(function () {
      gitPush()
    })
  } else {
    msgDone()
  }
*/

function timout (ms) {
  return function (func) {
    return setTimeout(func, ms)
  }
}

module.exports = timout