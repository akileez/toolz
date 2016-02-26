'use strict'

var reduce = require('../array/reduce')

function strt () {
  var reporter = arguments.length <= 0 || arguments[0] === undefined
    ? console.log
    : arguments[0]

  return function () {
    var len = arguments.length
    var tasks = Array(len)
    var i = -1

    while (++i < len) tasks[i] = arguments[i]

    return reduce(tasks, (current, next) => {
      return current.then((output) => {
        const task = next(output)

        // nested Start
        if (task instanceof Promise) return task

        const name = task.name
        let taskPromise

        reporter(name, 'start')

        // catch an errors that are outside of task Promise
        try {
          taskPromise = task(reporter.bind(reporter, name, 'info'))
        } catch (error) {
          reporter(name, 'reject', error)
        }

        return taskPromise
          .then(result => {
            reporter(name, 'resolve')
            return result
          })
          .catch(error => {
            reporter(name, 'reject', error)
            throw error
          })
      })
    }, Promise.resolve())
  }
}

module.exports = strt
