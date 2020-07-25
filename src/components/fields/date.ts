import input from './input'
import cloneDeep from 'lodash/cloneDeep'
import dateFormatEffects from './effects/date-format'

const config = {
  ...cloneDeep(input),
  title: '日期选择',
  name: 'date',
  description: '日期选择',
  version: 1,
  group: 'select',
  icon: 'date.png'
}
config.schema.properties.type.default = 'date'
config.schema.properties._expand.properties['x-component-props'].properties.baseConfig.properties = {
  showTime: {
    type: 'boolean',
    default: true,
    display: false
  },
  formatOptions: {
    type: 'radio',
    title: '日期格式',
    default: 'YYYY-MM-DD',
    enum: [
      { label: '年-月-日', value: 'YYYY-MM-DD' },
      { label: '年/月/日', value: 'YYYY/MM/DD' },
      { label: '自定义', value: 'custom' }
    ]
  },
  format: {
    type: 'string',
    title: '格式'
  }
}
config.effects.push(dateFormatEffects)
export default config
