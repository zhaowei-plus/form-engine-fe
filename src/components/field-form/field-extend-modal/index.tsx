import React, { useState, useEffect, useMemo } from 'react'
import { Modal, Button } from 'antd'
import { IFormState, IFieldState, IFormActions, createAsyncFormActions, FormButtonGroup, Submit } from '@formily/antd'
import SchemaForm from '@/components/field-form'

import { useSelector, shallowEqual } from 'react-redux'
import { mergeConfig, getSchemaTreeData } from '@/views/engine/utils'
import { getScriptSelect, getScriptDetail, libraries, scriptTest } from '@/assets/service'
import { getMainSchema, getMethodInfoSchema, getSqlInfoSchema } from './schemas'
import './index.less'

export default (props: any) => {
  const { designResult, widgets } = useSelector((state: any) => state, shallowEqual)
  const { fullResult } = mergeConfig(designResult, widgets)
  const fieldCascaderData = getSchemaTreeData(fullResult, { textName: 'label' }).children
  // const [scriptSelect, setScriptSelect] = useState([])
  const [scriptDetail, setScriptDetail] = useState({})
  const [sqlDetail, setSqlDetail] = useState({})
  const mainSchema = getMainSchema(!props?.values?.ruleType, fieldCascaderData, props.extendsPropsSupported, [])
  const _getScriptSelect = async () => {
    const res = await getScriptSelect()
    if (res.success) {
      let arr = ((res.data || []).map((item: any) => ({ label: item.name, value: item.key })))
      return arr
    }
  }

  const getLibrarySelect = async () => {
    const res = await libraries({})
    if (res.success) {
      let arr = ((res?.data?.rows || []).map((item: any) => ({ label: item.name, value: item.id })))
      return arr
    }
  }

  const submitHandle = (values: any) => {
    props.onSave(values)
    props.toggleModal()
  }

  const actions = createAsyncFormActions()

  // 注册关联入参子表单控件
  const useFields = () => {
    return useMemo(() => ({
      methodInfo: ({ value, path, mutators }) => {
        // 接口模式测试方法
        const _actions = createAsyncFormActions()
        const testHandle = async () => {
          const innerState = await _actions.getFormState()
          const testParams = innerState?.values?.testParams
          const res = await scriptTest({
            id: scriptDetail.key,
            type: 1,
            inputParams: testParams
          })
          if (res.success) {
            _actions.setFieldState('layout.methodInfo.outputSample', state => {
              state.value = typeof res === 'object' ? JSON.stringify(res) : res
              window._MICRO_APP_CONFIG.message.success('测试成功')
            })
          }
        }
        const methodInfoSchema = getMethodInfoSchema(scriptDetail, fieldCascaderData, testHandle)
        return <SchemaForm
          className="config-form"
          schema={methodInfoSchema}
          value={{ ...scriptDetail, testParams: value }}
          actions={_actions}
          onChange={(values: any) => { mutators.change(values?.testParams) }}
        />
      },
      sqlInfo: ({ value, path, mutators }) => {
        // TODO 数据库模式测试方法
        const _actions = createAsyncFormActions()
        const testHandle = () => {
          _actions.getFormState(state => {
            console.log(state?.values?.testParams)
            window._MICRO_APP_CONFIG.message.success('测试成功')
          })
        }
        const sqlInfoSchema = getSqlInfoSchema(sqlDetail?.sql, fieldCascaderData, testHandle)
        return <SchemaForm
          className="config-form"
          schema={sqlInfoSchema}
          value={{ ...sqlDetail, testParams: value }}
          actions={_actions}
          onChange={(values: any) => { mutators.change(values?.testParams) }}
        />
      }
    }), [scriptDetail, sqlDetail?.sql])
  }

  const effects = ($: any, { setFieldState, getFieldState }: IFormActions): void => {
    $('onFormInit').subscribe(async (formState: IFormState) => {
      let scriptSelect = await _getScriptSelect()
      let libraySelect = await getLibrarySelect()
      setFieldState('layout.method.methodId', (fieldSate: IFieldState) => {
        fieldSate.props.enum = scriptSelect
      })
      setFieldState('layout.library.libraryId', (fieldSate: IFieldState) => {
        fieldSate.props.enum = libraySelect
      })
    })

    $('onFieldChange', 'ruleType').subscribe((fieldState: IFieldState): void => {
      if (fieldState.value === '1') {
        actions.setFieldState('layout.method', (state: IFieldState) => {
          state.visible = true
        })
        actions.setFieldState('layout.library', (state: IFieldState) => {
          state.visible = false
        })
      } else {
        actions.setFieldState('layout.method', (state: IFieldState) => {
          state.visible = false
        })
        actions.setFieldState('layout.library', (state: IFieldState) => {
          state.visible = true
        })
      }
    })

    $('onFieldValueChange', 'layout.method.methodId').subscribe(async (fieldState: IFieldState) => {
      let methodInfo = {}
      if (fieldState.value) {
        let res = await getScriptDetail({ key: fieldState.value })
        if (res.success) {
          methodInfo = res.data
        }
      }
      setScriptDetail(methodInfo)
    })

    $('onFieldValueChange', 'layout.library.sql').subscribe((fieldState: IFieldState) => {
      setSqlDetail({
        ...sqlDetail,
        sql: fieldState?.value
      })
    })
  }

  return <Modal
    title="扩展规则"
    visible={props.visible}
    footer={null}
    destroyOnClose
    onCancel={props.toggleModal}
    width={640}
    bodyStyle={{
      height: 600,
      overflow: 'auto'
    }}
  >
    <SchemaForm
      schema={mainSchema}
      initialValues={props.value}
      onSubmit={submitHandle}
      actions={actions}
      effects={effects}
      fields={useFields()}
      className="modal-schema-form"
    >
      <FormButtonGroup className="modal-schema-footer" align="center">
        <Submit>保存</Submit>
        <Button onClick={props.toggleModal}>取消</Button>
      </FormButtonGroup>
    </SchemaForm>
  </Modal>
}
