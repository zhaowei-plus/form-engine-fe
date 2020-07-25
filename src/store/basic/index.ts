interface IAction {
  type: string
  payload: any
}

export const initialState = {
  title: '',
  id: '',
  formKey: '',
  formDesc: '',
  tags: []
}

export default (state: any = initialState, { type, payload }: IAction) => {
  switch (type) {
    case 'CHANGE_BASIC': {
      const { type, linked, ..._payload } = payload
      return { ..._payload }
    }
    default:
      return state
  }
}
