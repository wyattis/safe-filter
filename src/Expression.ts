export type Comparable = number | Date
export type Primative = string | number | boolean | Date

export type ComplexExpression = {
  $not?: ComplexExpression | Primative
  $eq?: Primative
  $neq?: Primative
  $gt?: Comparable
  $lt?: Comparable
  $gte?: Comparable
  $lte?: Comparable
  $in?: Primative[]
  $nin?: Primative[]
  $exists?: boolean
  $regex?: RegExp | string
  $elemMatch?: Expression
  // $size?: number
}

export type RootExpression = {
  [key: string]: ComplexExpression | Primative
}

export type LogicExpression = {
  $and?: Expression[]
  $or?: Expression[]
  $not?: Expression
}

export type Expression = LogicExpression | RootExpression
