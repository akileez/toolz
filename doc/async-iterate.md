async-iterate
=============

lightweight iterators (reduce, map, each) of collections (array, plain object) with async callbacks

## iterate::each(object, iterator, done)
**object** - array/object for iteration
**iterator** - function(value, key, done)
**done** - function(error)

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.each(object, function (value, key, done) {
    // do something

    done();
}, function (err) {
    // do something
});
```

## iterate::map(object, iterator, done)
**object** - array/object for iteration
**iterator** - function(value, key, done)
**done** - function(error, resultArray)

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.each(object, function (value, key, done) {
    done(null, key);
}, function (err, result) {
    console.log(result); // ["a", "b"]
});
```

## iterate::reduce(object, reduceObject, iterator, done)
**object** - `array/object` for iteration
**reduceObject** - `Mixed`
**iterator** - `function`(reduceObject, value, key, done)
**done** - `function`(error, reduceObject)

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.reduce(object, -1, function (result, value, key, done) {
    done(null, ++result);
}, function (err, result) {
    console.log(result); // 1
});
```