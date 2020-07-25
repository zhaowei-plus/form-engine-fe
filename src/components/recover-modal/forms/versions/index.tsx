import React, { useState, useEffect } from 'react'
import {
  Radio,
  Typography
} from 'antd'

import './index.less'
const { Paragraph } = Typography
interface IVersion {
  id: string | number
  version: string
  remark: string
}

interface IProps {
  value: string
  onChange: (params: any) => any
  dataSource: Array<IVersion>
}

export default (props: IProps) => {
  const { dataSource, value, onChange } = props

  const handleChange = (e: any) => {
    onChange(e.target.value)
  }

  return (
    <div className="versions">
      <Radio.Group onChange={handleChange} value={value}>
        {
          dataSource.map((version: IVersion) => (
            <div className="version" key={version.id}>
              <Radio value={version.id} />
              <div className="version__info">
                <span className="title">V{version.version}</span>
                <div className="desc">
                  <Paragraph
                    ellipsis={{
                      rows: 2,
                      expandable: true
                    }}>
                    {version.remark || '暂无描述'}
                  </Paragraph>
                </div>
              </div>
            </div>
          ))
        }
      </Radio.Group>
    </div>
  )
}
