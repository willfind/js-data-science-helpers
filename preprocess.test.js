const preprocess = require("./preprocess.js")
const makeKey = require("make-key")
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

test("preprocesses a random DataFrame", () => {
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

  const x = []
  const columns = []
  const n = 250

  // floats
  for (let i = 0; i < 5; i++) {
    const row = add(random() * 100, scale(random() * 100, normal(n)))
    x.push(row)
    columns.push("float" + i)
  }

  // add some columns that are highly correlated with the float columns
  for (let i = 0; i < 5; i++) {
    const index = int(random() * x.length)
    const row = add(x[index], scale(0.0001, normal(n)))
    x.push(row)
    columns.push("highlyCorrelatedWith_" + columns[index])
  }

  // integers from a small set
  for (let i = 0; i < 5; i++) {
    const start = int(random() * 10) - 5
    const end = start + int(random() * 7)
    const values = range(start, end)
    const row = range(0, n).map(i => values[int(random() * values.length)])
    x.push(row)
    columns.push("intFromSet" + i)
  }

  // integers that are completely random
  for (let i = 0; i < 5; i++) {
    const row = round(add(scale(random(n), random() * 100), random() * 100))
    x.push(row)
    columns.push("int" + i)
  }

  // strings from a small set
  for (let i = 0; i < 5; i++) {
    const values = range(0, int(random() * 5) + 2).map(i => makeKey(8))
    const row = range(0, n).map(i => values[int(random() * values.length)])
    x.push(row)
    columns.push("stringsFromSet" + i)
  }

  // strings that are completely random
  for (let i = 0; i < 5; i++) {
    const row = range(0, n).map(i => makeKey(8))
    x.push(row)
    columns.push("strings" + i)
  }

  // booleans
  for (let i = 0; i < 5; i++) {
    if (random() < 0.5) {
      const row = range(0, n).map(i => random() < 0.5)
      x.push(row)
    } else {
      const row = range(0, n).map(i => (random() < 0.5 ? "TRUE" : "FALSE"))
      x.push(row)
    }

    columns.push("booleans" + i)
  }

  // dates
  for (let i = 0; i < 5; i++) {
    const row = range(0, n).map(i => {
      const year = 1970 + int(random() * 50)
      const month = 1 + int(random() * 12)
      const day = 1 + int(random() * 28)
      const date = new Date(`${month}-${day}-${year}`)
      return date.toJSON()
    })

    x.push(row)
    columns.push("date" + i)
  }

  // drop some random values
  for (let i = 0; i < 0.1 * x.length * n; i++) {
    const row = int(random() * x.length)
    const col = int(random() * n)
    const r = random()
    if (r < 1 / 3) x[row][col] = null
    if (r < 2 / 3) x[row][col] = undefined
    else x[row][col] = NaN
  }

  // duplicate some already-existing columns
  for (let i = 0; i < 5; i++) {
    const index = int(random() * x.length)
    x.push(x[index])
    columns.push("duplicateOf_" + columns[index])
  }

  // add some mostly empty columns
  for (let i = 0; i < 5; i++) {
    const row = range(0, n).map(i => null)

    for (let j = 0; j < 5 * i; j++) {
      row[int(random() * row.length)] = random()
    }

    x.push(row)
    columns.push("mostlyEmpty" + i)
  }

  // add some completely empty columns
  for (let i = 0; i < 5; i++) {
    x.push(range(0, n).map(i => undefined))
    columns.push("completelyEmpty" + i)
  }

  // add some columns with only 1 unique value
  for (let i = 0; i < 5; i++) {
    const value = random() < 0.5 ? makeKey(8) : random()
    const row = range(0, n).map(i => value)
    x.push(row)
    columns.push("oneValue" + i)
  }

  let data = new DataFrame(transpose(x))
  data.columns = columns
  data = data.get(null, shuffle(columns))

  const post = preprocess(data)
})
