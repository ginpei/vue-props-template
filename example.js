const vp = require('./index.js')

const props = vp`
  string pString
  number pNumber
  boolean pBoolean
  function pFunction
  object pObject
  array pArray

  required string rpString
`
const keys = Object.keys(props)

function assert (description, expected, value) {
  console.assert(expected === value, description, value)
}

assert('string', String, props.pString.type)
assert('number', Number, props.pNumber.type)
assert('boolean', Boolean, props.pBoolean.type)
assert('function', Function, props.pFunction.type)
assert('object', Object, props.pObject.type)
assert('array', Array, props.pArray.type)
assert('required', true, props.rpString.required)
assert('length', 7, keys.length)
