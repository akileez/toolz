var thunkify = require('thunkify');
var temp     = require('temp');

/*
temp thunk wrappers for co

  var temp = require('co-temp').track();

  co(function *() {
      var info = yield temp.open('file');
      console.log(info.path);
      var dirPath = yield temp.mkdir('mydir');
      console.log(info.path);

      yield temp.cleanup(); // only if you use track()
  });

*/

var methods = [
  'mkdir',
  'open',
  'cleanup'
];

methods.forEach(function (method) {
  temp[method] = thunkify(temp[method]);
});

module.exports = temp;