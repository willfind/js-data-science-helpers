let { count } = require("js-math-tools")

function getPercentages(x) {
  let counts = count(x)

  return counts.map(c => {
    c.percentage = c.count / x.length
    return c
  })
}

module.exports = getPercentages
