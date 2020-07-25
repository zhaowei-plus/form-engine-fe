
export default {
  title: '说明文字',
  name: 'text',
  description: '说明文字',
  category: 'block',
  available: true,
  group: 'view',
  icon: 'text.png',
  version: 1,
  schema: {
    type: 'object',
    title: '说明文字',
    properties: {
      type: {
        type: 'string',
        default: 'slot',
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
      babel: {
        title: '是否JSX',
        type: 'boolean',
        default: false,
        display: false
      },
      'x-component-props': {
        type: 'object',
        properties: {
          children: {
            title: '内容',
            type: 'textarea',
            default: '',
            required: true
          }
        }
      }
    }

  },
  effects: [
  ]
}
