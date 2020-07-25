import immer from 'immer'
import { IAction, IWidgetConfigState } from '@/components/field-form/type'

const initialState: IWidgetConfigState = {
  widgetResultMap: { // 控件配置结果，平铺结构，以控件的uid为key
  },
  currentWidgetConfigAction: null
}

export default (state: any = initialState, { type, payload }: IAction) => {
  switch (type) {
    // 添加控件
    case 'SET_ALL_WIDGET': {
      return immer(state, (newState: any) => {
        newState.widgetResultMap = payload
      })
    }
    // 添加控件
    case 'ADD_WIDGET': {
      return immer(state, (newState: any) => {
        newState.widgetResultMap[payload.metaInfo.key] = payload
      })
    }
    // 删除控件
    case 'DELETE_WIDGET': {
      return immer(state, (newState: any) => {
        const { metaInfo: { key, category }, widgets } = payload
        if (category === 'container') {
          /**
           * 容器类的需要递归删除子孙控件
           * @param arr
           * @param key
           * @param unCheck 是否检查key
           */
          const deleteChild = (widgets:[] = [], key: string, unCheck: boolean) => {
            widgets.forEach((item: any) => {
              const _uncheck = unCheck || item.key === key
              if (_uncheck) {
                delete newState.widgetResultMap[item.key]
              }
              deleteChild(item.children, key, _uncheck)
            })
          }
          deleteChild(widgets, key, false)
        } else {
          // 其他类的直接删除
          delete newState.widgetResultMap[key]
        }
      })
    }
    // 修改控件
    case 'UPDATE_WIDGET': {
      return immer(state, (newState: any) => {
        newState.widgetResultMap[payload.metaInfo.key] = { ...newState.widgetResultMap[payload.metaInfo.key], ...payload }
      })
    }
    // 设置当前控件的formAction
    case 'SET_CURRENT_WIDGET_FORM_ACTION': {
      return immer(state, (newState: any) => {
        newState.currentWidgetConfigAction = payload
      })
    }
    default:
      return state
  }
}
