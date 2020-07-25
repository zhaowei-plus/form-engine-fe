import formatRule from './format-rule'

export default {
  type: 'array',
  title: '校验规则',
  maxItems: 5,
  items: {
    type: 'object',
    properties: {
      ruleType: {
        type: 'string',
        default: 'required',
        title: '规则类型',
        // visible: false,
        enum: [
          { label: '必填', value: 'required' },
          { label: '内置验证', value: 'format' },
          { label: '正则验证', value: 'pattern' },
          { label: '自定义方法', value: 'validator' }
        ]
      },
      required: {
        type: 'boolean',
        title: '必填',
        default: true,
        display: false,
        visible: true
      },
      format: {
        type: 'string',
        title: '内置验证',
        enum: formatRule,
        visible: true,
        required: true
      },
      pattern: {
        type: 'string',
        title: '正则验证',
        visible: true,
        required: true
      },
      validator: {
        type: 'js',
        title: '{{validatorFunTitle}}',
        visible: true,
        required: true
      },
      message: {
        type: 'string',
        title: '错误提示语'
      }
    }
  }
}
