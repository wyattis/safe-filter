import { Expression } from "../src/Expression"

export const record = {
  one: 1,
  two: 2,
  threeArr: [0, 1, 2],
  record: {
    a: 2,
    hello: 'okay'
  }
}

export const compoundExpressions: [any, Expression, boolean][] = [
  [record, {
    one: 1,
    two: {
      $ne: 2
    }
  }, false],
  [record, {
    $and: [{
      one: 1,
      two: 2
    }]
  }, true],
  [record, {
    $or: [{
      one: 2
    }, {
      two: 2
    }]
  }, true],
  [record, {
    $or: [{
      two: 2
    }, {
      one: 2
    }]
  }, true],
  [record, {
    $not: {
      $and: [{
        'threeArr.3': 4
      }]
    }
  }, true],
  [record, {
    $not: {
      two: 2
    }
  }, false],
  [record, {
    $and: [{
      $or: [{
        one: 2
      }, {
        one: 1
      }]
    }, {
      two: { $ne: 1 }
    }]
  }, true],
  [record, {
    $and: [{
      $or: [{
        one: 2
      }, {
        one: 1
      }]
    }, {
      two: { $eq: 1 }
    }]
  }, false],
  [record, { threeArr: { $gte: 1 , $eq: 0 } }, true],   // https://docs.mongodb.com/manual/tutorial/query-array-of-documents/#combination-of-elements-satisfies-the-criteria
  [record, { threeArr: { $elemMatch: { $gte: 1, $eq: 0 } } }, false],
  [record, { threeArr: { $elemMatch: { $gt: 1, $lte: 2 } } }, true],
  [{
    user: { id: 1 }
  }, {
    $or: [{
      firstDoseAt: {$exists: 1},
      vaccinated: {$eq: 1},
      vaccineType: {$in: ["pfizer", "moderna"]}
    }, {
      'user.data.vaccine.receivedFirstDoseAt': {$exists: 1},
      'user.data.vaccine.receivedSecondDoseAt': {$exists: 0}
    }]
  }, false]
]