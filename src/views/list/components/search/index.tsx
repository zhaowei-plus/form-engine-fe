import React from 'react'
import {
  isPlainObject,
  unset
} from 'lodash'
import {
  Submit,
  Reset
} from '@formily/antd'
import SchemaForm from '@/components/field-form'

import './index.less'

interface IProps {
  schema: any
  onSearch: (params: any) => void
}

export default (props: IProps) => {
  const { schema, onSearch } = props

  const formatPlaceholder = (schema: any) => {
    Object.keys(schema).forEach(key => {
      if (schema[key].type === 'string') {
        const item = schema[key]
        if (!Reflect.has(item, 'x-props')) {
          item['x-props'] = {}
        }

        if (Array.isArray(item.enum)) {
          item['x-props'].placeholder = '请选择'
        } else {
          item['x-props'].placeholder = '请输入'
        }
      }
    })
    return schema
  }

  const cleanObj = (params: any) => {
    const filters = [null, undefined, NaN]
    if (isPlainObject(params)) {
      for (let key in params) {
        if (filters.includes(params[key])) {
          unset(params, key)
        }
      }
    }
    return params
  }

  const onSubmit = (params: any) => {
    onSearch(cleanObj(params))
  }

  return (
    <SchemaForm
      inline
      schema={{
        type: 'object',
        properties: formatPlaceholder(schema)
      }}
      onSubmit={onSubmit}
      onReset={onSubmit}
      className="search"
    >
      <div className="search__footer">
        <Submit>搜索</Submit>
        <Reset>重置</Reset>
      </div>
    </SchemaForm>
  )
}
