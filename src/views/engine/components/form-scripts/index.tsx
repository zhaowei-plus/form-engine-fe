import React, { useState, useMemo, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { IWithRouterProps } from '../../constants'
import GeneralPart from '../general-part'
import { Radio, message, Tree } from 'antd'
import registerFieldList from '@/components/array-modal/field-list-register'
import PublishModal from '@/components/publish-modal'
import { createAsyncFormActions } from '@formily/antd'
import SchemaForm from '@/components/field-form'
import { useSelector, shallowEqual } from 'react-redux'
import { getDefineDraft, updateDefineDraft } from '@/assets/service'
import { getSchemaTreeData } from '../../utils'
import prepareFields from '@/components/field-form/field-prepare'
import './index.less'

prepareFields()
const FormScripts = ({
  history,
  match
}: IWithRouterProps) => {
  const [listType, setListType] = useState('script')
  const [remoteFormConfig, setRemoteFormConfig] = useState({
    simpleDefineList: [],
    fullDefineObj: {
      schema: undefined,
      script: [],
      validation: []
    }
  })

  const [visible, setVisible] = useState(false)
  const basic = useSelector((state: any) => state.basic, shallowEqual)

  // 控件级联列表
  const fieldCascaderData = getSchemaTreeData(remoteFormConfig.fullDefineObj.schema, { textName: 'label' }).children
  const fieldTreeData = getSchemaTreeData(remoteFormConfig.fullDefineObj.schema)

  const listConfig = {
    script: {
      title: '脚本',
      schema: {
        type: 'object',
        properties: {
          layout: {
            type: 'layout',
            'x-props': {
              labelCol: 6,
              wrapperCol: 18
            },
            properties: {
              field: {
                title: '适用控件',
                type: 'cascader',
                'x-component-props': {
                  placeholder: '请选择',
                  options: fieldCascaderData
                }
              },
              description: {
                title: '说明',
                type: 'textarea',
                'x-component-props': {
                  placeholder: '请输入'
                }
              },
              trigger: {
                title: '触发条件',
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    field: {
                      type: 'cascader',
                      'x-component-props': {
                        placeholder: '请选择控件',
                        options: fieldCascaderData
                      }
                    },
                    method: {
                      type: 'string',
                      enum: [
                        { label: 'onChange', value: '11' }
                      ],
                      'x-component-props': {
                        placeholder: '请选择触发方式'
                      }
                    }
                  }
                }
              },
              script: {
                title: '脚本',
                type: 'codeBox',
                fieldCascaderData
              }
            }
          }
        }
      }
    },
    validation: {
      title: '校验规则',
      schema: {
        type: 'object',
        properties: {
          layout: {
            type: 'layout',
            'x-props': {
              labelCol: 6,
              wrapperCol: 18
            },
            properties: {
              description: {
                title: '说明',
                type: 'textarea',
                'x-component-props': {
                  placeholder: '请输入'
                }
              },
              trigger: {
                title: '触发条件',
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    field: {
                      type: 'cascader',
                      'x-component-props': {
                        placeholder: '请选择控件',
                        options: fieldCascaderData
                      }
                    },
                    method: {
                      type: 'string',
                      enum: [
                        { label: 'onChange', value: '11' }
                      ],
                      'x-component-props': {
                        placeholder: '请选择触发方式'
                      }
                    }
                  }
                }
              },
              script: {
                title: '脚本',
                type: 'codeBox',
                fieldCascaderData
              },
              message: {
                title: '校验失败提醒',
                type: 'textarea',
                'x-component-props': {
                  placeholder: '请输入'
                }
              }
            }
          }
        }
      }
    }
  }

  const formAction = createAsyncFormActions()

  const FieldsTree = <div className="modal-field-tree">
    <div className="b" style={{ marginLeft: 28 }}>控件字典</div>
    <Tree treeData={fieldTreeData?.children} selectable={false} defaultExpandAll/>
  </div>
  const useFields = () => {
    const map: any = {}
    Object.entries(listConfig).forEach(([typeName, item]) => {
      map[`${typeName}List`] = registerFieldList({ listName: item.title, schema: item.schema, canDrag: true, modalAddtionElement: FieldsTree })
    })
    return useMemo(() => map, [remoteFormConfig.fullDefineObj.schema])
  }

  const changeList = (values: any) => {
    setRemoteFormConfig({
      ...remoteFormConfig,
      fullDefineObj: {
        ...remoteFormConfig.fullDefineObj,
        [listType]: values.list
      }
    })
  }

  const saveStep3 = () => {
    updateDefineDraft(remoteFormConfig).then((res: any) => {
      if (res.success) {
        message.success('保存成功')
      }
    })
  }

  const handlePublish = () => {
    // console.log(basic)
    setVisible(true)
  }

  useEffect(() => {
    getDefineDraft(match.params.formKey).then(res => {
      if (res.success) {
        setRemoteFormConfig(res.data)
      }
    })
  }, [])

  return (
    <GeneralPart
      history={history}
      match={match}
      current={2}
      save={saveStep3}
      handlePublish={handlePublish}
    >
      <div>
        <div className="tc mb15">
          <Radio.Group buttonStyle="solid" defaultValue="script" onChange={e => { setListType(e.target.value) }}>
            {
              Object.entries(listConfig).map(([typeName, item]) => <Radio.Button style={{ width: 90 }} key={typeName} value={typeName}>{item.title}</Radio.Button>)
            }
          </Radio.Group>
        </div>
        <div style={{ width: 800, margin: 'auto' }}>
          <SchemaForm
            key={listType}
            actions={formAction}
            schema={{
              type: 'object',
              properties: {
                list: {
                  type: `${listType}List`
                }
              }
            }}
            value={{ list: remoteFormConfig?.fullDefineObj[listType] || [] }}
            onChange={changeList}
            fields={useFields()}
          />
        </div>
        {
          visible && (
            <PublishModal
              formId = {match.params.id}
              setVisible={(flag: boolean) => setVisible(flag)}
            />
          )
        }
      </div>

    </GeneralPart>
  )
}
export default withRouter(FormScripts)
