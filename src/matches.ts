import { Expression, ComplexExpression, Primative, RootExpression, LogicExpression } from './Expression'
import { getAttribute } from './lib/getAttribute'
import { isEqual, exists, greaterThan } from './operators'
import { lessThan } from './operators/lessThan'
import { lessThanOrEqual } from './operators/lessThanOrEqual'
import { greaterThanOrEqual } from './operators/greaterThanOrEqual'

export type Extractor = (record: object, key: string) => any

export function testExpression (expr: ComplexExpression | Primative, value: any): boolean {
  if (typeof expr !== 'object' || expr instanceof Date) {
    return value === expr
  }
  if ('$eq' in expr && !isEqual(value, expr.$eq)) {
    return false
  }
  if ('$neq' in expr && isEqual(value, expr.$neq)) {
    return false
  }
  if (typeof expr.$exists === 'boolean' && !exists(value, expr.$exists)) {
    return false
  }
  if ('$not' in expr) {
    if (typeof expr.$not === 'object' && expr.$not !== null) {
      if (testExpression(expr.$not, value)) {
        return false
      }
    } else if (isEqual(expr.$not, value)) {
      return false
    }
  }
  if (expr.$gt !== undefined && !greaterThan(value, expr.$gt)) {
    return false
  }
  if (expr.$lt !== undefined && !lessThan(value, expr.$lt)) {
    return false
  }
  if (expr.$lte !== undefined && !lessThanOrEqual(value, expr.$lte)) {
    return false
  }
  if (expr.$gte !== undefined && !greaterThanOrEqual(value, expr.$gte)) {
    return false
  }
  if (expr.$in && !expr.$in.includes(value)) {
    return false
  }
  if (expr.$nin && expr.$nin.includes(value)) {
    return false
  }
  if (expr.$regex && !(new RegExp(expr.$regex)).test(value)) {
    return false
  }
  if (expr.$elemMatch) {
    if (Array.isArray(value)) {
      if (!value.some(v => matches(expr.$elemMatch!, v))) {
        return false
      }
    } else {
      return false
    }
  }
  return true
}

export function matches (expression: Expression, record: object, extractor: Extractor = getAttribute): boolean {
  if (expression.$and && expression.$or) {
    throw new Error('Indeterminate behavior. "$and" and "$or" operators cannot be present at the same level.')
  }
  if (Array.isArray(expression.$and)) {
    return expression.$and.every(exp => matches(exp, record, extractor))
  } else if (Array.isArray(expression.$or)) {
    return expression.$or.some(exp => matches(exp, record, extractor))
  } else if (expression.$not) {
    return !matches(expression.$not as Expression, record, extractor)
  } else {
    const expr = expression as RootExpression
    // Implicit AND operation if multiple root level keys provided
    for (const key in expression) {
      const value = extractor(record, key)
      if (!testExpression(expr[key], value)) {
        return false
      }
    }
    return true
  }
}
