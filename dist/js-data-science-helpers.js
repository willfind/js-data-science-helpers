(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

const abs = vectorize(function (x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.abs(x)
  } catch (e) {
    return NaN
  }
})

module.exports = abs

},{"./is-number.js":42,"./vectorize.js":82}],2:[function(require,module,exports){
const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

const add = vectorize(function () {
  try {
    let out
    const keys = Object.keys(arguments)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = arguments[key]
      if (!isNumber(value)) return NaN
      if (!out) out = value
      else out += arguments[key]
    }

    return out
  } catch (e) {
    return NaN
  }
})

module.exports = add

},{"./is-number.js":42,"./vectorize.js":82}],3:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const shape = require("./shape.js")
const transpose = require("./transpose.js")

function append(a, b, axis = 0) {
  assert(
    !isUndefined(a),
    "You must pass two arrays into the `append` function!"
  )

  assert(
    !isUndefined(b),
    "You must pass two arrays into the `append` function!"
  )

  assert(isArray(a), "You must pass two arrays into the `append` function!")
  assert(isArray(b), "You must pass two arrays into the `append` function!")

  assert(
    isNumber(axis),
    "The `axis` argument to the `append` function must be 0 or 1!"
  )

  assert(
    axis >= 0 && axis < 2,
    "The `axis` argument to the `append` function must be 0 or 1!"
  )

  assert(
    parseInt(axis) === axis,
    "The `axis` argument to the `append` function must be 0 or 1!"
  )

  const aShape = shape(a)
  const bShape = shape(b)

  assert(
    aShape.length === bShape.length,
    "The two arrays passed into the `append` function must have the same number of dimensions!"
  )

  assert(
    aShape.length < 3 && bShape.length < 3,
    "The two arrays passed into the `append` function must be 1- or 2-dimensional!"
  )

  for (let i = 0; i < aShape.length; i++) {
    if (i !== axis) {
      assert(
        aShape[i] === bShape[i],
        `The two arrays passed into the \`append\` function must have the same shapes along all axes *except* the axis along which they're being appended! (${aShape[i]} != ${bShape[i]})`
      )
    }
  }

  assert(
    axis < aShape.length,
    "The axis argument you passed into the `append` function is out of bounds for the array!"
  )

  if (aShape.length === 0) {
    return []
  } else if (aShape.length === 1) {
    return a.concat(b)
  } else if (aShape.length === 2) {
    if (axis === 0) {
      const out = []
      for (let i = 0; i < aShape[0]; i++) out.push(a[i])
      for (let i = 0; i < bShape[0]; i++) out.push(b[i])
      return out
    } else if (axis === 1) {
      return transpose(append(transpose(a), transpose(b), 0))
    }
  }
}

module.exports = append

},{"./assert.js":10,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./shape.js":69,"./transpose.js":79}],4:[function(require,module,exports){
const vectorize = require("./vectorize.js")

function apply(x, fn) {
  try {
    return fn(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(apply)

},{"./vectorize.js":82}],5:[function(require,module,exports){
const vectorize = require("./vectorize.js")

const arccos = vectorize(function (x) {
  try {
    return Math.acos(x)
  } catch (e) {
    return NaN
  }
})

module.exports = arccos

},{"./vectorize.js":82}],6:[function(require,module,exports){
const vectorize = require("./vectorize.js")

const arcsin = vectorize(function (x) {
  try {
    return Math.asin(x)
  } catch (e) {
    return NaN
  }
})

module.exports = arcsin

},{"./vectorize.js":82}],7:[function(require,module,exports){
const vectorize = require("./vectorize.js")

const arctan = vectorize(function (x) {
  try {
    return Math.atan(x)
  } catch (e) {
    return NaN
  }
})

module.exports = arctan

},{"./vectorize.js":82}],8:[function(require,module,exports){
const indexOf = require("./index-of.js")
const max = require("./max.js")

function argmax(x) {
  try {
    return indexOf(x, max(x))
  } catch (e) {
    return NaN
  }
}

module.exports = argmax

},{"./index-of.js":33,"./max.js":48}],9:[function(require,module,exports){
const indexOf = require("./index-of.js")
const min = require("./min.js")

function argmin(x) {
  try {
    return indexOf(x, min(x))
  } catch (e) {
    return NaN
  }
}

module.exports = argmin

},{"./index-of.js":33,"./min.js":51}],10:[function(require,module,exports){
module.exports = function (isTrue, message) {
  if (!isTrue) throw new Error(message)
}

},{}],11:[function(require,module,exports){
let vectorize = require("./vectorize.js")

let ceil = vectorize(function (x) {
  try {
    if (typeof x !== "number") return NaN
    return Math.ceil(x)
  } catch (e) {
    return NaN
  }
})

module.exports = ceil

},{"./vectorize.js":82}],12:[function(require,module,exports){
let isUndefined = require("./is-undefined.js")
let abs = require("./abs.js")
let vectorize = require("./vectorize.js")

let chop = vectorize(function (x, threshold) {
  try {
    if (isNaN(x)) return NaN
    if (!!threshold && isNaN(threshold)) return NaN
    threshold = isUndefined(threshold) || isNaN(threshold) ? 1e-10 : threshold
    return abs(x) < threshold ? 0 : x
  } catch (e) {
    return NaN
  }
})

module.exports = chop

},{"./abs.js":1,"./is-undefined.js":44,"./vectorize.js":82}],13:[function(require,module,exports){
const vectorize = require("./vectorize.js")

const clamp = vectorize(function (x, a, b) {
  try {
    if (isNaN(x)) return NaN
    if (isNaN(a)) return NaN
    if (isNaN(b)) return NaN

    if (x < a) return a
    if (x > b) return b
    return x
  } catch (e) {
    return NaN
  }
})

module.exports = clamp

},{"./vectorize.js":82}],14:[function(require,module,exports){
const mean = require("./mean.js")
const sqrt = require("./sqrt.js")
const variance = require("./variance.js")
const dropNaNPairwise = require("./drop-nan-pairwise.js")

function cohensd(arr1, arr2) {
  try {
    const [arr1Temp, arr2Temp] = dropNaNPairwise(arr1, arr2)
    if (arr1Temp.length === 0 || arr2Temp.length === 0) return NaN
    const m1 = mean(arr1Temp)
    const m2 = mean(arr2Temp)
    const s = sqrt((variance(arr1Temp) + variance(arr2Temp)) / 2)
    return (m1 - m2) / s
  } catch (e) {
    return NaN
  }
}

module.exports = cohensd

},{"./drop-nan-pairwise.js":26,"./mean.js":49,"./sqrt.js":75,"./variance.js":81}],15:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")

function copy(x) {
  if (typeof x === "object") {
    if (isUndefined(x)) {
      return x
    } else if (isArray(x)) {
      return x.map(copy)
    } else {
      const out = {}

      Object.keys(x).forEach(function (key) {
        out[key] = copy(x[key])
      })

      return out
    }
  } else {
    return x
  }
}

module.exports = copy

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44}],16:[function(require,module,exports){
const covariance = require("./covariance.js")
const std = require("./std.js")
const dropNaNPairwise = require("./drop-nan-pairwise.js")

function correl(x, y) {
  try {
    const [xTemp, yTemp] = dropNaNPairwise(x, y)
    if (xTemp.length === 0 || yTemp.length === 0) return NaN
    return covariance(xTemp, yTemp) / (std(xTemp) * std(yTemp))
  } catch (e) {
    return NaN
  }
}

module.exports = correl

},{"./covariance.js":19,"./drop-nan-pairwise.js":26,"./std.js":76}],17:[function(require,module,exports){
const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function cos(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.cos(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(cos)

},{"./is-number.js":42,"./vectorize.js":82}],18:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const flatten = require("./flatten.js")
const isEqual = require("./is-equal.js")
const set = require("./set.js")

function count(arr, items) {
  assert(
    !isUndefined(arr),
    "You must pass an array and some items to count into the `count` function!"
  )

  assert(
    isArray(arr),
    "You must pass an array and some items to count into the `count` function!"
  )

  // NOTE: This currently flattens the array that's passed in, which means that it's not possible to count occurrences of arrays within arrays! I'm not sure whether this is desirable behavior or not, so I'm just making a note of it for now. It's not trivial to count occurrences of identical objects, so maybe this function should refuse to operate on objects!
  const temp = flatten(arr)
  items = isUndefined(items) ? set(arr) : items

  if (isArray(items)) {
    return flatten(items).map(function (item1) {
      const c = temp.filter(item2 => isEqual(item1, item2)).length
      return { item: item1, count: c }
    })
  } else {
    return temp.filter(other => other === items).length
  }
}

module.exports = count

},{"./assert.js":10,"./flatten.js":28,"./is-array.js":38,"./is-equal.js":40,"./is-undefined.js":44,"./set.js":68}],19:[function(require,module,exports){
const assert = require("./assert.js")
const mean = require("./mean.js")
const dropNaNPairwise = require("./drop-nan-pairwise.js")

function covariance(x, y) {
  try {
    assert(
      x.length === y.length,
      "The two arrays passed into the `covariance` function have different lengths!"
    )

    const [xTemp, yTemp] = dropNaNPairwise(x, y)
    if (xTemp.length === 0 || yTemp.length === 0) return NaN

    assert(
      xTemp.length === yTemp.length,
      "The two arrays passed into the `covariance` function have different lengths after NaN values are dropped!"
    )

    const mx = mean(xTemp)
    const my = mean(yTemp)
    let out = 0

    for (let i = 0; i < xTemp.length; i++) {
      out += (xTemp[i] - mx) * (yTemp[i] - my)
    }

    return out / xTemp.length
  } catch (e) {
    return NaN
  }
}

module.exports = covariance

},{"./assert.js":10,"./drop-nan-pairwise.js":26,"./mean.js":49}],20:[function(require,module,exports){
(function (process){(function (){
const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")
const shape = require("./shape.js")
const transpose = require("./transpose.js")
const range = require("./range.js")
const isNumber = require("./is-number.js")
const isString = require("./is-string.js")
const apply = require("./apply.js")
const isFunction = require("./is-function.js")
const ndarray = require("./ndarray.js")
const copy = require("./copy.js")
const Series = require("./series.js")
const flatten = require("./flatten.js")
const isEqual = require("./is-equal.js")
const max = require("./max.js")
const min = require("./min.js")
const set = require("./set.js")
const isBoolean = require("./is-boolean.js")
const random = require("./random.js")
const sort = require("./sort.js")
const dropNaN = require("./drop-nan.js")

function makeKey(n) {
  const alpha = "abcdefghijklmnopqrstuvwxyz1234567890"
  let out = ""
  for (let i = 0; i < n; i++)
    out += alpha[parseInt(Math.random() * alpha.length)]
  return out
}

function isInteger(x) {
  return isNumber(x) && parseInt(x) === x
}

function isWholeNumber(x) {
  return isInteger(x) && x >= 0
}

function isObject(x) {
  return x instanceof Object && !isArray(x)
}

function isDataFrame(x) {
  return x instanceof DataFrame
}

function isSeries(x) {
  return x instanceof Series
}

function quote(s) {
  let pattern = /"(.*?)"/g
  let matches = s.match(pattern)
  let out = s.slice()

  if (matches) {
    matches.forEach(item => {
      out = out.replace(item, `“${item.substring(1, item.length - 1)}”`)
    })
  }

  pattern = /'(.*?)'/g
  matches = s.match(pattern)

  if (matches) {
    matches.forEach(item => {
      out = out.replace(item, `‘${item.substring(1, item.length - 1)}’`)
    })
  }

  return `"${out}"`
}

function leftPad(x, maxLength) {
  assert(isNumber(x), "The `leftPad` function only works on numbers!")
  let out = x.toString()
  while (out.length < maxLength) out = "0" + out
  return out
}

class DataFrame {
  constructor(data) {
    const self = this

    Object.defineProperty(self, "_values", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(self, "values", {
      configurable: true,
      enumerable: true,

      get() {
        return self._values
      },

      set(x) {
        assert(isArray(x), "The new values must be a 2-dimensional array!")

        const dataShape = shape(x)

        assert(
          dataShape.length === 2,
          "The new array of values must be 2-dimensional!"
        )

        if (dataShape[0] < self._index.length) {
          self._index = self._index.slice(0, dataShape[0])
        } else if (dataShape[0] > self._index.length) {
          self._index = self._index.concat(
            range(self._index.length, dataShape[0]).map(i => {
              return "row" + leftPad(i, (dataShape[0] - 1).toString().length)
            })
          )
        }

        if (dataShape[1] < self._columns.length) {
          self._columns = self._columns.slice(0, dataShape[1])
        } else if (dataShape[1] > self._columns.length) {
          self._columns = self._columns.concat(
            range(self._columns.length, dataShape[1]).map(i => {
              return "col" + leftPad(i, (dataShape[1] - 1).toString().length)
            })
          )
        }

        self._values = x
      },
    })

    Object.defineProperty(self, "_columns", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(self, "columns", {
      configurable: true,
      enumerable: true,

      get() {
        return self._columns
      },

      set(x) {
        assert(
          isArray(x),
          "The new columns list must be a 1-dimensional array of strings!"
        )

        assert(
          x.length === self.shape[1],
          "The new columns list must be the same length as the old columns list!"
        )

        assert(
          shape(x).length === 1,
          "The new columns list must be a 1-dimensional array of strings!"
        )

        x = x.map(v => {
          if (typeof v === "string") return v
          return JSON.stringify(v) || v.toString()
        })

        self._columns = x
      },
    })

    Object.defineProperty(self, "_index", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(self, "index", {
      configurable: true,
      enumerable: true,

      get() {
        return self._index
      },

      set(x) {
        assert(
          isArray(x),
          "The new index must be a 1-dimensional array of strings!"
        )

        assert(
          x.length === self.shape[0],
          "The new index must be the same length as the old index!"
        )

        assert(
          shape(x).length === 1,
          "The new index must be a 1-dimensional array of strings!"
        )

        x = x.map(v => {
          if (typeof v === "string") return v
          return JSON.stringify(v) || v.toString()
        })

        self._index = x
      },
    })

    assert(
      isUndefined(data) || data instanceof Object,
      "The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values."
    )

    if (data) {
      if (isArray(data)) {
        const dataShape = shape(data)

        assert(
          dataShape.length === 2,
          "The `data` array passed into the constructor of a DataFrame must be 2-dimensional!"
        )

        self.values = data
      } else {
        self._columns = Object.keys(data)
        const temp = []

        self._columns.forEach(col => {
          const values = data[col]
          temp.push(values)
        })

        self._values = transpose(temp)

        const dataShape = shape(self.values)

        self._index = range(0, dataShape[0]).map(i => {
          return "row" + leftPad(i, (dataShape[0] - 1).toString().length)
        })
      }
    }
  }

  static async fromCSV(path, options) {
    options = options || {}
    let raw

    // browser
    try {
      const response = await fetch(path)
      raw = await response.text()
    } catch (e) {}

    // node
    try {
      const fs = require("fs")
      const encoding = options.encoding || "utf8"
      raw = fs.readFileSync(path, encoding)
    } catch (e) {}

    const lines = raw.split("\n").filter(line => line.length > 0)

    let out = lines.map(line => {
      const dict = {}
      const quotePattern = /"(.*?)"/g
      const matches = line.match(quotePattern) || []

      matches.forEach(match => {
        const key = makeKey(32)
        line = line.replaceAll(match, key)
        dict[key] = match
      })

      const values = line.split(",")

      return values.map((value, i) => {
        value = dict[value] || value

        try {
          let parsedValue = JSON.parse(value)
          if (isArray(parsedValue)) return value
          return parsedValue
        } catch (e) {
          return value
        }
      })
    })

    const valuesPerRow = max(out.map(line => line.length))

    out = out.map(line => {
      line.length = valuesPerRow
      return line
    })

    let columns, index
    const hasHeaderRow = isBoolean(options.hasHeaderRow)
      ? options.hasHeaderRow
      : true
    const hasIndexColumn = isBoolean(options.hasIndexColumn)
      ? options.hasIndexColumn
      : false

    if (hasHeaderRow) {
      columns = out.shift()
    }

    if (hasIndexColumn) {
      index = out.map(row => row.shift())
      if (columns) columns.shift()
    }

    out = new DataFrame(out)
    if (columns) out.columns = columns
    if (index) out.index = index
    return out
  }

  get shape() {
    const self = this
    return shape(self.values)
  }

  get rows() {
    const self = this
    return self.index
  }

  set rows(rows) {
    const self = this
    self.index = rows
  }

  isEmpty() {
    const self = this
    return set(self.values).filter(v => !isUndefined(v)).length === 0
  }

  clear() {
    const self = this
    const out = new DataFrame(ndarray(self.shape))
    out.columns = self.columns.slice()
    out.index = self.index.slice()
    return out
  }

  get(rows, cols) {
    const self = this

    if (isString(rows) || isNumber(rows)) rows = [rows]
    if (isString(cols) || isNumber(cols)) cols = [cols]

    const types = set((rows || []).concat(cols || []).map(v => typeof v))

    assert(
      types.length <= 2,
      "Only whole numbers and/or strings are allowed in `get` arrays!"
    )

    if (types.length === 1) {
      assert(
        types[0] === "string" || types[0] === "number",
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      )
    }

    if (types.length === 2) {
      assert(
        types.indexOf("string") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      )

      assert(
        types.indexOf("number") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      )
    }

    if (!isUndefined(rows)) {
      rows = rows.map(r => {
        if (typeof r === "string") {
          assert(self.index.indexOf(r) > -1, `Row "${r}" does not exist!`)
          return r
        }

        if (typeof r === "number") {
          assert(r >= 0, `Index ${r} is out of bounds!`)
          assert(parseInt(r) === r, `Row numbers must be integers!`)
          assert(r < self.index.length, `Index ${r} is out of bounds!`)
          return self.index[r]
        }
      })
    }

    if (!isUndefined(cols)) {
      cols = cols.map(c => {
        if (typeof c === "string") {
          assert(self.columns.indexOf(c) > -1, `Column "${c}" does not exist!`)
          return c
        }

        if (typeof c === "number") {
          assert(c >= 0, `Column ${c} is out of bounds!`)
          assert(parseInt(c) === c, `Column numbers must be integers!`)
          assert(c < self.columns.length, `Column ${c} is out of bounds!`)
          return self.columns[c]
        }
      })
    }

    return self.getSubsetByNames(rows, cols)
  }

  getSubsetByNames(rows, cols) {
    const self = this

    if (isUndefined(rows)) rows = self.index
    if (isUndefined(cols)) cols = self.columns
    if (typeof rows === "string") rows = [rows]
    if (typeof cols === "string") cols = [cols]

    assert(
      isArray(rows) && isArray(cols),
      "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
    )

    assert(
      shape(rows).length === 1 && shape(cols).length === 1,
      "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
    )

    assert(
      rows.length > 0,
      "The `rows` array must contain at least one row name."
    )

    assert(
      cols.length > 0,
      "The `cols` array must contain at least one column name."
    )

    rows.forEach(row => {
      assert(
        isString(row),
        "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
      )

      assert(
        self.index.indexOf(row) > -1,
        `The row name "${row}" does not exist in the list of rows.`
      )
    })

    cols.forEach(col => {
      assert(
        isString(col),
        "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
      )

      assert(
        self.columns.indexOf(col) > -1,
        `The column name "${col}" does not exist in the list of columns.`
      )
    })

    const values = rows.map(row => {
      return cols.map(col => {
        return self.values[self.index.indexOf(row)][self.columns.indexOf(col)]
      })
    })

    if (rows.length === 1 && cols.length === 1) {
      return flatten(values)[0]
    }

    if (rows.length === 1) {
      const out = new Series(flatten(values))
      out.name = rows[0]
      out.index = cols
      return out
    }

    if (cols.length === 1) {
      const out = new Series(flatten(values))
      out.name = cols[0]
      out.index = rows
      return out
    }

    const out = new DataFrame(values)
    out.columns = cols
    out.index = rows
    return out
  }

  getSubsetByIndices(rowIndices, colIndices) {
    const self = this
    const dataShape = self.shape

    if (isUndefined(rowIndices)) rowIndices = range(0, dataShape[0])
    if (isUndefined(colIndices)) colIndices = range(0, dataShape[1])
    if (typeof rowIndices === "number") rowIndices = [rowIndices]
    if (typeof colIndices === "number") colIndices = [colIndices]

    assert(
      isArray(rowIndices) && isArray(colIndices),
      "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
    )

    assert(
      shape(rowIndices).length === 1 && shape(colIndices).length === 1,
      "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
    )

    assert(
      rowIndices.length > 0,
      "The `rowIndices` array must contain at least one index."
    )

    assert(
      colIndices.length > 0,
      "The `colIndices` array must contain at least one index."
    )

    rowIndices.forEach(rowIndex => {
      assert(
        isWholeNumber(rowIndex),
        "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
      )

      assert(
        rowIndex < self.index.length,
        `The row index ${rowIndex} is out of bounds.`
      )
    })

    colIndices.forEach(colIndex => {
      assert(
        isWholeNumber(colIndex),
        "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
      )

      assert(
        colIndex < self.columns.length,
        `The column index ${colIndex} is out of bounds.`
      )
    })

    const rows = rowIndices.map(i => self.index[i])
    const cols = colIndices.map(i => self.columns[i])
    return self.getSubsetByNames(rows, cols)
  }

  loc(rows, cols) {
    const self = this
    return self.getSubsetByNames(rows, cols)
  }

  iloc(rowIndices, colIndices) {
    const self = this
    return self.getSubsetByIndices(rowIndices, colIndices)
  }

  transpose() {
    const self = this
    const out = new DataFrame(transpose(self.values))
    out.columns = self.index
    out.index = self.columns
    return out
  }

  get T() {
    const self = this
    return self.transpose()
  }

  resetIndex() {
    const self = this
    const out = self.copy()

    out.index = range(0, self.shape[0]).map(i => {
      return "row" + leftPad(i, (out.index.length - 1).toString().length)
    })

    return out
  }

  copy() {
    const self = this
    if (self.isEmpty()) return new DataFrame()
    const out = new DataFrame(copy(self.values))
    out.columns = self.columns.slice()
    out.index = self.index.slice()
    return out
  }

  assign(p1, p2) {
    let name, obj

    if (isUndefined(p2)) {
      obj = p1

      assert(
        !isArray(obj),
        "When using only one parameter for the `assign` method, the parameter must be an object or a Series."
      )
    } else {
      name = p1
      obj = p2

      assert(
        isString(name),
        "When using two parameters for the `assign` method, the first parameter must be a string."
      )

      assert(
        isSeries(obj) || (isArray(obj) && shape(obj).length === 1),
        "When using two parameters for the `assign` method, the second parameter must be a Series or a 1-dimensional array."
      )
    }

    assert(
      isObject(obj) ||
        isSeries(obj) ||
        (isArray(obj) && shape(obj).length === 1),
      "An object, Series, or 1-dimensional array must be passed into the `assign` method."
    )

    const self = this

    if (isSeries(obj)) {
      const temp = {}

      assert(
        self.isEmpty() || isEqual(obj.index, self.index),
        "The index of the new data does not match the index of the DataFrame."
      )

      temp[name || obj.name] = obj.values
      return self.assign(temp)
    } else if (isArray(obj)) {
      const temp = {}
      temp[name || "data"] = obj
      return self.assign(temp)
    } else {
      let out = self.copy()
      let outShape = out.shape

      Object.keys(obj).forEach(col => {
        const values = obj[col]

        assert(
          isArray(values),
          "Each key-value pair must be (respectively) a string and a 1-dimensional array of values."
        )

        assert(
          shape(values).length === 1,
          "Each key-value pair must be (respectively) a string and a 1-dimensional array of values."
        )

        if (out.isEmpty()) {
          out.values = transpose([values])
          out.columns = [col]
          outShape = out.shape
        } else {
          assert(
            values.length === outShape[0],
            `Column "${col}" in the new data is not the same length as the other columns in the original DataFrame.`
          )

          let colIndex = out.columns.indexOf(col)

          if (colIndex < 0) {
            out.columns.push(col)
            colIndex = out.columns.indexOf(col)
          }

          out.values.forEach((row, i) => {
            row[colIndex] = values[i]
          })
        }
      })

      return out
    }
  }

  apply(fn, axis) {
    axis = axis || 0

    assert(
      isFunction(fn),
      "The first parameter to the `apply` method must be a function."
    )

    assert(
      axis === 0 || axis === 1,
      "The second parameter to the `apply` method (the `axis`) must be 0 or 1."
    )

    const self = this

    if (axis === 0) {
      const temp = transpose(self.values)

      const newValues = temp.map((col, i) => {
        return fn(col, self.columns[i])
      })

      if (shape(newValues).length === 1) {
        const out = new Series(newValues)
        out.index = copy(self.columns)
        return out
      } else {
        const out = new DataFrame(transpose(newValues))
        out.index = copy(self.index)
        out.columns = copy(self.columns)
        return out
      }
    } else if (axis === 1) {
      const newValues = self.values.map((row, i) => {
        return fn(row, self.index[i])
      })

      if (shape(newValues).length === 1) {
        const out = new Series(newValues)
        out.index = copy(self.index)
        return out
      } else {
        const out = new DataFrame(newValues)
        out.index = copy(self.index)
        out.columns = copy(self.columns)
        return out
      }
    }
  }

  map(fn, axis) {
    const self = this
    return self.apply(fn, axis)
  }

  dropMissing(axis, condition, threshold) {
    axis = axis || 0

    assert(
      axis === 0 || axis === 1,
      "The first parameter of the `dropMissing` method (the `axis`) must be 0 or 1."
    )

    threshold = threshold || 0

    assert(
      isWholeNumber(threshold),
      "The third parameter of the `dropMissing` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` null values)."
    )

    condition = threshold > 0 ? "none" : condition || "any"

    assert(
      condition === "any" || condition === "all" || condition === "none",
      "The second parameter of the `dropMissing` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains null values, then it should be dropped; or that if 'all' of the data contains null values, then it should be dropped)."
    )

    function helper(values) {
      if (threshold > 0) {
        let count = 0

        for (let i = 0; i < values.length; i++) {
          const value = values[i]
          if (isUndefined(value)) count++
          if (count >= threshold) return []
        }
      } else if (condition === "any") {
        for (let i = 0; i < values.length; i++) {
          const value = values[i]
          if (isUndefined(value)) return []
        }
      } else if (condition === "all") {
        for (let i = 0; i < values.length; i++) {
          const value = values[i]
          if (!isUndefined(value)) return values
        }

        return []
      }

      return values
    }

    const self = this
    let out = self.copy()
    const tempID = Math.random().toString()

    if (axis === 0) {
      out = out.assign(tempID, out.index)

      const newValues = out.values.map(helper).filter(row => row.length > 0)

      if (shape(newValues).length < 2) return new DataFrame()

      out.values = newValues

      let newIndex = out.get(null, tempID)
      if (isUndefined(newIndex)) return new DataFrame()
      if (isString(newIndex)) newIndex = [newIndex]
      if (isSeries(newIndex)) newIndex = newIndex.values
      out.index = newIndex
      out = out.drop(null, tempID)
    } else if (axis === 1) {
      out = out.transpose()
      out = out.assign(tempID, out.index)

      const newValues = out.values.map(helper).filter(col => col.length > 0)

      if (shape(newValues).length < 2) return new DataFrame()

      out.values = newValues

      let newIndex = out.get(null, tempID)
      if (isUndefined(newIndex)) return new DataFrame()
      if (isString(newIndex)) newIndex = [newIndex]
      if (isSeries(newIndex)) newIndex = newIndex.values
      out.index = newIndex
      out = out.drop(null, tempID)
      out = out.transpose()
    }

    return out
  }

  dropNaN(axis, condition, threshold) {
    axis = axis || 0

    assert(
      axis === 0 || axis === 1,
      "The first parameter of the `dropNaN` method (the `axis`) must be 0 or 1."
    )

    threshold = threshold || 0

    assert(
      isWholeNumber(threshold),
      "The third parameter of the `dropNaN` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` NaN values)."
    )

    condition = threshold > 0 ? "none" : condition || "any"

    assert(
      condition === "any" || condition === "all" || condition === "none",
      "The second parameter of the `dropNaN` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains NaN values, then it should be dropped; or that if 'all' of the data contains NaN values, then it should be dropped)."
    )

    function helper(values) {
      const numericalValues = dropNaN(values)
      if (threshold > 0)
        return values.length - numericalValues.length < threshold
      if (condition === "any") return numericalValues.length === values.length
      if (condition === "all") return numericalValues.length > 0
      return true
    }

    const self = this
    let out = self.copy()
    const tempID = Math.random().toString()

    if (axis === 0) {
      const rowsToKeep = out.index.filter(row => {
        const values = out.get(row, null).values
        return helper(values)
      })

      if (rowsToKeep.length > 0) return out.get(rowsToKeep, null)
      else return new DataFrame()
    } else if (axis === 1) {
      const colsToKeep = out.columns.filter(col => {
        const values = out.get(null, col).values
        return helper(values)
      })

      if (colsToKeep.length > 0) return out.get(null, colsToKeep)
      else return new DataFrame()
    }

    return out
  }

  drop(rows, cols) {
    const self = this

    if (isUndefined(rows)) rows = []
    if (isUndefined(cols)) cols = []
    if (isString(rows) || isNumber(rows)) rows = [rows]
    if (isString(cols) || isNumber(cols)) cols = [cols]

    assert(
      isArray(rows),
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    )

    assert(
      isArray(cols),
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    )

    assert(
      shape(rows).length === 1,
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    )

    assert(
      shape(cols).length === 1,
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    )

    let outIndex, outColumns

    self.index.forEach((row, i) => {
      if (rows.indexOf(row) < 0 && rows.indexOf(i) < 0) {
        if (!outIndex) outIndex = []
        outIndex.push(row)
      }
    })

    self.columns.forEach((col, i) => {
      if (cols.indexOf(col) < 0 && cols.indexOf(i) < 0) {
        if (!outColumns) outColumns = []
        outColumns.push(col)
      }
    })

    let out = self.get(outIndex, outColumns)

    if (isSeries(out)) {
      let temp = new DataFrame()
      temp = temp.assign(out)
      if (self.index.indexOf(out.name) > -1) temp = temp.transpose()
      out = temp
    }

    return out
  }

  dropColumns(columns) {
    const self = this
    return self.drop(null, columns)
  }

  dropRows(rows) {
    const self = this
    return self.drop(rows, null)
  }

  toObject() {
    const self = this
    const out = {}

    self.values.forEach((row, i) => {
      const temp = {}

      row.forEach((value, j) => {
        temp[self.columns[j]] = value
      })

      out[self.index[i]] = temp
    })

    return out
  }

  toCSVString(options) {
    const self = this
    options = isUndefined(options) ? {} : options

    const hasHeaderRow = isBoolean(options.hasHeaderRow)
      ? options.hasHeaderRow
      : true
    const hasIndexColumn = isBoolean(options.hasIndexColumn)
      ? options.hasIndexColumn
      : false

    let index, columns, out

    if (hasHeaderRow && hasIndexColumn) {
      index = ["(index)"].concat(copy(self.index))
      columns = copy(self.columns)

      out = [columns].concat(self.values).map((row, i) => {
        return [index[i]].concat(row)
      })
    } else if (!hasHeaderRow && hasIndexColumn) {
      index = copy(self.index)

      out = self.values.map((row, i) => {
        return [index[i]].concat(row)
      })
    } else if (hasHeaderRow && !hasIndexColumn) {
      columns = copy(self.columns)
      out = [columns].concat(self.values)
    } else if (!hasHeaderRow && !hasIndexColumn) {
      out = self.values
    }

    out = out
      .map((row, i) => {
        return row
          .map(value => {
            if (isString(value)) {
              return quote(value)
            } else {
              return value
            }
          })
          .join(",")
      })
      .join("\n")

    return out
  }

  toCSV(filename, options) {
    const self = this
    const out = self.toCSVString(options)

    // browser
    try {
      let newFilename = filename

      if (filename.includes("/")) {
        const parts = filename.split("/")
        newFilename = parts[parts.length - 1]
      }

      const a = document.createElement("a")
      a.href = `data:text/csv;charset=utf-8,${encodeURIComponent(out)}`
      a.download = newFilename
      a.dispatchEvent(new MouseEvent("click"))
    } catch (e) {}

    // node
    try {
      const fs = require("fs")
      const path = require("path")
      fs.writeFileSync(path.resolve(filename), out, "utf8")
    } catch (e) {}

    return self
  }

  print() {
    const self = this

    if (isEqual(self.shape, [0])) {
      console.table({})
      return self
    }

    const maxRows = typeof window === "undefined" ? 20 : 10
    const halfMaxRows = parseInt(maxRows / 2)
    const maxColumns =
      typeof window === "undefined"
        ? Math.floor(process.stdout.columns / 24) - 1
        : 10
    const halfMaxColumns = parseInt(maxColumns / 2)

    const tempRows =
      maxRows > self.index.length
        ? null
        : range(0, halfMaxRows).concat(
            range(self.index.length - halfMaxRows, self.index.length)
          )

    const tempColumns =
      maxColumns > self.columns.length
        ? null
        : range(0, halfMaxColumns).concat(
            range(self.columns.length - halfMaxColumns, self.columns.length)
          )

    let temp = self.get(tempRows, tempColumns)

    if (temp instanceof Series) {
      if (self.shape[0] === 1) {
        // data is row-shaped
        temp = new DataFrame([temp.values])
        temp.index = self.index
        temp.columns = new Series(self.columns).get(tempColumns).values
      } else if (self.shape[1] === 1) {
        // data is column-shaped
        temp = new DataFrame([temp.values]).transpose()
        temp.index = new Series(self.index).get(tempRows).values
        temp.columns = self.columns
      }
    }

    if (maxRows <= self.index.length) {
      temp._index.splice(halfMaxRows, 0, "...")
      temp._values.splice(
        halfMaxRows,
        0,
        range(0, temp.columns.length).map(i => "...")
      )
    }

    if (maxColumns <= self.columns.length) {
      temp._columns.splice(halfMaxColumns, 0, "...")

      temp._values = temp._values.map(row => {
        row.splice(halfMaxColumns, 0, "...")
        return row
      })
    }

    console.table(temp.toObject())
    return self
  }

  sort(cols, directions) {
    const self = this

    // temporarily assign index as column in dataframe
    let out = self.copy()
    const indexID = random().toString()
    out = out.assign(indexID, out.index)

    if (isUndefined(cols)) {
      cols = [indexID]
      directions = [true]
    }

    if (isNumber(cols) || isString(cols)) {
      cols = [cols]

      if (isBoolean(directions) || isString(directions))
        directions = [directions]
    }

    assert(
      isArray(cols),
      "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
    )

    assert(
      shape(cols).length === 1,
      "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
    )

    if (isUndefined(directions))
      directions = range(0, cols.length).map(i => true)

    assert(
      isArray(directions),
      "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
    )

    assert(
      shape(directions).length === 1,
      "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
    )

    assert(
      cols.length === directions.length,
      "The arrays passed into the `sort` method must be equal in length."
    )

    // convert all columns to indices
    cols = cols.map(col => {
      assert(
        isString(col) || isNumber(col),
        "Column references can either be column names (as strings) or column indices (as whole numbers)."
      )

      if (isString(col)) {
        const index = out.columns.indexOf(col)
        assert(index > -1, `The column "${col}" does not exist!`)
        return index
      }

      if (isNumber(col)) {
        assert(parseInt(col) === col, "Column indices must be whole numbers!")
        assert(col >= 0, `The column index ${col} is out of bounds!`)
        assert(col < out.columns.length, `The index ${col} is out of bounds!`)
        return col
      }
    })

    // convert all directions to booleans
    directions = directions.map(dir => {
      assert(
        isString(dir) || isBoolean(dir),
        "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
      )

      if (isString(dir)) {
        const value = dir.trim().toLowerCase()

        assert(
          value === "ascending" || value === "descending",
          "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
        )

        return value === "ascending"
      }

      if (isBoolean(dir)) {
        return dir
      }
    })

    // sort
    out.values = sort(out.values, (a, b) => {
      let counter = 0

      while (a[cols[counter]] === b[cols[counter]] && counter < cols.length) {
        counter++
      }

      const isAscending = directions[counter]
      if (a[cols[counter]] === b[cols[counter]]) return 0
      if (a[cols[counter]] < b[cols[counter]]) return isAscending ? -1 : 1
      if (a[cols[counter]] > b[cols[counter]]) return isAscending ? 1 : -1
    })

    out.index = flatten(out.get(null, indexID).values)
    out = out.dropColumns(indexID)
    return out
  }

  sortByIndex() {
    const self = this
    return self.sort()
  }

  filter(fn, axis) {
    assert(
      isFunction(fn),
      "The `filter` method takes a single parameter: a function that is used to filter the values."
    )

    if (isUndefined(axis)) axis = 0

    assert(
      axis === 0 || axis === 1,
      "The `axis` parameter to the `filter` method must be 0 or 1."
    )

    const self = this
    let out = self.copy()
    if (out.isEmpty()) return out

    const index = copy(out.index)
    const columns = copy(out.columns)

    if (axis === 0) {
      const indexID = Math.random().toString()
      out = out.assign(indexID, out.index)

      let newValues = out.values.filter((row, i) => {
        const shouldKeep = fn(row, i, out)
        if (!shouldKeep) index.splice(i, 1)
        return shouldKeep
      })

      if (flatten(newValues).length === 0) return new DataFrame()
      if (shape(newValues).length === 1) newValues = [newValues]

      out.values = newValues
      out.index = out.get(null, indexID).values
      out = out.drop(null, indexID)
    } else if (axis === 1) {
      out = out.transpose()

      const columnsID = Math.random().toString()
      out = out.assign(columnsID, out.index)

      let newValues = out.values.filter((row, i) => {
        const shouldKeep = fn(row, i, out)
        if (!shouldKeep) columns.splice(i, 1)
        return shouldKeep
      })

      if (flatten(newValues).length === 0) return new DataFrame()
      if (shape(newValues).length === 1) newValues = [newValues]

      out.values = newValues
      out.index = out.get(null, columnsID).values
      out = out.drop(null, columnsID)
      out = out.transpose()
    }

    return out
  }

  shuffle(axis) {
    if (isUndefined(axis)) axis = 0

    assert(
      axis === 0 || axis === 1,
      "The `axis` parameter to the `shuffle` must be 0, 1, or undefined."
    )

    const self = this

    return self.get(
      axis === 0 ? shuffle(self.index) : null,
      axis === 1 ? shuffle(self.columns) : null
    )
  }
}

module.exports = DataFrame

}).call(this)}).call(this,require('_process'))
},{"./apply.js":4,"./assert.js":10,"./copy.js":15,"./drop-nan.js":27,"./flatten.js":28,"./is-array.js":38,"./is-boolean.js":39,"./is-equal.js":40,"./is-function.js":41,"./is-number.js":42,"./is-string.js":43,"./is-undefined.js":44,"./max.js":48,"./min.js":51,"./ndarray.js":53,"./random.js":59,"./range.js":60,"./series.js":66,"./set.js":68,"./shape.js":69,"./sort.js":74,"./transpose.js":79,"_process":107,"fs":105,"path":106}],21:[function(require,module,exports){
const assert = require("./assert.js")
const isArray = require("./is-array.js")
const flatten = require("./flatten.js")

function diff(a, b) {
  assert(isArray(a), "You must pass two arrays into the `diff` function!")
  assert(isArray(b), "You must pass two arrays into the `diff` function!")

  const aTemp = flatten(a)
  const bTemp = flatten(b)
  const out = []

  aTemp.forEach(item => {
    if (bTemp.indexOf(item) < 0) out.push(item)
  })

  return out
}

module.exports = diff

},{"./assert.js":10,"./flatten.js":28,"./is-array.js":38}],22:[function(require,module,exports){
const pow = require("./pow.js")
const sum = require("./sum.js")
const add = require("./add.js")
const scale = require("./scale.js")
const sqrt = require("./sqrt.js")
const set = require("./set.js")
const flatten = require("./flatten.js")

function distance(a, b) {
  try {
    const types = set(flatten(a.concat(b)).map(v => typeof v))
    if (types.length > 1 || types[0] !== "number") return NaN
    return sqrt(sum(pow(add(a, scale(b, -1)), 2)))
  } catch (e) {
    return NaN
  }
}

module.exports = distance

},{"./add.js":2,"./flatten.js":28,"./pow.js":57,"./scale.js":64,"./set.js":68,"./sqrt.js":75,"./sum.js":77}],23:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const isEqual = require("./is-equal.js")
const flatten = require("./flatten.js")
const shape = require("./shape.js")
const sum = require("./sum.js")
const scale = require("./scale.js")
const transpose = require("./transpose.js")

function dot(a, b) {
  assert(
    !isUndefined(a) && !isUndefined(b),
    "You must pass two arrays of numbers into the `dot` function!"
  )

  assert(
    isArray(a) && isArray(b),
    "You must pass two arrays of numbers into the `dot` function!"
  )

  flatten(a)
    .concat(flatten(b))
    .forEach(v => {
      assert(
        isNumber(v),
        "One of the arrays you passed into the `dot` function contains non-numerical values!"
      )
    })

  const aShape = shape(a)
  const bShape = shape(b)

  assert(
    aShape.length <= 2 && bShape.length <= 2,
    "I'm not smart enough to know how to get the dot-product of arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `dot` function!"
  )

  assert(
    aShape[aShape.length - 1] === bShape[0],
    `There's a dimension misalignment in the two arrays you passed into the \`dot\` function. (${
      aShape[aShape.length - 1]
    } !== ${bShape[0]})`
  )

  if (aShape.length === 1 && bShape.length === 1) {
    return sum(scale(a, b))
  } else if (aShape.length === 1 && bShape.length === 2) {
    return transpose(b).map(col => dot(a, col))
  } else if (aShape.length === 2 && bShape.length === 1) {
    return a.map(row => dot(row, b))
  } else if (aShape.length === 2 && bShape.length === 2) {
    const bTranspose = transpose(b)
    const out = []

    for (let i = 0; i < a.length; i++) {
      const row = []

      for (let j = 0; j < bTranspose.length; j++) {
        row.push(dot(a[i], bTranspose[j]))
      }

      out.push(row)
    }

    return out
  }
}

module.exports = dot

},{"./assert.js":10,"./flatten.js":28,"./is-array.js":38,"./is-equal.js":40,"./is-number.js":42,"./is-undefined.js":44,"./scale.js":64,"./shape.js":69,"./sum.js":77,"./transpose.js":79}],24:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const max = require("./max.js")
const shape = require("./shape.js")

function dropMissingPairwise(a, b) {
  assert(
    isArray(a) && isArray(b),
    "The two items passed into the `dropMissingPairwise` function must be arrays!"
  )

  assert(
    shape(a).length === 1 && shape(b).length === 1,
    "The `dropMissingPairwise` function only works on one-dimensional arrays!"
  )

  const aOut = []
  const bOut = []

  for (let i = 0; i < max([a.length, b.length]); i++) {
    if (!isUndefined(a[i]) && !isUndefined(b[i])) {
      aOut.push(a[i])
      bOut.push(b[i])
    }
  }

  return [aOut, bOut]
}

module.exports = dropMissingPairwise

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44,"./max.js":48,"./shape.js":69}],25:[function(require,module,exports){
const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")
const shape = require("./shape.js")

function dropMissing(x) {
  assert(
    isArray(x),
    "The value passed into the `dropMissing` function must be a one-dimensional array!"
  )

  assert(
    shape(x).length === 1,
    "The value passed into the `dropMissing` function must be a one-dimensional array!"
  )

  return x.filter(v => !isUndefined(v))
}

module.exports = dropMissing

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44,"./shape.js":69}],26:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const max = require("./max.js")
const shape = require("./shape.js")

function dropNaNPairwise(a, b) {
  assert(
    isArray(a) && isArray(b),
    "The two items passed into the `dropNaNPairwise` function must be arrays!"
  )

  assert(
    shape(a).length === 1 && shape(b).length === 1,
    "The `dropNaNPairwise` function only works on one-dimensional arrays!"
  )

  const aOut = []
  const bOut = []

  for (let i = 0; i < max([a.length, b.length]); i++) {
    if (
      !isUndefined(a[i]) &&
      isNumber(a[i]) &&
      !isUndefined(b[i]) &&
      isNumber(b[i])
    ) {
      aOut.push(a[i])
      bOut.push(b[i])
    }
  }

  return [aOut, bOut]
}

module.exports = dropNaNPairwise

},{"./assert.js":10,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./max.js":48,"./shape.js":69}],27:[function(require,module,exports){
const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")
const isNumber = require("./is-number.js")
const shape = require("./shape.js")

function dropNaN(x) {
  assert(
    isArray(x),
    "The value passed into the `dropNaN` function must be a one-dimensional array!"
  )

  assert(
    shape(x).length === 1,
    "The value passed into the `dropNaN` function must be a one-dimensional array"
  )

  return x.filter(v => !isUndefined(v) && isNumber(v))
}

module.exports = dropNaN

},{"./assert.js":10,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./shape.js":69}],28:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")

function flatten(arr) {
  assert(
    !isUndefined(arr),
    "You must pass one array into the `flatten` function!"
  )

  assert(isArray(arr), "The `flatten` function only works on arrays!")

  let out = []

  arr.forEach(function (value) {
    if (isArray(value)) {
      out = out.concat(flatten(value))
    } else {
      out.push(value)
    }
  })

  return out
}

module.exports = flatten

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44}],29:[function(require,module,exports){
const vectorize = require("./vectorize.js")

function float(x) {
  try {
    const temp = JSON.parse(x)
    if (typeof temp === "number") return temp
    return NaN
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(float)

},{"./vectorize.js":82}],30:[function(require,module,exports){
const vectorize = require("./vectorize.js")

function floor(x) {
  try {
    if (typeof x !== "number") return NaN
    return Math.floor(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(floor)

},{"./vectorize.js":82}],31:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const shape = require("./shape.js")
const int = require("./int.js")

function getValueAt(x, index) {
  assert(
    !isUndefined(x),
    "You must pass an array and an index into the `getValueAt` function!"
  )

  assert(
    isArray(x),
    "You must pass an array and an index into the `getValueAt` function!"
  )

  assert(
    isNumber(index) || isArray(index),
    "The index passed into the `getValueAt` function must be a positive integer or a one-dimensional array of positive integers!"
  )

  if (isArray(index)) {
    assert(
      shape(index).length === 1,
      "The index passed into the `getValueAt` function must be a positive integer or a one-dimensional array of positive integers!"
    )

    index.forEach(value => {
      assert(
        isNumber(value) && int(value) === value,
        "The index passed into the `getValueAt` function must be a positive integer or a one-dimensional array of positive integers!"
      )
    })

    assert(
      index.length <= shape(x).length,
      "The index passed into the `getValueAt` function has too many dimensions!"
    )
  }

  if (isNumber(index)) {
    assert(index < x.length, `The index ${index} is out of bounds!`)
    return x[index]
  } else {
    if (index.length > 1) {
      assert(index[0] < x.length, `The index ${index[0]} is out of bounds!`)
      return getValueAt(x[index[0]], index.slice(1))
    } else {
      return getValueAt(x, index[0])
    }
  }
}

module.exports = getValueAt

},{"./assert.js":10,"./int.js":35,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./shape.js":69}],32:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isNumber = require("./is-number.js")
const zeros = require("./zeros.js")

function identity(size) {
  assert(
    !isUndefined(size),
    "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
  )

  assert(
    isNumber(size),
    "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
  )

  assert(
    parseInt(size) === size,
    "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
  )

  assert(
    size > 0,
    "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
  )

  const out = zeros([size, size])
  for (let i = 0; i < size; i++) out[i][i] = 1
  return out
}

module.exports = identity

},{"./assert.js":10,"./is-number.js":42,"./is-undefined.js":44,"./zeros.js":84}],33:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const shape = require("./shape.js")
const isEqual = require("./is-equal.js")

function indexOf(x, v, requireIdentity) {
  assert(
    !isUndefined(x),
    "You must pass an array and a value into the `indexOf` function!"
  )

  assert(
    isArray(x),
    "You must pass an array and a value into the `indexOf` function!"
  )

  if (shape(x).length === 1 || (isArray(v) && isEqual(shape(x[0]), shape(v)))) {
    for (let i = 0; i < x.length; i++) {
      const value = x[i]

      if (isEqual(value, v) && (requireIdentity ? value === v : true)) {
        return [i]
      }
    }

    return null
  } else {
    for (let i = 0; i < x.length; i++) {
      const row = x[i]
      const index = indexOf(row, v)
      if (index) return [i].concat(index)
    }
  }

  return null
}

module.exports = indexOf

},{"./assert.js":10,"./is-array.js":38,"./is-equal.js":40,"./is-undefined.js":44,"./shape.js":69}],34:[function(require,module,exports){
(function (global){(function (){
let out = {
  abs: require("./abs.js"),
  add: require("./add.js"),
  append: require("./append.js"),
  apply: require("./apply.js"),
  arccos: require("./arccos.js"),
  arcsin: require("./arcsin.js"),
  arctan: require("./arctan.js"),
  argmax: require("./argmax.js"),
  argmin: require("./argmin.js"),
  assert: require("./assert.js"),
  ceil: require("./ceil.js"),
  chop: require("./chop.js"),
  clamp: require("./clamp.js"),
  cohensd: require("./cohens-d.js"),
  copy: require("./copy.js"),
  correl: require("./correl.js"),
  cos: require("./cos.js"),
  count: require("./count.js"),
  covariance: require("./covariance.js"),
  DataFrame: require("./dataframe.js"),
  diff: require("./diff.js"),
  distance: require("./distance.js"),
  dot: require("./dot.js"),
  dropMissing: require("./drop-missing.js"),
  dropMissingPairwise: require("./drop-missing-pairwise.js"),
  dropNaN: require("./drop-nan.js"),
  dropNaNPairwise: require("./drop-nan-pairwise.js"),
  flatten: require("./flatten.js"),
  float: require("./float.js"),
  floor: require("./floor.js"),
  getValueAt: require("./get-value-at.js"),
  identity: require("./identity.js"),
  indexOf: require("./index-of.js"),
  int: require("./int.js"),
  intersect: require("./intersect.js"),
  inverse: require("./inverse.js"),
  isArray: require("./is-array.js"),
  isBoolean: require("./is-boolean.js"),
  isEqual: require("./is-equal.js"),
  isFunction: require("./is-function.js"),
  isNumber: require("./is-number.js"),
  isString: require("./is-string.js"),
  isUndefined: require("./is-undefined.js"),
  lerp: require("./lerp.js"),
  log: require("./log.js"),
  map: require("./map.js"),
  max: require("./max.js"),
  mean: require("./mean.js"),
  median: require("./median.js"),
  min: require("./min.js"),
  mode: require("./mode.js"),
  ndarray: require("./ndarray.js"),
  normal: require("./normal.js"),
  ones: require("./ones.js"),
  pause: require("./pause.js"),
  pow: require("./pow.js"),
  print: require("./print.js"),
  random: require("./random.js"),
  range: require("./range.js"),
  reshape: require("./reshape.js"),
  reverse: require("./reverse.js"),
  round: require("./round.js"),
  scale: require("./scale.js"),
  seed: require("./seed.js"),
  Series: require("./series.js"),
  set: require("./set.js"),
  setValueAt: require("./set-value-at.js"),
  shape: require("./shape.js"),
  shuffle: require("./shuffle.js"),
  sign: require("./sign.js"),
  sin: require("./sin.js"),
  slice: require("./slice.js"),
  sort: require("./sort.js"),
  sqrt: require("./sqrt.js"),
  std: require("./std.js"),
  sum: require("./sum.js"),
  tan: require("./tan.js"),
  transpose: require("./transpose.js"),
  union: require("./union.js"),
  variance: require("./variance.js"),
  vectorize: require("./vectorize.js"),
  where: require("./where.js"),
  zeros: require("./zeros.js"),

  dump: function () {
    Object.keys(out).forEach(key => {
      global[key] = out[key]
    })
  },
}

if (typeof module !== "undefined") {
  module.exports = out
}

if (typeof window !== "undefined") {
  window.JSMathTools = out
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./abs.js":1,"./add.js":2,"./append.js":3,"./apply.js":4,"./arccos.js":5,"./arcsin.js":6,"./arctan.js":7,"./argmax.js":8,"./argmin.js":9,"./assert.js":10,"./ceil.js":11,"./chop.js":12,"./clamp.js":13,"./cohens-d.js":14,"./copy.js":15,"./correl.js":16,"./cos.js":17,"./count.js":18,"./covariance.js":19,"./dataframe.js":20,"./diff.js":21,"./distance.js":22,"./dot.js":23,"./drop-missing-pairwise.js":24,"./drop-missing.js":25,"./drop-nan-pairwise.js":26,"./drop-nan.js":27,"./flatten.js":28,"./float.js":29,"./floor.js":30,"./get-value-at.js":31,"./identity.js":32,"./index-of.js":33,"./int.js":35,"./intersect.js":36,"./inverse.js":37,"./is-array.js":38,"./is-boolean.js":39,"./is-equal.js":40,"./is-function.js":41,"./is-number.js":42,"./is-string.js":43,"./is-undefined.js":44,"./lerp.js":45,"./log.js":46,"./map.js":47,"./max.js":48,"./mean.js":49,"./median.js":50,"./min.js":51,"./mode.js":52,"./ndarray.js":53,"./normal.js":54,"./ones.js":55,"./pause.js":56,"./pow.js":57,"./print.js":58,"./random.js":59,"./range.js":60,"./reshape.js":61,"./reverse.js":62,"./round.js":63,"./scale.js":64,"./seed.js":65,"./series.js":66,"./set-value-at.js":67,"./set.js":68,"./shape.js":69,"./shuffle.js":70,"./sign.js":71,"./sin.js":72,"./slice.js":73,"./sort.js":74,"./sqrt.js":75,"./std.js":76,"./sum.js":77,"./tan.js":78,"./transpose.js":79,"./union.js":80,"./variance.js":81,"./vectorize.js":82,"./where.js":83,"./zeros.js":84}],35:[function(require,module,exports){
const vectorize = require("./vectorize.js")

function int(x) {
  try {
    const temp = JSON.parse(x)
    if (typeof temp === "number") return parseInt(temp)
    return NaN
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(int)

},{"./vectorize.js":82}],36:[function(require,module,exports){
const isArray = require("./is-array.js")
const flatten = require("./flatten.js")
const union = require("./union.js")

function intersect() {
  const arrays = Object.values(arguments).map(v => {
    if (isArray(v)) return flatten(v)
    return [v]
  })

  const out = []
  const allValues = union(arrays)

  allValues.forEach(value => {
    for (let i = 0; i < arrays.length; i++) {
      if (arrays[i].indexOf(value) < 0) {
        return
      }
    }

    out.push(value)
  })

  return out
}

module.exports = intersect

},{"./flatten.js":28,"./is-array.js":38,"./union.js":80}],37:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const flatten = require("./flatten.js")
const shape = require("./shape.js")
const slice = require("./slice.js")
const dot = require("./dot.js")
const add = require("./add.js")
const scale = require("./scale.js")
const append = require("./append.js")
const range = require("./range.js")

function inverse(x) {
  assert(
    !isUndefined(x),
    "You must pass a square 2D array into the `inverse` function!"
  )

  assert(
    isArray(x),
    "You must pass a square 2D array into the `inverse` function!"
  )

  flatten(x).forEach(v =>
    assert(
      isNumber(v),
      "The array passed into the `inverse` function must contain only numbers!"
    )
  )

  const xShape = shape(x)

  assert(
    xShape.length === 2,
    "The array passed into the `inverse` function must be exactly two-dimensional and square!"
  )

  assert(
    xShape[0] === xShape[1],
    "The array passed into the `inverse` function must be exactly two-dimensional and square!"
  )

  assert(
    xShape[0] >= 0,
    "The array passed into the `inverse` function must be exactly two-dimensional and square!"
  )

  // https://en.wikipedia.org/wiki/Invertible_matrix#Blockwise_inversion
  if (xShape[0] === 0) {
    return x
  } else if (xShape[0] === 1) {
    assert(x[0][0] !== 0, "This matrix cannot be inverted!")
    return 1 / x[0][0]
  } else if (xShape[0] === 2) {
    const a = x[0][0]
    const b = x[0][1]
    const c = x[1][0]
    const d = x[1][1]

    const det = a * d - b * c
    assert(det !== 0, "This matrix cannot be inverted!")

    const out = [
      [d, -b],
      [-c, a],
    ]

    return scale(out, 1 / det)
  } else if (xShape[0] > 1) {
    const times = (a, b) =>
      isNumber(a) || isNumber(b) ? scale(a, b) : dot(a, b)

    for (let divider = 1; divider < xShape[0] - 1; divider++) {
      try {
        const A = slice(x, [range(0, divider), range(0, divider)])
        const B = slice(x, [range(0, divider), range(divider, xShape[0])])
        const C = slice(x, [range(divider, xShape[0]), range(0, divider)])
        const D = slice(x, [
          range(divider, xShape[0]),
          range(divider, xShape[0]),
        ])

        const AInv = inverse(A)
        const CompInv = inverse(add(D, times(-1, times(times(C, AInv), B))))

        const topLeft = add(
          AInv,
          times(times(times(times(AInv, B), CompInv), C), AInv)
        )
        const topRight = times(-1, times(times(AInv, B), CompInv))
        const bottomLeft = times(-1, times(times(CompInv, C), AInv))
        const bottomRight = CompInv

        const out = append(
          append(topLeft, topRight, 1),
          append(bottomLeft, bottomRight, 1),
          0
        )

        return out
      } catch (e) {}
    }

    assert(false, "This matrix cannot be inverted!")
  }
}

module.exports = inverse

},{"./add.js":2,"./append.js":3,"./assert.js":10,"./dot.js":23,"./flatten.js":28,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./range.js":60,"./scale.js":64,"./shape.js":69,"./slice.js":73}],38:[function(require,module,exports){
function isArray(obj) {
  return obj instanceof Array
}

module.exports = isArray

},{}],39:[function(require,module,exports){
function isBoolean(x) {
  return typeof x === "boolean"
}

module.exports = isBoolean

},{}],40:[function(require,module,exports){
const isArray = require("./is-array.js")

function isEqual(a, b) {
  const aType = typeof a
  const bType = typeof b
  if (aType !== bType) return false

  if (aType === "undefined") return true
  if (aType === "boolean") return a === b
  if (aType === "number") return a === b
  if (aType === "string") return a === b
  if (aType === "function") return a === b

  if (aType === "object") {
    if (a === null || b === null) {
      return a === null && b === null
    } else {
      const aKeys = Object.keys(a)
      const bKeys = Object.keys(b)
      if (aKeys.length !== bKeys.length) return false

      for (let i = 0; i < aKeys.length; i++) {
        const key = aKeys[i]
        if (!b.hasOwnProperty(key)) return false
        if (!isEqual(a[key], b[key])) return false
      }

      return true
    }
  }
}

module.exports = isEqual

},{"./is-array.js":38}],41:[function(require,module,exports){
function isFunction(fn) {
  return typeof fn === "function"
}

module.exports = isFunction

},{}],42:[function(require,module,exports){
function isNumber(x) {
  return typeof x === "number" && !isNaN(x)
}

module.exports = isNumber

},{}],43:[function(require,module,exports){
function isString(s) {
  return typeof s === "string"
}

module.exports = isString

},{}],44:[function(require,module,exports){
function isUndefined(x) {
  return x === null || typeof x === "undefined"
}

module.exports = isUndefined

},{}],45:[function(require,module,exports){
const vectorize = require("./vectorize.js")
const isNumber = require("./is-number.js")

const lerp = vectorize(function (a, b, f) {
  try {
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN
    if (!isNumber(f)) return NaN

    return f * (b - a) + a
  } catch (e) {
    return NaN
  }
})

module.exports = lerp

},{"./is-number.js":42,"./vectorize.js":82}],46:[function(require,module,exports){
const isNumber = require("./is-number.js")
const isUndefined = require("./is-undefined.js")
const vectorize = require("./vectorize.js")

const log = vectorize(function (x, base) {
  try {
    base = isUndefined(base) ? Math.E : base
    if (!isNumber(x)) return NaN
    if (!isNumber(base)) return NaN
    return Math.log(x) / Math.log(base)
  } catch (e) {
    return NaN
  }
})

module.exports = log

},{"./is-number.js":42,"./is-undefined.js":44,"./vectorize.js":82}],47:[function(require,module,exports){
const vectorize = require("./vectorize.js")
const isNumber = require("./is-number.js")

const map = vectorize(function (x, a, b, c, d) {
  try {
    if (!isNumber(x)) return NaN
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN
    if (!isNumber(c)) return NaN
    if (!isNumber(d)) return NaN

    return ((d - c) * (x - a)) / (b - a) + c
  } catch (e) {
    return NaN
  }
})

module.exports = map

},{"./is-number.js":42,"./vectorize.js":82}],48:[function(require,module,exports){
const flatten = require("./flatten.js")
const isUndefined = require("./is-undefined.js")

function max(arr) {
  try {
    const temp = flatten(arr)
    let out = -Infinity

    temp.forEach(x => {
      if (!isUndefined(x) && x > out) {
        out = x
      }
    })

    return out === -Infinity ? NaN : out
  } catch (e) {
    return NaN
  }
}

module.exports = max

},{"./flatten.js":28,"./is-undefined.js":44}],49:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const flatten = require("./flatten.js")
const sum = require("./sum.js")
const dropNaN = require("./drop-nan.js")

function mean(arr) {
  try {
    if (arr.length === 0) return NaN
    const temp = flatten(arr)
    let out = 0

    for (let i = 0; i < temp.length; i++) {
      const value = temp[i]
      if (!isNumber(value)) return NaN
      out += value
    }

    return out / temp.length
  } catch (e) {
    return NaN
  }
}

module.exports = mean

},{"./assert.js":10,"./drop-nan.js":27,"./flatten.js":28,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./sum.js":77}],50:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const flatten = require("./flatten.js")
const sort = require("./sort.js")
const dropNaN = require("./drop-nan.js")

function median(arr) {
  try {
    let flattenedArr = flatten(arr)
    let temp = dropNaN(flattenedArr)
    if (temp.length === 0) return NaN
    if (temp.length < flattenedArr.length) return NaN
    temp = sort(temp)

    let out

    if (temp.length % 2 === 0) {
      out = (temp[temp.length / 2 - 1] + temp[temp.length / 2]) / 2
    } else {
      out = temp[Math.floor(temp.length / 2)]
    }

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = median

},{"./assert.js":10,"./drop-nan.js":27,"./flatten.js":28,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./sort.js":74}],51:[function(require,module,exports){
const flatten = require("./flatten.js")
const isUndefined = require("./is-undefined.js")

function min(arr) {
  try {
    const temp = flatten(arr)
    let out = Infinity

    temp.forEach(x => {
      if (!isUndefined(x) && x < out) {
        out = x
      }
    })

    return out === Infinity ? NaN : out
  } catch (e) {
    return NaN
  }
}

module.exports = min

},{"./flatten.js":28,"./is-undefined.js":44}],52:[function(require,module,exports){
const flatten = require("./flatten.js")
const count = require("./count.js")
const set = require("./set.js")
const sort = require("./sort.js")

function mode(arr) {
  try {
    if (arr.length === 0) return NaN

    const temp = flatten(arr)
    if (temp.length === 0) return NaN

    const counts = {}
    const tempSet = set(temp)

    tempSet.forEach(item => {
      counts[item] = count(temp, item)
    })

    const sortedTempSet = sort(tempSet, (a, b) => counts[b] - counts[a])
    const mostCountedItem = sortedTempSet[0]

    const out = sort(
      sortedTempSet.filter(item => counts[item] === counts[mostCountedItem])
    )

    if (out.length === 1) return out[0]
    return out
  } catch (e) {
    return NaN
  }
}

module.exports = mode

},{"./count.js":18,"./flatten.js":28,"./set.js":68,"./sort.js":74}],53:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const floor = require("./floor.js")
const range = require("./range.js")

const error =
  "You must pass an integer or a one-dimensional array of natural numbers into the `ndarray` function!"

function ndarray(shape) {
  assert(!isUndefined(shape), error)

  if (!isArray(shape)) shape = [shape]

  assert(shape.length > 0, error)

  shape.forEach(function (x) {
    assert(isNumber(x), error)
    assert(floor(x) === x, error)
    assert(x >= 0, error)
  })

  if (shape.length === 1) {
    return range(0, shape[0]).map(v => undefined)
  } else {
    const out = []

    for (let i = 0; i < shape[0]; i++) {
      out.push(ndarray(shape.slice(1, shape.length)))
    }

    return out
  }
}

module.exports = ndarray

},{"./assert.js":10,"./floor.js":30,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./range.js":60}],54:[function(require,module,exports){
const isUndefined = require("./is-undefined.js")
const ndarray = require("./ndarray.js")
const apply = require("./apply.js")
const random = require("./random.js")

function normal(shape) {
  function n() {
    const u1 = random()
    const u2 = random()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  }

  if (isUndefined(shape)) return n()
  return apply(ndarray(shape), n)
}

module.exports = normal

},{"./apply.js":4,"./is-undefined.js":44,"./ndarray.js":53,"./random.js":59}],55:[function(require,module,exports){
const ndarray = require("./ndarray.js")
const apply = require("./apply.js")

function ones(shape) {
  return apply(ndarray(shape), v => 1)
}

module.exports = ones

},{"./apply.js":4,"./ndarray.js":53}],56:[function(require,module,exports){
function pause(ms) {
  return new Promise((resolve, reject) => {
    try {
      return setTimeout(resolve, ms)
    } catch (e) {
      return reject(e)
    }
  })
}

module.exports = pause

},{}],57:[function(require,module,exports){
const vectorize = require("./vectorize.js")
const isNumber = require("./is-number.js")

function pow(x, p) {
  try {
    if (!isNumber(x)) return NaN
    if (!isNumber(p)) return NaN
    return Math.pow(x, p)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(pow)

},{"./is-number.js":42,"./vectorize.js":82}],58:[function(require,module,exports){
let isArray = require("./is-array.js")
let shape = require("./shape.js")
let DataFrame = require("./dataframe.js")
let Series = require("./series.js")

function print(){
  Object.keys(arguments).forEach(key => {
    let x = arguments[key]

    if (isArray(x)){
      let xShape = shape(x)

      if (xShape.length === 1){
        new Series(x).print()
      } else if (xShape.length == 2){
        new DataFrame(x).print()
      } else {
        console.log(x)
      }
    } else if (x instanceof DataFrame || x instanceof Series){
      x.print()
    } else {
      console.log(x)
    }
  })
}

module.exports = print

},{"./dataframe.js":20,"./is-array.js":38,"./series.js":66,"./shape.js":69}],59:[function(require,module,exports){
const ndarray = require("./ndarray.js")
const apply = require("./apply.js")
const isUndefined = require("./is-undefined.js")
const seed = require("./seed.js")
const pow = require("./pow.js")

const a = 1103515245
const c = 12345
const m = pow(2, 31)

function lcg() {
  const s = seed()
  const out = (a * s + c) % m
  seed(out)
  return out / m
}

function random(shape) {
  if (isUndefined(shape)) return lcg()
  return apply(ndarray(shape), lcg)
}

module.exports = random

},{"./apply.js":4,"./is-undefined.js":44,"./ndarray.js":53,"./pow.js":57,"./seed.js":65}],60:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isNumber = require("./is-number.js")
const reverse = require("./reverse.js")

function range(a, b, step = 1) {
  assert(
    !isUndefined(a) && !isUndefined(b) && !isUndefined(step),
    "You must pass two numbers and optionally a step value to the `range` function!"
  )

  assert(
    isNumber(a) && isNumber(b) && isNumber(step),
    "You must pass two numbers and optionally a step value to the `range` function!"
  )

  assert(
    step > 0,
    "The step value must be greater than 0! (NOTE: The step value is a magnitude; it does not indicate direction.)"
  )

  let shouldReverse = false

  if (a > b) {
    shouldReverse = true
    let buffer = a
    a = b + step
    b = buffer + step
  }

  let out = []
  for (let i = a; i < b; i += step) out.push(i)
  if (shouldReverse) out = reverse(out)
  return out
}

module.exports = range

},{"./assert.js":10,"./is-number.js":42,"./is-undefined.js":44,"./reverse.js":62}],61:[function(require,module,exports){
const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const shape = require("./shape.js")
const flatten = require("./flatten.js")
const product = x => x.reduce((a, b) => a * b)

function reshape(x, newShape) {
  assert(
    isArray(x),
    "The first argument passed into the `reshape` function must be an array!"
  )

  if (isNumber(newShape)) newShape = [newShape]

  assert(
    isArray(newShape),
    "The second argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
  )

  assert(
    shape(newShape).length === 1,
    "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
  )

  newShape.forEach(v => {
    assert(
      isNumber(v) && parseInt(v) === v && v > 0,
      "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
    )
  })

  if (newShape.length <= 1) return flatten(x)

  let temp = flatten(x)

  assert(
    product(newShape) === temp.length,
    "The new shape doesn't match the number of values available in `x` (the first argument passed into the `reshape` function)!"
  )

  let out = []
  let step = parseInt(temp.length / newShape[0])

  for (let i = 0; i < newShape[0]; i++) {
    let row = temp.slice(i * step, (i + 1) * step)
    out.push(reshape(row, newShape.slice(1)))
  }

  return out
}

module.exports = reshape

},{"./assert.js":10,"./flatten.js":28,"./is-array.js":38,"./is-number.js":42,"./shape.js":69}],62:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")

function reverse(arr) {
  assert(
    !isUndefined(arr),
    "You must pass an array into the `reverse` function!"
  )

  assert(isArray(arr), "You must pass an array into the `reverse` function!")

  const out = []
  for (let i = arr.length - 1; i >= 0; i--) out.push(arr[i])
  return out
}

module.exports = reverse

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44}],63:[function(require,module,exports){
const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

const round = vectorize(function (x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.round(x)
  } catch (e) {
    return NaN
  }
})

module.exports = round

},{"./is-number.js":42,"./vectorize.js":82}],64:[function(require,module,exports){
const vectorize = require("./vectorize.js")
const isNumber = require("./is-number.js")

function scale(a, b) {
  try {
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN
    return a * b
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(scale)

},{"./is-number.js":42,"./vectorize.js":82}],65:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isNumber = require("./is-number.js")
let s = parseInt(Math.random() * 999999)

function seed(val) {
  if (!isUndefined(val)) {
    assert(
      isNumber(val),
      "If passing a value into the `seed` function, then that value must be a positive integer!"
    )

    assert(
      parseInt(val) === val,
      "If passing a value into the `seed` function, then that value must be a positive integer!"
    )

    assert(
      val >= 0,
      "If passing a value into the `seed` function, then that value must be a positive integer!"
    )
  }

  if (!isUndefined(val)) s = val
  else return s
}

module.exports = seed

},{"./assert.js":10,"./is-number.js":42,"./is-undefined.js":44}],66:[function(require,module,exports){
const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")
const shape = require("./shape.js")
const transpose = require("./transpose.js")
const range = require("./range.js")
const isNumber = require("./is-number.js")
const isString = require("./is-string.js")
const apply = require("./apply.js")
const isFunction = require("./is-function.js")
const ndarray = require("./ndarray.js")
const copy = require("./copy.js")
const set = require("./set.js")
const reverse = require("./reverse.js")
const sort = require("./sort.js")
const isBoolean = require("./is-boolean.js")

function isInteger(x) {
  return isNumber(x) && parseInt(x) === x
}

function isWholeNumber(x) {
  return isInteger(x) && x >= 0
}

function isObject(x) {
  return x instanceof Object && !isArray(x) && x !== null
}

function isDataFrame(x) {
  return x instanceof DataFrame
}

function isSeries(x) {
  return x instanceof Series
}

function leftPad(x, maxLength) {
  assert(isNumber(x), "The `leftPad` function only works on numbers!")
  let out = x.toString()
  while (out.length < maxLength) out = "0" + out
  return out
}

class Series {
  constructor(data) {
    const self = this
    self.name = "data"

    Object.defineProperty(self, "_values", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(self, "values", {
      configurable: true,
      enumerable: true,

      get() {
        return self._values
      },

      set(x) {
        assert(isArray(x), "The new values must be a 1-dimensional array!")

        const dataShape = shape(x)

        assert(
          dataShape.length === 1,
          "The new array of values must be 1-dimensional!"
        )

        if (dataShape[0] < self._index.length) {
          self._index = self._index.slice(0, dataShape[0])
        } else if (dataShape[0] > self._index.length) {
          self._index = self._index.concat(
            range(self._index.length, dataShape[0]).map(i => {
              return "row" + leftPad(i, (x.length - 1).toString().length)
            })
          )
        }

        self._values = x
      },
    })

    Object.defineProperty(self, "_index", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(self, "index", {
      configurable: true,
      enumerable: true,

      get() {
        return self._index
      },

      set(x) {
        assert(
          isArray(x),
          "The new index must be a 1-dimensional array of strings!"
        )

        assert(
          x.length === self.shape[0],
          "The new index must be the same length as the old index!"
        )

        assert(
          shape(x).length === 1,
          "The new index must be a 1-dimensional array of strings!"
        )

        x.forEach(value => {
          assert(isString(value), "All of the row names must be strings!")
        })

        self._index = x
      },
    })

    if (data) {
      const dataShape = shape(data)

      assert(
        dataShape.length === 1,
        "The `data` array passed into the constructor of a DataFrame must be 1-dimensional!"
      )

      self.values = data
    }
  }

  get shape() {
    const self = this
    return shape(self.values)
  }

  isEmpty() {
    const self = this
    return self.values.filter(v => !isUndefined(v)).length === 0
  }

  clear() {
    const self = this
    const out = self.copy()
    out.values = ndarray(out.shape)
    out.index = self.index
    return out
  }

  get(indices) {
    const self = this

    if (isString(indices) || isNumber(indices)) indices = [indices]

    const types = set((indices || []).map(v => typeof v))

    assert(
      types.length <= 2,
      "Only whole numbers and/or strings are allowed in `get` arrays!"
    )

    if (types.length === 1) {
      assert(
        types[0] === "string" || types[0] === "number",
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      )
    }

    if (types.length === 2) {
      assert(
        types.indexOf("string") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      )

      assert(
        types.indexOf("number") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      )
    }

    if (!isUndefined(indices)) {
      indices = indices.map(i => {
        if (typeof i === "string") {
          assert(self.index.indexOf(i) > -1, `Index "${i}" does not exist!`)
          return i
        }

        if (typeof i === "number") {
          assert(i >= 0, `Index ${i} is out of bounds!`)
          assert(parseInt(i) === i, `Indices must be integers!`)
          assert(i < self.index.length, `Index ${i} is out of bounds!`)
          return self.index[i]
        }
      })
    }

    return self.getSubsetByNames(indices)
  }

  getSubsetByNames(indices) {
    const self = this

    if (isUndefined(indices)) indices = self.index

    assert(
      isArray(indices),
      "The `indices` array must be a 1-dimensional array of strings."
    )

    assert(
      shape(indices).length === 1,
      "The `indices` array must be a 1-dimensional array of strings."
    )

    assert(
      indices.length > 0,
      "The `indices` array must contain at least one index name."
    )

    indices.forEach(name => {
      assert(isString(name), "The `indices` array must contain only strings.")

      assert(
        self.index.indexOf(name) > -1,
        `The name "${name}" does not exist in the index.`
      )
    })

    const values = indices.map(name => {
      return self.values[self.index.indexOf(name)]
    })

    if (values.length === 1) return values[0]

    const out = new Series(values)
    out.index = indices
    out.name = self.name
    return out
  }

  getSubsetByIndices(indices) {
    const self = this
    const dataShape = self.shape

    if (isUndefined(indices)) indices = range(0, dataShape[0])

    assert(
      isArray(indices),
      "The `indices` array must be 1-dimensional array of whole numbers."
    )

    assert(
      shape(indices).length === 1,
      "The `indices` array must be a 1-dimensional array of whole numbers."
    )

    assert(
      indices.length > 0,
      "The `indices` array must contain at least one index."
    )

    indices.forEach(index => {
      assert(
        isWholeNumber(index),
        "The `indices` array must be a 1-dimensional array of whole numbers."
      )

      assert(
        index < self.index.length,
        `The row index ${index} is out of bounds.`
      )
    })

    const rows = indices.map(i => self.index[i])
    return self.getSubsetByNames(rows)
  }

  loc(indices) {
    const self = this
    return self.getSubsetByNames(indices)
  }

  iloc(indices) {
    const self = this
    return self.getSubsetByIndices(indices)
  }

  reverse() {
    const self = this
    const out = new Series(reverse(self.values))
    out.index = reverse(self.index)
    out.name = self.name
    return out
  }

  resetIndex() {
    const self = this
    const out = self.copy()

    out.index = range(0, self.shape[0]).map(i => {
      return "row" + leftPad(i, (out.index.length - 1).toString().length)
    })

    return out
  }

  copy() {
    const self = this
    const out = new Series(copy(self.values))
    out.index = self.index.slice()
    out.name = self.name
    return out
  }

  apply(fn) {
    assert(
      isFunction(fn),
      "The parameter to the `apply` method must be a function."
    )

    const self = this
    const out = self.copy()
    out.values = out.values.map((v, i) => fn(v, out.index[i]))
    return out
  }

  dropMissing(condition, threshold) {
    const self = this
    const out = self.copy()
    const outIndex = []

    out.values = out.values.filter((v, i) => {
      if (isUndefined(v)) {
        return false
      } else {
        outIndex.push(out.index[i])
        return true
      }
    })

    out.index = outIndex
    return out
  }

  toObject() {
    const self = this
    const out = {}
    out[self.name] = {}

    self.index.forEach((index, i) => {
      out[self.name][index] = self.values[i]
    })

    return out
  }

  print() {
    const self = this
    let temp = self.copy()
    const maxRows = typeof window === "undefined" ? 20 : 10

    if (temp.index.length > maxRows) {
      temp = temp.get(
        range(0, maxRows / 2).concat(
          range(temp.index.length - maxRows / 2, temp.index.length)
        )
      )

      const tempIndex = copy(temp.index)
      tempIndex.splice(parseInt(tempIndex.length / 2), 0, "...")
      temp.values.push("...")
      temp.index.push("...")
      temp = temp.get(tempIndex)
    }

    const out = {}

    temp.values.forEach((value, i) => {
      const obj = {}
      obj[temp.name] = value
      out[temp.index[i]] = obj
    })

    console.table(out)
    return self
  }

  sort(direction) {
    assert(
      isBoolean(direction) || isString(direction) || isUndefined(direction),
      "The `sort` method can take an optional parameter that's either a string representing a direction ('ascending' or 'descending') or a boolean representing whether or not the direction is ascending (true or false)."
    )

    let isAscending = true

    if (isUndefined(direction)) {
      isAscending = true
    }

    if (isString(direction)) {
      direction = direction.trim().toLowerCase()

      assert(
        direction === "ascending" || direction === "descending",
        "The `sort` method can take an optional parameter that's either a string representing a direction ('ascending' or 'descending') or a boolean representing whether or not the direction is ascending (true or false)."
      )

      isAscending = direction === "ascending"
    }

    if (isBoolean(direction)) {
      isAscending = direction
    }

    const self = this
    let temp = transpose([self.values, self.index])

    temp = transpose(
      sort(temp, (a, b) => {
        if (a[0] === b[0]) return 0
        if (a[0] < b[0]) return isAscending ? -1 : 1
        if (a[0] > b[0]) return isAscending ? 1 : -1
      })
    )

    const out = new Series(temp[0])
    out.index = temp[1]
    out.name = self.name
    return out
  }

  sortByIndex() {
    const self = this
    let temp = transpose([self.values, self.index])

    temp = transpose(
      sort(temp, (a, b) => {
        if (a[1] === b[1]) return 0
        if (a[1] < b[1]) return -1
        if (a[1] > b[1]) return 1
      })
    )

    const out = new Series(temp[0])
    out.index = temp[1]
    out.name = self.name
    return out
  }

  filter(fn) {
    const self = this
    let out = self.copy()
    const index = copy(out.index)
    const indicesToRemove = []

    const newValues = out.values.filter((value, i) => {
      const shouldKeep = fn(value, i, out.values)
      if (!shouldKeep) indicesToRemove.push(out.index[i])
      return shouldKeep
    })

    indicesToRemove.forEach(i => {
      index.splice(index.indexOf(i), 1)
    })

    if (newValues.length === 0) {
      out = new Series()
      out.name = self.name
      return out
    }

    out.values = newValues
    out.index = index
    return out
  }
}

module.exports = Series

},{"./apply.js":4,"./assert.js":10,"./copy.js":15,"./is-array.js":38,"./is-boolean.js":39,"./is-function.js":41,"./is-number.js":42,"./is-string.js":43,"./is-undefined.js":44,"./ndarray.js":53,"./range.js":60,"./reverse.js":62,"./set.js":68,"./shape.js":69,"./sort.js":74,"./transpose.js":79}],67:[function(require,module,exports){
const assert = require("./assert.js")
const isNumber = require("./is-number.js")
const isArray = require("./is-array.js")
const copy = require("./copy.js")

function setValueAt(x, index, value) {
  assert(
    isArray(x),
    "The first argument passed into the `setValueAt` function must be an array!"
  )

  if (isNumber(index)) index = [index]

  assert(
    isArray(index),
    "The second argument passed into the `setValueAt` function must be an integer or an array of integers!"
  )

  let out = copy(x)
  let temp = out

  for (let i = 0; i < index.length - 1; i++) {
    temp = temp[index[i]]
  }

  temp[index[index.length - 1]] = value
  return out
}

module.exports = setValueAt

},{"./assert.js":10,"./copy.js":15,"./is-array.js":38,"./is-number.js":42}],68:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const flatten = require("./flatten.js")

function set(arr) {
  assert(!isUndefined(arr), "You must pass an array into the `set` function!")
  assert(isArray(arr), "You must pass an array into the `set` function!")

  const out = []
  const temp = {}

  flatten(arr).forEach(item => {
    const key =
      typeof item === "undefined"
        ? "undefined"
        : typeof item === "function"
        ? item.toString()
        : JSON.stringify(item)

    if (!temp[key]) out.push(item)
    temp[key] = true
  })

  return out
}

module.exports = set

},{"./assert.js":10,"./flatten.js":28,"./is-array.js":38,"./is-undefined.js":44}],69:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const max = require("./max.js")

function shape(arr) {
  assert(!isUndefined(arr), "You must pass an array into the `shape` function!")
  assert(isArray(arr), "You must pass an array into the `shape` function!")

  let out = [arr.length]
  const childrenAreArrays = arr.map(x => isArray(x))

  if (childrenAreArrays.indexOf(true) > -1) {
    assert(
      childrenAreArrays.indexOf(false) < 0,
      "The array passed into the `shape` function has some children that are not themselves arrays!"
    )

    const lengths = arr.map(x => x.length)
    const maxLength = max(lengths)

    lengths.forEach(function (length) {
      assert(
        length === maxLength,
        "The array passed into the `shape` function has some children of inconsistent length!"
      )
    })

    out = out.concat(shape(arr[0]))
  }

  return out
}

module.exports = shape

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44,"./max.js":48}],70:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const floor = require("./floor.js")
const random = require("./random.js")

function shuffle(arr) {
  assert(
    !isUndefined(arr),
    "You must pass an array into the `shuffle` function!"
  )

  assert(isArray(arr), "You must pass an array into the `shuffle` function!")

  const out = arr.slice()

  for (let i = 0; i < arr.length; i++) {
    const index1 = floor(random() * arr.length)
    const index2 = floor(random() * arr.length)
    const buffer = out[index1]
    out[index1] = out[index2]
    out[index2] = buffer
  }

  return out
}

module.exports = shuffle

},{"./assert.js":10,"./floor.js":30,"./is-array.js":38,"./is-undefined.js":44,"./random.js":59}],71:[function(require,module,exports){
const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function sign(x) {
  try {
    if (!isNumber(x)) return NaN
    if (x < 0) return -1
    if (x > 0) return 1
    return 0
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(sign)

},{"./is-number.js":42,"./vectorize.js":82}],72:[function(require,module,exports){
const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function sin(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.sin(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(sin)

},{"./is-number.js":42,"./vectorize.js":82}],73:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isNumber = require("./is-number.js")
const isArray = require("./is-array.js")
const range = require("./range.js")
const flatten = require("./flatten.js")
const shape = require("./shape.js")
const floor = require("./floor.js")

function slice(arr, indices) {
  assert(!isUndefined(arr), "You must pass an array into the `slice` function!")
  assert(isArray(arr), "You must pass an array into the `slice` function!")

  if (isUndefined(indices)) return arr.slice()

  assert(
    isArray(indices),
    "The indices passed into the `slice` function must be a one-dimensional array of integers or null values."
  )

  flatten(indices).forEach(idx => {
    assert(
      isUndefined(idx) || (isNumber(idx) && floor(idx) === idx),
      "The indices passed into the `slice` function must be a one-dimensional array of integers or null values."
    )
  })

  let idx = indices[0]
  if (isUndefined(idx)) idx = range(0, arr.length)
  if (isNumber(idx)) idx = [idx]

  const out = []

  idx.forEach(i => {
    assert(i < arr.length, "Index out of bounds in the `slice` function!")
    if (i < 0) i += arr.length

    const item = arr[i]

    if (isArray(item)) {
      out.push(slice(arr[i], indices.slice(1, indices.length)))
    } else {
      out.push(arr[i])
    }
  })

  // if (shape(out).indexOf(1) > -1) out = flatten(out)

  return out
}

module.exports = slice

},{"./assert.js":10,"./flatten.js":28,"./floor.js":30,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./range.js":60,"./shape.js":69}],74:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isFunction = require("./is-function.js")

function alphaSort(a, b) {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

function sort(arr, fn) {
  if (isUndefined(fn)) fn = alphaSort

  assert(!isUndefined(arr), "You must pass an array into the `sort` function!")
  assert(isArray(arr), "You must pass an array into the `sort` function!")

  assert(
    isFunction(fn),
    "The second parameter of the `sort` function must be a comparison function!"
  )

  const out = arr.slice()
  out.sort(fn)
  return out
}

module.exports = sort

},{"./assert.js":10,"./is-array.js":38,"./is-function.js":41,"./is-undefined.js":44}],75:[function(require,module,exports){
const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function sqrt(x) {
  try {
    if (!isNumber(x)) return NaN
    if (x < 0) return NaN
    return Math.sqrt(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(sqrt)

},{"./is-number.js":42,"./vectorize.js":82}],76:[function(require,module,exports){
const isNumber = require("./is-number.js")
const flatten = require("./flatten.js")
const mean = require("./mean.js")
const pow = require("./pow.js")
const sqrt = require("./sqrt.js")

function std(arr) {
  try {
    if (arr.length === 0) return NaN

    const temp = flatten(arr)
    if (temp.length === 0) return NaN

    const m = mean(temp)
    let out = 0

    for (let i = 0; i < temp.length; i++) {
      const value = temp[i]
      if (!isNumber(value)) return NaN
      out += pow(value - m, 2)
    }

    return sqrt(out / temp.length)
  } catch (e) {
    return NaN
  }
}

module.exports = std

},{"./flatten.js":28,"./is-number.js":42,"./mean.js":49,"./pow.js":57,"./sqrt.js":75}],77:[function(require,module,exports){
const dropNaN = require("./drop-nan.js")
const flatten = require("./flatten.js")
const isNumber = require("./is-number.js")

function sum(arr) {
  try {
    const temp = flatten(arr)
    if (temp.length === 0) return NaN
    let out = 0

    for (let i = 0; i < temp.length; i++) {
      const value = temp[i]
      if (isNumber(value)) out += value
      else return NaN
    }

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = sum

},{"./drop-nan.js":27,"./flatten.js":28,"./is-number.js":42}],78:[function(require,module,exports){
const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function tan(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.tan(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(tan)

},{"./is-number.js":42,"./vectorize.js":82}],79:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const shape = require("./shape.js")
const reverse = require("./reverse.js")
const ndarray = require("./ndarray.js")

function transpose(arr) {
  assert(
    !isUndefined(arr),
    "You must pass an array into the `transpose` function!"
  )

  assert(isArray(arr), "You must pass an array into the `transpose` function!")

  const theShape = shape(arr)

  assert(
    theShape.length <= 2,
    "I'm not smart enough to know how to transpose arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `transpose` function!"
  )

  if (theShape.length === 1) {
    return reverse(arr)
  } else if (theShape.length === 2) {
    const out = ndarray(reverse(theShape))

    for (let row = 0; row < theShape[0]; row++) {
      for (let col = 0; col < theShape[1]; col++) {
        out[col][row] = arr[row][col]
      }
    }

    return out
  }
}

module.exports = transpose

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44,"./ndarray.js":53,"./reverse.js":62,"./shape.js":69}],80:[function(require,module,exports){
const assert = require("./assert.js")
const set = require("./set.js")

function union() {
  return set([...arguments])
}

module.exports = union

},{"./assert.js":10,"./set.js":68}],81:[function(require,module,exports){
const pow = require("./pow.js")
const std = require("./std.js")

function variance(arr) {
  try {
    return pow(std(arr), 2)
  } catch (e) {
    return NaN
  }
}

module.exports = variance

},{"./pow.js":57,"./std.js":76}],82:[function(require,module,exports){
const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const max = require("./max.js")
const isFunction = require("./is-function.js")

function vectorize(fn) {
  assert(
    !isUndefined(fn),
    "You must pass a function into the `vectorize` function!"
  )

  assert(
    isFunction(fn),
    "You must pass a function into the `vectorize` function!"
  )

  return function temp() {
    const atLeastOneArgumentIsAnArray =
      Object.keys(arguments)
        .map(key => isArray(arguments[key]))
        .indexOf(true) > -1

    if (atLeastOneArgumentIsAnArray) {
      const out = []
      const lengths = Object.keys(arguments)
        .filter(key => isArray(arguments[key]))
        .map(key => arguments[key].length)
      const maxLength = max(lengths)

      lengths.forEach(length => {
        assert(
          length === maxLength,
          `If using arrays for all arguments to this function, then the arrays must all have equal length!`
        )
      })

      for (let i = 0; i < maxLength; i++) {
        const args = Object.keys(arguments).map(key => {
          if (isArray(arguments[key])) return arguments[key][i]
          return arguments[key]
        })

        out.push(temp(...args))
      }

      return out
    } else {
      return fn(...arguments)
    }
  }
}

module.exports = vectorize

},{"./assert.js":10,"./is-array.js":38,"./is-function.js":41,"./is-undefined.js":44,"./max.js":48}],83:[function(require,module,exports){
const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isFunction = require("./is-function.js")
const apply = require("./apply.js")
const indexOf = require("./index-of.js")
const setValueAt = require("./set-value-at.js")
const flatten = require("./flatten.js")

function where(x, fn) {
  assert(
    isArray(x),
    "The first argument passed into the `where` function must be an array!"
  )

  assert(
    isFunction(fn),
    "The second argument passed into the `where` function must be a function!"
  )

  const n = flatten(x).length
  let temp = apply(x, fn)
  const out = {}
  let count = 0
  let isDone = false

  while (!isDone) {
    const idx = indexOf(temp, true)

    if (idx) {
      out[count] = idx
      temp = setValueAt(temp, idx, null)
      count++
    } else {
      isDone = true
    }
  }

  if (count === 0) return null
  return out
}

module.exports = where

},{"./apply.js":4,"./assert.js":10,"./flatten.js":28,"./index-of.js":33,"./is-array.js":38,"./is-function.js":41,"./set-value-at.js":67}],84:[function(require,module,exports){
const ndarray = require("./ndarray.js")
const apply = require("./apply.js")

function zeros(shape) {
  return apply(ndarray(shape), v => 0)
}

module.exports = zeros

},{"./apply.js":4,"./ndarray.js":53}],85:[function(require,module,exports){
let {
  assert,
  isNumber,
  isArray,
  shape,
  isUndefined,
  median,
  abs,
  add,
  scale,
  copy,
  int,
  max,
  min,
  clamp,
  dropNaN,
  sort,
  pow,
} = require("js-math-tools")

let isBinary = require("./is-binary.js")
let subtract = (a, b) => add(a, scale(b, -1))
let divide = (a, b) => scale(a, pow(b, -1))

function clipOutliers(x, maxScore) {
  maxScore = maxScore || 5

  assert(isNumber(maxScore), "`maxScore` must be a number!")
  assert(isArray(x), "`x` must be a one-dimensional array!")
  assert(shape(x).length === 1, "`x` must be a one-dimensional array!")

  let numericalValues = dropNaN(x)
  if (isBinary(numericalValues)) return [x, false]
  if (numericalValues.length === 0) return [x, false]

  let xMedian = median(numericalValues)
  let xMad = median(abs(subtract(numericalValues, xMedian)))

  if (xMad === 0) {
    let temp = sort(copy(numericalValues))
    let low = temp.filter(value => value < xMedian)
    let high = temp.filter(value => value > xMedian)
    let before = xMedian
    let after = xMedian

    if (low.length > 0) before = max(low)
    if (high.length > 0) after = min(high)

    xMad = (after - before) / 2
    if (xMad === 0) return [x, false]
  }

  let score = max(divide(abs(subtract(numericalValues, xMedian)), xMad))

  if (score > maxScore) {
    let out = x.map(v => {
      if (typeof v === "number") {
        return clamp(v, xMedian - maxScore * xMad, xMedian + maxScore * xMad)
      } else {
        return v
      }
    })

    return [out, true]
  } else {
    return [x, false]
  }
}

// console.warn(
//   "The `clipOutliers` function does not handle at least one edge case: in cases where an outlier is the value immediately above or below the median, the `clipOutliers` function will fail to transform the data! This is a known problem, but we haven't found a fix for it yet. :("
// )

module.exports = clipOutliers

},{"./is-binary.js":97,"js-math-tools":34}],86:[function(require,module,exports){
let { assert, isArray, flatten, set } = require("js-math-tools")

function containsOnlyNumbers(x) {
  assert(isArray(x), "The `containsOnlyNumbers` only works on arrays!")
  let temp = flatten(x)
  let types = set(temp.map(v => typeof v))
  return types.length === 1 && types[0] === "number"
}

module.exports = containsOnlyNumbers

},{"js-math-tools":34}],87:[function(require,module,exports){
let { isArray, shape, assert, zeros } = require("js-math-tools")

function diagonalize(x) {
  assert(isArray(x), "The `diagonalize` function only works on vectors!")

  let xShape = shape(x)

  assert(
    xShape.length === 1,
    "The `diagonalize` function only works on vectors!"
  )

  let out = zeros([xShape[0], xShape[0]])
  x.forEach((v, i) => (out[i][i] = v))
  return out
}

module.exports = diagonalize

},{"js-math-tools":34}],88:[function(require,module,exports){
let {
  assert,
  isUndefined,
  copy,
  isArray,
  shape,
  transpose,
  clamp,
  correl,
  dropMissingPairwise,
} = require("js-math-tools")

function getCorrelationMatrix(a, b) {
  if (isUndefined(b)) b = copy(a)

  assert(
    isArray(a) && isArray(b),
    "`getCorrelationMatrix` only works on matrices!"
  )

  assert(
    shape(a).length === 2 && shape(b).length === 2,
    "`getCorrelationMatrix` only works on matrices!"
  )

  assert(
    shape(a)[0] === shape(b)[0],
    "Matrix `a` and `b` must have the number of rows!"
  )

  // note: this produces a "missing-aware" correlation matrix!
  let out = []
  let aTemp = transpose(a)
  let bTemp = transpose(b)

  aTemp.forEach(row1 => {
    let correlations = []

    bTemp.forEach(row2 => {
      try {
        let [row1Temp, row2Temp] = dropMissingPairwise(row1, row2)
        let r = clamp(correl(row1Temp, row2Temp), -1, 1)
        assert(r >= -1 && r <= 1, "Uh-oh!")
        correlations.push(r)
      } catch (e) {
        correlations.push(0)
      }
    })

    out.push(correlations)
  })

  return out
}

module.exports = getCorrelationMatrix

},{"js-math-tools":34}],89:[function(require,module,exports){
let {
  assert,
  DataFrame,
  isEqual,
  transpose,
  sort,
  set,
} = require("js-math-tools")

let containsOnlyNumbers = require("./contains-only-numbers.js")

function getHighlyCorrelatedColumns(correlations) {
  assert(
    correlations instanceof DataFrame,
    "You must pass a correlation matrix DataFrame into the `getHighlyCorrelatedColumns` function!"
  )

  assert(
    containsOnlyNumbers(correlations.values),
    "The correlation matrix DataFrame passed into the `getHighlyCorrelatedColumns` function must contain only numbers!"
  )

  assert(
    isEqual(correlations.values, transpose(correlations.values)),
    "The correlation matrix DataFrame passed into the `getHighlyCorrelatedColumns` function must be symmetrical!"
  )

  assert(
    isEqual(correlations.columns, correlations.index),
    "The correlation matrix DataFrame passed into the `getHighlyCorrelatedColumns` function must be symmetrical!"
  )

  let out = {}

  for (let i = 0; i < correlations.index.length; i++) {
    for (let j = 0; j < correlations.columns.length; j++) {
      if (i !== j) {
        let value = correlations.values[i][j]

        // note that this only detects columns that are highly POSITIVELY correlated!
        if (1 - value < 1e-5) {
          let rowName = correlations.index[i]
          let colName = correlations.columns[j]
          if (!out[rowName]) out[rowName] = []
          if (!out[colName]) out[colName] = []
          out[rowName].push(colName)
          out[colName].push(rowName)
        }
      }
    }
  }

  Object.keys(out).forEach(key => {
    out[key] = sort(set(out[key]))
  })

  return out
}

module.exports = getHighlyCorrelatedColumns

},{"./contains-only-numbers.js":86,"js-math-tools":34}],90:[function(require,module,exports){
let { assert, isArray, sqrt, sum, pow } = require("js-math-tools")
let containsOnlyNumbers = require("./contains-only-numbers.js")

function getMagnitude(x) {
  assert(isArray(x), "`getMagnitude` only works on vectors!")

  assert(
    containsOnlyNumbers(x),
    "`getMagnitude` only works on vectors of numbers!"
  )

  return sqrt(sum(pow(x, 2)))
}

module.exports = getMagnitude

},{"./contains-only-numbers.js":86,"js-math-tools":34}],91:[function(require,module,exports){
let {
  assert,
  sort,
  set,
  isString,
  isArray,
  shape,
  isUndefined,
} = require("js-math-tools")

function getOneHotEncodings(name, values) {
  assert(
    isString(name),
    "The first parameter passed into the `getOneHotEncodings` function must be a string representing the name of the variable being encoded."
  )

  assert(
    isArray(values) && shape(values).length === 1,
    "The second parameter passed into the `getOneHotEncodings` function must be a one-dimensional array of values."
  )

  let out = {}
  let colToDrop = name + "_" + values[0]
  let colNames = sort(set(values))
    .filter(v => !isUndefined(v))
    .map(v => name + "_" + v)
    .filter(v => v !== colToDrop)

  colNames.forEach(colName => {
    out[colName] = values.map(v => (colName === name + "_" + v ? 1 : 0))
  })

  return out
}

module.exports = getOneHotEncodings

},{"js-math-tools":34}],92:[function(require,module,exports){
let pValue = require("./p-value.js")
let {
  isUndefined,
  copy,
  assert,
  isArray,
  shape,
  transpose,
  clamp,
  dropMissingPairwise,
} = require("js-math-tools")

function getPValueMatrix(a, b) {
  if (isUndefined(b)) b = copy(a)

  assert(isArray(a) && isArray(b), "`getPValueMatrix` only works on matrices!")

  assert(
    shape(a).length === 2 && shape(b).length === 2,
    "`getPValueMatrix` only works on matrices!"
  )

  // note: this produces a "missing-aware" p-value matrix!
  let out = []
  let aTemp = transpose(a)
  let bTemp = transpose(b)

  aTemp.forEach(row1 => {
    let pValues = []

    bTemp.forEach(row2 => {
      let [row1Temp, row2Temp] = dropMissingPairwise(row1, row2)
      let p = clamp(pValue(row1Temp, row2Temp), 0, 1)
      pValues.push(p)
    })

    out.push(pValues)
  })

  return out
}

module.exports = getPValueMatrix

},{"./p-value.js":99,"js-math-tools":34}],93:[function(require,module,exports){
let { count } = require("js-math-tools")

function getPercentages(x) {
  let counts = count(x)

  return counts.map(c => {
    c.percentage = c.count / x.length
    return c
  })
}

module.exports = getPercentages

},{"js-math-tools":34}],94:[function(require,module,exports){
let {
  assert,
  isArray,
  shape,
  transpose,
  copy,
  chop,
  distance,
  identity,
  dot,
  add,
  scale,
  pow,
} = require("js-math-tools")

let containsOnlyNumbers = require("./contains-only-numbers.js")
let project = require("./project.js")
let getMagnitude = require("./get-magnitude.js")
let divide = (a, b) => scale(a, pow(b, -1))
let subtract = (a, b) => add(a, scale(b, -1))

function gramSchmidtOrthonormalize(x) {
  assert(isArray(x), "`gramSchmidtOrthonormalize` only works on matrices!")

  assert(
    containsOnlyNumbers(x),
    "`gramSchmidtOrthonormalize` only works on matrices of numbers!"
  )

  assert(
    shape(x).length === 2,
    "`gramSchmidtOrthonormalize` only works on matrices!"
  )

  // note: this produces a matrix where the *columns* are orthogonal to each other!
  let temp = transpose(x)
  let bases = []

  temp.forEach((v, i) => {
    let vCopy = copy(v)
    bases.forEach(basis => (vCopy = subtract(vCopy, project(vCopy, basis))))
    bases.push(vCopy)
  })

  let out = bases.map(basis => divide(basis, getMagnitude(basis)))
  let outTranspose = transpose(out)

  // assert(
  //   chop(distance(identity(out.length), dot(out, outTranspose))) === 0,
  //   "The matrix produced by the `gramSchmidtOrthonormalize` function must be orthogonal!"
  // )

  return outTranspose
}

module.exports = gramSchmidtOrthonormalize

},{"./contains-only-numbers.js":86,"./get-magnitude.js":90,"./project.js":101,"js-math-tools":34}],95:[function(require,module,exports){
(function (global){(function (){
const helpers = {
  clipOutliers: require("./clip-outliers.js"),
  containsOnlyNumbers: require("./contains-only-numbers.js"),
  diagonalize: require("./diagonalize.js"),
  getCorrelationMatrix: require("./get-correlation-matrix.js"),
  getHighlyCorrelatedColumns: require("./get-highly-correlated-columns.js"),
  getMagnitude: require("./get-magnitude.js"),
  getOneHotEncodings: require("./get-one-hot-encodings.js"),
  getPValueMatrix: require("./get-p-value-matrix.js"),
  getPercentages: require("./get-percentages.js"),
  gramSchmidtOrthonormalize: require("./gram-schmidt-orthonormalize.js"),
  inferType: require("./infer-type.js"),
  isBinary: require("./is-binary.js"),
  normalize: require("./normalize.js"),
  pValue: require("./p-value.js"),
  preprocess: require("./preprocess.js"),
  project: require("./project.js"),
  rScore: require("./r-score.js"),
  sortCorrelationMatrix: require("./sort-correlation-matrix.js"),

  dump: function () {
    const self = this

    Object.keys(self).forEach(key => {
      global[key] = self[key]
    })
  },
}

try {
  window.JSDataScienceHelpers = helpers
} catch (e) {}

try {
  module.exports = helpers
} catch (e) {}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./clip-outliers.js":85,"./contains-only-numbers.js":86,"./diagonalize.js":87,"./get-correlation-matrix.js":88,"./get-highly-correlated-columns.js":89,"./get-magnitude.js":90,"./get-one-hot-encodings.js":91,"./get-p-value-matrix.js":92,"./get-percentages.js":93,"./gram-schmidt-orthonormalize.js":94,"./infer-type.js":96,"./is-binary.js":97,"./normalize.js":98,"./p-value.js":99,"./preprocess.js":100,"./project.js":101,"./r-score.js":102,"./sort-correlation-matrix.js":103}],96:[function(require,module,exports){
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

const nullValues = ["null", "none", "nan", "na", "n/a", "", "undefined"]
const booleanValues = ["true", "false", "yes", "no"]

function cast(value, type) {
  if (value === undefined) {
    value = "undefined"
  }

  if (type === "number") {
    const out = float(value)
    if (isNaN(out)) return null
    return out
  }

  if (type === "boolean") {
    try {
      const vBool = value.trim().toLowerCase()

      if (vBool === "true" || vBool === "yes") {
        return true
      }

      if (vBool === "false" || vBool === "no") {
        return false
      }
    } catch (e) {}

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
    try {
      if (nullValues.indexOf(value.trim().toLowerCase()) > -1) return null
    } catch (e) {
      return null
    }

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
  const types = arr.map(v => {
    if (v === undefined) return "null"

    if (!isString(v)) {
      v = JSON.stringify(v)
    }

    const vLower = v.toLowerCase()
    const vLowerTrimmed = vLower.trim()

    // null
    if (nullValues.indexOf(vLowerTrimmed) > -1) {
      return "null"
    }

    // boolean
    if (booleanValues.indexOf(vLowerTrimmed) > -1) {
      return "boolean"
    }

    try {
      const vParsed = JSON.parse(v)

      // number
      if (isNumber(vParsed)) {
        return "number"
      }

      // object
      if (typeof vParsed === "object") {
        if (isArray(vParsed)) return "string"
        return "object"
      }

      return "string"
    } catch (e) {
      // date
      const vDate = new Date(v)

      if (vDate.toString() !== "Invalid Date") {
        return "date"
      }

      return "string"
    }
  })

  const counts = count(types).sort((a, b) => b.count - a.count)
  const primaryType = counts[0].item
  return { type: primaryType, values: arr.map(v => cast(v, primaryType)) }
}

module.exports = inferType

},{"js-math-tools":34}],97:[function(require,module,exports){
let {
  assert,
  isArray,
  Series,
  sort,
  set,
  flatten,
  dropNaN,
} = require("js-math-tools")

function isBinary(x) {
  if (typeof x === "number") {
    return x === 0 || x === 1
  }

  if (isArray(x)) {
    let nonMissingValues = dropNaN(flatten(x))
    let values = sort(set(nonMissingValues))

    return (
      (values.length === 2 && values[0] === 0 && values[1] === 1) ||
      (values.length === 1 && (values[0] === 0 || values[0] === 1))
    )
  }

  return false
}

module.exports = isBinary

},{"js-math-tools":34}],98:[function(require,module,exports){
let {
  assert,
  isArray,
  shape,
  Series,
  mean,
  std,
  isUndefined,
  dropNaN,
} = require("js-math-tools")

function normalize(x) {
  assert(isArray(x), "The `normalize` function only works on vectors!")

  assert(
    shape(x).length === 1,
    "The `normalize` function only works on vectors!"
  )

  // note that this is a "missing-aware" function!
  let nonMissingValues = dropNaN(x)
  let m = mean(nonMissingValues)
  let s = std(nonMissingValues)

  if (s === 0) return x

  return x.map(value => {
    if (typeof value === "number") {
      return (value - m) / s
    } else {
      return value
    }
  })
}

module.exports = normalize

},{"js-math-tools":34}],99:[function(require,module,exports){
const zTable = require("./z-table.json")
const {
  isUndefined,
  assert,
  isArray,
  shape,
  abs,
  round,
  map,
  mean,
  std,
  sqrt,
  pow,
  dropNaNPairwise,
} = require("js-math-tools")

function probability(z) {
  if (abs(z) > 4.1) return 0
  return zTable[round(map(abs(z), 0, 4.1, 0, zTable.length))]
}

function ttest(a, b) {
  assert(
    isArray(a) && shape(a).length === 1,
    "You must pass two one-dimensional arrays into the `pValue` (AKA `ttest`) function!"
  )

  assert(
    isArray(b) && shape(b).length === 1,
    "You must pass two one-dimensional arrays into the `pValue` (AKA `ttest`) function!"
  )

  let [aTemp, bTemp] = dropNaNPairwise(a, b)

  assert(
    aTemp.length > 0,
    "There are no numerical values in the first vector you passed into the `pValue` (AKA `ttest`) function!"
  )

  assert(
    bTemp.length > 0,
    "There are no numerical values in the second vector you passed into the `pValue` (AKA `ttest`) function!"
  )

  let m1 = mean(aTemp)
  let m2 = mean(bTemp)
  let s1 = std(aTemp)
  let s2 = std(bTemp)
  let n1 = aTemp.length
  let n2 = bTemp.length
  // let v1 = n1 - 1
  // let v2 = n2 - 1

  let t = (m1 - m2) / sqrt((s1 * s1) / n1 + (s2 * s2) / n2)

  // let v =
  //   pow((s1 * s1) / n1 + (s2 * s2) / n2, 2) /
  //   (pow(s1, 4) / (n1 * n1 * v1) + pow(s2, 4) / (n2 * n2 * v2))

  return 2 * probability(t)
}

module.exports = ttest

},{"./z-table.json":104,"js-math-tools":34}],100:[function(require,module,exports){
let {
  assert,
  DataFrame,
  transpose,
  isUndefined,
  set,
  isEqual,
  sort,
  count,
  copy,
  isNumber,
  isBoolean,
  isString,
  isArray,
  correl,
  dropMissing,
} = require("js-math-tools")

const getOneHotEncodings = require("./get-one-hot-encodings.js")
const clipOutliers = require("./clip-outliers.js")
const inferType = require("./infer-type.js")

function preprocess(df) {
  assert(
    df instanceof DataFrame,
    "You must pass a DataFrame into the `preprocess` function!"
  )

  const types = {}

  df = df.apply((col, colName) => {
    const results = inferType(col)
    types[colName] = results.type
    return results.values
  })

  const columns = copy(df.columns)
  const x = transpose(df.values)
  let index = 0
  let isDone = false

  // delete literally identical columns
  while (!isDone) {
    const col1 = x[index]

    for (let i = index + 1; i < x.length; i++) {
      const col2 = x[i]

      if (isEqual(col1, col2)) {
        columns.splice(i, 1)
        x.splice(i, 1)
      }
    }

    index++
    isDone = index >= columns.length - 1
  }

  // only examine each column once!
  index = 0
  isDone = false

  while (!isDone) {
    const colName = columns[index]
    const values = x[index]
    if (!values) break

    // get non-missing values
    const nonMissingValues = dropMissing(values)

    // if there are fewer than 15 non-missing values, then drop the column
    if (nonMissingValues.length < 15) {
      columns.splice(index, 1)
      x.splice(index, 1)
      continue
    }

    // if there's only 1 unique value, then drop the column
    const nonMissingValuesSet = set(nonMissingValues)

    if (nonMissingValuesSet.length === 1) {
      columns.splice(index, 1)
      x.splice(index, 1)
      continue
    }

    // get primary data type of the column
    const type = types[colName]

    if (type === "string") {
      // if all values are unique, then drop the column
      if (nonMissingValuesSet.length === nonMissingValues.length) {
        columns.splice(index, 1)
        x.splice(index, 1)
        continue
      }

      // if there are fewer than 7 unique values, then one-hot-encode them
      if (nonMissingValuesSet.length <= 7) {
        const encodings = getOneHotEncodings(colName, values)

        Object.keys(encodings).forEach(key => {
          columns.push(key)
          x.push(encodings[key])
          types[key] = "number"
        })

        columns.splice(index, 1)
        x.splice(index, 1)
        continue
      }
    } else if (type === "number") {
      const clippedValues = clipOutliers(values)[0]
      x[index] = clippedValues
      let wasHighlyCorrelated = false

      for (let i = 0; i < index; i++) {
        const otherValues = x[i]
        const r = correl(values, otherValues)

        if (r > 0.99) {
          columns.splice(index, 1)
          x.splice(index, 1)
          wasHighlyCorrelated = true
          break
        }
      }

      if (wasHighlyCorrelated) continue
    } else {
      x.splice(index, 1)
      columns.splice(index, 1)
      continue
    }

    index++
    isDone = index >= columns.length
  }

  const out = new DataFrame(transpose(x))
  out.columns = columns
  return out
}

module.exports = preprocess

},{"./clip-outliers.js":85,"./get-one-hot-encodings.js":91,"./infer-type.js":96,"js-math-tools":34}],101:[function(require,module,exports){
let { assert, isArray, shape, scale, dot } = require("js-math-tools")
let containsOnlyNumbers = require("./contains-only-numbers.js")

function project(v, u) {
  assert(isArray(v), "`project` only works on vectors!")
  assert(isArray(u), "`project` only works on vectors!")
  assert(containsOnlyNumbers(v), "`project` only works on vectors of numbers!")
  assert(containsOnlyNumbers(u), "`project` only works on vectors of numbers!")
  assert(shape(v).length === 1, "`project` only works on vectors!")
  assert(shape(u).length === 1, "`project` only works on vectors!")
  return scale(dot(u, v) / dot(u, u), u)
}

module.exports = project

},{"./contains-only-numbers.js":86,"js-math-tools":34}],102:[function(require,module,exports){
let containsOnlyNumbers = require("./contains-only-numbers.js")
let subtract = (a, b) => add(a, scale(b, -1))
let {
  sum,
  pow,
  mean,
  sign,
  sqrt,
  abs,
  add,
  scale,
  isEqual,
  shape,
  assert,
  isArray,
} = require("js-math-tools")

function rScore(xtrue, xpred) {
  assert(
    isArray(xtrue),
    "You must pass two same-shaped numerical arrays into the `rScore` function!"
  )

  assert(
    isArray(xpred),
    "You must pass two same-shaped numerical arrays into the `rScore` function!"
  )

  assert(
    isEqual(shape(xtrue), shape(xpred)),
    "You must pass two same-shaped numerical arrays into the `rScore` function!"
  )

  assert(
    containsOnlyNumbers(xtrue),
    "You must pass two same-shaped numerical arrays into the `rScore` function!"
  )

  assert(
    containsOnlyNumbers(xpred),
    "You must pass two same-shaped numerical arrays into the `rScore` function!"
  )

  let num = sum(pow(subtract(xtrue, xpred), 2))
  let den = sum(pow(subtract(xtrue, mean(xtrue)), 2))
  if (den === 0) return 0
  let r2 = 1 - num / den
  return sign(r2) * sqrt(abs(r2))
}

module.exports = rScore

},{"./contains-only-numbers.js":86,"js-math-tools":34}],103:[function(require,module,exports){
let {
  assert,
  max,
  min,
  copy,
  sort,
  sum,
  pow,
  DataFrame,
  isEqual,
  transpose,
  argmax,
  reverse,
} = require("js-math-tools")

function sortCorrelationMatrix(correlations) {
  assert(
    correlations instanceof DataFrame,
    "You must pass a DataFrame into the `sortCorrelationMatrix` function!"
  )

  assert(
    isEqual(correlations.values, transpose(correlations.values)),
    "The correlations matrix passed into the `sortCorrelationMatrix` function must be symmetrical!"
  )

  assert(
    isEqual(correlations.columns, correlations.index),
    "The correlations matrix passed into the `sortCorrelationMatrix` function must be symmetrical!"
  )

  assert(
    max(correlations.values) <= 1 && min(correlations.values) >= -1,
    "The correlations matrix passed into the `sortCorrelationMatrix` function must not contain values less than -1 or greater than 1!"
  )

  let freeRows = copy(correlations.index)
  let fixedRows = []

  while (freeRows.length > 0) {
    // get row with greatest 2-norm
    if (fixedRows.length === 0) {
      let highestTwoNorm = 0
      let rowWithHighestTwoNorm = freeRows[0]

      freeRows.forEach((rowName, i) => {
        const values = correlations.values[i]
        const twoNorm = sum(pow(values, 2))

        if (twoNorm > highestTwoNorm) {
          highestTwoNorm = twoNorm
          rowWithHighestTwoNorm = rowName
        }
      })

      fixedRows.push(rowWithHighestTwoNorm)
      freeRows.splice(freeRows.indexOf(rowWithHighestTwoNorm), 1)
    }

    // get free row with highest correlation with first fixed row
    // and fix it
    else {
      const j = correlations.index.indexOf(fixedRows[fixedRows.length - 1])
      const values = copy(correlations.values[j])
      values[j] = -2
      let k = argmax(values)[0]

      while (fixedRows.indexOf(correlations.index[k]) > -1) {
        values[k] = -2
        k = argmax(values)[0]
      }

      const nextRow = correlations.index[k]
      fixedRows.push(nextRow)
      freeRows.splice(freeRows.indexOf(nextRow), 1)
    }
  }

  fixedRows = reverse(fixedRows)
  return correlations.get(fixedRows, fixedRows)
}

module.exports = sortCorrelationMatrix

},{"js-math-tools":34}],104:[function(require,module,exports){
module.exports=[
  0.5,
  0.49601,
  0.49202,
  0.48803,
  0.48405,
  0.48006,
  0.47608,
  0.4721,
  0.46812,
  0.46414,
  0.46017,
  0.4562,
  0.45224,
  0.44828,
  0.44433,
  0.44038,
  0.4364,
  0.43251,
  0.42858,
  0.42465,
  0.42074,
  0.41683,
  0.41294,
  0.40905,
  0.40517,
  0.40129,
  0.39743,
  0.39358,
  0.38974,
  0.38591,
  0.38209,
  0.37828,
  0.37448,
  0.3707,
  0.36693,
  0.36317,
  0.35942,
  0.35569,
  0.35197,
  0.34827,
  0.34458,
  0.3409,
  0.33724,
  0.3336,
  0.32997,
  0.32636,
  0.32276,
  0.31918,
  0.31561,
  0.31207,
  0.30854,
  0.30503,
  0.30153,
  0.29806,
  0.2946,
  0.29116,
  0.28774,
  0.28434,
  0.28096,
  0.2776,
  0.27425,
  0.27093,
  0.26763,
  0.26435,
  0.26109,
  0.25785,
  0.25463,
  0.25143,
  0.24825,
  0.2451,
  0.24196,
  0.23885,
  0.23576,
  0.2327,
  0.22965,
  0.22663,
  0.22363,
  0.22065,
  0.2177,
  0.21476,
  0.21186,
  0.20897,
  0.20611,
  0.20327,
  0.20045,
  0.19766,
  0.19489,
  0.19215,
  0.18943,
  0.18673,
  0.18406,
  0.18141,
  0.17879,
  0.17619,
  0.17361,
  0.17106,
  0.16853,
  0.16602,
  0.16354,
  0.16109,
  0.15866,
  0.15625,
  0.15386,
  0.15151,
  0.14917,
  0.14686,
  0.14457,
  0.14231,
  0.14007,
  0.13786,
  0.13567,
  0.1335,
  0.13136,
  0.12924,
  0.12714,
  0.12507,
  0.12302,
  0.121,
  0.119,
  0.11702,
  0.11507,
  0.11314,
  0.11123,
  0.10935,
  0.10749,
  0.10565,
  0.10383,
  0.10204,
  0.10027,
  0.09853,
  0.0968,
  0.0951,
  0.09342,
  0.09176,
  0.09012,
  0.08851,
  0.08692,
  0.08534,
  0.08379,
  0.08226,
  0.08076,
  0.07927,
  0.0778,
  0.07636,
  0.07493,
  0.07353,
  0.07215,
  0.07078,
  0.06944,
  0.06811,
  0.06681,
  0.06552,
  0.06426,
  0.06301,
  0.06178,
  0.06057,
  0.05938,
  0.05821,
  0.05705,
  0.05592,
  0.0548,
  0.0537,
  0.05262,
  0.05155,
  0.0505,
  0.04947,
  0.04846,
  0.04746,
  0.04648,
  0.04551,
  0.04457,
  0.04363,
  0.04272,
  0.04182,
  0.04093,
  0.04006,
  0.0392,
  0.03836,
  0.03754,
  0.03673,
  0.03593,
  0.03515,
  0.03438,
  0.03362,
  0.03288,
  0.03216,
  0.03144,
  0.03074,
  0.03005,
  0.02938,
  0.02872,
  0.02807,
  0.02743,
  0.0268,
  0.02619,
  0.02559,
  0.025,
  0.02442,
  0.02385,
  0.0233,
  0.02275,
  0.02222,
  0.02169,
  0.02118,
  0.02068,
  0.02018,
  0.0197,
  0.01923,
  0.01876,
  0.01831,
  0.01786,
  0.01743,
  0.017,
  0.01659,
  0.01618,
  0.01578,
  0.01539,
  0.015,
  0.01463,
  0.01426,
  0.0139,
  0.01355,
  0.01321,
  0.01287,
  0.01255,
  0.01222,
  0.01191,
  0.0116,
  0.0113,
  0.01101,
  0.01072,
  0.01044,
  0.01017,
  0.0099,
  0.00964,
  0.00939,
  0.00914,
  0.00889,
  0.00866,
  0.00842,
  0.0082,
  0.00798,
  0.00776,
  0.00755,
  0.00734,
  0.00714,
  0.00695,
  0.00676,
  0.00657,
  0.00639,
  0.00621,
  0.00604,
  0.00587,
  0.0057,
  0.00554,
  0.00539,
  0.00523,
  0.00508,
  0.00494,
  0.0048,
  0.00466,
  0.00453,
  0.0044,
  0.00427,
  0.00415,
  0.00402,
  0.00391,
  0.00379,
  0.00368,
  0.00357,
  0.00347,
  0.00336,
  0.00326,
  0.00317,
  0.00307,
  0.00298,
  0.00289,
  0.0028,
  0.00272,
  0.00264,
  0.00256,
  0.00248,
  0.0024,
  0.00233,
  0.00226,
  0.00219,
  0.00212,
  0.00205,
  0.00199,
  0.00193,
  0.00187,
  0.00181,
  0.00175,
  0.00169,
  0.00164,
  0.00159,
  0.00154,
  0.00149,
  0.00144,
  0.00139,
  0.00135,
  0.00131,
  0.00126,
  0.00122,
  0.00118,
  0.00114,
  0.00111,
  0.00107,
  0.00104,
  0.001,
  0.00097,
  0.00094,
  0.0009,
  0.00087,
  0.00084,
  0.00082,
  0.00079,
  0.00076,
  0.00074,
  0.00071,
  0.00069,
  0.00066,
  0.00064,
  0.00062,
  0.0006,
  0.00058,
  0.00056,
  0.00054,
  0.00052,
  0.0005,
  0.00048,
  0.00047,
  0.00045,
  0.00043,
  0.00042,
  0.0004,
  0.00039,
  0.00038,
  0.00036,
  0.00035,
  0.00034,
  0.00032,
  0.00031,
  0.0003,
  0.00029,
  0.00028,
  0.00027,
  0.00026,
  0.00025,
  0.00024,
  0.00023,
  0.00022,
  0.00022,
  0.00021,
  0.0002,
  0.00019,
  0.00019,
  0.00018,
  0.00017,
  0.00017,
  0.00016,
  0.00015,
  0.00015,
  0.00014,
  0.00014,
  0.00013,
  0.00013,
  0.00012,
  0.00012,
  0.00011,
  0.00011,
  0.0001,
  0.0001,
  0.0001,
  0.00009,
  0.00009,
  0.00008,
  0.00008,
  0.00008,
  0.00008,
  0.00007,
  0.00007,
  0.00007,
  0.00006,
  0.00006,
  0.00006,
  0.00006,
  0.00005,
  0.00005,
  0.00005,
  0.00005,
  0.00005,
  0.00004,
  0.00004,
  0.00004,
  0.00004,
  0.00004,
  0.00004,
  0.00003,
  0.00003,
  0.00003,
  0.00003,
  0.00003,
  0.00003,
  0.00003,
  0.00003,
  0.00002,
  0.00002,
  0.00002,
  0.00002
]

},{}],105:[function(require,module,exports){

},{}],106:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":107}],107:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[95]);
