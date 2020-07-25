import { IFormState, IFieldState } from '@formily/antd'

export default {
  key: '_expand.x-component-props.baseConfig.formatOptions',
  effect: ($: any, { setFieldState, getFieldState } :IFormState, fieldState: IFieldState) => {
    getFieldState('_expand.x-component-props.baseConfig.formatOptions').then((enumFieldState: IFieldState) => {
      setFieldState('_expand.x-component-props.baseConfig.format', (state: IFieldState) => {
        if (fieldState.value === 'custom') {
          state.editable = true
        } else {
          state.editable = false
          state.value = fieldState.value
        }
      })
    })
  }
}
