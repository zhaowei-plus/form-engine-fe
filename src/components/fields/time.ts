import date from './date'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(date),
  title: '时间选择',
  name: 'time',
  description: '时间选择',
  version: 1,
  group: 'select',
  icon: 'time.png'
}
config.schema.properties.type.default = 'time'
config.schema.properties._expand.properties['x-component-props'].properties.baseConfig.properties.formatOptions = {
  type: 'radio',
  title: '时间格式',
  default: 'HH:mm:ss',
  enum: [
    { label: '时:分:秒', value: 'HH:mm:ss' },
    { label: '时:分', value: 'HH:mm' },
    { label: '自定义', value: 'custom' }
  ]
}
export default config
