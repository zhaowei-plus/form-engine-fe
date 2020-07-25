import input from './input'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(input),
  title: 'html代码输入框',
  name: 'xml',
  description: 'html代码输入框',
  version: 1,
  available: false,
  group: 'other',
  icon: 'html.png'
}
config.schema.properties.type.default = 'xml'
// config.schema.properties['x-component-props'].properties = {
//   options: {
//     type: 'object',
//     properties: {
//       mode: {
//         type: 'string',
//         title: '代码语言类型',
//         enum: ['javascript', 'xml'],
//         default: 'javascript'
//       }
//     }
//   }
// }

export default config
