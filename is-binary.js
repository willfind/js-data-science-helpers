let { assert, isArray, Series, sort, set, flatten } = require("js-math-tools")

function isBinary(x){
  assert(isArray(x), "The `isBinary` function only works on arrays!")
  let nonMissingValues = new Series(x).dropMissing().values
  let values = sort(set(flatten(nonMissingValues)))

  return (
    (values.length === 2 && values[0] === 0 && values[1] === 1) ||
    (values.length === 1 && (values[0] === 0 || values[0] === 1))
  )
}

module.exports = isBinary
