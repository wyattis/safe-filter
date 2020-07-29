export function getAttribute<T = any> (obj: any, key: string): T {
  const parts = key.split('.')
  for (const k of parts) {
    if (obj !== null && typeof obj === 'object' && k in obj) {
      obj = obj[k]
    } else {
      obj = undefined
      break
    }
  }
  return obj
}
