import React, { useRef, useMemo, memo } from 'react'
import cs from 'classnames'
import { useDrop, DropTargetMonitor } from 'react-dnd'
import Widget from './widget'
import { DRAGTYPES, NO_WIDGETS, CONTAINER } from '@/views/engine/constants'
import { useSelector } from 'react-redux'
import { useShallowEqualSelector } from '@/assets/utils'

const Widgets = ({ widgets, parent = [], setPrepare, activeKey, scrollTop }: any) => {
  const ref = useRef(null)
  const prepare = useShallowEqualSelector((state: any) => state.prepare)

  const key = useMemo(() => {
    if (parent.length > 0) {
      return parent[parent.length - 1]
    }
    return NO_WIDGETS
  }, parent)

  const [{ isOverCurrent, canDrop }, drop] = useDrop({
    accept: DRAGTYPES,
    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    }),
    canDrop: ({ drag }: any): boolean => {
      if (drag.category === CONTAINER) {
        return !parent.includes(drag.key)
      }
      return true
    },
    hover: ({ drag }) => {
      if (drag.key === key) {
        return
      }
      // setPrepare()
      if (canDrop && isOverCurrent) {
        const next = {
          activeKey: key,
          path: parent,
          position: 'bottom'
        }
        if (JSON.stringify(next) === JSON.stringify(prepare)) {
          return false
        }
        setPrepare(key, parent, 'bottom')
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

  drop(ref)

  return (
    <div
      ref={ref}
      className={
        cs('widgets', {
          'hover': canDrop && isOverCurrent
        })
      }
    >
      {
        widgets.map((widget: any) => (
          <Widget
            widget={widget}
            activeKey={activeKey}
            setPrepare={setPrepare}
            scrollTop={scrollTop}
          />
        ))
      }
    </div>
  )
}

export default Widgets
