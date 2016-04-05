var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/splice')
var t = painless.assert

var splice = require('../../../src/string/splice')

test('#splice', function(){
  t.eq(splice('https://edtsech@bitbucket.org/edtsech/underscore.strings', 30, 7, 'epeli'),
         'https://edtsech@bitbucket.org/epeli/underscore.strings')
  t.eq(splice(12345, 1, 2, 321), '132145', 'Non strings')
})
