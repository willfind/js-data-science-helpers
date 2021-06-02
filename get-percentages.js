let { count } = require("js-math-tools")

function getPercentages(x) {
  let counts = count(x)

  return counts.map(c => {
    return c.count / x.length
  })
}

module.exports = getPercentages
