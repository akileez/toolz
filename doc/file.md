# file #

File utilities



## exists(filepath[, callback]):Boolean

```js
var file1 = 'foo/bar/baz/doo.js'
var file2 = 'foo/bar/baz/none.js'

exists(file1) // True
exists(file2, function (res) {
    if (res) fs.readFileSync(file2)
    else mkdirp.sync(file2)
})
```
