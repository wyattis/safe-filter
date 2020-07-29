import { Expression } from "../src/Expression"

export const record = {
  a: 1,
  b: 2,
  c: [{
    v: 1,
    w: 2
  }, {
    v: 2,
    w: 2
  }],
  d: 'yellow',
  e: 'red',
  f: [1, 2, 3]
}

export const simpleExpressions: [any, Expression, boolean][] = [
  [record, { a: 1 }, true ], 
  [record, { d: 'yellow' }, true],
  [record, { b: { $eq: 2 } }, true],
  [record, { d: 'yellow', e: 'red' }, true],
  [record, { d: 'blue', e: 'red'}, false],
  [record, {
    $and: [{ a: 1 }]
  }, true],
  [record, {
    $and: [{ d: 'yellow' }, { e: 'red' }]
  }, true],
  [record, {
    $and: [{ d: 'blue' }, { e: 'red' }]
  }, false],
  [record, {
    $or: [{ d: { $eq: 'blue' } }, { e: 'red' }]
  }, true],
  [record, { d: { $neq: 'yellow' } }, false],
  [record, { e: { $neq: 'yellow' } }, true],
  [record, { a: { $gt: 2 } }, false],
  [record, { b: { $gt: 1 } }, true],
  [record, { a: { $lt: 0 } }, false],
  [record, { a: { $lt: 2 } }, true],
  [record, { b: { $gte: 2 } }, true],
  [record, { b: { $gte: 1 } }, true],
  [record, { a: { $gte: 2 } }, false],
  [record, { b: { $lte: 2 } }, true],
  [record, { b: { $lte: 1 } }, false],
  [record, { a: { $lte: 2 } }, true],
  [record, { a: { $in: [0, 1, 2] } }, true],
  [record, { d: { $in: ['yellow'] } }, true],
  [record, { d: { $in: ['red'] } }, false],
  [record, { e: { $nin: ['yellow', 'blue'] } }, true],
  [record, { d: { $nin: ['yellow'] } }, false],
  [record, { d: { $exists: true } }, true],
  [record, { d: { $exists: false } }, false],
  [record, { notAProp: { $exists: false } }, true],
  [record, { b: { $not: { $eq: 1 } } }, true],
  [record, { b: { $not: { $eq: 2 } } }, false],
  [record, { b: { $not: 2 } }, false],
  [record, { b: { $not: 1 } }, true],
  [record, { d: { $regex: /yel.*/ } }, true],
  [record, { e: { $regex: /yel.*/ } }, false],
  [record, {}, true],
  [record, { c: { $elemMatch: { v: 1 } } }, true],
  [record, { c: { $elemMatch: { v: 0 } } }, false],
  [record, { k: { $elemMatch: { v: 1 } } }, false], // k is not an array
  [record, { f: { $elemMatch: 1 } }, true],
  [record, { f: 1 }, true],                         // The array f contains 1
  [record, { f: { $eq: 1 } }, true],                // ""
  [record, { f: { $eq: 4 } }, false],
  [['yellow'], { $eq: 'yellow' }, true],
  [['yellow'], { $not: { $eq: 'yellow' } }, false],
  [['red', 'blue'], 'yellow', false],
  [['red', 'yellow'], { $neq: 'yellow' }, true],
  [['yellow', 'yellow'], { $neq: 'yellow' }, false]
]