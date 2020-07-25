
export default {
  name: 'block',
  title: '区块容器',
  description: '区块容器',
  category: 'container',
  group: 'container',
  icon: 'block.png',
  available: false,
  version: 1,
  schema: {
    type: 'object',
    title: '区块容器',
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
