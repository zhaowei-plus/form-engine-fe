
import { ruleSourceEffect, ruleEffect } from './effects/rule'
import configSwitchEffect from './effects/config-switch'
import ruleSchema from './common/common-rule'
import expandschema from './common/expand-config-schema'

export default {
  title: '单选框',
  name: 'radio',
  description: '单选框',
  category: 'input',
  available: true,
  version: 1,
  group: 'act',
  icon: 'radio.png',
  schema: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        default: 'radio',
        display: false // display: false会提交该数据，但是不会显示在表单中， visible:false不显示不提交数据
      },
      uuid: {
        type: 'string',
        display: false
      },
      category: {
        type: 'string',
        display: false
      },
      title: {
        type: 'string',
        title: '显示名称',
        description: '',
        maxLength: 500,
        'x-component-props': {
          placeholder: '请输入'
        },
        'x-rules': [
          { required: true }
        ]
      },
      name: {
        type: 'string',
        title: '字段标识',
        description: '',
        maxLength: 500,
        'x-component-props': {
          placeholder: '请输入'
        },
        'x-rules': [
          { required: true }
        ]
      },
      _canIndexLayout: {
        type: 'layout',
        'x-props': {
          labelCol: 8,
          wrapperCol: 16
        },
        properties: {
          canIndex: {
            type: 'boolean',
            title: '允许索引',
            default: false,
            description: '是否可被搜索'
          }
        }
      },
      'x-component-props': {
        type: 'object',
        properties: {

        },
        additionalProperties: {
          type: 'string'
        }
      },
      ruleSource: ruleSchema,
      'x-babel-props': {
        type: 'array',
        display: false,
        default: ['x-rules.*.validator']
      },
      'x-rules': {
        type: 'array',
        display: false
      },
      _expand: {
        title: '扩展设置',
        type: 'block',
        'x-component-props': {
          className: 'no-padding-card'
        },
        properties: {
          _expandTitle: {
            type: 'slot',
            babel: true,
            'x-component-props': {
              children: '<div className="config-expand-line">扩展设置</div>'
            }
          },
          baseOrExpand: {
            type: 'radio',
            default: '1',
            enum: [
              { label: '基础版', value: '1' },
              { label: '扩展版', value: '2' }
            ]
          },

          baseConfig: {
            type: 'block',
            'x-component-props': {
              className: 'no-padding-card'
            },
            properties: {
              enum: {
                type: 'array',
                title: '选择项',
                minItems: 1,
                default: [
                  { label: '选项1', value: '选项1' },
                  { label: '选项2', value: '选项2' },
                  { label: '选项3', value: '选项3' }
                ],
                // 'x-component': 'table',
                items: {
                  type: 'object',
                  properties: {
                    label: {
                      type: 'string',
                      title: '选项文本',
                      maxLength: 500,
                      required: true
                    },
                    value: {
                      type: 'string',
                      title: '选项值',
                      maxLength: 500,
                      required: true
                    }
                  }

                }
              }
            }
          },
          expandConfig: {
            type: 'extendArray',
            title: '扩展规则',
            'x-field-extend-props': [
              {
                label: '控件值',
                path: 'value'
              },
              {
                label: '选项',
                path: 'enum'
              }
            ]
          }
        }
      }
    }
  },
  effects: [
    ruleSourceEffect,
    ruleEffect,
    configSwitchEffect
  ]
}
