import React, { useState } from 'react'
import { Form, Tree, Input, Button, Row, Col, Tooltip } from 'antd'

const { TreeNode } = Tree
const InputGroup = Input.Group

export default props => {
  // 需要为默认值生成key
  let initData = {}
  if (Array.isArray(props.value)) {
    const generateKey = (data: any) => {
      if (data.children) {
        data.children = data.children.map((item: any, index: number) => {
          const newKey = `${data.key}-${index}`
          // item.key = newKey
          return generateKey({ ...item, key: newKey })
        })
      }
      return data
    }
    initData = generateKey(
      {
        label: '根节点',
        value: -1,
        key: '0',
        children: (props.value)
      }
    )
  } else {
    initData = {
      label: '根节点',
      value: -1,
      key: '0'
    }
  }

  const [treeData, setTreeData] = useState(initData)

  const treeDataChange = () => {
    setTreeData({ ...treeData })
    if (typeof props.onChange === 'function') {
      props.onChange(treeData.children)
    }
  }

  const addChild = (data: any) => {
    data.children = data.children || []
    data.children.push({
      label: '',
      value: '',
      key: `${data.key}-${data.children.length}`
    })
    treeDataChange()
  }

  const deleteNode = (data: any, index: number) => {
    data.children.splice(index, 1)
    treeDataChange()
  }

  const changeOption = (data: any, name: string, e: any) => {
    data[name] = e.target.value
    treeDataChange()
  }

  const renderTreeNode = (data: any) => {
    const childrenNodes = (data.children || []).map((item: any, index: number) => {
      const key = item.key ? `${item.key}-${index}` : `${index}`
      return <TreeNode key={key} title={
        <InputGroup>
          <Row>
            <Col span={8}>
              <Input value={item.label} size="small" onChange={e => changeOption(item, 'label', e)} placeholder="选项文本" />
            </Col>
            <Col span={8}>
              <Input value={item.value} size="small" onChange={e => changeOption(item, 'value', e)} placeholder='选项值' />
            </Col>
            <Col span={8}>
              <Tooltip title="添加子级">
                <Button shape="circle" icon="plus" onClick={e => addChild(item)} size="small"></Button>
              </Tooltip>
              <Tooltip title="删除">
                <Button shape="circle" icon="delete" onClick={e => deleteNode(data, index)} size="small"></Button>
              </Tooltip>
            </Col>
          </Row>
        </InputGroup>}>
        {renderTreeNode(item)}
      </TreeNode>
    })
    return [
      ...childrenNodes,
      data.key === '0' && <TreeNode title={<Tooltip title="添加一级"><Button shape="circle" icon="plus" onClick={e => addChild(data)} size="small"></Button></Tooltip>} />
    ]
  }

  return <Form.Item label="级联选项">
    <Tree {...props} selectable={false} defaultExpandAll showLine>
      {renderTreeNode(treeData)}
    </Tree>
  </Form.Item>
}
