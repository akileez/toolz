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

test('should not modify helpers', () => {
	const wax = dap()
	const defaultHelpers = Object.keys(hb.helpers)

	wax.helpers().helpers('./fixtures/helpers/bogu*.js');

	t.deepEqual(Object.keys(hb.helpers), defaultHelpers);
});

test('should register helpers by object', () => {
	const wax = dap()

	function foo() {}
	function bar() {}

	wax.helpers({ foo, bar });

	t.is(hb.helpers.foo, foo);
	t.is(hb.helpers.bar, bar);
});

test('should register helpers by globbed factory', () => {
	const wax = dap()

	wax.helpers('./fixtures/helpers/factory/**/*.js');

	t.is(typeof hb.helpers.lower, 'function');
	t.is(typeof hb.helpers.upper, 'function');
	t.is(typeof hb.helpers.lest, 'function');
	t.is(typeof hb.helpers.when, 'function');
	t.is(hb.helpers.empty, undefined);
});

test('should register helpers by globbed function', () => {
	const wax = dap()

	wax.helpers('./fixtures/helpers/function/**/*.{hbs,js}');

	t.is(typeof hb.helpers.lower, 'function');
	t.is(typeof hb.helpers.upper, 'function');
	t.is(typeof hb.helpers['flow-lest'], 'function');
	t.is(typeof hb.helpers['flow-when'], 'function');
	t.is(hb.helpers.empty, undefined);
});

test('should register helpers by globbed object', () => {
	const wax =dap()

	wax.helpers('./fixtures/helpers/object/**/*.js');

	t.is(typeof hb.helpers.lower, 'function');
	t.is(typeof hb.helpers.upper, 'function');
	t.is(typeof hb.helpers.lest, 'function');
	t.is(typeof hb.helpers.when, 'function');
	t.is(hb.helpers.empty, undefined);
});

test('should raise errors', function () {
	const wax = dap()
	// does not clear out other helpers. the handlebars instance is the same
	// using a different helper name to confirm test
	const template = wax.compile('{{kmx "bar"}}');

	t.throws(() => {return template()}, /missing helper/i);
});
