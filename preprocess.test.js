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
} = require("js-math-tools")

test("preprocesses a random DataFrame", () => {
  // generate data with these types:
  //   - floats
  //   - integers from a small subset
  //   - integers that are completely random
  //   - strings from a small subset
  //   - strings that are completely random
  //   - booleans
  //   - dates (in what format?)
  // drop some random values
  // add some mostly empty columns
  // add some completely empty columns
  // add some columns with only 1 unique value
  // duplicate some of the already-existing columns
  // add a few columns that are highly correlated with some of the float columns
})
