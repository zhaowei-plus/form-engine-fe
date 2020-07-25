import { IFormState, IFieldState } from '@formily/antd'

export default {
  key: 'enum.*.label',
  effect: ($: any, { setFieldState, getFieldState } :IFormState, fieldState: IFieldState) => {
    getFieldState('enum').then((enumFieldState: IFieldState) => {
      setFieldState(fieldState.name, (state: IFieldState) => {
        if (enumFieldState.value.filter((x: ({ label: string, value:any })) => x.label && x.label === fieldState.value).length > 1) {
          state.errors = ['不能有重复的选项文本']
        } else {
          state.errors = []
        }
      })
    })
  }
}
