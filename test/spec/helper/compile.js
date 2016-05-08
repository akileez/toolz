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

test('should pre-fill template-string data', () => {
	const wax = dap()
	const waxedTemplate = wax.compile('{{foo}} {{bar}} {{baz}}');

	wax.data({ foo: 'hello', bar: 'world' });

	t.is(waxedTemplate(), 'hello world ');
	t.is(waxedTemplate({ foo: 'a' }), 'a world ');
	t.is(waxedTemplate({ bar: 'b' }), 'hello b ');
	t.is(waxedTemplate({ baz: 'c' }), 'hello world c');
});

test('should pre-fill template-function data', () => {
	const wax = dap()
	const template = hb.compile('{{foo}} {{bar}} {{baz}}');
	const waxedTemplate = wax.compile(template);

	wax.data({ foo: 'hello', bar: 'world' });

	t.is(template(), '  ');
	t.is(template({ foo: 'a' }), 'a  ');
	t.is(template({ bar: 'b' }), ' b ');
	t.is(template({ baz: 'c' }), '  c');

	t.is(waxedTemplate(), 'hello world ');
	t.is(waxedTemplate({ foo: 'a' }), 'a world ');
	t.is(waxedTemplate({ bar: 'b' }), 'hello b ');
	t.is(waxedTemplate({ baz: 'c' }), 'hello world c');
});

test('should set registered data as _parent', () => {
	const wax = dap()
	const waxedTemplate = wax.compile('{{_parent.foo}} {{foo}}');

	wax.data({ foo: 'hello' });

	t.is(waxedTemplate({ foo: 'world' }), 'hello world');
});

test('should set registered data as @root', () => {
	const wax = dap()
	const waxedTemplate = wax.compile('{{@root.foo}} {{foo}}');

	wax.data({ foo: 'hello' });

	t.is(waxedTemplate({ foo: 'world' }), 'hello world');
});

test('should prefer user-specified @root', () => {
	const wax = dap()
	const waxedTemplate = wax.compile('{{foo}} {{_parent.foo}} {{@root.foo}} {{@root._parent.foo}}');

	wax.data({ foo: 'hello' });

	t.is(waxedTemplate({ foo: 'world' }, { data: { root: { foo: 'bye' } } }), 'world hello bye hello');
});
