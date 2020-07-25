import { AxiosResponse, AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'

export interface StringMap {
  [name: string]: string
}
export interface UrlMap {
  [name: string]: string | StringMap
}
export type LoadingObject = {
  open: () => void
  close: () => void
}
export type Notify = (message: string) => void
export type NotifyObject = {
  success?: Notify
  error: Notify
}
export type UniversalMap = {
  [key: string]: any
}
export type Attaches = {
  loading?: boolean
  notify?: boolean
  successMessage?: string
  codeCallback?: {
    [name: number]: (error: EscHttpResponse, msg: string) => any
  },
  isUpload?: boolean
  [key: string]: any
}
export type ContentType = 'application/x-www-form-urlencoded' | 'application/json' | 'application/octet-stream'
export type ArrayFormat = 'repeat' | 'indices' | 'brackets' | 'comma'
// { a: ['b', 'c'] }
// 1. a=b&a=c  2. a[0]=b&a[1]=c  3. a[]=b&a[]=c   4. a=b,c

export interface EscHttpOptions {
  baseUrl?: string
  urlMap: UrlMap
  timeout?: number
  notify?: NotifyObject | Notify
  loadingMethods?: LoadingObject
  contentType?: ContentType
  arrayFormat?: ArrayFormat
  headers?: StringMap
  useQsStringifyBody?: boolean
  miniprogramRequestHandle?: (method: string, url: string, data?: UniversalMap, attaches?: UniversalMap) => Promise<EscHttpResponse>
  bindSentry?: any
  beforeRequest?: (data: UniversalMap, config?: AxiosRequestConfig, attaches?: UniversalMap) => { data: UniversalMap, config?: AxiosRequestConfig }
  beforeThen?: (res: EscHttpResponse, attaches?: UniversalMap) => EscHttpResponse
  beforeCatch?: (res: EscHttpResponse, attaches?: UniversalMap) => EscHttpResponse
  withCredentials?: boolean,
  successRequestAssert?: (serverResponse: EscHttpResponse) => boolean
  captureAssert?: (serverResponse: EscHttpResponse) => boolean
  defaultErrorNotifyMessage?: string
}

export interface EscHttp {
  instance?: AxiosInstance
  options: EscHttpOptions
  get: (
    urlName: string,
    data?: any,
    attaches?: Attaches,
    config?: AxiosRequestConfig
  ) => Promise<EscHttpResponse>
  post: (
    urlName: string,
    data?: any,
    attaches?: Attaches,
    config?: AxiosRequestConfig
  ) => Promise<EscHttpResponse>
  cancel (all?: boolean, name?: string, message?: string): void
}

export interface EscHttpInstance extends EscHttp {
  new(options: EscHttpOptions): EscHttp
}

// export interface EscAxiosResponse extends AxiosResponse {
//   attaches?: UniversalMap
// }

export interface EscHttpResponse {
  attaches?: UniversalMap
  success?: boolean
  data?: any
  code?: number
  msg?: string,
  error?: AxiosError
}

// export interface EscHttpError extends AxiosError {
//   attaches?: UniversalMap
// }

declare module 'vue/types/vue' {
  interface Vue {
    $http: EscHttp
    $http2: EscHttp
    $http3: EscHttp
  }
}

export const Http: EscHttpInstance
