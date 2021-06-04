let {
  assert,
  DataFrame,
  transpose,
  isUndefined,
  set,
  isEqual,
  sort,
  count,
} = require("js-math-tools")

let getCorrelationMatrix = require("./get-correlation-matrix.js")
let getHighlyCorrelatedColumns = require("./get-highly-correlated-columns.js")
let getOneHotEncodings = require("./get-one-hot-encodings.js")
let clipOutliers = require("./clip-outliers.js")

const DEBUG = false

function preprocess(rawData) {
  assert(
    rawData instanceof DataFrame,
    "You must pass a DataFrame into the `preprocess` function!"
  )

  // create a fresh copy of the data
  let columns = copy(rawData.columns)
  let x = transpose(rawData.values)
  let columnsToDrop = []

  x.forEach((col, i) => {
    let colName = columns[i]

    // parse into types
    col = col.map(v => {
      // undefined / missing
      if (isUndefined(v)) return null

      // numbers
      try {
        let vFloat = JSON.parse(v)
        if (!isNaN(vFloat)) return vFloat
      } catch (e) {}

      // dates
      let vDate = Date.parse(v)
      if (!isNaN(vDate)) return vDate

      // booleans
      let vLower = v.trim().toLowerCase()
      if (vLower === "true") return true
      if (vLower === "false") return false

      // otherwise unparseable strings
      return v
    })

    x[i] = col

    // get non-missing values
    let nonMissingValues = col.filter(v => {
      return !isUndefined(v) && (typeof v !== "string" || v.length > 0)
    })

    let nonMissingValuesSet = set(nonMissingValues)

    // drop empty columns
    if (nonMissingValues.length === 0) {
      if (DEBUG) console.log(`Dropping "${colName}" because it's empty.`)
      return columnsToDrop.push(colName)
    }

    // get primary type (i.e., number, string, etc.)
    let types = nonMissingValues.map(v => typeof v)
    let typeCounts = sort(count(types), (a, b) => b.count - a.count)
    let type = typeCounts[0].item

    // drop ID columns (i.e., columns with all unique values)
    if (
      type === "string" &&
      nonMissingValuesSet.length === nonMissingValues.length
    ) {
      if (DEBUG) console.log(`Dropping "${colName}" because it's an ID column.`)
      return columnsToDrop.push(colName)
    }

    // drop columns that contain only 1 unique value
    if (nonMissingValuesSet.length === 1) {
      if (DEBUG) {
        console.log(
          `Dropping "${colName}" because it contains only one unique value.`
        )
      }

      return columnsToDrop.push(colName)
    }

    // drop columns that contain less than 15 non-missing values
    if (nonMissingValues.length < 15) {
      if (DEBUG) {
        console.log(
          `Dropping "${colName}" because it contains fewer than 15 values total.`
        )
      }

      return columnsToDrop.push(colName)
    }

    // for each text column:
    if (type === "string") {
      // if it has less than 5 unique values, then one-hot encode it
      if (nonMissingValuesSet.length <= 5) {
        let encodings = getOneHotEncodings(colName, col)

        Object.keys(encodings).forEach(key => {
          columns.push(key)
          x.push(encodings[key])
        })
      }

      // else if it contains more than 25 numerical values, then parse as numbers and set unparseable strings to NaN
      let numberCount =
        typeCounts.filter(t => t.item === "number")[0].count || 0
      if (numberCount >= 25) type = "number"

      // else if it contains fewer than 25 numerical values, then drop it
      // else return columnsToDrop.push(colName)
    }

    // for each numerical column:
    if (type === "number") {
      // clip outliers
      col = clipOutliers(col)[0]
      x[i] = col
    }
  })

  // drop any literally identical columns
  x.forEach((col1, i) => {
    x.forEach((col2, j) => {
      if (i !== j && isEqual(col1, col2)) {
        if (DEBUG) {
          console.log(
            `Dropping "${columns[j]}" because it's identical to "${columns[i]}".`
          )
        }

        columnsToDrop.push(columns[j])
      }
    })
  })

  // drop any highly correlated columns
  let correlationMatrix = new DataFrame(getCorrelationMatrix(transpose(x)))
  correlationMatrix.columns = columns
  correlationMatrix.index = columns

  let highlyCorrelatedColumns = getHighlyCorrelatedColumns(correlationMatrix)

  while (Object.keys(highlyCorrelatedColumns).length > 0) {
    let colName = Object.keys(highlyCorrelatedColumns)[0]
    let similars = highlyCorrelatedColumns[colName]
    columnsToDrop = columnsToDrop.concat(similars)

    similars.forEach(similar => {
      if (DEBUG) {
        console.log(
          `Dropping "${similar}" because it's highly correlated with "${colName}".`
        )
      }

      delete highlyCorrelatedColumns[similar]
    })

    delete highlyCorrelatedColumns[colName]
  }

  // apply column drops
  // and return processed dataframe
  columnsToDrop = set(columnsToDrop)
  let out = new DataFrame(transpose(x))
  out.columns = columns
  out = out.drop(null, columnsToDrop)
  if (DEBUG) out.print()
  return out
}

module.exports = preprocess
