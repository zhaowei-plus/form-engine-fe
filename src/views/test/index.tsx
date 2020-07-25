import React from 'react'
import { Link } from 'react-router-dom'
import { fieldsArray } from '@/components/fields'
import { Menu } from 'antd'
import { Submit } from '@formily/antd'
import SchemaForm from '@/components/field-form'

const { SubMenu, Item } = Menu

console.log(fieldsArray)

export default (props: any) => {
  return <>
    <Menu style={{ width: 200 }} theme='dark' mode='inline'>
      {
        fieldsArray.map((item: any) => <SubMenu key={item.group} title={item.groupName}>
          {
            item.children.map((x: any) => <Item key={item.typeName}><Link to={`/test/${x.name}`}> {x.title} </Link></Item>)
          }
        </SubMenu>)
      }
    </Menu>
    <SchemaForm schema={
      {
        type: 'object',
        properties: {
          input: {
            'title': '单行文本',
            'name': 'string_1579172668686',
            'uuid': 'a01a35df-4136-4b0e-912f-650a6b4acc9b',
            'category': 'input',
            'type': 'string',
            'x-component-props': {
              'placeholder': '请输入'
            },
            enum: [
              {
                label: '<span style={{color: "red"}}>111</span>',
                value: 1
              },
              {
                label: '<span style={{color: "green"}}>222</span>',
                value: 2
              }
            ],
            'x-babel-props': ['enum.*.label', 'x-rules.*.validator'],
            'x-rules': [{ 'validator': '() => "1"' }]
          },
          home: {
            title: '家的位置',
            type: 'map',
            category: 'block'
          }
        }
      }
    }>
      <Submit />
    </SchemaForm>
  </>
}
