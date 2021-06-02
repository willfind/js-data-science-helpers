let { set, sort } = require("js-math-tools")

function getCounts(x){
  let counts = {}

  x.forEach(value => {
    if (!counts[value]) counts[value] = 0
    counts[value]++
  })

  let out = set(x).map(v => [v, counts[v]])
  return sort(out, (a, b) => b[1] - a[1])
}

module.exports = getCounts
