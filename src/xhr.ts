import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'
import { parseHeaders } from './helpers/header'
import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()
    // debugger
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url, true)

    // 当readyState改变时，就会触发onreadystatechange()事件
    request.onreadystatechange = function handleLoad() {
      // 当 readyState 为 4，status 为 200 时，响应就绪
      // 不为4 响应失败
      if (request.readyState !== 4) return
      // status = 0的时候,意味着 发生了网络错误
      if (request.status === 0) return
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        headers: responseHeaders,
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        config,
        request
      }
      handleResponse(response)
    }
    // 请求报错 外部抛出promise
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    // 请求延迟处理
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`,config,'ECONNABORTED',request))
    }
    Error
    // 在发送之前设置上头部
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`,config,null,request,response))
      }
    }
  })
}
