import React, { useState, useEffect } from 'react'
import './index.less'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  IWithRouterProps
} from '../../constants'
import {
  ACTIONTYPES,
  INITIALBASIC
} from '@/views/list/constants'
import GeneralPart from '../general-part'
import './forms'

import {
  IFormSubmitResult,
  createFormActions
} from '@formily/antd'
import SchemaForm from '@/components/field-form'

import {
  getSchema
} from './config'
import {
  getDetail,
  updateForm,
  ICreateParams,
  IUpdateParams,
  check,
  createForm,
  copyForm
} from '@/assets/service'
import {
  message
} from 'antd'

const actions = createFormActions()
const BasicInfo = ({
  history,
  match
}: IWithRouterProps) => {
  const dispatch = useDispatch()
  const { params, path } = match
  const { type, id, formKey } = params
  const [schema, setSchema] = useState({})
  const [basic, setBasic] = useState(INITIALBASIC)

  /* 获取表单定义相关信息 */
  const fetchDetail = async (formId: number) => {
    const res: any = await getDetail({ formId })
    if (res.success) {
      const { linked, ...data } = res.data
      if (type === ACTIONTYPES.COPY) {
        data.formKey = data.formKey + '_copy'
      }
      setBasic(data)
    }
  }

  /* 更新表单定义 */
  const dispatchUpdate = async (params: ICreateParams, isNext?: boolean) => {
    const { formKey, ..._params } = params
    // const checkRel = await check(formKey)
    // if (!(checkRel.success && checkRel.data)) {
    //   message.error('表单key已存在')
    //   return
    // }
    const res: any = await updateForm({ id, ..._params })
    if (res.success) {
      setBasic({
        id,
        ...params
      })
      message.success('保存成功')
      return { success: true }
    }
    return { success: false }
  }

  /* 创建表单 */
  const dispatchCreate = async (params: ICreateParams, isNext?: boolean) => {
    const { formKey } = params
    const checkRel = await check({ formKey })
    if (!(checkRel.success && checkRel.data)) {
      message.error('表单key已存在')
      return false
    }
    const res: any = await createForm(params)
    if (res.success) {
      const { data: { id } } = res
      if (id && !isNext) {
        history.replace(`/form/engine/basic/edit/${id}/${formKey}`)
      }

      message.success('保存成功！')
      return { success: true, id, formKey }
    }
    return { success: false }
  }

  /* TODO 复制表单 */
  const dispatchCopy = async (params: ICreateParams, isNext?: boolean) => {
    const { formKey: editFormKey } = params
    const checkRel = await check({ formKey: editFormKey })
    if (!(checkRel.success && checkRel.data)) {
      message.error('表单key已存在')
      return false
    }

    const res: any = await copyForm({ ...params, targetFormKey: formKey })
    if (res.success) {
      const { data: { id } } = res
      if (!isNext) {
        history.replace(`/form/engine/basic/edit/${id}/${editFormKey}`)
      }

      message.success('保存成功！')
      return { success: true, id, formKey: editFormKey }
    }
    return { success: false }
  }

  const save = async (isNext?: boolean) => {
    const { values }: IFormSubmitResult = await actions.submit()
    let res: any = { success: false }
    if (type === ACTIONTYPES.CRAETE) {
      res = await dispatchCreate(values, isNext)
    } else if (type === ACTIONTYPES.EDIT && id) {
      res = await dispatchUpdate(values, isNext)
    } else if (type === ACTIONTYPES.COPY) {
      res = await dispatchCopy(values, isNext)
    }
    return res
  }

  useEffect(() => {
    // 获取包括标签列表在内的表单配置
    getSchema({ type: 0, name: '' }).then(res => {
      setSchema(res)
    })
    // 修改时获取表单详情
    if (id) {
      fetchDetail(+id)
    }
  }, [])

  return (
    <GeneralPart
      history={history}
      match={match}
      current={0}
      save={save}
    >
      <div className='form-basic'>
        <SchemaForm
          labelCol={4}
          wrapperCol={20}
          value={basic}
          schema={{
            type: 'object',
            properties: schema
          }}
          actions={actions}
          effects={($, {
            setFieldState
          }) => {
            $('onFormInit').subscribe(() => {
              setFieldState('formKey', state => {
                if (formKey && type !== ACTIONTYPES.COPY) {
                  state.editable = false
                }
              })
            })
          }}
        />
      </div>
    </GeneralPart>
  )
}
export default withRouter(BasicInfo)
