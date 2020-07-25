
export default {
  title: '表格',
  name: 'table',
  description: '表格',
  category: 'container',
  available: false,
  version: 1,
  group: 'view',
  icon: 'table.png',
  schema: {
    type: 'object',
    title: '表格',
    properties: {
      type: {
        type: 'string',
        default: 'array',
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
      'x-component': {
        type: 'string',
        default: 'table',
        display: false
      },
      name: {
        type: 'string',
        title: '字段标识'
      },
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            display: false,
            default: 'object'
          },
          properties: {
            type: 'object',
            properties: {
              // name: {
              //   type: 'object',
              //   properties: {
              //     type: {
              //       type: 'string',
              //       default: 'string'
              //     },
              //     name: {
              //       type: 'string',
              //       title: '标识'
              //     },
              //     title: {
              //       type: 'string',
              //       title: '表头名称'
              //     }
              //   }
              // },
              // sex: {
              //   type: 'object',
              //   properties: {
              //     type: {
              //       type: 'string',
              //       default: 'string'
              //     },
              //     name: {
              //       type: 'string',
              //       title: '标识'
              //     },
              //     title: {
              //       type: 'string',
              //       title: '表头名称'
              //     }
              //   }
              // }
            }
          }
        }
      }
    }
  },
  effects: [
  ]
}
