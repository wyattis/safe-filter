import { matches } from '../src/matches'
import { expect } from 'chai'
import { simpleExpressions } from './simpleExpressions'
import { compoundExpressions } from './compoundExpression'

describe('evaluate', () => {
  it('should handle primitives', () => {
    expect(matches(2, 2), 'Two numbers should be the same').to.be.true
    expect(matches({ $eq: 1 }, 1), 'A primitive should be matched').to.be.true
    expect(matches({ $gt: 1 }, 2), 'gt should work on primitives').to.be.true
  })
  it('should handle simple expressions', () => {
    for (const test of simpleExpressions) {
      expect(matches(test[1], test[0])).to.equal(test[2], JSON.stringify({ expression: test[1], record: test[0] }, null, 2))
    }
  })
  it('should handle compound expressions', () => {
    for (const test of compoundExpressions) {
      expect(matches(test[1], test[0])).to.equal(test[2], JSON.stringify({ expression: test[1], record: test[0] }, null, 2))
    }
  })
  it('should dissallow "$and" and "$or" at the same level', () => {
    expect(() => {
      return matches({
        $and: [],
        $or: []
      }, { any: 'wow' })
    }).to.throw()
  })
})
