let {
  assert,
  isArray,
  shape,
  Series,
  mean,
  std,
  isUndefined,
  dropNaN,
} = require("js-math-tools")

function normalize(x) {
  assert(isArray(x), "The `normalize` function only works on vectors!")

  assert(
    shape(x).length === 1,
    "The `normalize` function only works on vectors!"
  )

  // note that this is a "missing-aware" function!
  let nonMissingValues = dropNaN(x)
  let m = mean(nonMissingValues)
  let s = std(nonMissingValues)

  return x.map(value => {
    if (isUndefined(value)) return null
    return (value - m) / s
  })
}

module.exports = normalize
