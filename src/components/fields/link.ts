
import { IFormState, IFieldState } from '@formily/antd'
export default {
  title: '超链接',
  name: 'link',
  description: '超链接',
  category: 'container',
  available: true,
  group: 'other',
  icon: 'link.png',
  version: 1,
  schema: {
    type: 'object',
    title: '超链接',
    properties: {
      type: {
        type: 'string',
        default: 'link',
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
          href: {
            type: 'string',
            title: '链接地址',
            required: true,
            description: '不以http或https开头的会被解析成相对路径'
          },
          target: {
            type: 'radio',
            title: '打开方式',
            default: '_self',
            enum: [
              { label: '当前页', value: '_self' },
              { label: '新页面', value: '_blank' }
            ]
          }
        }
      }
    }

  },
  effects: [
  ]
}
