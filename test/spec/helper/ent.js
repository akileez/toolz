var painless = require('../../assertion/painless')
var test = painless.createGroup('Test helper/ent')
var t = painless.assert

var punycode = require('punycode')
var ent = require('../../src/helper/ent')

test('amp', function () {
    var a = 'a & b & c';
    var b = 'a &#38; b &#38; c';
    t.eq(ent.encode(a), b);
    t.eq(ent.decode(b), a);
});

test('html', function () {
    var a = '<html> © π " \'';
    var b = '&#60;html&#62; &#169; &#960; &#34; &#39;';
    t.eq(ent.encode(a), b);
    t.eq(ent.decode(b), a);
});

test('html named', function () {
    var a = '<html> © π " \' ∴ Β β';
    var b = '&lt;html&gt; &copy; &pi; &quot; &apos; &therefore; &Beta; &beta;';
    t.eq(ent.encode(a, { named: true }), b);
    t.eq(ent.decode(b), a);
});

test('ambiguous ampersands', function () {
    var a = '• &bullet';
    var b = '&bullet; &bullet';
    var c = '&bullet; &amp;bullet';
    t.eq(ent.encode(a, { named: true }), c);
    t.eq(ent.decode(b), a);
    t.eq(ent.decode(c), a);
});

test('entities', function () {
    var a = '\u2124';
    var b = '&#8484;';
    t.eq(ent.encode(a), b);
    t.eq(ent.decode(b), a);
});

test('entities named', function () {
    var a = '\u2124';
    var b = '&Zopf;';
    t.eq(ent.encode(a, { named: true }), b);
    t.eq(ent.decode(b), a);
});

test('num', function () {
    var a = String.fromCharCode(1337);
    var b = '&#1337;';
    t.eq(ent.encode(a), b);
    t.eq(ent.decode(b), a);

    t.eq(ent.encode(a + a), b + b);
    t.eq(ent.decode(b + b), a + a);
});

test('astral num', function () {
    var a = punycode.ucs2.encode([0x1d306]);
    var b = '&#119558;';
    t.eq(ent.encode(a), b);
    t.eq(ent.decode(b), a);

    t.eq(ent.encode(a + a), b + b);
    t.eq(ent.decode(b + b), a + a);
});

test('nested escapes', function () {
    var a = '&amp;';
    var b = '&#38;amp;';
    t.eq(ent.encode(a), b);
    t.eq(ent.decode(b), a);

    t.eq(ent.encode(a + a), b + b);
    t.eq(ent.decode(b + b), a + a);
});

test('encode `special` option', function () {
    var a = '<>\'"&';
    var b = '&lt;&gt;\'"&amp;';
    t.eq(ent.encode(a, {
      named: true,
      special: {
        '<': true,
        '>': true,
        '&': true
      }
    }), b);

});
