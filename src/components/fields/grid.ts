
export default {
  title: '网格布局',
  name: 'grid',
  description: '网格布局',
  category: 'container',
  available: true,
  group: 'container',
  icon: 'grid.png',
  version: 1,
  schema: {
    type: 'object',
    title: '网格布局',
    properties: {
      type: {
        type: 'string',
        default: 'grid',
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
          cols: {
            type: 'array',
            title: '内部网格宽度占比',
            description: '',
            'x-rules': [
              { required: true }
            ],
            items: {
              type: 'number',
              default: 8,
              'x-component-props': {
                placeholder: '请输入',
                min: 0,
                max: 24
              },
              'x-rules': [
                { required: true },
                { format: 'integer', message: '只能是小于24的正整数' }
              ]
            }
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
