import input from './input'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(input),
  title: '数字',
  name: 'number',
  description: '数字',
  version: 1,
  group: 'input',
  icon: 'number.png'
}
config.schema.properties.type.default = 'number'
config.schema.properties._expand.properties['x-component-props'].properties.baseConfig.properties = {
  min: {
    type: 'number',
    title: '最小值'
  },
  max: {
    type: 'number',
    title: '最大值'
  },
  precision: {
    type: 'number',
    title: '数值精度',
    'x-component-props': {
      min: 0,
      max: 100
    }
  },
  step: {
    type: 'number',
    title: '步进数',
    default: 1,
    description: '每次改变步数，可以为小数'
  }
}

export default config
