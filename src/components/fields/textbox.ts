
export default {
  title: '文本化串联组件',
  name: 'textbox',
  description: '文本化串联组件',
  category: 'container',
  available: false,
  group: 'input',
  icon: 'input.png',
  version: 1,
  schema: {
    type: 'object',
    title: '文本化串联组件',
    properties: {
      type: {
        type: 'string',
        default: 'textbox',
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
          title: {
            type: 'string'
          },
          text: {
            type: 'string'
          },
          gutter: {
            type: 'number',
            title: '列间距（像素）',
            description: '',
            'x-component-props': {
              placeholder: '请输入'
            },
            default: 0
          }
        }
      }
    }

  },
  effects: [
  ]
}
