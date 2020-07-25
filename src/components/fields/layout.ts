
export default {
  title: '表单布局',
  name: 'layout',
  description: '表单布局',
  category: 'container',
  available: true,
  group: 'container',
  icon: 'layout.png',
  version: 1,
  schema: {
    type: 'object',
    title: '表单布局',
    properties: {
      type: {
        type: 'string',
        default: 'layout',
        display: false // display: false会提交该数据，但是不会显示在表单中， visible:false不显示不提交数据
      },
      uuid: {
        type: 'string',
        display: false
      },
      category: {
        type: 'string',
        display: false
      },
      'x-component-props': {
        type: 'object',
        properties: {
          inline: {
            type: 'boolean',
            title: '是否行内排列',
            description: '',
            default: false,
            'x-rules': [
              { required: true }
            ]
          },
          labelCol: {
            type: 'number',
            title: '标签宽度占比',
            description: '',
            default: 4,
            'x-component-props': {
              placeholder: '请输入',
              min: 0,
              max: 24
            },
            'x-rules': [
              { required: true },
              { format: 'integer', message: '只能是小于24的正整数' }
            ]
          },
          wrapperCol: {
            type: 'number',
            title: '内容宽度占比',
            description: '',
            default: 20,
            'x-component-props': {
              placeholder: '请输入',
              min: 0,
              max: 24
            },
            'x-rules': [
              { required: true },
              { format: 'integer', message: '只能是小于24的正整数' }
            ]
          },
          labelTextAlign: {
            type: 'radio',
            title: '标签文本对齐方式',
            enum: [
              { label: '左对齐', value: 'left' },
              { label: '右对齐', value: 'right' }
            ],
            default: 'left'
          }
        }
      }
    }

  },
  effects: [
  ]
}
