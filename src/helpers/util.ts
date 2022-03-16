const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
// export function isObject(val: any): val is object {
//   // return toString.call(val) === '[object object]'
//   return val !== null && typeof val ==='object'
// }

export function isPlainObject(val: any): val is object {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, form: U): T & U {
  for (let key in form) {
    (to as T & U)[key] = form[key] as any
  }
  return to as T & U
}
