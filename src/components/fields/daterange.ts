import date from './date'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(date),
  title: '日期区间',
  name: 'daterange',
  description: '日期区间',
  version: 1,
  group: 'select',
  icon: 'daterange.png'
}
config.schema.properties.type.default = 'daterange'
config.schema.properties['x-component-props'].properties.placeholder = {
  title: '提示文字',
  type: 'array',
  default: ['开始日期', '结束日期'],
  minItems: 2,
  maxItems: 2,
  items: {
    type: 'string',
    'x-component-props': {
      maxLength: 500
    }
  }
}
export default config
