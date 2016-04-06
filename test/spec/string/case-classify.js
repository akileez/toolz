var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-classify')
var t = painless.assert

var classify = require('../../../src/string/case-classify')

test('#classify', function(){
  t.eq(classify(1), '1')
  t.eq(classify('some_class_name'), 'SomeClassName')
  t.eq(classify('my wonderfull class_name'), 'MyWonderfullClassName')
  t.eq(classify('my wonderfull.class.name'), 'MyWonderfullClassName')
  t.eq(classify('myLittleCamel'), 'MyLittleCamel')
  t.eq(classify('myLittleCamel.class.name'), 'MyLittleCamelClassName')
  t.eq(classify(123), '123')
  t.eq(classify(''), '')
  t.eq(classify(null), '')
  t.eq(classify(undefined), '')
})
