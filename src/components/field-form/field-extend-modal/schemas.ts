/**
 * 适配结果
 * @param extendsPropsSupported 当前控件支持扩展的属性，从x-field-extend-props中取得
 * @param contextParams 控件设置表达式时的上下文变量数组
 * @param fieldCascaderData 控件设置表达式时的控件列表
 */
const getAdapterSchema = (extendsPropsSupported = [], contextParams = [], fieldCascaderData = []) => {
  let obj = {}
  extendsPropsSupported.forEach(item => {
    obj[item.path] = {
      type: 'codeExpression',
      title: item.label,
      'x-expression': {
        contextParams,
        fieldCascaderData
      }
    }
  })
  return obj
}

// 主弹窗schema
export const getMainSchema = (ruleTypeEditable = true, fieldCascaderData = [], extendsPropsSupported = [], contextParams = []) => {
  return {
    type: 'object',
    properties: {
      layout: {
        type: 'layout',
        'x-component-props': {
          labelCol: 4,
          wrapperCol: 20
        },
        properties: {
          ruleType: {
            title: '扩展规则',
            type: 'radio',
            editable: ruleTypeEditable,
            default: '1',
            enum: [
              { label: '接口模式', value: '1' },
              { label: '数据库模式', value: '2' }
            ]
          },
          description: {
            type: 'textarea',
            title: '规则说明',
            'x-component-props': {
              placeholder: '请输入'
            }
          },
          trigger: {
            type: 'array',
            title: '触发条件',
            items: {
              type: 'object',
              properties: {
                grid: {
                  type: 'grid',
                  'x-component-props': {
                    cols: [12, 12],
                    gutter: 10
                  },
                  properties: {
                    field: {
                      type: 'cascader',
                      'x-component-props': {
                        placeholder: '请选择控件',
                        options: fieldCascaderData
                      },
                      required: true
                    },
                    triggerMethod: {
                      type: 'string',
                      'x-component-props': {
                        placeholder: '请选择触发方式'
                      },
                      enum: ['onFieldMount', 'onFieldChange'],
                      required: true
                    }
                  }
                }
              }
            }
          },
          method: {
            type: 'block',
            properties: {
              methodId: {
                title: '选择方法',
                type: 'string',
                enum: [],
                required: true
              },
              inputAdapter: {
                type: 'methodInfo'
              }
            }
          },
          library: {
            type: 'object',
            properties: {
              libraryId: {
                title: '选择库',
                type: 'string',
                enum: [
                  {
                    label: 'xxxx1',
                    value: '1'
                  },
                  {
                    label: 'xxxx2',
                    value: '2'
                  }
                ],
                required: true
              },
              sql: {
                type: 'textarea',
                title: 'sql语句',
                description: '入参请使用$$开头',
                'x-component-props': {
                  rows: 5
                },
                required: true
              },
              inputAdapter: {
                type: 'sqlInfo'
              }
            }
          },
          resultAdapter: {
            type: 'object',
            properties: {
              adaptMethod: {
                title: '适配规则',
                type: 'string',
                enum: [
                  { label: '适配方法1', value: '1' },
                  { label: '适配方法2', value: '2' }
                ]
              },
              resultAdapterLayout: {
                type: 'layout',
                'x-component-props': {
                  labelAlign: 'left',
                  labelCol: { span: 4, offset: 4 },
                  wrapperCol: 16
                },
                properties: {
                  outputAdapter: {
                    type: 'object',
                    properties: getAdapterSchema(extendsPropsSupported, contextParams, fieldCascaderData)
                  }
                }
              }
            }

          }
        }
      }
    }
  }
}

// 展示方法详细信息的schema
export const getMethodInfoSchema = (scriptDetail: any, fieldCascaderData = [], testHandle: any) => {
  let testProperties = {}
  if (scriptDetail?.inputParamSequence) {
    const inputParams = (scriptDetail?.inputParamSequence).split(',')
    if (inputParams.length > 0) {
      inputParams.forEach((item: string) => {
        testProperties[item] = {
          title: item,
          type: 'codeExpression',
          'x-expression': {
            fieldCascaderData
          }
        }
      })
    }
  }

  testProperties.testBtn = {
    type: 'btn',
    'x-component-props': {
      children: '测试',
      style: { marginLeft: '33%' },
      onClick: testHandle
    }
  }
  return {
    type: 'object',
    properties: {
      layout: {
        type: 'layout',
        'x-component-props': {
          labelCol: 4,
          wrapperCol: 20
        },
        properties: {
          methodInfo: {
            type: 'block',
            title: '方法说明',
            'x-component-props': {
              className: 'no-padding-card'
            },
            properties: {
              description: {
                title: '说明',
                editable: false,
                type: 'string'
              },
              inputSample: {
                title: '入参',
                type: 'string',
                'x-component-props': {
                  readOnly: true
                }
              },
              layout: {
                type: 'layout',
                'x-component-props': {
                  labelAlign: 'left',
                  labelCol: { span: 4, offset: 4 },
                  wrapperCol: 16
                },
                properties: {
                  testParams: {
                    type: 'object',
                    properties: testProperties
                  }
                }
              },
              outputSample: {
                title: '返回',
                editable: false,
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
}
// 展示方法详细信息的schema
export const getSqlInfoSchema = (sql: string = '', fieldCascaderData = [], testHandle: any) => {
  let testProperties = {}
  if (sql) {
    const inputParams = sql.match(/(?<=\$\$)\S*\b/g)
    if (inputParams?.length > 0) {
      inputParams.forEach((item: string) => {
        testProperties[item] = {
          title: item,
          type: 'codeExpression',
          'x-expression': {
            fieldCascaderData
          }
        }
      })
    }
  }

  testProperties.testBtn = {
    type: 'btn',
    'x-component-props': {
      children: '测试',
      style: { marginLeft: '33%' },
      onClick: testHandle
    }
  }
  return {
    type: 'object',
    properties: {
      layout: {
        type: 'layout',
        'x-component-props': {
          labelCol: 4,
          wrapperCol: 20
        },
        properties: {
          sqlInfo: {
            type: 'block',
            title: '方法说明',
            'x-component-props': {
              className: 'no-padding-card'
            },
            properties: {
              layout: {
                type: 'layout',
                'x-component-props': {
                  labelAlign: 'left',
                  labelCol: { span: 4, offset: 4 },
                  wrapperCol: 16
                },
                properties: {
                  testParams: {
                    type: 'object',
                    properties: testProperties
                  }
                }
              },
              outputSample: {
                title: '返回',
                editable: false,
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
}
