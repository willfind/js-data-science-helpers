const {
  assert,
  isArray,
  shape,
  isString,
  count,
  isBoolean,
  isNumber,
  argmax,
} = require("js-math-tools")

function inferType(arr) {
  assert(
    isArray(arr),
    "The `inferType` function only works on one-dimensional arrays!"
  )

  assert(
    shape(arr).length === 1,
    "The `inferType` function only works on one-dimensional arrays!"
  )

  // possible types:
  // - number
  // - boolean
  // - date
  // - object
  // - null
  // - string
  // note: do NOT return arrays!
  const types = ["number", "boolean", "date", "object", "null", "string"]
  const counts = {}
  const dict = {}
  const nullValues = ["null", "none", "nan", "na", "n/a", ""]
  const booleanValues = ["true", "false", "yes", "no"]

  types.forEach(t => {
    counts[t] = 0
    dict[t] = []
  })

  arr.forEach(value => {
    if (!isString(value)) {
      value = JSON.stringify(value)
    }

    dict.string.push(value)

    // numbers & booleans
    const vLower = value.toLowerCase()
    const vLowerTrimmed = vLower.trim()
    let isBoolean = false

    if (booleanValues.indexOf(vLowerTrimmed) > -1) {
      dict.boolean.push(vLowerTrimmed === "true" || vLowerTrimmed === "yes")
      counts.boolean++
      isBoolean = true
    } else {
      dict.boolean.push(null)
    }

    const vFloat = parseFloat(value)

    if (isNumber(vFloat) && !isBoolean) {
      dict.number.push(vFloat)
      counts.number++
    } else {
      dict.number.push(null)
    }

    try {
      const vParsed = JSON.parse(value)
      const vParsedLower = JSON.parse(vLower)

      // objects & null values
      if (typeof vParsed === "object") {
        if (nullValues.indexOf(vLower) > -1) {
          dict.object.push(null)
          dict.null.push(vParsedLower)
          counts.null++
        } else {
          dict.object.push(vParsed)
          dict.null.push(null)
          counts.object++
        }
      } else {
        dict.object.push(null)
        dict.null.push(null)
      }
    } catch (e) {
      // dates & otherwise unparseable strings
      const vDate = new Date(value)

      if (vDate.toString() !== "Invalid Date") {
        dict.date.push(vDate)
        dict.string.push(null)
        counts.date++
      } else {
        dict.date.push(null)
        dict.string.push(value)
        counts.string++
      }
    }
  })

  const primaryType = types[argmax(types.map(t => counts[t]))]
  return dict[primaryType]
}

module.exports = inferType
