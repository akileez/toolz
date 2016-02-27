var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/indexOf')
var t = painless.assert

var idx = require('../../src/array/indexOf')

test('should work in regular arrays', function(){
    var arr = [1, 'a', 2, 'b'];

    t.is( idx(arr, 1),  0 );
    t.is( idx(arr, 'a'),  1 );
    t.is( idx(arr, 2),  2 );
    t.is( idx(arr, 'b'),  3 );

    t.is( idx(arr, 'foo') , -1 );
});

test('should loop all items, even if sparse', function(){
    var arr = [];
    arr[0] = 'bar';
    arr[1] = 1;
    arr[3] = 'a';
    arr[6] = 2;
    arr[8] = 'b';
    arr[10] = undefined;

    // IMPORTANT!!
    // -----------
    // this behavior is different than ES5 Array#indexOf()
    t.is( idx(arr, 1),  1)
    t.is( idx(arr, 'a'),  3)
    t.is( idx(arr, 2),  6)
    t.is( idx(arr, 'b'),  8)
    t.is( idx(arr, undefined),  2)

    t.is( idx(arr, 'foo'),  -1)
});

test('should handle fromIndex', function(){
    var arr = [1, 'a', 2, 'b'];

    t.is( idx(arr, 1, 2),  -1)
    t.is( idx(arr, 'a', 2),  -1)
    t.is( idx(arr, 2, 2),  2)
    t.is( idx(arr, 'b', 2),  3)

    t.is( idx(arr, 'foo', 2),  -1)
});

test('should handle fromIndex in sparse arrays', function(){
    var arr = [];
    arr[1] = 1;
    arr[3] = 'a';
    arr[6] = 2;
    arr[8] = 'b';

    t.is( idx(arr, 1, 4),  -1)
    t.is( idx(arr, 'a', 4),  -1)
    t.is( idx(arr, 2, 4),  6)
    t.is( idx(arr, 'b', 4),  8)

    t.is( idx(arr, 'foo', 4),  -1)
});

test('should handle negative fromIndex', function(){
    var arr = [1, 'a', 2, 'b'];

    t.is( idx(arr, 1, -2),  -1)
    t.is( idx(arr, 'a', -2),  -1)
    t.is( idx(arr, 2, -2),  2)
    t.is( idx(arr, 'b', -2),  3)

    t.is( idx(arr, 'foo', -2),  -1)
});

test('should handle fromIndex greater than length', function(){
    var arr = [1, 'a', 2, 'b'];

    t.is( idx(arr, 1, 15),  -1)
    t.is( idx(arr, 'a', 15),  -1)
    t.is( idx(arr, 2, 15),  -1)
    t.is( idx(arr, 'b', 15),  -1)

    t.is( idx(arr, 'foo', 15),  -1)
});

test('should return -1 when array is null/undefined', function(){
    t.is( idx(null, 1), -1)
    t.is( idx(undefined, 1), -1)
});


