'use strict'

const painless = require('../../assertion/painless')
const test = painless.createGroup('Test random/cuid')
const t = painless.assert

const cuid = require('../../../src/random/cuid')
const slug = cuid.slug

const MAX = 1200 // 000

const collisionTest = (fn) => {
  let i = 0
  let ids = {}
  let pass = true

  while (i < MAX) {
    let id = fn()

    if (!ids[id]) {
      ids[id] = id
    } else {
      pass = false
      console.log('Failed at ' + i + ' iterations.')
      break
    }

    i++
  }

  return pass
}

test('should return a string', () => {
  t.ok(typeof cuid() === 'string')
})

test('should not collide', () => {
  t.ok(collisionTest(cuid))
})

test('slugs should not collide', () => {
  t.ok(collisionTest(slug))
})
