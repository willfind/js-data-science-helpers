let { sort, set } = require("js-math-tools")

function getOneHotEncodings(name, values) {
  let out = {}
  let colNames = sort(set(values)).map(v => name + "_" + v)

  colNames.forEach(colName => {
    out[colName] = values.map(v => (colName === name + "_" + v ? 1 : 0))
  })

  return out
}

module.exports = getOneHotEncodings
