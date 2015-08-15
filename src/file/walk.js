var fs = require('fs')
var path = require('path')
var modifyStats = require('./modifyStats')

function walk (fp, callback) {
  fs.lstat(fp, function(err, stats){
    if (err) {
      callback(err)
    } else {
      if (stats.isDirectory()) {
        fs.readdir(fp, function(err, items){
          if (err) {
            callback(err)
          } else {
            items.forEach(function(item){
              walk(path.join(fp, item), callback)
            })
          }
        })
      } else {
        callback(null, fp, stats ? modifyStats(stats, fp) : stats)
      }
    }
  })
}

function walkSync (fp, callback) {
  var stats = fs.lstatSync(fp)
  if ( stats.isDirectory() )
    fs.readdirSync(fp).forEach(function(item){
      walkSync(path.join(fp, item), callback)
    })
  else
    callback(fp, stats ? modifyStats(stats, fp) : stats)
}

module.exports = {
  async: walk,
  sync: walkSync
}
