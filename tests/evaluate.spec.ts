import { Expression, RootExpression } from '../src/Expression'
import { evaluate } from '../src/evaluate'
import { expect } from 'chai'
import { simpleExpressions, simpleData } from './simpleExpressions'
import { compoundExpressions, compoundData } from './compoundExpression'

describe('evaluate', () => {
  it('should handle simple expressions', () => {
    for (const test of simpleExpressions) {
      expect(evaluate(test[0], simpleData)).to.equal(test[1], JSON.stringify({ expression: test[0], record: simpleData }, null, 2))
    }
  })
  it('should handle compound expressions', () => {
    for (const test of compoundExpressions) {
      expect(evaluate(test[0], compoundData)).to.equal(test[1], JSON.stringify({ expression: test[0], record: compoundData }, null, 2))
    }
  })
  it('should dissallow "$and" and "$or" at the same level', () => {
    expect(() => {
      return evaluate({
        $and: [],
        $or: []
      }, simpleData)
    }).to.throw()
  })
})
