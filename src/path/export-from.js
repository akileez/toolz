// https://github.com/kosmosR2/read-lib
var fs = require('fs');

module.exports = function (dir, projectDir) {
  if(!/\/$/.test(projectDir)) projectDir += "/"

  dir = projectDir + dir
  var libs = {}

  function readdir (dir, father) {
    function isEmpty (obj) {
      for (var i in obj) {
        return false
      }

      return true
    }

    if(!/\/$/.test(dir)) dir += "/"

    if(!father) father = []

    var point = libs

    for(var i = 0;i < father.length;i ++) {
      point = point[father[i]]
    }

    var lib = fs.readdirSync(dir)

    lib.forEach(function (v) {
      var st = fs.statSync(dir + v)

      if(st.isDirectory()) {
        var f = father.slice()
        f.push(v)

        if(!point[v]) point[v] = {}

        readdir(dir+v,f)
      } else if(st.isFile()) {
        if(/.js$/.test(v)) {
          var name = v.split('.js')[0]
          var req = require(dir+v)

          if(isEmpty(point[name])) point[name] = req
          else {
            for(var i in req) {
              point[name][i] = req[i]
            }
          }
        }
      }
    })
  }
  readdir(dir);
  return libs;
}
