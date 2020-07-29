# Safe filter
A small, simple and safe TypeScript library for evaluating a subset of the well-known, MongoDB query language. Designed to be safe for use in a database or on the client side without the need for `eval`.

## Usage

### Filter an array of documents
```
  import { matches } from 'safe-filter'

  const docs = [{
    id: 1,
    name: 'hello'
  }, {
    id: 2,
    name: 'world'
  }, {
    id: 3,
    name: 'wowza'
  }]
  
  console.log(docs.filter(d => matches({ id: 1 }, d)))          // [{ id: 1, name: 'hello' }]
  console.log(docs.filter(d => matches({ id: { $gte: 2 } }, d)) // [{ id: 2, name: 'world' }, { id: 3, name: 'wowza' }]
```

### Supported operators
`$and`, `$or`, `$not`, `$eq`, `$neq`, `$gt`, `$lt`, `$gte`, `$lte`, `$in`, `$nin`, `$exists`, `$regex`, `$elemMatch`