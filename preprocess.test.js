const preprocess = require("./preprocess.js")
const makeKey = require("make-key")
const gramSchmidtOrthonormalize = require("./gram-schmidt-orthonormalize.js")
const {
  DataFrame,
  random,
  normal,
  add,
  scale,
  round,
  int,
  range,
  shuffle,
  shape,
  transpose,
} = require("js-math-tools")

// generate data with these types:
//   - floats
//   - integers from a small set
//   - integers that are completely random
//   - strings from a small set
//   - strings that are completely random
//   - booleans
//   - dates (in what format?)
// drop some random values
// duplicate some of the already-existing columns
// add some mostly empty columns
// add some completely empty columns
// add some columns with only 1 unique value
// add a few columns that are highly correlated with some of the float columns

test("drops duplicate columns", () => {
  const temp = random(1000)
  const x = new DataFrame({ a: temp, b: temp, c: normal(1000), d: temp })
  const yPred = preprocess(x)
  expect(yPred.columns).toStrictEqual(["a", "c"])
  expect(yPred.get(null, 0).values).toStrictEqual(temp)
})

test("drops highly correlated columns", () => {
  const a = random(1000)
  const b = add(a, scale(0.0001, normal(1000)))
  const x = new DataFrame({ a, b })
  const yPred = preprocess(x)
  expect(yPred.columns).toStrictEqual(["a"])
  expect(yPred.get(null, 0).values).toStrictEqual(a)
})

test("drops columns with less than 15 non-missing values", () => {
  const a = random(1000)
  const b = range(0, 1000).map(i => NaN)

  for (let i = 0; i < 10; i++) {
    b[int(random() * b.length)] = random()
  }

  const x = new DataFrame({ a, b })
  const yPred = preprocess(x)
  expect(yPred.columns).toStrictEqual(["a"])
  expect(yPred.get(null, 0).values).toStrictEqual(a)
})

test("drops empty columns", () => {})

test("drops columns with only 1 unique value", () => {})

test("clips outliers", () => {})

test("drops string columns with 100% unique values", () => {})

test("one-hot-encodes string columns with 5 or fewer unique values", () => {})
