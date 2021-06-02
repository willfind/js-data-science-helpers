let { assert, isNumber, isArray, shape, isUndefined, median, abs, add, scale, copy, int, max, min, clamp, dropNaN } = require("js-math-tools")
let isBinary = require("./is-binary.js")
let alphaSort = (a, b) => a - b
let subtract = (a, b) => add(a, scale(b, -1))

function clipOutliers(x, maxScore){
  maxScore = maxScore || 5

  assert(isNumber(maxScore), "`maxScore` must be a number!")
  assert(isArray(x), "`x` must be a one-dimensional array!")
  assert(shape(x).length === 1, "`x` must be a one-dimensional array!")

  if (isBinary(x)) return {x, wasTransformed: false}

  let numericalValues = dropNaN(x)
  if (numericalValues.length === 0) return {x, wasTransformed: false}

  let xMedian = median(numericalValues)
  let xMad = median(abs(subtract(numericalValues, xMedian)))

  if (xMad === 0){
    let temp = copy(numericalValues)
    temp.sort(alphaSort)
    let middle = int(temp.length / 2)
    let low = temp.filter(value => value < xMedian)
    let high = temp.filter(value => value > xMedian)
    let before = xMedian
    let after = xMedian

    if (low.length > 0) before = max(low)
    if (high.length > 0) after = min(high)

    xMad = (after - before) / 2
    if (xMad === 0) return {x, wasTransformed: false}
  }

  let score = max(scale(abs(subtract(numericalValues, xMedian)), 1 / xMad))

  if (score > maxScore){
    let out = x.map(v => {
      if (typeof(v) === "number"){
        return clamp(v, xMedian - maxScore * xMad, xMedian + maxScore * xMad)
      } else {
        return v
      }
    })

    return {x: out, wasTransformed: true}
  } else {
    return {x, wasTransformed: false}
  }
}

module.exports = clipOutliers
