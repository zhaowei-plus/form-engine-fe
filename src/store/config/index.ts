interface IAction {
  type: string
  payload: any
}

const initialState = {
  // title: '单行文本',
  // schema: {
  //   type: 'string',
  //   title: '单行文本',
  //   'x-props': {
  //     maxlength: 11
  //   },
  //   'x-rules': []
  // },
  category: '-',
  name: '-',
  title: '-',

  // 编辑区域结点新添加的数据信息
  id: '-',
  parent: [],
  key: '-',
  children: false
}

export default (state: any = initialState, { type, payload }: IAction) => {
  switch (type) {
    case 'SET_WIDGET_CONFIG': {
      return {
        ...payload,
        children: Array.isArray(payload.children) && payload.children.length
      }
    }
    case 'RESET_WIDGET_CONFIG': {
      return initialState
    }
    default:
      return state
  }
}
