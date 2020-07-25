import input from './input'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(input),
  title: '多行文本',
  name: 'textarea',
  description: '多行文本',
  version: 1,
  group: 'input',
  icon: 'textarea.png'
}
config.schema.properties.type.default = 'textarea'
config.schema.properties._expand.properties['x-component-props'].properties.baseConfig.properties.rows = {
  type: 'number',
  default: 5,
  title: '行数',
  'x-rules': [
    { format: 'integer', message: '需为正整数' }
  ],
  'x-component-props': {
    min: 1,
    max: 100
  }
}

export default config
