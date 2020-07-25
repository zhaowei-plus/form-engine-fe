import React, { useEffect, useState } from 'react'
import { Button, Table, message, Modal } from 'antd'
import { withRouter } from 'react-router-dom'
import PublishModal from '@/components/publish-modal'
import {
  INITIALBASIC,
  PAGESIZE
} from './constants'

import Search from './components/search'

import {
  getSchema,
  getColumns,
  getPagination
} from './config'

import './index.less'
import {
  getList,
  deleteForm
} from '@/assets/service'

interface IProps {
  history: any
}

type listParams = {
  title?: string,
  tags?: string[],
  page?: number,
  size?: number
}

const List = (props: IProps) => {
  const { history } = props

  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [basic, setBasic] = useState(INITIALBASIC)

  const [visible, setVisible] = useState(false)
  const [dataSource, setDataSource] = useState([])

  const fetchList = async (params?: listParams) => {
    const newParams = { page, size: PAGESIZE, ...params }
    const newPage = params?.page

    const {
      success,
      data
    }: any = await getList(newParams)
    if (success) {
      setDataSource(data?.list || [])

      if (newPage) {
        setPage(newPage)
      }

      setCount(data?.total)
    }
  }

  const onSearch = async (params?: listParams) => {
    fetchList({ ...params, page: 1 })
  }

  useEffect(() => { fetchList() }, [])

  const handleCopy = (id: string, formKey: string) => {
    formKey = formKey ? `/${formKey}` : ''
    history.push(`/form/engine/basic/copy/${id}${formKey}`)
  }

  const handleEdit = (id: string, formKey: string) => {
    formKey = formKey ? `/${formKey}` : ''
    history.push(`/form/engine/basic/edit/${id}${formKey}`)
  }

  const handlePublish = (selected: any) => {
    setBasic(selected)
    setVisible(true)
  }

  const handleDelete = (formId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '你确定要删除当前表单项吗?',
      onOk: async () => {
        const res: any = await deleteForm({ formId })
        if (res.success) {
          message.success('删除成功')
        }
      }
    })
  }

  const handleCreate = () => {
    history.push(`/form/engine/basic/create/`)
  }

  const handlePageChange = (current: any) => {
    fetchList({ page: current })
  }

  const columns = getColumns({
    handleCopy,
    handleEdit,
    handlePublish,
    handleDelete
  })

  const schema = getSchema()

  const pagination = getPagination({
    count,
    current: page,
    handlePageChange
  })

  return (
    <div className='form-list'>
      <Button
        type='primary'
        className='form-list_create'
        onClick={handleCreate}
      >
        创建表单
      </Button>
      <Search
        schema={schema}
        onSearch={onSearch}
      />
      <Table
        rowKey='id'
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
      />
      {
        visible && (
          <PublishModal
            setVisible={(flag: boolean) => setVisible(flag)}
            basic={basic}
          />
        )
      }
    </div>
  )
}

export default withRouter(List)
