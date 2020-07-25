import React from 'react'
import Operations from '../components/operations'

import {
  formatString
} from '../utils'

import {
  PAGESIZE
} from '../constants'

export interface IOperation {
  label: string,
  func: (id: string, formKey?: string) => void
}

export interface IPagination {
  count: number
  current: number
  handlePageChange: (current: number) => any
}

export const getSchema = () => {
  const labels = [
    { label: '标签1', value: 1 },
    { label: '标签2', value: 2 }
  ]

  return {
    title: {
      type: 'string',
      title: '表单名称'
    },
    tags: {
      type: 'string',
      title: '标签',
      enum: labels,
      'x-props': {
        mode: 'multiple'
      }
    }
  }
}

export const renderOverflow = (text: string, maxWidth: number) => {
  return (
    <span
      className='th1 dib'
      style={{
        maxWidth
      }}
      title={text}
    >
      {text}
    </span>
  )
}

export const getColumns = (actions: any) => {
  // console.log('actions:', actions)
  const {
    handleCopy,
    handleEdit,
    handlePublish,
    handleDelete
  } = actions

  const params: Array<IOperation> = [
    {
      label: '复制',
      func: handleCopy
    },
    {
      label: '编辑',
      func: handleEdit
    },
    {
      label: '发布',
      func: handlePublish
    },
    {
      label: '删除',
      func: handleDelete
    }
  ]

  return [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text: string) => formatString(text)
    },
    {
      title: '表单名称',
      dataIndex: 'title',
      render: (text: string) => formatString(text)
    },
    {
      title: '表单key',
      dataIndex: 'formKey',
      render: (text: string) => formatString(text)
    },
    {
      title: '描述',
      dataIndex: 'formDesc',
      render: (text: string) => text ? renderOverflow(text, 200) : '-'
    },
    {
      title: '标签',
      dataIndex: '5',
      render: (text: string) => formatString(text)
    },
    {
      title: '是否被引用',
      dataIndex: 'linked',
      render: (text: number) => text === 1 ? '是' : '否'
    },
    {
      title: '操作',
      // dataIndex: 'id',
      key: 'operation',
      width: 180,
      align: 'center',
      render: (text: any) => (
        <Operations dataSource={params} selected={text} />
      )
    }
  ]
}

export const getPagination = (params: IPagination) => {
  const {
    count,
    current,
    handlePageChange
  } = params
  return {
    hideOnSinglePage: true,
    showQuickJumper: true,
    current,
    pageSize: PAGESIZE,
    total: count,
    onChange: (current: number) => { handlePageChange(current) }
  }
}
