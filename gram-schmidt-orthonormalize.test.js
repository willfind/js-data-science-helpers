const gramSchmidtOrthonormalize = require("./gram-schmidt-orthonormalize.js")
const getCorrelationMatrix = require("./get-correlation-matrix.js")
const {
  normal,
  transpose,
  correl,
  abs,
  scale,
  add,
  shape,
  round,
  chop,
  identity,
  distance,
} = require("js-math-tools")

test("", () => {
  const a = normal(10000)
  const b = add(a, scale(0.01, normal(shape(a))))
  const x = transpose([a, b])
  const yPred = transpose(gramSchmidtOrthonormalize(x))
  expect(correl(a, b)).toBeGreaterThan(0.999)
  expect(abs(correl(yPred[0], yPred[1]))).toBeLessThan(0.001)
})

test("", () => {
  const x = normal([1000, 5])
  const xn = gramSchmidtOrthonormalize(x)
  const yPred = chop(round(getCorrelationMatrix(xn)))
  const yTrue = identity(5)
  expect(distance(yPred, yTrue)).toBeLessThan(1e-5)
})

test("", () => {
  expect(() => {
    gramSchmidtOrthonormalize()
  }).toThrow()
})
