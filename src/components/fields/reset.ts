import submit from './submit'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(submit),
  title: '重置按钮',
  name: 'reset',
  description: '重置按钮',
  version: 1,
  available: false,
  group: 'act',
  icon: 'btn.png'
}
config.schema.properties.type.default = 'reset'
config.schema.properties['x-component-props'].properties.children.default = '重置'

export default config
