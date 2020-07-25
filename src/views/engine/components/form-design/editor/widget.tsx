import React, { useRef, useCallback, useMemo, memo } from 'react'
import cs from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag, DragSourceMonitor, useDrop, DropTargetMonitor } from 'react-dnd'
import { DRAGTYPES, CONTAINER } from '@/views/engine/constants'
import { isMidValue } from '@/views/engine/utils'
import { useShallowEqualSelector } from '@/assets/utils'
import Widgets from './widgets'

const Widget = ({ widget, setPrepare, activeKey, scrollTop }: any) => {
  const { title, key, parent, category, children = [] } = widget
  // const { type } = schema

  const ref = useRef<any>(null)
  const dispatch = useDispatch()
  const prepare = useShallowEqualSelector((state: any) => state.prepare)
  const widgets = useSelector((state: any) => state.widgets)

  /* const boundRect = useMemo(() => {
    if (ref.current) {
      return ref.current.getBoundingClientRect()
    }
  }, [ref.current]) */

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: DRAGTYPES
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging()
    }),
    begin: () => {
      return {
        type: DRAGTYPES,
        drag: widget
      }
    },
    end: (info: any, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        // const t0 = performance.now()
        const { drag, prepare } = dropResult

        // 插入组件
        dispatch({
          type: 'SET_INSERT_WIDGET',
          payload: {
            source: drag,
            prepare,
            fromMenu: false
          }
        })

        // 组件配置信息
        dispatch({
          type: 'SET_WIDGET_CONFIG',
          payload: drag
        })
        // console.log(performance.now() - t0)
      }
      setPrepare()
    }
  })

  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: DRAGTYPES,
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    }),
    canDrop: ({ drag }: any): boolean => {
      if (drag.category === CONTAINER) {
        return !widget.parent.includes(drag.key)
      }
      return drag.key !== key
    },
    hover: ({ drag }: any, monitor: DropTargetMonitor) => {
      if (drag.key === key) {
        return
      }

      /* if (prepare.path.length !== 0) {
        setPrepare()
      } */

      if (canDrop && isOverCurrent) {
        const offset: any = monitor.getClientOffset()
        const boundRect = ref.current.getBoundingClientRect()
        const next = {
          activeKey: key,
          path: parent,
          position: 'top'
        }

        const isTop = isMidValue(offset.y, boundRect.top, boundRect.top + boundRect.height / 2)
        const isBottom = isMidValue(offset.y, boundRect.bottom - boundRect.height / 2, boundRect.bottom)

        if (isTop) {
          next.position = 'top'
          if (JSON.stringify(prepare) === JSON.stringify(next)) {
            return false
          }
          setPrepare(key, parent, 'top')
          return false
        } else if (isBottom) {
          next.position = 'bottom'
          if (JSON.stringify(prepare) === JSON.stringify(next)) {
            return
          }
          setPrepare(key, parent, 'bottom')
          return false
        }
      }
      return false
    },
    drop: (params: any) => {
      const { drag } = params
      return {
        drag,
        prepare
      }
    }
  })

  const handleSelect = (e: any) => {
    e.stopPropagation()
    dispatch({
      type: 'SET_WIDGET_CONFIG',
      payload: widget
    })
  }

  const handleDelete = (e: any) => {
    e.stopPropagation()
    dispatch({
      type: 'SET_DELETE_WIDGET',
      payload: {
        key,
        path: parent
      }
    })
    // 如果是容器，子孙控件也要删除
    dispatch({
      type: 'DELETE_WIDGET',
      payload: {
        metaInfo: {
          key,
          category
        },
        widgets
      }
    })
    dispatch({
      type: 'RESET_WIDGET_CONFIG'
    })
  }

  drag(drop(ref))

  const isActive = activeKey === key

  const renderWidget = () => {
    return (
      <div
        className={
          cs('widget', {
            'hover': canDrop && isOverCurrent,
            'dragging': isDragging,
            'active': isActive
          })
        }
        onClick={handleSelect}
      >
        <span>{title}</span>
        <div
          className={
            cs('operation', {
              'visible': isActive
            })
          }
        >
          <i className="delete" onClick={handleDelete} />
        </div>
      </div>
    )
  }

  const renderBlock = () => {
    return (
      <div
        key={key}
        className={
          cs('block', {
            'hover': canDrop && isOverCurrent,
            'dragging': isDragging,
            'active': isActive
          })
        }
        onClick={handleSelect}
      >
        <span>{title}</span>
        <Widgets
          widgets={children}
          parent={[...parent, key]}
          setPrepare={setPrepare}
          activeKey={activeKey}
          scrollTop={scrollTop}
        />
        <div
          className={
            cs('operation', {
              'visible': isActive
            })
          }
        >
          <i className="delete" onClick={handleDelete} />
        </div>
      </div>
    )
  }
  let hoverWidgets = false
  if (prepare.activeKey === key) {
    hoverWidgets = prepare.path.indexOf(key) > -1
  }
  return (
    <div className={
      cs('widget-container', {
        'visible': prepare.activeKey === key && !hoverWidgets,
        'top': prepare.position === 'top',
        'bottom': prepare.position === 'bottom'
      })} ref={ref}>
      {
        category === CONTAINER && renderBlock()
      }
      {
        category !== CONTAINER && renderWidget()
      }
    </div>
  )
}

export default memo(Widget)
