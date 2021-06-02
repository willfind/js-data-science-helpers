let { assert, isArray, shape, isUndefined } = require("js-math-tools")

function dropMissingPairwise(a, b){
  assert(isArray(a) && isArray(b), "`a` and `b` must be vectors of equal length!")
  assert(shape(a).length === 1 && shape(b).length === 1, "`a` and `b` must be vectors of equal length!")
  assert(a.length === b.length, "`a` and `b` must be vectors of equal length!")

  let aOut = []
  let bOut = []

  for (let i=0; i<a.length; i++){
    if (!isUndefined(a[i]) && !isUndefined(b[i])){
      aOut.push(a[i])
      bOut.push(b[i])
    }
  }

  return {a: aOut, b: bOut}
}

module.exports = dropMissingPairwise
