/* eslint-env node, mocha */

'use strict'

const expect = require('chai').expect
const vuePropsTemplate = require('../index.js')

describe('vuePropsTemplate', () => {
  let props

  beforeEach(() => {
    props = vuePropsTemplate.extend(vuePropsTemplate`
      string pString
      number pNumber
      boolean pBoolean
      function pFunction
      object pObject
      array pArray

      required string rpString

      string pdString = ${'foo-bar'}
      array pdArray = ${[11, 22, 33]}

      string pvString
    `, {
      pvString: {
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
      expect(props.pString.type).equal(String)
    })

    it('Number', () => {
      expect(props.pNumber.type).equal(Number)
    })

    it('boolean', () => {
      expect(props.pBoolean.type).equal(Boolean)
    })

    it('function', () => {
      expect(props.pFunction.type).equal(Function)
    })

    it('object', () => {
      expect(props.pObject.type).equal(Object)
    })

    it('array', () => {
      expect(props.pArray.type).equal(Array)
    })
  })

  context('sets required', () => {
    it('true if specified', () => {
      expect(props.rpString.required).to.be.true
    })

    it('undefined if not specified', () => {
      expect(props.pString.required).to.be.undefined
    })
  })

  context('accepts default values for', () => {
    it('string', () => {
      expect(props.pdString.default).equal('foo-bar')
    })

    it('array', () => {
      expect(props.pdArray.default).eql([11, 22, 33])
    })
  })

  describe('accepts extensions', () => {
    it('validator', () => {
      expect(props.pvString.validator('ok-123')).to.be.true
      expect(props.pvString.validator('ng-123')).to.be.false
    })

    it('whatever', () => {
      expect(props.pvString.whatever).equal('whatever')
    })

    it('existings', () => {
      expect(props.pvString.type).equal(String)
    })
  })
})
