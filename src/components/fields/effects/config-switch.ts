import { IFormState, IFieldState } from '@formily/antd'

export default {
  key: '_expand.baseOrExpand',
  effect: ($: any, { setFieldState, getFieldState } :IFormState, fieldState: IFieldState) => {
    getFieldState('_expand.baseOrExpand').then((enumFieldState: IFieldState) => {
      if (enumFieldState.value === '1') {
        // _expand x-component-props 下的基础设置/扩展设置
        setFieldState('_expand.x-component-props.baseConfig', (state: IFieldState) => {
          state.visible = true
        })
        setFieldState('_expand.x-component-props.expandConfig', (state: IFieldState) => {
          state.visible = false
        })

        // _expand 下的基础设置/扩展设置
        setFieldState('_expand.baseConfig', (state: IFieldState) => {
          state.visible = true
        })
        setFieldState('_expand.expandConfig', (state: IFieldState) => {
          state.visible = false
        })
      } else {
        // _expand x-component-props 下的基础设置/扩展设置
        setFieldState('_expand.x-component-props.baseConfig', (state: IFieldState) => {
          state.visible = false
        })
        setFieldState('_expand.x-component-props.expandConfig', (state: IFieldState) => {
          state.visible = true
        })

        //  _expand下的基础设置/扩展设置
        setFieldState('_expand.baseConfig', (state: IFieldState) => {
          state.visible = false
        })
        setFieldState('_expand.expandConfig', (state: IFieldState) => {
          state.visible = true
        })
      }
    })
  }
}
