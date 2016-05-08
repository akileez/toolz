'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup()
var t = painless.assert

var hbwax = require('../../../src/helper/hbs-dap')
var hb = require('../../../src/helper/handlebars')

// this test is for handlebars version >= 4

test('should not modify decorators', () => {
	const wax = hbwax([hb, {
	  compileOptions: {
	    noEscape: true,
	    preventIndent: true,
	    assumeObjects: true
	  }
  }])
  // const defaultDecorators = Object.keys(hb.decorators)

	wax.decorators().decorators('./fixtures/decorators/bogu*.js');

	t.deepEqual(Object.keys(hb.decorators), defaultDecorators);
});

test('should register decorators by object', () => {
	const wax = hbwax([hb, {
	  compileOptions: {
	    noEscape: true,
	    preventIndent: true,
	    assumeObjects: true
	  }
  }])

	function foo() {}
	function bar() {}

	wax.decorators({ foo, bar });

	t.is(hb.decorators.foo, foo);
	t.is(hb.decorators.bar, bar);
});

test('should register decorators by globbed factory', () => {
	const wax = hbwax([hb, {
	  compileOptions: {
	    noEscape: true,
	    preventIndent: true,
	    assumeObjects: true
	  }
  }])

	wax.decorators('./fixtures/decorators/factory/**/*.js');

	t.is(typeof hb.decorators.currencyDecimal, 'function');
	t.is(typeof hb.decorators.currencyFormat, 'function');
	t.is(typeof hb.decorators.i18nLanguage, 'function');
	t.is(typeof hb.decorators.i18nCountry, 'function');
	t.is(hb.decorators.empty, undefined);
});

test('should register decorators by globbed function', () => {
	const wax = hbwax([hb, {
	  compileOptions: {
	    noEscape: true,
	    preventIndent: true,
	    assumeObjects: true
	  }
  }])

	wax.decorators('./fixtures/decorators/function/**/*.{hbs,js}');

	t.is(typeof hb.decorators['currency-decimal'], 'function');
	t.is(typeof hb.decorators['currency-format'], 'function');
	t.is(typeof hb.decorators.language, 'function');
	t.is(typeof hb.decorators.country, 'function');
	t.is(hb.decorators.empty, undefined);
});

test('should register decorators by globbed object', () => {
	const wax = hbwax([hb, {
	  compileOptions: {
	    noEscape: true,
	    preventIndent: true,
	    assumeObjects: true
	  }
  }])

	wax.decorators('./fixtures/decorators/object/**/*.js');

	t.is(typeof hb.decorators.currencyDecimal, 'function');
	t.is(typeof hb.decorators.currencyFormat, 'function');
	t.is(typeof hb.decorators.i18nLanguage, 'function');
	t.is(typeof hb.decorators.i18nCountry, 'function');
	t.is(hb.decorators.empty, undefined);
});

test('should raise errors', () => {
	const wax = hbwax([hb, {
	  compileOptions: {
	    noEscape: true,
	    preventIndent: true,
	    assumeObjects: true
	  }
  }])
	const template = wax.compile('{{* foo}}');

	t.throws(() => template(), /not a function/i);
});
