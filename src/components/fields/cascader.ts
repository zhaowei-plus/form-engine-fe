import select from './select'
import cloneDeep from 'lodash/cloneDeep'

const config = {
  ...cloneDeep(select),
  title: '级联选择',
  name: 'cascader',
  description: '级联选择',
  version: 1,
  available: true,
  group: 'select',
  icon: 'cascader.png'
}
config.schema.properties.type.default = 'cascader'

delete config.schema.properties._expand.properties.baseConfig.properties.enum
config.schema.properties._expand.properties.baseConfig.properties['x-component-props'] = {
  type: 'object',
  properties: {
    options: {
      type: 'cascadertree',
      default: [
        {
          label: '1级',
          value: '1级',
          children: [
            {
              label: '2级',
              value: '2级'
            }
          ]
        }
      ],
      'x-rules': [
        {
          required: true
        },
        {
          validator: (val: []) => {
            const checkLabel = (item: any):string => {
              let message = ''
              if (!item.label) {
                message = '选项文本必填'
              } else if (!item.value) {
                message = '选项值必填'
              } else if (item.children) {
                for (let i = 0; i < item.children.length; i++) {
                  const x = item.children[i]
                  if (item.children.filter((y:any) => y.label === x.label).length > 1) {
                    message = '同级的选项文本不能重复'
                    break
                  } else if (item.children.filter((y:any) => y.value === x.value).length > 1) {
                    message = '同级的选项值不能重复'
                    break
                  } else {
                    message = checkLabel(x)
                  }
                }
              }
              return message
            }
            return checkLabel({
              label: '根节点',
              value: '-1',
              children: val
            })
          }
        }
      ]
    },
    changeOnSelect: {
      type: 'boolean',
      title: '允许选择父节点',
      default: false
    }
  }
}

export default config
