let { assert, max, min, copy, sort, sum, pow, DataFrame, isEqual, transpose } = require("js-math-tools")

function sortCorrelationMatrix(correlations){
  assert(correlations instanceof DataFrame, "You must pass a DataFrame into the `sortCorrelationMatrix` function!")
  assert(isEqual(correlations.values, transpose(correlations.values)), "The correlations matrix passed into the `sortCorrelationMatrix` function must be symmetrical!")
  assert(isEqual(correlations.columns, correlations.index), "The correlations matrix passed into the `sortCorrelationMatrix` function must be symmetrical!")
  assert(max(correlations.values) <= 1 && min(correlations.values) >= -1, "The correlations matrix passed into the `sortCorrelationMatrix` function must not contain values less than -1 or greater than 1!")

  let freeRows = copy(correlations.index)
  let fixedRows = []

  while (freeRows.length > 0){
    // get row with greatest 2-norm
    if (fixedRows.length === 0){
      let twoNormCache = {}

      freeRows = sort(freeRows, (a, b) => {
        let aIndex = correlations.index.indexOf(a)
        let bIndex = correlations.index.indexOf(b)
        let row1 = correlations.values[aIndex]
        let row2 = correlations.values[bIndex]

        let sum1 = 0
        let sum2 = 0

        if (twoNormCache[a]){
        sum1 = twoNormCache[a]
        } else {
        sum1 = sum(pow(row1, 2))
        twoNormCache[a] = sum1
        }

        if (twoNormCache[b]){
        sum2 = twoNormCache[b]
        } else {
        sum2 = sum(pow(row2, 2))
        twoNormCache[b] = sum2
        }

        if (sum1 < sum2) return 1
        if (sum1 > sum2) return -1
        return 0
      })
    }

    // get free row with highest correlation with first fixed row
    // and fix it
    else {
      let firstFixedRowIndex = correlations.columns.indexOf(fixedRows[0])

      freeRows = sort(freeRows, (a, b) => {
        let aIndex = correlations.index.indexOf(a)
        let bIndex = correlations.index.indexOf(b)
        let v1 = correlations.values[aIndex][firstFixedRowIndex]
        let v2 = correlations.values[bIndex][firstFixedRowIndex]
        if (v1 < v2) return 1
        if (v1 > v2) return -1
        return 0
      })
    }

    fixedRows.splice(0, 0, freeRows[0])
    freeRows.splice(0, 1)
  }

  correlations = correlations.get(fixedRows, fixedRows)
  return correlations
}

module.exports = sortCorrelationMatrix
