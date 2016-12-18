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
  const rxLine = /^\s*(required\s+)?(\w+)\s+(\w+)(\s*=\s*__VUE_PROPS_TEMPLATE_DEFAULT_VALUE_PLACEHOLDER__)?\s*$/
  const fullText = strings.join('__VUE_PROPS_TEMPLATE_DEFAULT_VALUE_PLACEHOLDER__')
  const props = {}
  const values = Array.prototype.slice.call(arguments, 1)
  let valuesIndex = 0

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
      prop.default = values[valuesIndex++]
    }

    props[name] = prop
  })

  return props
}
