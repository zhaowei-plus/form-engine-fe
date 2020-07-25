import React, { useState, useEffect } from 'react'
import {
  Modal,
  message,
  Spin
} from 'antd'
import {
  SchemaForm,
  createFormActions
} from '@formily/antd'
import { withRouter } from 'react-router-dom'
import './index.less'
import { getDetail, releaseForm } from '@/assets/service'
import { getSchema } from './config'

interface IProps {
  setVisible: (flag: boolean) => void
  history: any
  basic: any
  formId: number
}

const actions = createFormActions()
const PublishModal = ({
  setVisible,
  history,
  formId
}: IProps) => {
  // 发布检查状态
  const [loading, setLoading] = useState(false)
  const [formBasic, setFormBasic] = useState({ formKey: '' })

  /* 获取表单定义相关信息 */
  const fetchDetail = async (formId: number) => {
    const res: any = await getDetail(formId)
    if (res.success) {
      const { type, linked, ...data } = res.data
      // console.log(data)
      setFormBasic(data)
    }
  }

  /* 发布 */
  const handlePublish = async () => {
    setLoading(true)
    const { formKey } = formBasic
    if (!formKey) {
      message.error('还没有创建表单')
      setLoading(false)
      return
    }

    const { values } = await actions.submit()
    const { versionDesc } = values
    const {
      success,
      msg
    }: any = await releaseForm({ formKey, versionDesc })

    if (success) {
      setLoading(false)
      setVisible(false)

      message.success('发布成功！')
      history.push('/form/list')
    } else {
      setLoading(false)
      message.error(msg)
    }
  }

  const schema = getSchema()

  useEffect(() => {
    fetchDetail(formId)
  }, [])

  return (
    <Modal
      visible
      centered
      title='发布单'
      className='form-modal publish-modal'
      onCancel={() => {
        setVisible(false)
      }}
      onOk={handlePublish}
      okButtonProps={{
        loading
      }}
    >
      {
        loading && (
          <Spin
            tip='发布走查中…'
            className='spin'
          />
        )
      }
      <SchemaForm
        labelCol={4}
        wrapperCol={20}
        schema={{
          type: 'object',
          properties: schema
        }}
        initialValues={formBasic}
        actions={actions}
      />
    </Modal>
  )
}

export default withRouter(PublishModal)
