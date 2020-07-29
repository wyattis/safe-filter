import { expect } from 'chai'
import { getAttribute } from '../src/lib/getAttribute'

describe('getAttribute', () => {
  it('should handle null', () => {
    expect(getAttribute(null, 'any')).to.be.undefined
  })
  it('should handle undefined', () => {
    expect(getAttribute(undefined, 'any')).to.be.undefined
  })
  it('should handle empty keys', () => {
    expect(getAttribute({ okay: true }, '')).to.be.undefined
  })
  it('should handle arrays', () => {
    expect(getAttribute([0, 1, 2], '1')).to.equal(1)
    expect(getAttribute({ wow: [0, 1, 2] }, 'wow.2')).to.equal(2)
  })
  it('should handle non-nested attributes', () => {
    expect(getAttribute({
      hello: 'world'
    }, 'hello')).to.equal('world')
    expect(getAttribute({
      one: { hello: 'world' }
    }, 'one')).to.deep.equal({ hello: 'world' })
    expect(getAttribute({
      two: null
    }, 'two')).to.be.null
    expect(getAttribute({
      three: Infinity
    }, 'three')).to.equal(Infinity)
    expect(getAttribute({}, 'test')).to.be.undefined
  })
  it('should handle nested attributes', () => {
    expect(getAttribute({
      one: { two: '2nd level' }
    }, 'one.two')).to.equal('2nd level')
    expect(getAttribute({
      one: { two: { three: '3rd level' } }
    }, 'one.two.three')).to.equal('3rd level')
    expect(getAttribute({}, 'one.two.three')).to.be.undefined
    expect(getAttribute({ one: null }, 'one.two')).to.be.undefined
    expect(getAttribute({ one: { two: null } }, 'one.two')).to.be.null
  })
})