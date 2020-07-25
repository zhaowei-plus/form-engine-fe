import React, { useMemo } from 'react'
import { Modal } from 'antd'
import {
  createFormActions
} from '@formily/antd'
import SchemaForm from '@/components/field-form'

interface IProps {
  onCancel: () => any
  onOk: (value: Array<number>) => any
  dataSource: Array<any>
  value: Array<number>
}

export default (props: IProps) => {
  const { onCancel, dataSource, value = [], onOk } = props

  const actions = useMemo(() =>
    createFormActions(), [])

  const onSubmit = (params: any) => {
    const { tags = [] } = params
    onOk(tags)
  }

  const handleOk = () => {
    actions.submit()
  }

  return (
    <Modal
      visible
      centered
      className='recover-modal'
      title='标签'
      width={550}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <SchemaForm
        actions={actions}
        schema={{
          type: 'object',
          properties: {
            tags: {
              type: 'industry-tags',
              title: '行业标签',
              enum: dataSource,
              default: value,
              editable: true
            }
          }
        }}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
