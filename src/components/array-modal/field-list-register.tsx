import React, { useState } from 'react'
import { ISchema, IFormEffect } from '@formily/antd'
import { Button, Empty } from 'antd'
import FieldModal from './field-modal'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

/**
 * 用于注册自定义的array类型控件
 * @listName 中文名称
 * @schema 子项schema，用来生成弹窗
 * @canDrag 启用拖拽排序
 */
export default ({ listName, schema, effects, canDrag = false, modalAddtionElement }: { listName: string, schema: ISchema, effects: IFormEffect, canDrag: boolean, modalAddtionElement: any }) => ({ value = [], path, mutators }) => {
  const [valueEdited, setValueEdited]: [any, any] = useState(undefined)

  const onSave = (val: any) => {
    if (valueEdited.index === -1) {
      mutators.push(val)
    } else {
      value[valueEdited.index] = val
      mutators.change(value)
    }
  }
  const emptyUI = <div className="tc bg-fff" style={{ paddingTop: 120, height: 570 }}>
    <Empty className="mb15" description={<div className="c-999">暂无{listName}</div>} />
    <Button onClick={e => setValueEdited({ value: undefined, index: -1 })}>添加{listName}</Button>
  </div>

  const ListItem = ({ item, index }: { item: any, index: number }) => {
    const [{ isDragging }, drag] = useDrag({
      canDrag,
      item: { type: listName, dragIndex: index },
      collect: monitor => ({
        isDragging: !!monitor.isDragging()
      })
    })
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: listName,
      options: {
        dropIndex: index
      },
      canDrop: () => canDrag,
      drop: ({ dragIndex }) => {
        const hoverIndex = index
        if (dragIndex === hoverIndex) { // 同一个节点不操作
          return undefined
        } else {
          let dragRow = value[dragIndex]
          let newDataSource = value.concat()

          newDataSource.splice(dragIndex, 1) // 删除旧的行
          newDataSource.splice(hoverIndex, 0, dragRow) // 插入新的行
          mutators.change(newDataSource)
        }
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    })
    const renderedItem = <div
      className="bg-fff mb15 bd bd-eee"
      style={{
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isOver && canDrop ? '0 0 5px #eee' : ''
      }}>
      <div className="cf pl20 pr20">
        <span className="f18 b mt-10">{item.title || listName}</span>
        <div className="fr">
          <a className="mr20" onClick={e => { setValueEdited({ value: item, index }) }}><span className="iconfont iconbianji_line" />编辑</a>
          <a className="" onClick={e => { mutators.remove(index) }}><span className="iconfont iconbianji_line" /><span className="c-error">删除</span></a>
        </div>
      </div>
      <div className="pl20 pr20 mb10 c-999">
        {item?.description || '暂无描述'}
      </div>
    </div>
    return drag(drop(renderedItem))
  }

  const listUI = <DndProvider backend={Backend}>
    {
      value.map((item: any, index: number) => <ListItem key={index} item={item} index={index} />)
    }
    <Button block onClick={e => setValueEdited({ value: undefined, index: -1 })}>添加{listName}</Button>
  </DndProvider>

  return <div>
    {value.length === 0 ? emptyUI : listUI}
    <FieldModal
      title={`${valueEdited?.index > -1 ? '修改' : '添加'}${listName}`}
      schema={schema}
      effects={effects}
      value={valueEdited?.value}
      visible={!!valueEdited}
      toggleModal={() => setValueEdited(undefined)}
      onSave={onSave}
      modalAddtionElement= {modalAddtionElement}
    />
  </div>
}
