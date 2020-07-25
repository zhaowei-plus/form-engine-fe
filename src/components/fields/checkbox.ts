import radio from './radio'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(radio),
  title: '复选框',
  name: 'checkbox',
  description: '复选框',
  version: 1,
  group: 'act',
  icon: 'checkbox.png'
}
config.schema.properties.type.default = 'checkbox'

export default config
