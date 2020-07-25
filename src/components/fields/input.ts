
import { ruleSourceEffect, ruleEffect } from './effects/rule'
import configSwitchEffect from './effects/config-switch'
import ruleSchema from './common/common-rule'
import { ISchema, IFormEffect } from '@formily/antd'

export interface IFieldConfig {
  title: string, // 控件中文名
  name: string, // 控件英文名
  description? :string, // 控件描述
  category: string, // 控件分类
  available: boolean, // 控件是否可用
  version: number, // 控件版本
  schema: ISchema, // 控件信息
  effects? : IFormEffect [] // 控件信息配置effect
}

export default {
  title: '单行文本',
  name: 'string',
  description: '单行文本输入框',
  category: 'input',
  available: true,
  group: 'input',
  icon: 'input.png',
  version: 1,
  schema: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        default: 'string',
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
          placeholder: {
            type: 'string',
            title: '提示文字',
            maxLength: 500,
            default: '请输入'
          },
          autoComplete: {
            type: 'string',
            default: 'new-password',
            display: false
          }
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
          'x-component-props': {
            type: 'object',
            properties: {
              baseConfig: {
                type: 'block',
                properties: {
                  maxLength: {
                    type: 'number',
                    title: '文本最大长度',
                    'x-component-props': {
                      min: 1,
                      max: 500
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
