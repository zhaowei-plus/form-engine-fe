import input from './input'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(input),
  title: '密码',
  name: 'password',
  description: '密码',
  version: 1,
  group: 'input',
  icon: 'password.png'
}
config.schema.properties.type.default = 'password'

export default config
