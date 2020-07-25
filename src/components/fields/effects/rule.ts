import { FormPath, IFormState, IFieldState } from '@formily/antd'

export const ruleSourceEffect = {
  key: 'ruleSource.*.ruleType',
  effect: ($: any, { setFieldState, getFieldState } :IFormState, fieldState: IFieldState) => {
    const hide = (name: string) => {
      setFieldState(name, (state: IFieldState) => {
        state.visible = false
      })
    }
    const show = (name: string) => {
      setFieldState(name, (state: IFieldState) => {
        state.visible = true
      })
    }
    ['required', 'format', 'pattern', 'validator'].forEach(item => {
      const currentType = FormPath.transform(
        fieldState.name,
        /\d+/,
        i => `ruleSource.${i}.${item}`
      )
      if (item === fieldState.value) {
        show(currentType)
      } else {
        hide(currentType)
      }
    })

    const currentMsg = FormPath.transform(
      fieldState.name,
      /\d+/,
      i => `ruleSource.${i}.message`
    )
    if (fieldState.value === 'validator') {
      hide(currentMsg)
    } else {
      show(currentMsg)
    }
  }
}

export const ruleEffect = {
  // 从ruleSource同步数据
  key: 'ruleSource',
  effect: ($: any, { setFieldState, getFieldState } :IFormState, fieldState: IFieldState) => {
    setFieldState('x-rules', (state:IFieldState) => {
      state.value = fieldState.value ? fieldState.value.map((item: any) => {
        const { ruleType, ...rule } = item // 去掉不必要的ruleType字段
        return rule
      }) : fieldState.value
    })
  }
}
