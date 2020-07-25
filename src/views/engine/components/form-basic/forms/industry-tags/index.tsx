import React, { useState, useEffect } from 'react'
import cs from 'classnames'
import EditModal from './modal/edit-modal'
import { Empty } from 'antd'

import './index.less'

interface IIndustry {
  label: string
  value: number
}

interface IProps {
  disabled: boolean
  change: boolean
  dataSource: Array<IIndustry>
  value: Array<number>

  onChange: (params: any) => any
}

export default (props: IProps) => {
  const { disabled, change, dataSource = [], value = [], onChange } = props
  const [visible, setVisible] = useState(false)

  const handleClick = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((i: number) => i !== id))
    } else {
      onChange([...value, id])
    }
  }

  const handleChange = () => {
    setVisible(true)
  }

  const handleOk = (tags: Array<number>) => {
    onChange(tags)
    setVisible(false)
  }

  if (disabled) {
    const selected = value
      .map((id: number) => dataSource.find((d: IIndustry) => d.value === id))
      .map((d: any) => d.label)

    return (
      <div className="industry-tags">
        <div className="detail">{selected.join('、')}</div>
        {
          !!change && (<a onClick={handleChange}>修改</a>)
        }
        {
          visible && (
            <EditModal
              dataSource={dataSource}
              value={value}
              onCancel={() => setVisible(false)}
              onOk={handleOk}
            />
          )
        }
      </div>
    )
  }

  return (
    <div className="industry-tags">
      {
        dataSource.length <= 0
          ? <Empty description="暂无可用标签" style={{ margin: 'auto' }} />
          : dataSource.map((industry: IIndustry) => (
            <div
              className={
                cs('tag',
                  {
                    'checked': value.includes(industry.value)
                  }
                )
              }
              onClick={() => handleClick(industry.value)}
            >
              <span className="tag__title">{industry.label}</span>
            </div>
          ))
      }
    </div>
  )
}
