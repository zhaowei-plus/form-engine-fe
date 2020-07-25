import radio from './radio'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(radio),
  title: '下拉选择框',
  name: 'select',
  description: '下拉选择框',
  version: 1,
  group: 'select',
  icon: 'select.png'
}
config.schema.properties.type.default = 'string'
config.schema.properties['x-component-props'].properties = {
  placeholder: {
    type: 'string',
    title: '提示文字',
    maxLength: 500,
    default: '请选择'
  }
  // mode: {
  //   type: 'radio',
  //   title: '模式',
  //   enum: [
  //     { label: '单选', value: '' },
  //     { label: '多选', value: 'multiple' },
  //     { label: '标签', value: 'tags' }
  //   ],
  //   default: ''
  // }
}
export default config
