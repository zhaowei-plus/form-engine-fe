import React from 'react'
import {
  Dropdown,
  Menu
} from 'antd'

import { IOperation } from '../../config'

import './index.less'

interface IProps {
  selected: any
  dataSource: Array<IOperation>
}

const { Item } = Menu

export default (props: IProps) => {
  const { selected, dataSource } = props
  const { id, formKey } = selected

  if (dataSource.length > 2) {
    const [first, second, ...rest] = dataSource

    const overlay = (
      <Menu className='operations-menu'>
        {
          rest.map((item: IOperation, index: number) => (
            <Item className='item'>
              <a onClick={() => item.func(selected)} key={index}>{item.label}</a>
            </Item>
          ))
        }
      </Menu>
    )

    return (
      <div className="operations">
        <a onClick={() => first.func(id, formKey)} key="1">{first.label}</a>
        <a onClick={() => second.func(id, formKey)} key="2">{second.label}</a>
        <Dropdown overlay={overlay}>
          <a>更多</a>
        </Dropdown>
      </div>
    )
  }

  return (
    <div className="operations">
      {
        dataSource.map((item: IOperation, index: number) => (
          <a onClick={() => item.func(id)} key={index}>{item.label}</a>
        ))
      }
    </div>
  )
}
