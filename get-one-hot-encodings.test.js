const getOneHotEncodings = require("./get-one-hot-encodings.js")
const {
  range,
  sum,
  random,
  int,
  count,
  indexOf,
  normal,
} = require("js-math-tools")

test("", () => {
  const name = "test"
  const values = ["foo", "bar", "baz"]

  const yTrue = {
    test_foo: [1, 0, 0],
    test_bar: [0, 1, 0],
    test_baz: [0, 0, 1],
  }

  const yPred = getOneHotEncodings(name, values)
  expect(yPred).toStrictEqual(yPred)
})

test("", () => {
  const name = "test"
  const values = ["a", "b", "c", "d"]

  const x = range(0, 100).map(i => {
    return values[int(random() * values.length)]
  })

  const yPred = getOneHotEncodings(name, x)
  const counts = count(x)

  expect(sum(yPred["test_a"])).toBe(counts.filter(c => c.item === "a")[0].count)
  expect(sum(yPred["test_b"])).toBe(counts.filter(c => c.item === "b")[0].count)
  expect(sum(yPred["test_c"])).toBe(counts.filter(c => c.item === "c")[0].count)
  expect(sum(yPred["test_d"])).toBe(counts.filter(c => c.item === "d")[0].count)

  expect(indexOf(x, "a")).toStrictEqual(indexOf(yPred["test_a"], 1))
  expect(indexOf(x, "b")).toStrictEqual(indexOf(yPred["test_b"], 1))
  expect(indexOf(x, "c")).toStrictEqual(indexOf(yPred["test_c"], 1))
  expect(indexOf(x, "d")).toStrictEqual(indexOf(yPred["test_d"], 1))
})

test("", () => {
  expect(() => {
    getOneHotEncodings()
  }).toThrow()

  expect(() => {
    getOneHotEncodings("foo", normal([2, 3, 4]))
  }).toThrow()

  expect(() => {
    getOneHotEncodings(123, 456)
  }).toThrow()

  expect(() => {
    getOneHotEncodings(true, false)
  }).toThrow()

  expect(() => {
    getOneHotEncodings(undefined, null)
  }).toThrow()

  expect(() => {
    getOneHotEncodings(() => {}, {})
  }).toThrow()
})
