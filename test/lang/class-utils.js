var test = require('../../src/assertion/ttr')
var utils = require('../../src/lang/class-utils')

// isObject tests

test('test Object Is Object', function(t) {
    var o = new Object();
    t.is(true, utils.isObject(o));
});

test('test Object Literal Is Object', function (t) {
    var o = {}

    t.is(true, utils.isObject(o))
})

test('test Array Object', function (t) {
    var o = new Array()

    t.is(true, utils.isObject(o))
})

// exports.testArrayLiterallIsObject = function(beforeExit, assert) {
//     var o = [];

//     assert.equal(true, utils.isObject(o));
// };

// exports.testStringIsNotObject = function(beforeExit, assert) {
//     var o = "abc";

//     assert.equal(false, utils.isObject(o));
// };

// exports.testFunctionIsNotObject = function(beforeExit, assert) {
//     var o = function() {};

//     assert.equal(false, utils.isObject(o));
// };

// // isFunction

// exports.testObjectIsNotFunction = function(beforeExit, assert) {
//     var o = new Object();

//     assert.equal(false, utils.isFunction(o));
// };

// exports.testObjectLiteralIsNotFunction = function(beforeExit, assert) {
//     var o = {};

//     assert.equal(false, utils.isFunction(o));
// };

// exports.testArrayIsNotFunction = function(beforeExit, assert) {
//     var o = new Array();

//     assert.equal(false, utils.isFunction(o));
// };

// exports.testArrayLiterallIsNotFunction = function(beforeExit, assert) {
//     var o = [];

//     assert.equal(false, utils.isFunction(o));
// };

// exports.testStringIsNotFunction = function(beforeExit, assert) {
//     var o = "abc";

//     assert.equal(false, utils.isFunction(o));
// };

// exports.testFunctionIsObject = function(beforeExit, assert) {
//     var o = function() {};

//     assert.equal(true, utils.isFunction(o));
// };

// // isString

// exports.testObjectIsNotString = function(beforeExit, assert) {
//     var o = new Object();

//     assert.equal(false, utils.isString(o));
// };

// exports.testObjectLiteralIsNotString = function(beforeExit, assert) {
//     var o = {};

//     assert.equal(false, utils.isString(o));
// };

// exports.testArrayIsNotString = function(beforeExit, assert) {
//     var o = new Array();

//     assert.equal(false, utils.isString(o));
// };

// exports.testArrayLiterallIsNotString = function(beforeExit, assert) {
//     var o = [];

//     assert.equal(false, utils.isString(o));
// };

// exports.testStringIsString = function(beforeExit, assert) {
//     var o = "abc";

//     assert.equal(true, utils.isString(o));
// };

// exports.testFunctionIsNotString = function(beforeExit, assert) {
//     var o = function() {};

//     assert.equal(false, utils.isString(o));
// };

// // isMethod - TODO:

// // mergeProperites
// exports.testMergeProperties = function(beforeExit, assert) {
//     var obj = { a: 1, b: 2, c: 3 };
//     var props = { a: 10, d: 20 };
//     var result = utils.mergeProperties(props, obj);

//     assert.equal(true, result.hasOwnProperty('a'));
//     assert.equal(10, result.a);

//     assert.equal(true, result.hasOwnProperty('b'));
//     assert.equal(2, result.b);

//     assert.equal(true, result.hasOwnProperty('c'));
//     assert.equal(3, result.c);

//     assert.equal(true, result.hasOwnProperty('d'));
//     assert.equal(20, result.d);
// };

// // inherit
// exports.testMergeProperties = function(beforeExit, assert) {
//     var props = { a: 10, d: 20 };
//     var result = utils.inherit(props);

//     assert.equal(false, result.hasOwnProperty('a'));
//     assert.equal(true, 'a' in result);
//     assert.equal(10, result.a);

//     assert.equal(false, result.hasOwnProperty('d'));
//     assert.equal(true, 'd' in result);
//     assert.equal(20, result.d);
// };

// defineSubclass - TODO

test.result()