const { abs, round, map, mean, std, sqrt, pow } = require("js-math-tools")
const zTable = require("./z-table.json")

function probability(z) {
  if (abs(z) > 4.1) return 0
  return zTable[round(map(abs(z), 0, 4.1, 0, zTable.length))]
}

function ttest(a, b) {
  let m1 = mean(a)
  let m2 = mean(b)
  let s1 = std(a)
  let s2 = std(b)
  let n1 = a.length
  let n2 = b.length
  // let v1 = n1 - 1
  // let v2 = n2 - 1

  let t = (m1 - m2) / sqrt((s1 * s1) / n1 + (s2 * s2) / n2)

  // let v =
  //   pow((s1 * s1) / n1 + (s2 * s2) / n2, 2) /
  //   (pow(s1, 4) / (n1 * n1 * v1) + pow(s2, 4) / (n2 * n2 * v2))

  return 2 * probability(t)
}

module.exports = ttest
