import { Expression } from "../src/Expression"

export const compoundData = {
  one: 1,
  two: 2,
  threeArr: [0, 1, 2],
  record: {
    a: 2,
    hello: 'okay'
  }
}

export const compoundExpressions: [Expression, boolean][] = [
  [{
    one: 1,
    two: {
      $neq: 2
    }
  }, false],
  [{
    $and: [{
      one: 1,
      two: 2
    }]
  }, true],
  [{
    $or: [{
      one: 2
    }, {
      two: 2
    }]
  }, true],
  [{
    $or: [{
      two: 2
    }, {
      one: 2
    }]
  }, true],
  [{
    $not: {
      $and: [{
        'threeArr.3': 4
      }]
    }
  }, true],
  [{
    $not: {
      two: 2
    }
  }, false],
  [{
    $and: [{
      $or: [{
        one: 2
      }, {
        one: 1
      }]
    }, {
      two: { $not: 1 }
    }]
  }, true]
]