interface IAction {
  type: string
  payload: any
}

const initialState = {
  activeKey: '',
  path: [],
  position: ''
}

export default (state: any = initialState, { type, payload }: IAction) => {
  switch (type) {
    case 'SET_WIDGET_PREPARE': {
      return payload
    }
    default:
      return state
  }
}
