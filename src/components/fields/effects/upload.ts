import { IFormState, IFieldState } from '@formily/antd'

const effect = ($: any, { setFieldState, getFieldState } :IFormState, fieldState: IFieldState) => {
  Promise.all([
    getFieldState('_expand.x-component-props.baseConfig.maxSize'),
    getFieldState('_expand.x-component-props.baseConfig.maxCount')
  ]).then(([maxSizeState, maxCountState]) => {
    setFieldState('_expand.x-component-props.baseConfig.beforeUpload', (state: IFieldState) => {
      const maxSize = maxSizeState.value
      const maxCount = maxCountState.value
      state.value = `(file, fileList) => {
        if (${maxCount} > 0 && fileList.length > ${maxCount}) {
          const str = \`最多只能上传${maxCount}个文件\`
          _MICRO_APP_CONFIG.message.error(str)
          return Promise.reject(str)
        }
        if (${maxSize} > 0 && file.size > ${maxSize} * 1024 * 1024) {
          const str = \`文件大小需${maxSize}M以下\`
          _MICRO_APP_CONFIG.message.error(str)
          return Promise.reject(str)
        }
        return true
      }`
    })
  })
}

export default [
  {
    key: '_expand.x-component-props.baseConfig.maxSize',
    effect
  },
  {
    key: '_expand.x-component-props.baseConfig.maxCount',
    effect
  }
]
