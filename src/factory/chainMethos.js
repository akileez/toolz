// from: Юрий Тарабанько https://plus.google.com/u/0/+ЮрийТарабанько/posts
// fiddle: http://jsfiddle.net/tarabyte/4C4Lu/
// article: javascriptissexy.com/beautiful-javascript-easily-create-chainable-cascading-methods-for-expressiveness/

function chainMethos (obj) {
  Object.keys(obj).forEach(function (key) {
    var methos = obj[key]
    if (typeof methos === 'function' && !/\breturn\b/.test(methos)) {
      obj[key] = function () {
        methos.apply(this, arguments)
        return this
      }
    }
  })
}

module.exports = chainMethos
