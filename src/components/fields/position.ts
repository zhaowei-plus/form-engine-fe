import input from './input'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(input),
  title: '地理位置',
  name: 'position',
  description: '地理位置',
  version: 1,
  group: 'other',
  icon: 'map.png'
}
config.schema.properties.type.default = 'position'
config.schema.properties['x-component-props'].properties.placeholder.default = '请选择'

config.schema.properties._expand.properties['x-component-props'].properties.baseConfig.properties = {}
export default config
