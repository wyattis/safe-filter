import { Expression, ComplexExpression, Primative, RootExpression } from './Expression'
import { getAttribute } from './lib/getAttribute'
import { isEqual, exists, greaterThan } from './operators'
import { lessThan } from './operators/lessThan'
import { lessThanOrEqual } from './operators/lessThanOrEqual'
import { greaterThanOrEqual } from './operators/greaterThanOrEqual'

export type Extractor = (record: object, key: string) => any

export function testExpression (expr: ComplexExpression | Primative, value: any): boolean {
  if (typeof expr !== 'object' || expr instanceof Date) {
    if (Array.isArray(value)) {
      return value.some(v => isEqual(v, expr))
    } else {
      return isEqual(expr, value)
    }
  }
  if (expr && expr.$elemMatch) {
    if (!Array.isArray(value)) {
      return false
    }
    if (!value.some(v => matches(expr.$elemMatch!, v))) {
      return false
    }
  } else if (Array.isArray(value)) {
    // I don't understand why they designed the language this way, but I guess we'll do it the same way.
    // https://docs.mongodb.com/manual/tutorial/query-array-of-documents/#combination-of-elements-satisfies-the-criteria
    for (const key in expr) {
      // @ts-ignore
      const partialExpr = { [key]: expr[key] }
      const isTrue = value.some(v => matches(partialExpr, v))
      if (!isTrue) {
        return false
      }
    }
    return true
  }
  if ('$eq' in expr && !isEqual(value, expr.$eq)) {
    return false
  }
  if ('$ne' in expr && isEqual(value, expr.$ne)) {
    return false
  }
  if (typeof expr.$exists === 'boolean' && !exists(value, expr.$exists)) {
    return false
  }
  if ('$not' in expr) {
    if (typeof expr.$not !== 'object' || expr.$not === null) {
      throw new Error('$not needs a regex or a document')
    }
    if (testExpression(expr.$not, value)) {
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
  return true
}

export function matches (expression: Expression, record: any, extractor: Extractor = getAttribute): boolean {
  if (typeof expression !== 'object' || expression instanceof Date) {
    return isEqual(expression, record)
  }
  if (expression.$and && expression.$or) {
    throw new Error('Indeterminate behavior. "$and" and "$or" operators cannot be present at the same level.')
  }
  if (Array.isArray(expression.$and)) {
    return expression.$and.every(exp => matches(exp, record, extractor))
  } else if (Array.isArray(expression.$or)) {
    return expression.$or.some(exp => matches(exp, record, extractor))
  } else if (expression.$not) {
    if (typeof expression.$not !== 'object') {
      throw new Error('$not needs a regex or a document')
    }
    return !matches(expression.$not as Expression, record, extractor)
  } else if (!Array.isArray(record) && typeof record === 'object') {
    const expr = expression as RootExpression
    // Implicit AND operation if multiple root level keys provided
    for (const key in expression) {
      const value = extractor(record, key)
      if (!testExpression(expr[key], value)) {
        return false
      }
    }
    return true
  } else {
    return testExpression(expression, record)
  }
}
