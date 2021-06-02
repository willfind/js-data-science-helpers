let getCounts = require("./get-counts.js")

function getPercentages(x){
  let counts = getCounts(x)

  return counts.map(c => {
    c[1] /= x.length
    return c
  })
}

module.exports = getPercentages
