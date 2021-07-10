const {
  assert,
  isArray,
  shape,
  isString,
  count,
  isBoolean,
  isNumber,
  argmax,
  dropMissing,
  dropNaN,
  float,
} = require("js-math-tools")

const types = ["number", "boolean", "date", "object", "null", "string"]
const nullValues = ["null", "none", "nan", "na", "n/a", "", "undefined"]
const booleanValues = ["true", "false", "yes", "no"]

function cast(value, type) {
  if (type === "number") {
    const out = float(value)
    if (isNaN(out)) return null
    return out
  }

  if (type === "boolean") {
    const vBool = value.trim().toLowerCase()

    if (vBool === "true" || vBool === "yes") {
      return true
    }

    if (vBool === "false" || vBool === "no") {
      return false
    }

    return null
  }

  if (type === "date") {
    const out = new Date(value)
    if (out.toString() === "Invalid Date") return null
    return out
  }

  if (type === "object") {
    // note: don't return arrays!
    try {
      const out = JSON.parse(value)
      if (isArray(out)) return null
      return out
    } catch (e) {
      return null
    }
  }

  if (type === "string") {
    if (nullValues.indexOf(value.trim().toLowerCase()) > -1) return null
    return value
  }
}

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
  const dict = {}

  types.forEach(type => {
    dict[type] = arr.map(v => cast(v, type))
  })

  const counts = types.map(type => {
    if (type === "number") {
      return dropNaN(dict.number).length
    }

    if (type === "boolean") {
      return dropMissing(dict.boolean).length
    }

    if (type === "date") {
      return dropMissing(dict.date).length
    }

    if (type === "object") {
      return dropMissing(dict.object).length
    }

    if (type === "string") {
      return dropMissing(dict.string).length
    }
  })

  const primaryType = types[argmax(counts)]
  return { type: primaryType, values: dict[primaryType] }
}

module.exports = inferType
