import input from './input'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(input),
  title: '滑块',
  name: 'range',
  description: '滑块',
  version: 1,
  group: 'act',
  icon: 'range.png'
}
config.schema.properties.type.default = 'range'
delete config.schema.properties['x-component-props'].properties.placeholder
config.schema.properties._expand.properties['x-component-props'].properties.baseConfig.properties = {
  min: {
    type: 'number',
    title: '最小值',
    default: 0
  },
  max: {
    type: 'number',
    title: '最大值',
    default: 100
  }
}
export default config
