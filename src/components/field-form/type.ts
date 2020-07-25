import { ISchemaFormAsyncActions, ISchema } from '@formily/antd'

export interface IAction {
  type: string
  payload: any
}
export interface IWidgetConfig {
  metaInfo: object,
  values: ISchema
}

export interface IWidgetConfigState {
  widgetResultMap: {
    [key: string] : IWidgetConfig
  },
  currentWidgetConfigAction: ISchemaFormAsyncActions | null
}
