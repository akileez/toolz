// **Github:** https://github.com/zensh/jsbench
// **License:** MIT

'use strict'

var thunks = require('../function/thunks')
var clr    = require('../util/colorz')

function factory (thunks) {

  var thunk = thunks()

  function forEach (array, iterator) {
    var i = -1
    var len = array >= 0 ? array : array.length

    while (++i < len) iterator(array[i], i)
  }

  // function forEach (array, iterator) {
  //   for (var i = 0, len = array >= 0 ? array : array.length; i < len; i++) iterator(array[i], i)
  // }

  function JSBench () {
    this._list = []
    this._events = {}
  }

  JSBench.prototype.on = function (type, listener) {
    this._events[type] = this._events[type] || []
    this._events[type].push(listener)
    return this
  }

  JSBench.prototype.trigger = function (type, value) {
    var events = this._events[type]
    if (!events) return this
    forEach(events, function (listener) {
      listener(value)
    })
    return this
  }

  JSBench.prototype.add = function (name, test) {
    this._list.push({name: name, test: test})
    return this
  }

  JSBench.prototype.run = function (cycles) {
    var ctx = this
    var list = ctx._list

    cycles = cycles >= 1 ? Math.floor(cycles) : 10
    if (!ctx._events.error) { // 如果未定义，则使用默认的 error 监听
      ctx.on('error', function (e) {
        console.error(e.name + ' error: ' + e.error)
      })
    }
    if (!ctx._events.complete) { // 如果未定义，则使用默认的 complete 监听
      ctx.on('complete', function (e) {
        console.log('\nJSBench Results:')
        forEach(e.ranking, function (test) {
          console.log(' ' + clr.grey(test.name) + ': ' + test.message)
        })
        console.log(e.result)
      })
    }

    // 按顺序串行执行各个测试
    console.log('\nJSBench Start, ' + clr.blue(cycles) + ' cycles:')
    return thunk.seq(list.map(function (test) {
      // 异步执行每一个测试
      return function (callback) {
        return thunk.delay()(function () {
          console.log(' Test ' + clr.yellow(test.name) + '...')
          test.startTime = Date.now()
          test.cycles = test.error = test.endTime = test.ops = null

          var cycleQueue = []
          var testFn = !test.test.length ? test.test : function () { return test.test }
          forEach(cycles, function (_, index) {
            cycleQueue.push(function (callback) {
              var time = Date.now()
              // 异步执行测试的每一个循环
              return thunk.delay()(function () {
                return testFn()
              })(function (error) {
                if (error) throw error
                test.cycles = index + 1
                if (ctx._events.cycle) ctx.trigger('cycle', {name: test.name, cycle: index + 1, time: Date.now() - time})
              })(callback)
            })
          })

          return thunk.seq(cycleQueue)(function (error) {
            if (error == null) test.endTime = Date.now()
            else {
              test.error = error
              ctx.trigger('error', {name: test.name, error: error})
            }
          })
        })(callback)
      }
    }))(function (error) {
      if (error) {
        ctx.trigger('error', {name: 'JSBench', error: error})
        throw error
      }

      var result
      var base
      var ms
      var ranking = list.slice()
      // 测试完毕，计算结果
      forEach(list, function (test) {
        if (test.error) test.message = test.error
        else {
          ms = (test.endTime - test.startTime) / test.cycles
          test.ops = 1000 / ms
          test.message = clr.green(test.cycles) + ' cycles, ' + clr.green(ms) + ' ms/cycle, ' + clr.green(test.ops.toFixed(3)) + ' ops/sec'
        }
      })
      // 对结果进行排序对比
      ranking.sort(function (a, b) {
        return a.ops - b.ops
      })

      forEach(ranking, function (test) {
        if (!test.ops) return
        if (base) result += ' ' + clr.magenta(test.name) + ': ' + (test.ops * 100 / base).toFixed(2) + '%;\n'
        else {
          base = test.ops
          result = '\n ' + test.name + ': 100%;\n'
        }
      })

      ctx.trigger('complete', {result: result, ranking: ranking})
      console.log('\nJSBench Completed!')
      return ranking
    })
  }

  return JSBench
}

module.exports = factory(thunks)
