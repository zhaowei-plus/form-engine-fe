import input from './input'
import cloneDeep from 'lodash/cloneDeep'
import uploadEffect from './effects/upload'

const config = {
  ...cloneDeep(input),
  title: '图片/附件',
  name: 'upload',
  description: '图片/附件',
  version: 1,
  group: 'file',
  icon: 'upload.png'
}
config.schema.properties.type.default = 'upload'
config.schema.properties._expand.properties['x-component-props'].properties.baseConfig.properties = {
  action: {
    type: 'string',
    title: '上传地址',
    'x-rules': [
      { required: true }
    ]
  },
  listType: {
    type: 'string',
    title: '列表样式',
    default: 'text',
    enum: [
      { label: '按钮', value: 'text' },
      { label: '卡片', value: 'card' },
      { label: '拖拽', value: 'dragger' }
    ]
  },
  maxSize: {
    type: 'number',
    title: '单个文件大小限制',
    description: '单位M，0为不限制',
    default: 0,
    'x-rules': [
      { format: 'integer', message: '需为整数' }
    ],
    'x-component-props': {
      min: 0,
      max: 100
    }
  },
  maxCount: {
    type: 'number',
    title: '上传个数上限',
    description: '0为不限制',
    default: 0,
    'x-rules': [
      { format: 'integer', message: '需为整数' }
    ],
    'x-component-props': {
      min: 0,
      max: 100
    }
  },
  beforeUpload: {
    type: 'js',
    display: false
  }
}

// 这里有自定义的限制文件大小及文件数目的验证逻辑，标注为需编译属性
config.schema.properties['x-babel-props'] = {
  type: 'array',
  display: false,
  default: ['.x-component-props.beforeUpload']
}

config.effects.push(...uploadEffect)
export default config
