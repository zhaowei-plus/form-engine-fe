
export default {
  name: 'card',
  title: '卡片',
  description: '卡片',
  category: 'container',
  group: 'container',
  icon: 'card.png',
  available: true,
  version: 1,
  schema: {
    type: 'object',
    title: '卡片',
    properties: {
      type: {
        type: 'string',
        default: 'block',
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
            type: 'string',
            title: '标题',
            description: ''
          }
        }
      }
    }

  },
  effects: [
  ]
}
