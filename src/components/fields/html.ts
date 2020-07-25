
export default {
  title: 'html',
  name: 'html',
  description: 'html',
  category: 'block',
  available: true,
  group: 'other',
  icon: 'html.png',
  version: 1,
  schema: {
    type: 'object',
    title: 'html',
    properties: {
      type: {
        type: 'string',
        default: 'html',
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
          children: {
            title: '内容',
            type: 'xml',
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
