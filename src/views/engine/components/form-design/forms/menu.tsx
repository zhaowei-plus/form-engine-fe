import React, { useRef } from 'react'
import uuid from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import { DRAGTYPES } from '@/views/engine/constants'

export default ({ menu }: any) => {
  const { title, icon } = menu
  const ref = useRef(null)
  const dispatch = useDispatch()

  const [, drag] = useDrag({
    item: {
      type: DRAGTYPES
    },
    begin: () => {
      dispatch({
        type: 'SET_WIDGET_PREPARE',
        payload: {
          activeKey: '',
          path: [],
          position: ''
        }
      })

      return {
        type: DRAGTYPES,
        drag: menu
      }
    },
    end: (info: any, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        const { drag, prepare } = dropResult
        const { icon, ..._drag } = drag

        _drag.key = uuid.v4()
        _drag.id = _drag.name + '_' + new Date().getTime()
        _drag.parent = prepare.path

        dispatch({
          type: 'SET_INSERT_WIDGET',
          payload: {
            source: _drag,
            prepare,
            fromMenu: true
          }
        })

        dispatch({
          type: 'SET_WIDGET_CONFIG',
          payload: _drag
        })

        dispatch({
          type: 'ADD_WIDGET',
          payload: {
            metaInfo: _drag,
            values: {
              title: _drag.title,
              name: _drag.id
            }
          }
        })
      }

      dispatch({
        type: 'SET_WIDGET_PREPARE',
        payload: {
          activeKey: '',
          path: [],
          position: ''
        }
      })
    }
  })

  drag(ref)

  return (
    <div
      ref={ref}
      className="menu"
    >
      <img src={require(`@/assets/img/fields/${icon}`)} alt={title} />
      <span>{title}</span>
    </div>
  )
}
