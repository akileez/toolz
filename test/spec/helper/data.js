'use strict'
var painless = require('toolz/test/assertion/painless')
var test = painless.createGroup()
var t = painless.assert

var hb = require('toolz/src/helper/handlebars');
var hbsdap = require('toolz/src/helper/hbs-dap');

var dap = hbsdap(hb, {
	compileOptions: {
    noEscape: true,
    preventIndent: true,
    assumeObjects: true
  }
})

test('should not modify data', () => {
	const wax = dap()

  const defaultData =  Object.keys(wax.context);

	wax.data();

	t.deepEqual(Object.keys(wax.context), defaultData);
});

test('should register data by object', () => {
	const wax = dap()
	const foo = 'hello';
	const bar = 'world';

	wax.data({ foo, bar });

	t.is(wax.context.foo, foo);
	t.is(wax.context.bar, bar);
});

test('should register data by globbed object', () => {
	const wax = dap()

	wax.data('./fixtures/data/object/**/*.{js,json}');

	t.is(wax.context.hello, 'world');
	t.deepEqual(wax.context.good.night, ['chair', 'bear', 'moon']);
});
