let { sum, pow, mean, sign, sqrt, abs, add, scale } = require("js-math-tools")
let subtract = (a, b) => add(a, scale(b, -1))

function rScore(xtrue, xpred) {
  let num = sum(pow(subtract(xtrue, xpred), 2))
  let den = sum(pow(subtract(xtrue, mean(xtrue)), 2))
  if (den === 0) return 0
  let r2 = 1 - num / den
  return sign(r2) * sqrt(abs(r2))
}

module.exports = rScore
