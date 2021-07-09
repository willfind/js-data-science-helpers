const inferType = require("./infer-type.js")
const { float, int, random, range, copy } = require("js-math-tools")

test("correctly infers a variety of data types from strings", () => {
  // numbers
  const a = ["2.5", "-3.4", "72", "1e5", "0"]
  const aTrue = a.map(v => float(v))
  const aPred = inferType(a)
  expect(aPred).toStrictEqual(aTrue)

  // booleans
  const b = ["true", "false", "TRUE", "True", "False"]
  const bTrue = [true, false, true, true, false]
  const bPred = inferType(b)
  expect(bPred).toStrictEqual(bTrue)

  // dates
  const c = range(0, 5).map(v => {
    const year = int(random() * 50 + 1970)
    const month = int(random() * 12 + 1)
    const day = int(random() * 28 + 1)
    return new Date(`${month}-${day}-${year}`).toJSON()
  })

  const cTrue = c.map(v => new Date(v))
  const cPred = inferType(c)
  expect(cPred).toStrictEqual(cTrue)

  // NOT arrays
  const d = ["[2, 3, 4]", "[5, 6, 7]", "[8, 9, 10]"]
  const dTrue = copy(d)
  const dPred = inferType(d)
  expect(dPred).toStrictEqual(dTrue)

  // objects
  const e = ["{foo: 'bar'}", "{x: 5, y: 7, z: 9}", "{yes: {no: 'probably'}}"]

  const eTrue = [
    { foo: "bar" },
    { x: 5, y: 7, z: 9 },
    { yes: { no: "probably" } },
  ]

  const ePred = inferType(e)
  expect(ePred).toStrictEqual(eTrue)

  // null / missing values / empty strings
  const f = ["null", "none", "nan", "NaN", "NA", "N/A", ""]
  const fTrue = range(0, f.length).map(v => null)
  const fPred = inferType(f)
  expect(fPred).toStrictEqual(fTrue)

  // otherwise unparseable strings
  const g = [
    "foo",
    "bar",
    "baz",
    "'Here's a quote!'",
    `"Here's another quote," she said.`,
  ]

  const gTrue = copy(g)
  const gPred = inferType(g)
  expect(gPred).toStrictEqual(gTrue)
})

test("correctly infers the data type when the types are mixed", () => {})
