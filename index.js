'use strict'

const TYPES = {
  array: Array,
  boolean: Boolean,
  function: Function,
  number: Number,
  object: Object,
  string: String
}

module.exports = function (strings) {
  const fullText = strings[0]
  const props = {}

  const rxLine = /^\s*(required\s+)?(\w+)\s+(\w+)(?:\s*=\s*(.+))?\s*$/
  fullText.split('\n').forEach(line => {
    const m = line.match(rxLine)
    if (!m) {
      return
    }

    const required = m[1]
    const typeName = m[2]
    const name = m[3]
    const defaultValue = m[4]

    const prop = { type: TYPES[typeName] }

    if (required) {
      prop.required = true
    }

    if (defaultValue) {
      prop.default = defaultValue
      // prop.default = eval(defaultValue)
    }

    props[name] = prop
  })

  return props
}
