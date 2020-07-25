import input from './input'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(input),
  title: '颜色选择',
  name: 'color',
  description: '颜色选择',
  version: 1,
  group: 'select',
  icon: 'color.png'
}
config.schema.properties['x-component-props'].properties.type = {
  type: 'string',
  default: 'color',
  display: false
}
config.schema.properties['x-component-props'].properties.placeholder.default = '请选择'

config.schema.properties._expand.properties['x-component-props'].properties.baseConfig.properties = {}
export default config
