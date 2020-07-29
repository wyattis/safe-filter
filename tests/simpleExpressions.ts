import { Expression } from "../src/Expression"

export const simpleData = {
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

export const simpleExpressions: [Expression, boolean][] = [
  [{ a: 1 }, true ], 
  [{ d: 'yellow' }, true],
  [{ b: { $eq: 2 } }, true],
  [{ d: 'yellow', e: 'red' }, true],
  [{ d: 'blue', e: 'red'}, false],
  [{
    $and: [{ a: 1 }]
  }, true],
  [{
    $and: [{ d: 'yellow' }, { e: 'red' }]
  }, true],
  [{
    $and: [{ d: 'blue' }, { e: 'red' }]
  }, false],
  [{
    $or: [{ d: { $eq: 'blue' } }, { e: 'red' }]
  }, true],
  [{ d: { $neq: 'yellow' } }, false],
  [{ e: { $neq: 'yellow' } }, true],
  [{ a: { $gt: 2 } }, false],
  [{ b: { $gt: 1 } }, true],
  [{ a: { $lt: 0 } }, false],
  [{ a: { $lt: 2 } }, true],
  [{ b: { $gte: 2 } }, true],
  [{ b: { $gte: 1 } }, true],
  [{ a: { $gte: 2 } }, false],
  [{ b: { $lte: 2 } }, true],
  [{ b: { $lte: 1 } }, false],
  [{ a: { $lte: 2 } }, true],
  [{ a: { $in: [0, 1, 2] } }, true],
  [{ d: { $in: ['yellow'] } }, true],
  [{ d: { $in: ['red'] } }, false],
  [{ e: { $nin: ['yellow', 'blue'] } }, true],
  [{ d: { $nin: ['yellow'] } }, false],
  [{ d: { $exists: true } }, true],
  [{ d: { $exists: false } }, false],
  [{ notAProp: { $exists: false } }, true],
  [{ b: { $not: { $eq: 1 } } }, true],
  [{ b: { $not: { $eq: 2 } } }, false],
  [{ b: { $not: 2 } }, false],
  [{ b: { $not: 1 } }, true],
  [{ d: { $regex: /yel.*/ } }, true],
  [{ e: { $regex: /yel.*/ } }, false],
  [{}, true],
  [{ c: { $elemMatch: { v: 1 } } }, true],
  [{ c: { $elemMatch: { v: 0 } } }, false],
  [{ k: { $elemMatch: { v: 1 } } }, false], // k is not an array
  [{ f: { $elemMatch: 1 } }, true],
  [{ f: 1 }, true],                         // The array f contains 1
  [{ f: { $eq: 1 } }, true],                // ""
  [{ f: { $eq: 4 } }, false],
]