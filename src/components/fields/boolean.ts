import input from './input'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(input),
  title: '开关',
  name: 'boolean',
  description: '开关',
  version: 1,
  group: 'act',
  icon: 'switcher.png'
}
config.schema.properties.type.default = 'boolean'
config.schema.properties._expand.properties['x-component-props'].properties.baseConfig.properties = {
  checkedChildren: {
    type: 'string',
    title: '选中时的内容',
    default: '开',
    'x-component-props': {
      maxLength: 500
    }
  },
  unCheckedChildren: {
    type: 'string',
    title: '非选中时的内容',
    default: '关',
    'x-component-props': {
      maxLength: 500
    }
  }
}
export default config
