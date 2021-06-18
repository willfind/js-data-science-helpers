let {
  assert,
  DataFrame,
  transpose,
  isUndefined,
  set,
  isEqual,
  sort,
  count,
  copy,
  isNumber,
  isBoolean,
  isString,
  isArray,
  correl,
} = require("js-math-tools")

// let getCorrelationMatrix = require("./get-correlation-matrix.js")
// let getHighlyCorrelatedColumns = require("./get-highly-correlated-columns.js")
let getOneHotEncodings = require("./get-one-hot-encodings.js")
let clipOutliers = require("./clip-outliers.js")

function preprocess(df) {
  assert(
    df instanceof DataFrame,
    "You must pass a DataFrame into the `preprocess` function!"
  )

  const columns = copy(df.columns)
  const x = transpose(df.values)
  let index = 0
  let isDone = false

  // delete literally identical columns
  while (!isDone) {
    const col1 = x[index]

    for (let i = index + 1; i < x.length; i++) {
      const col2 = x[i]

      if (isEqual(col1, col2)) {
        columns.splice(i, 1)
        x.splice(i, 1)
      }
    }

    index++
    isDone = index >= columns.length - 1
  }

  // only examine each column once!
  index = 0
  isDone = false

  while (!isDone) {
    const colName = columns[index]
    const values = x[index]
    if (!values) break

    // get non-missing values
    const nonMissingValues = values.filter(v => {
      return (
        isNumber(v) ||
        isBoolean(v) ||
        (isString(v) && v.length > 0) ||
        typeof v === "object"
      )
    })

    // if there are fewer than 15 non-missing values, then drop the column
    if (nonMissingValues.length < 15) {
      columns.splice(index, 1)
      x.splice(index, 1)
      continue
    }

    // if there's only 1 unique value, then drop the column
    const nonMissingValuesSet = set(nonMissingValues)

    if (nonMissingValuesSet.length === 1) {
      columns.splice(index, 1)
      x.splice(index, 1)
      continue
    }

    // get primary data type of the column
    const types = nonMissingValues.map(v => typeof v)
    const typeCounts = count(types)
    const sortedTypeCounts = sort(typeCounts, (a, b) => b.count - a.count)
    const type = sortedTypeCounts[0].item

    if (type === "string") {
      // if all values are unique, then drop the column
      if (nonMissingValuesSet.length === nonMissingValues.length) {
        columns.splice(index, 1)
        x.splice(index, 1)
        continue
      }

      // if there are fewer than 5 unique values, then one-hot-encode them
      if (nonMissingValuesSet.length < 5) {
        const encodings = getOneHotEncodings(colName, values)

        Object.keys(encodings).forEach(key => {
          columns.push(key)
          x.push(encodings[key])
        })

        columns.splice(index, 1)
        x.splice(index, 1)
        continue
      }
    } else if (type === "number") {
      const clippedValues = clipOutliers(values)[0]
      x[index] = clippedValues

      const previousValues = x.slice(0, index)

      if (previousValues.length > 0) {
        for (let i = 0; i < previousValues.length; i++) {
          const otherValues = previousValues[i]
          const r = correl(values, otherValues)

          if (r > 1 - 1e-5) {
            columns.splice(index, 1)
            x.splice(index, 1)
            continue
          }
        }
      }
    } else {
      x.splice(index, 1)
      columns.splice(index, 1)
      continue
    }

    index++
    isDone = index >= columns.length
  }

  const out = new DataFrame(transpose(x))
  out.columns = columns
  return out
}

module.exports = preprocess
