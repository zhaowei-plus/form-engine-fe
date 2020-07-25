import { http } from './window'

export interface ICreateParams {
  title: string
  formDesc?: string
  tags?: Array<number>
  formKey: string
}

export interface IUpdateParams {
  title?: string
  formDesc?: string
  tags?: Array<number>
  id: number
}

export interface ICopyParams extends ICreateParams {
  targetFormKey: string
}

export interface IDraft {
  fullDefine?: any
  simpleDefine?: any
  scriptKeyList?: Array<any>
}

export interface ICreateDraft extends IDraft {
  formKey: string
}

export interface IUpdateDraft extends IDraft {
  id: string,
  fullDefineObj: object,
  simpleDefineList: []
}

export interface IResponse {
  success: boolean
  data: any
}

export interface IDraftDetail {
  success: boolean
  data: {
    id: number
    formKey: string
    scriptKeyList: Array<string>
    simpleDefineList: any
    fullDefineObj: any
  }
}

// 获取列表
export const getList = (params: any) => http.get('form/list', params, undefined, { baseURL: '/' })

// 检验formKey
export const check = (params: any) => http.get('form/checkFormKey', params, undefined, { baseURL: '/' })

// 表单详情
export const getDetail = (params: any) => http.get('form/detail', params, undefined, { baseURL: '/' })

// 删除表单
export const deleteForm = (params: any) => http.get('form/delete', params, undefined, { baseURL: '/' })

// 新增表单
export const createForm = (params: ICreateParams) => http.post('form/create', params, undefined, { baseURL: '/' })

// 更新表单
export const updateForm = (params: IUpdateParams) => http.post('form/update', params, undefined, { baseURL: '/' })

// 复制表单
export const copyForm = (params: ICopyParams) => http.post('form/copy', params, undefined, { baseURL: '/' })

// 获取表单定义草稿详情
export const getDefineDraft = (params: any) => http.get('form/draft', params, undefined, { baseURL: '/' })

// 创建表单草稿
export const createDefineDraft = (params: ICreateDraft) => http.post('form/draftCreate', params, undefined, { baseURL: '/' })

// 更新表单草稿
export const updateDefineDraft = (params: IUpdateDraft) => http.post('form/draftUpdate', params, undefined, { baseURL: '/' })

// 发布表单
export const releaseForm = (params: any) => http.post('form/release', params, undefined, { baseURL: '/' })

// 表单历史版本
export const getFormHistory = (params: any) => http.get('form/history', params, undefined, { baseURL: '/' })

// 回滚表单
export const rollbackForm = (params: any) => http.get('form/rollback', params, undefined, { baseURL: '/' })

// 获取标签列表
export const tagList = (params: any) => http.get('config/tags', params, undefined, { baseURL: '/' })
// 获取数据库列表
export const libraries = (params: any) => http.get('config/libraries', params, undefined, { baseURL: '/' })
// 脚本下拉
export const getScriptSelect = (params?: any) => http.get('form/scriptSelect', params, undefined, { baseURL: '/' })
// 脚本详情
export const getScriptDetail = (params?: any) => http.get('form/scriptDetail', params, undefined, { baseURL: '/' })
// 脚本测试
export const scriptTest = (params?: any) => http.post('form/scriptTest', params, undefined, { baseURL: '/' })
