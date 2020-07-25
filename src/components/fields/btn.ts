
export default {
  title: '按钮',
  name: 'btn',
  description: '按钮',
  category: 'block',
  group: 'act',
  icon: 'btn.png',
  available: true,
  version: 1,
  schema: {
    type: 'object',
    title: '按钮',
    properties: {
      type: {
        type: 'string',
        default: 'btn',
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
            default: '确定',
            required: true
          },
          htmlType: {
            type: 'string',
            title: '功能',
            default: 'button',
            enum: [
              { label: '普通', value: 'button' },
              { label: '提交', value: 'submit' },
              { label: '重置', value: 'reset' }
            ]
          },
          type: {
            type: 'string',
            default: 'default',
            title: '样式',
            enum: [
              { label: '普通', value: 'default' },
              { label: '主要', value: 'primary' },
              { label: '虚线', value: 'dashed' },
              { label: '危险', value: 'danger' }
            ]
          },
          ghost: {
            type: 'boolean',
            default: false,
            title: '透明背景'
          },
          shape: {
            type: 'string',
            title: '形状',
            default: '',
            enum: [
              { label: '默认', value: '' },
              { label: '圆形', value: 'circle' },
              { label: '圆角', value: 'round' }
            ]
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
