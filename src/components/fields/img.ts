
export default {
  title: '图片展示',
  name: 'img',
  description: '图片展示',
  category: 'block',
  available: true,
  group: 'view',
  icon: 'img.png',
  version: 1,
  schema: {
    type: 'object',
    title: '图片展示',
    properties: {
      type: {
        type: 'string',
        default: 'img',
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
          src: {
            title: '图片地址',
            type: 'string',
            required: true
          }
        }
      }
    }

  },
  effects: [
  ]
}
