import input from './input'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(input),
  title: '评分',
  name: 'rating',
  description: '评分',
  version: 1,
  group: 'other',
  icon: 'rating.png'
}
config.schema.properties.type.default = 'rating'
delete config.schema.properties['x-component-props'].properties.placeholder
config.schema.properties._expand.properties['x-component-props'].properties.baseConfig.properties = {
  allowHalf: {
    title: '允许半选',
    type: 'boolean',
    default: false
  },
  count: {
    type: 'number',
    default: 5,
    title: 'star 总数',
    'x-rules': [
      { format: 'integer', message: '需为正整数' }
    ],
    'x-component-props': {
      min: 1,
      max: 100
    }
  }
}
export default config
