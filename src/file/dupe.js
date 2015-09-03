var readFile = require('./readFile').stream
var writeFile = require('./writeFile').stream

// function dupe (from, to) {
//   fs.createReadStream(from).pipe(fs.createWriteStream(to))
// }

function dupe (from, to) {
  readFile(from).pipe(writeFile(to))
}

module.exports = dupe
