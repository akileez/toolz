'use strict'

function postprocess (plugins, userOptions) {
  if (plugins === undefined) plugins = []
  return (input) => {
    return function postcss (log) {
      // reminder: need postcss globally
      const Postcss = require('postcss')
      const extend = require('../src/object/extend')
      const map = require('../src/array/map')

      return Promise.all(
        map(input, (file) => {
          const options = extend({}, userOptions, {
            from: file.path,
            to: file.path
          })

          if (options.map) {
            options.map = extend({
              inline: false
            }, options.map)
          }

          if (file.map !== null) {
            options.map = extend({}, options.map, {
              prev: file.map
            })
          }

          return Postcss(plugins).process(file.data, options).then((result) => {
            log(file.path)

            result.warnings().forEach((msg) => {
              log(msg.toString())
            })

            return {
              path: file.path,
              data: result.css,
              map: result.map || null
            }
          })
        })
        // input.map(file => {
        //   const options = extend({}, userOptions, {
        //     from: file.path,
        //     to: file.path
        //   })

        //   if (options.map) {
        //     options.map = extend({
        //       inline: false
        //     }, options.map)
        //   }

        //   if (file.map !== null) {
        //     options.map = extend({}, options.map, {
        //       prev: file.map
        //     })
        //   }

        //   return Postcss(plugins).process(file.data, options).then(result => {
        //     log(file.path)

        //     result.warnings().forEach(msg => {
        //       log(msg.toString())
        //     })

        //     return {
        //       path: file.path,
        //       data: result.css,
        //       map: result.map || null
        //     }
        //   })
        // })
      )
    }
  }
}

module.exports = postprocess
