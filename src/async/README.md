### async-iterate
lightweight serial iterators of collections (array, plain object) with async callbacks
The iterators: [each, reduce, map, filter, reject, detect, every, some, concat, times, series, apply, composite and compose]

#### `iterate::each(object, iterator, done)` 
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

#### `iterate::reduce(object, reduceObject, iterator, done)`
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

#### `iterate::map(object, iterator, done)`
**object** - array/object for iteration   
**iterator** - function(value, key, done)   
**done** - function(error, resultArray)   

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.map(object, function (value, key, done) {
    done(null, key);
}, function (err, result) {
    console.log(result); // ["a", "b"]
});
```

#### `iterate::filter(object, iterator, done)`
**object** - array/object for iteration   
**iterator** - function(value, key, done)   
**done** - function(error, resultArray)   

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.filter(object, function (value, key, done) {
    done(null, value < 2);
}, function (err, result) {
    console.log(result); // ["a", "b"]
});
```

#### `iterate::reject(object, iterator, done)`
**object** - array/object for iteration   
**iterator** - function(value, key, done)   
**done** - function(error, resultArray)   

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.reject(object, function (value, key, done) {
    done(null, key);
}, function (err, result) {
    console.log(result); // ["a", "b"]
});
```

#### `iterate::detect(object, iterator, done)`
**object** - array/object for iteration   
**iterator** - function(value, key, done)   
**done** - function(error, resultArray)   

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.detect(object, function (value, key, done) {
    done(null, key);
}, function (err, result) {
    console.log(result); // ["a", "b"]
});
```

#### `iterate::every(object, iterator, done)`
**object** - array/object for iteration   
**iterator** - function(value, key, done)   
**done** - function(error, resultArray)   

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.every(object, function (value, key, done) {
    done(null, key);
}, function (err, result) {
    console.log(result); // ["a", "b"]
});
```

#### `iterate::some(object, iterator, done)`
**object** - array/object for iteration   
**iterator** - function(value, key, done)   
**done** - function(error, resultArray)   

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.some(object, function (value, key, done) {
    done(null, key);
}, function (err, result) {
    console.log(result); // ["a", "b"]
});
```

#### `iterate::concat(object, iterator, done)`
**object** - array/object for iteration   
**iterator** - function(value, key, done)   
**done** - function(error, resultArray)   

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.concat(object, function (value, key, done) {
    done(null, key);
}, function (err, result) {
    console.log(result); // ["a", "b"]
});
```

#### `iterate::times(object, iterator, done)`
**object** - array/object for iteration   
**iterator** - function(value, key, done)   
**done** - function(error, resultArray)   

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.times(object, function (value, key, done) {
    done(null, key);
}, function (err, result) {
    console.log(result); // ["a", "b"]
});
```

#### `iterate::series(object, iterator, done)`
**object** - array/object for iteration   
**iterator** - function(value, key, done)   
**done** - function(error, resultArray)   

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.series(object, function (value, key, done) {
    done(null, key);
}, function (err, result) {
    console.log(result); // ["a", "b"]
});
```

#### `iterate::apply(object, iterator, done)`
**object** - array/object for iteration   
**iterator** - function(value, key, done)   
**done** - function(error, resultArray)   

```js
var iterate = require('async-iterate');

var object = {a: 1, b: 2};

iterate.apply(object, function (value, key, done) {
    done(null, key);
}, function (err, result) {
    console.log(result); // ["a", "b"]
});
```
