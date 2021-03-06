// Returns a sorted Array using the Merge Sort [https://en.wikipedia.org/wiki/Merge_sort]
// algorithm (stable sort).

// Important: It does logical comparisson by default (greater/less than)
// and not a string comparisson like the native Array#sort.

function mergeSort (arr, compareFn) {
  if (arr == null) return []
  else if (arr.length < 2) return arr

  if (compareFn == null) compareFn = defaultCompare

  var mid
  var left
  var right

  mid   = ~~(arr.length / 2)
  left  = mergeSort(arr.slice(0, mid), compareFn)
  right = mergeSort(arr.slice(mid, arr.length), compareFn)

  return merge(left, right, compareFn)
}

function defaultCompare (a, b) {
  return a < b ? -1 : (a > b ? 1 : 0)
}

function merge (left, right, compareFn) {
  var result = []

  while (left.length && right.length) {
    if (compareFn(left[0], right[0]) <= 0) result.push(left.shift())
    else result.push(right.shift())
  }

  if (left.length) result.push.apply(result, left)
  if (right.length) result.push.apply(result, right)

  return result
}

module.exports = mergeSort
