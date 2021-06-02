let { isUndefined, copy, assert, isArray, shape, transpose, clamp } = require("js-math-tools")
let dropMissingPairwise = require("./drop-missing-pairwise.js")
let pvalue = require("../../lib/p-value")

function getPValueMatrix(a, b){
  if (isUndefined(b)) b = copy(a)

  assert(isArray(a) && isArray(b), "`getPValueMatrix` only works on matrices!")
  assert(shape(a).length === 2 && shape(b).length === 2, "`getPValueMatrix` only works on matrices!")

  // note: this produces a "missing-aware" p-value matrix!
  let out = []
  let aTemp = transpose(a)
  let bTemp = transpose(b)

  aTemp.forEach(row1 => {
    let pvalues = []

    bTemp.forEach(row2 => {
      let results = dropMissingPairwise(row1, row2)
      let row1Temp = results.a
      let row2Temp = results.b
      let p = clamp(pvalue(row1Temp, row2Temp), 0, 1)
      assert(p >= 0 && p <= 1, "Uh-oh (p-value)!")
      pvalues.push(p)
    })

    out.push(pvalues)
  })

  return out
}

module.exports = getPValueMatrix
