export function exists (a: any, shouldExist: boolean): boolean {
  const doesExist = a !== null && a !== undefined
  return shouldExist ? doesExist : !doesExist
}
