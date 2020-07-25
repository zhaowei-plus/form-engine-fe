import React, { useMemo, useState, useEffect } from 'react'
import { Modal, Button, Radio, Pagination, message, Empty } from 'antd'
import { withRouter } from 'react-router-dom'
import {
  createFormActions,
  SchemaForm
} from '@formily/antd'

import './index.less'
import './forms'
import {
  getFormHistory,
  rollbackForm
} from '@/assets/service'
import { PAGESIZE } from '@/views/list/constants'

interface IProps {
  onCancel: () => any
  formKey: string
  history: any
}

interface IVersion {
  id: string | number
  version: string
  remark: string
}

const actions = createFormActions()
const initialSelect = {
  recordId: '',
  remark: '-',
  version: ''
}

const RecoverModal = (props: IProps) => {
  const { onCancel, formKey, history } = props
  const [versions, setVersions] = useState([])
  const [count, setCount] = useState(0)
  const [select, setSelect] = useState(initialSelect)

  /* 获取历史版本 */
  const fetchFormHistory = async (page: number) => {
    const {
      success,
      data
    }: any = await getFormHistory({
      formKey,
      page,
      size: PAGESIZE
    })
    if (success) {
      const { list, total } = data
      setVersions(list)
      setCount(total)
      return list[0]
    }
  }

  /* 回滚表单 */
  const dispatchRollback = async () => {
    const {
      success
    }: any = await rollbackForm({ recordId: select.recordId })
    if (success) {
      message.success('恢复版本成功！')
      history.push('/form/list')
    }
  }

  const dispatchSelect = (select: any) => {
    if (select) {
      setSelect({ ...select, recordId: select.id })
    } else {
      setSelect(initialSelect)
    }
  }

  useEffect(() => {
    fetchFormHistory(1)
      .then((select: any) => {
        dispatchSelect(select)
      })
  }, [])

  const handleChange = ({ version: recordId }: any) => {
    const select: any = versions.find((version: IVersion) => version.id === recordId)
    dispatchSelect(select)
  }

  const onPageChange = (page: any) => {
    fetchFormHistory(page)
  }

  const handleOk = () => {
    Modal.confirm({
      centered: true,
      title: `确认要恢复到V${select.version}版本内容吗？`,
      content: '恢复后，现有编辑内容将被覆盖，发布后将会生成新版本',
      onOk: () => {
        dispatchRollback()
      }
    })
  }

  const isEmpty = versions.length === 0
  return (
    <Modal
      visible
      centered
      className='recover-modal'
      title='请选择恢复到的版本'
      onCancel={onCancel}
      width={630}
      footer={(
        <>
          <span
            className='fl'
            style={{
              marginLeft: '8px'
            }}
          >
            <span className='selected'>已选择：</span>
            {select.version ? `V${select.version}` : '-'}
          </span>
          <Button
            onClick={onCancel}
          >
            取消
          </Button>
          <Button
            type='primary'
            onClick={handleOk}
            disabled={isEmpty}
          >
            确定
          </Button>
        </>
      )}
    >
      {
        isEmpty
          ? <Empty />
          : (
            <>
              <SchemaForm
                actions={actions}
                schema={{
                  type: 'object',
                  properties: {
                    version: {
                      type: 'versions',
                      enum: versions
                    }
                  }
                }}
                value={{
                  version: select.recordId
                }}
                onChange={handleChange}
              />
              <Pagination
                showQuickJumper
                hideOnSinglePage
                showLessItems
                className='tr'
                total={count}
                pageSize={PAGESIZE}
                onChange={onPageChange}
              />
            </>
          )
      }
    </Modal>
  )
}

export default withRouter(RecoverModal)
