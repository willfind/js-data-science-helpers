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
  sort,
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

test("drops empty columns", () => {
  const a = random(1000)
  const b = range(0, 1000).map(i => null)
  const c = random(1000)
  const d = range(0, 1000).map(i => undefined)
  const e = range(0, 1000).map(i => NaN)
  const x = new DataFrame({ a, b, c, d, e })
  const yPred = preprocess(x)
  expect(yPred.columns).toStrictEqual(["a", "c"])
  expect(yPred.get(null, 0).values).toStrictEqual(a)
  expect(yPred.get(null, 1).values).toStrictEqual(c)
})

test("drops columns with only 1 unique value", () => {
  const a = random(1000)
  const r = random()
  const b = range(0, 1000).map(i => r)
  const k = makeKey(8)
  const c = range(0, 1000).map(i => k)
  const x = new DataFrame({ a, b, c })
  const yPred = preprocess(x)
  expect(yPred.columns).toStrictEqual(["a"])
  expect(yPred.get(null, 0).values).toStrictEqual(a)
})

test("clips outliers", () => {
  const a = random(1000)
  const b = random(1000)
  b[0] = 99999
  const x = new DataFrame({ a, b })
  const yPred = preprocess(x)
  expect(yPred.columns).toStrictEqual(["a", "b"])
  expect(yPred.get(null, 0).values).toStrictEqual(a)
  expect(yPred.get(null, 1).values).not.toStrictEqual(b)
})

test("drops string columns with 100% unique values", () => {
  const a = random(1000)
  const b = range(0, 1000).map(i => makeKey(8))
  const x = new DataFrame({ a, b })
  const yPred = preprocess(x)
  expect(yPred.columns).toStrictEqual(["a"])
  expect(yPred.get(null, 0).values).toStrictEqual(a)
})

test("one-hot-encodes string columns with 5 or fewer unique values", () => {
  const values = range(0, 5).map(i => makeKey(8))
  const a = random(1000)
  const b = range(0, 1000).map(i => values[int(random() * values.length)])
  const x = new DataFrame({ a, b })
  const yPred = preprocess(x)

  expect(sort(yPred.columns)).toStrictEqual(
    sort(["a", "b"].concat(values.map(v => "b_" + v)))
  )
})

test("throws an error when attempting to preprocess non-DataFrames", () => {
  expect(() => {
    preprocess()
  }).toThrow()

  expect(() => {
    preprocess(normal([1000, 5]))
  }).toThrow()

  expect(() => {
    preprocess(new DataFrame())
  }).toThrow()

  expect(() => {
    preprocess(123)
  }).toThrow()

  expect(() => {
    preprocess("foo")
  }).toThrow()

  expect(() => {
    preprocess(true)
  }).toThrow()

  expect(() => {
    preprocess(false)
  }).toThrow()

  expect(() => {
    preprocess(null)
  }).toThrow()

  expect(() => {
    preprocess(undefined)
  }).toThrow()

  expect(() => {
    preprocess(() => {})
  }).toThrow()

  expect(() => {
    preprocess({})
  }).toThrow()
})
