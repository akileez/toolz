var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test lang/toArray')
var t = painless.assert

var toArray = require('../../src/lang/toArray')

test('should convert array like objects into array', function () {
    var obj = {
        "0" : "foo",
        "1" : "bar",
        "2" : "dolor",
        "length" : 3
    };

    t.same(toArray(obj), ["foo", "bar", "dolor"])
});

test('should convert arguments obj', function () {
    var result;
    var fn = function(a, b, c){
        result = toArray(arguments);
    };

    fn("foo", "bar", 123);

    t.same(result, ["foo", "bar", 123])
});

test('should handle primitives and other objects', function () {

    t.same(toArray('lorem'), ['lorem'])
    t.same(toArray(''), [''])

    // avoid string objects it isn't reliable
    // IE 7-8 can't access chars by index
    // considered as edge-case and ignored for now
    // t.same(toArray(new String('foo')), ['foo'])
    // t.same(toArray(new String('')), [''])

    t.same(toArray(123), [123])
    t.same(toArray(0), [0])

    t.same(toArray(/\w+/), [/\w+/])
    t.same(toArray( new RegExp('\\w+') ), [/\w+/])

    t.same(toArray(global), [global])
    t.same(toArray({foo:"bar", lorem:123}), [{foo:"bar", lorem:123}])

    t.same(toArray(true), [true])
    t.same(toArray(false), [false])

    var fn = function(){};
    t.same(toArray(fn), [fn])
});

test('should return an empty array if nill value', function () {
    t.same(toArray(null), [])
    t.same(toArray(undefined), [])
    t.same(toArray(), [])
});

test('should convert HTMLCollection to real array - #58', function () {
    if (typeof document === 'undefined') return; // node.js doesn't have a document
    var els = document.getElementsByTagName('*')
    var arr = toArray( els )
    t.eq( Object.prototype.toString.call(arr), '[object Array]' )
    t.eq( arr.length, els.length )
});