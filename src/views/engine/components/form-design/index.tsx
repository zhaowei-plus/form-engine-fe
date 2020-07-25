import React, { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { withRouter } from 'react-router-dom'
import { IWithRouterProps } from '../../constants'
import GeneralPart from '../general-part'
import {
  useSelector,
  useDispatch,
  shallowEqual
} from 'react-redux'
import { fieldsMap } from '@/components/fields'
import { mergeConfig, flatConfig, getSchemaTreeData } from '../../utils'

import Forms from './forms'
import Editor from './editor'
import Config from './config'
import {
  ISchema,
  Schema,
  IForm,
  getRegistry,
  FormPath,
  FormButtonGroup,
  Submit
} from '@formily/antd'
import SchemaForm from '@/components/field-form'
import { createForm } from '@formily/core'

import './index.less'
import {
  getDefineDraft,
  IDraftDetail,
  createDefineDraft,
  updateDefineDraft
} from '@/assets/service'
import { Drawer, message } from 'antd'
// import fieldPrepare from '@/components/field-form/field-prepare'

const registrys = getRegistry() // 获取所有注册的表单控件
// fieldPrepare()

const FormDesign = ({
  history,
  match
}: IWithRouterProps) => {
  const { params, path } = match
  const { formKey } = params
  const { designResult, widgets } = useSelector((state: any) => state, shallowEqual)
  const dispatch = useDispatch()
  const [remoteFormConfig, setRemoteFormConfig] = useState({
    id: formKey,
    simpleDefineList: [],
    fullDefineObj: {
      schema: undefined,
      script: [],
      validation: []
    }
  })
  const [previewInfo, setPreviewInfo] = useState({
    visible: false,
    formSchema: {
      type: 'object'
    }
  })

  /* 获取表单定义草稿详情 */
  const fetchDefineDraft = (formKey: string) => {
    // 异步action
    return dispatch => {
      return getDefineDraft({ formKey }).then((res: IDraftDetail) => {
        if (res.success) {
          setRemoteFormConfig(res.data)
          // 将fullDefine转化为中间的嵌套结构和右边的map结构
          const { resultArray, valueMap } = flatConfig(res.data?.fullDefineObj?.schema?.properties || {})
          // 放入store中
          dispatch({ type: 'SET_WIDGET_LIST', payload: resultArray })
          dispatch({ type: 'SET_ALL_WIDGET', payload: valueMap })
        }
      })
    }
  }

  useEffect(() => {
    if (formKey) {
      dispatch(fetchDefineDraft(formKey))
    }
  }, [])

  /**
   * 向form中递归注册控件
   * @param schema
   * @param form
   * @param parentPath
   */
  const regesterSchemaToForm = (schema: ISchema, form: IForm, parentPath: string, values: any) => {
    const _schema = new Schema(schema)
    let children = _schema?.properties
    for (let i in children) {
      const child: ISchema = new Schema(children[i])
      const fullPath = `${parentPath ? parentPath + '.' : ''}${i}`
      let obj = {
        visible: child.getExtendsVisible(),
        rules: child.getExtendsRules(),
        props: child.getExtendsProps(),
        required: child.getExtendsRequired(),
        editable: child.getExtendsEditable(),
        value: FormPath.getIn(values, fullPath)
      }
      if (registrys.fields[child.type]) {
        const path = `${parentPath ? parentPath + '.' : ''}${i}`
        // field
        const regParam = {
          path,
          ...obj
        }
        form.registerField(regParam)
        regesterSchemaToForm(child, form, path, values)
      } else if (registrys.virtualFields[child.type]) {
        const path = parentPath || ''
        // virtualField
        const regParam = {
          path,
          ...obj
        }
        form.registerVirtualField(regParam)
        regesterSchemaToForm(child, form, path, values)
      } else if (child.properties || child.items) {
        // 类似object这种数据
        const path = `${parentPath ? parentPath + '.' : ''}${i}`
        regesterSchemaToForm(child, form, path, values)
      }
    }
  }

  /**
   * 验证所有控件的设置
   */
  const validAllWidgets = () => {
    const { widgetResultMap } = designResult
    return Promise.all(
      Object.values(widgetResultMap).map((singleConfig: any, index) => {
        const { metaInfo, values } = singleConfig
        const schema: ISchema = fieldsMap[metaInfo.name].schema
        const form = createForm({
          validateFirst: true
        })
        regesterSchemaToForm(schema, form, '', values)
        return form.validate().then(res => {
          return Promise.resolve({
            ...singleConfig,
            res
          })
        }).catch(err => {
          return Promise.reject({ // eslint-disable-line
            ...singleConfig,
            err
          })
        })
      })
    )
  }

  /**
   * 验证后的回调
   * @param callback
   * @param scrollToErrorWidget 是否定位到出错的控件
   */
  const afterValid = (callback: (formResult: any) => void, scrollToErrorWidget = true) => {
    return validAllWidgets().then(() => {
      const formResult = mergeConfig(designResult, widgets)
      return callback(formResult)
    }).catch(err => {
      // 有控件设置验证不通过，需提醒， 切换到控件，并触发验证
      console.log(err)
      if (scrollToErrorWidget) {
        message.error('有控件待完善')
        dispatch({
          type: 'SET_WIDGET_CONFIG',
          payload: err.metaInfo
        })
        return {
          success: false
        }
      }
    })
  }

  /* 保存组件配置 */
  const save = (params: any) => {
    return afterValid(designResult => {
      const { fullResult, simpleResult, scriptKeyList } = designResult
      const saveRequest = remoteFormConfig.id ? updateDefineDraft : createDefineDraft
      return saveRequest({
        formKey,
        ...remoteFormConfig,
        fullDefineObj: {
          ...remoteFormConfig.fullDefineObj,
          schema: fullResult,
          fieldsTreeData: getSchemaTreeData(fullResult, {})
        },
        simpleDefineList: simpleResult,
        scriptKeyList
      }).then((res: any) => {
        if (res.success) {
          message.success('保存成功')
          fetchDefineDraft(formKey)
          return {
            success: true
          }
        }
      })
    })
  }

  const handlePreview = () => {
    return afterValid((formResult) => {
      const { fullResult } = formResult
      setPreviewInfo({
        visible: true,
        formSchema: fullResult
      })
    })
  }

  return (
    <GeneralPart
      history={history}
      match={match}
      current={1}
      save={save}
      handlePreview={handlePreview}
    >
      <>
        <DndProvider backend={HTML5Backend}>
          <div className='form-design'>
            <Forms />
            <Editor />
            <Config />
          </div>
        </DndProvider>
        <Drawer
          title="预览表单"
          width={720}
          getContainer={() => document.body}
          bodyStyle={{
            overflow: 'auto',
            height: `calc(100vh - 55px)`
          }}
          visible={previewInfo.visible}
          onClose={() => {
            setPreviewInfo({
              visible: false,
              formSchema: {
                type: 'object'
              }
            })
          }}
          destroyOnClose
        >
          <SchemaForm schema={previewInfo.formSchema} onSubmit={console.log} wrapperCol={24}>
            <FormButtonGroup sticky align='center'>
              <Submit />
            </FormButtonGroup>
          </SchemaForm>
        </Drawer>
      </>
    </GeneralPart>
  )
}
export default withRouter(FormDesign)
