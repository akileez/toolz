// adopted from: https://github.com/exponentjs/spawn-async
// Copyright (c) 2015 650 Industries (MIT)

'use strict';

// A Promise-based interface into processes created by child_process.spawn

const spawn = require('child_process').spawn
const slice = require('../array/slice')

module.exports = function spawnAsync () {
  let args = slice(arguments, 0)
  let child
  let promise = new Promise((resolve, reject) => {
    child = spawn.apply(spawn, args)
    let stdout = ''
    let stderr = ''

    if (child.stdout) {
      child.stdout.on('data', data => {
        stdout += data
      })
    }

    if (child.stderr) {
      child.stderr.on('data', data => {
        stderr += data
      })
    }

    child.on('close', (code, signal) => {
      child.removeAllListeners()

      let result = {
        pid: child.pid,
        output: [stdout, stderr],
        stdout: stdout,
        stderr: stderr,
        status: code,
        signal: signal
      }

      if (code) {
        let error = new Error(`Process exited with non-zero code: ${code}`)
        Object.assign(error, result)
        reject(error)
      } else {
        resolve(result)
      }
    })

    child.on('error', error => {
      child.removeAllListeners()
      error.pid = child.pid
      error.output = [stdout, stderr]
      error.stdout = stdout
      error.stderr = stderr
      error.status = error.code
      reject(error)
    })
  })

  promise.child = child
  return promise
}