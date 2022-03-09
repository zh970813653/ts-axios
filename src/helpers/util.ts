const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
export function isObject(val: any): val is object {
  // return toString.call(val) === '[object object]'
  return val !== null && typeof val ==='object'
}
