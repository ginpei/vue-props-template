/* eslint-env node, mocha */

'use strict'

const expect = require('chai').expect
const vuePropsTemplate = require('../index.js')

describe('vuePropsTemplate', () => {
  let props

  beforeEach(() => {
    props = vuePropsTemplate.extend(vuePropsTemplate`
      string simpleString
      number simpleNumber
      boolean simpleBoolean
      function simpleFunction
      object simpleObject
      array simpleArray

      required string requiredString

      string defaultString = ${'foo-bar'}
      array defaultArray = ${[11, 22, 33]}

      string extendedString
    `, {
      extendedString: {
        validator: function (value) {
          return value.startsWith('ok-')
        },
        whatever: 'whatever'
      }
    })
  })

  it('accepts all lines expect for empty ones', () => {
    expect(Object.keys(props).length).equal(10)
  })

  context('accepts type as', () => {
    it('string', () => {
      expect(props.simpleString.type).equal(String)
    })

    it('Number', () => {
      expect(props.simpleNumber.type).equal(Number)
    })

    it('boolean', () => {
      expect(props.simpleBoolean.type).equal(Boolean)
    })

    it('function', () => {
      expect(props.simpleFunction.type).equal(Function)
    })

    it('object', () => {
      expect(props.simpleObject.type).equal(Object)
    })

    it('array', () => {
      expect(props.simpleArray.type).equal(Array)
    })
  })

  context('sets required', () => {
    it('true if specified', () => {
      expect(props.requiredString.required).to.be.true
    })

    it('undefined if not specified', () => {
      expect(props.simpleString.required).to.be.undefined
    })
  })

  context('accepts default values for', () => {
    it('string', () => {
      expect(props.defaultString.default).equal('foo-bar')
    })

    it('array', () => {
      expect(props.defaultArray.default).eql([11, 22, 33])
    })
  })

  describe('accepts extensions', () => {
    it('validator', () => {
      expect(props.extendedString.validator('ok-123')).to.be.true
      expect(props.extendedString.validator('ng-123')).to.be.false
    })

    it('whatever', () => {
      expect(props.extendedString.whatever).equal('whatever')
    })

    it('existings', () => {
      expect(props.extendedString.type).equal(String)
    })
  })
})
