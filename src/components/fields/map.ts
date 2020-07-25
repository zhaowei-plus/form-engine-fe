
export default {
  title: '地图',
  name: 'map',
  description: '地图',
  category: 'block',
  group: 'other',
  icon: 'map.png',
  available: true,
  version: 1,
  schema: {
    type: 'object',
    title: '地图',
    properties: {
      type: {
        type: 'string',
        default: 'map',
        display: false // display: false会提交该数据，但是不会显示在表单中， visible:false不显示不提交数据
      },
      uuid: {
        type: 'string',
        display: false
      },
      category: {
        type: 'string',
        display: false,
        default: 'block'
      },
      'x-component-props': {
        type: 'object',
        properties: {
          height: {
            type: 'number',
            title: '容器高度',
            default: 400,
            required: true
          },
          center: {
            type: 'position',
            title: '地图中心'
          },
          zoom: {
            type: 'number',
            title: '缩放级别',
            'x-rules': {
              format: 'integer'
            },
            'x-component-props': {
              min: 3,
              max: 18
            }
          },
          markers: {
            type: 'array',
            title: '标记点',
            items: {
              type: 'position',
              required: true
            }
          }
        }
      }
    }

  },
  effects: [
  ]
}
