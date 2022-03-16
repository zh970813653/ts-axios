import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/g, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) return url
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const value = params[key]
    // 如果value是数组类型，那么需要一个数组去表示
    let values = []
    const parts: string[] = []
    if (value === null || typeof value === undefined) return
    if (Array.isArray(value)) {
      values = value
      key += '[]'
    } else {
      values = [value]
    }
    values.forEach(val => {
      // 判断是否是一个时间类型
      if (isDate(val)) {
        // toISOString: 将日期转换时分秒
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
    const serializedParams = parts.join('&')
    if (serializedParams) {
      const markIndex = url.indexOf('#')
      if (markIndex > -1) {
        url = url.slice(0,markIndex)
      }
      url+= (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
  })
  return url
}
