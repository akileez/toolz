var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/toLookup')
var t = painless.assert

var toLookup = require('../../src/array/toLookup')

test('should create an object with the key specified as a string', function () {
  var arr = [{ name: 'a', thing: 1 }, { name: 'b', thing: 2 }];

  result = toLookup(arr, 'name');
  t.same(result, {
    a: { name: 'a', thing: 1 },
    b: { name: 'b', thing: 2 }
  });
});

test('should create an object with the key specified as a function', function () {
  var arr = [{ name: 'a', thing: 1 }, null],
      result;

  result = toLookup(arr, function (v) {
      if (v === null) {
          return 'null';
      } else {
          return v.name;
      }
  });
  t.same(result, {
      'null': null,
      a: { name: 'a', thing: 1 }
  });
});

test('should return empty object when array is null/undefined', function () {
  t.same( toLookup(null, 'foo') ,  {} );
  t.same( toLookup(undefined, 'foo') ,  {} );
});