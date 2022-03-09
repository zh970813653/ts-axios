import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
}
function transformURL(config: AxiosRequestConfig): string {
  return buildURL(config.url, config.params)
}

export default axios
