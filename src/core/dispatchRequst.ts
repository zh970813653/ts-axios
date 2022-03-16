import { AxiosRequestConfig,AxiosPromise,AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import {transformRequest,transformResponse} from '../helpers/data'
import {processHeader} from '../helpers/header'
import xhr from '../xhr'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformRequestHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  return buildURL(config.url!, config.params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data =  transformResponse(res.data)
  return res
}
function transformRequestHeaders(config: AxiosRequestConfig): any {
  const {headers = {},data} = config
  return processHeader(headers,data)
}


// export default axios
