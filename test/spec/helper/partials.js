'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup()
var t = painless.assert

var hb = require('../../../src/helper/handlebars');
var hbsdap = require('../../../src/helper/hbs-dap');

var dap = hbsdap(hb, {
	compileOptions: {
    noEscape: true,
    preventIndent: true,
    assumeObjects: true
  }
})

test('should not modify partials', () => {
	const wax = dap()
	var defaultPartials = Object.keys(hb.partials)
	wax.partials().partials('./fixtures/helpers/bogu*.js');

	t.deepEqual(Object.keys(hb.partials), defaultPartials);
});

test('should register partials by factory', () => {
	const wax = dap()

	function foo() {}
	function bar() {}

	wax.partials({
		register: function (handlebars) {
			t.is(handlebars, hb);
			handlebars.registerPartial('foo', foo);
		}
	});

	wax.partials({
		register: function (handlebars) {
			t.is(handlebars, hb);
			return { bar };
		}
	});

	t.is(hb.partials.foo, foo);
	t.is(hb.partials.bar, bar);
});

test('should register partials by function', () => {
	const wax = dap()

	function foo() {}
	function bar() {}

	wax.partials(function (handlebars) {
		t.is(handlebars, hb);
		handlebars.registerPartial('foo', foo);
	});

	wax.partials(function (handlebars) {
		t.is(handlebars, hb);
		return { bar };
	});

	t.is(hb.partials.foo, foo);
	t.is(hb.partials.bar, bar);
});

test('should register partials by object', () => {
	const wax = dap()

	function foo() {}
	function bar() {}

	wax.partials({ foo, bar });

	t.is(hb.partials.foo, foo);
	t.is(hb.partials.bar, bar);
});

test('should register partials by globbed factory', () => {
	const wax = dap()

	wax.partials('./fixtures/partials/factory/**/*.js');

	t.is(typeof hb.partials.item, 'string');
	t.is(typeof hb.partials.link, 'string');
	t.is(typeof hb.partials.layout, 'string');
	t.is(typeof hb.partials['layout-2col'], 'string');
});

test('should register partials by globbed function', () => {
	const wax = dap()

	wax.partials('./fixtures/partials/function/**/*.{hbs,js}');

	t.is(typeof hb.partials['components/item'], 'function');
	t.is(typeof hb.partials['components/link'], 'function');
	t.is(typeof hb.partials.layout, 'function');
	t.is(typeof hb.partials['layout-2col'], 'function');
});

test('should register partials by globbed object', () => {
	const wax = dap()

	wax.partials('./fixtures/partials/object/**/*.js');

	t.is(typeof hb.partials.item, 'string');
	t.is(typeof hb.partials.link, 'string');
	t.is(typeof hb.partials.layout, 'string');
	t.is(typeof hb.partials['layout-2col'], 'string');
});

test('should raise errors', () => {
	const wax = dap()
	const waxedTemplate = wax.compile('{{> kmx}}');

	t.throws(() => waxedTemplate(), /could not be found/i);
});

test('should cause cross-contamination', () => {
	// because these are not separate instances
	// when run in isolation or using a separate instance of handlebars
	// this test is true
	const wax = dap()
	t.isnt(Object.keys(wax.handlebars.partials).length, 0);
});
