
export default {
  title: '提交按钮',
  name: 'submit',
  description: '提交按钮',
  category: 'block',
  available: false,
  group: 'act',
  icon: 'btn.png',
  version: 1,
  schema: {
    type: 'object',
    title: '提交按钮',
    properties: {
      type: {
        type: 'string',
        default: 'submit',
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
            title: '按钮文本',
            type: 'string',
            default: '提交'
          },
          block: {
            type: 'boolean',
            default: false,
            title: '宽度100%'
          }
        }
      }
    }

  },
  effects: [
  ]
}
