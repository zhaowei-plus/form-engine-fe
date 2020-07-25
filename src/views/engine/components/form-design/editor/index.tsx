import React, { memo, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useShallowEqualSelector } from '@/assets/utils'
import Widgets from './widgets'

import './index.less'
import _ from 'lodash'

const Editor = () => {
  const [scrollTop, setScrollTop] = useState(0)
  const ref = useRef<any>(null)
  const dispatch = useDispatch()
  const {
    widgets,
    config
  } = useShallowEqualSelector((state: any) => ({
    widgets: state.widgets,
    config: state.config
  }))

  const key = config.key

  const setPrepare = (activeKey: string = '', path: Array<string> = [], position: string = '') => {
    // console.log('setPrepare', path, activeKey)
    dispatch({
      type: 'SET_WIDGET_PREPARE',
      payload: {
        activeKey,
        path,
        position
      }
    })
  }

  const handleScroll = _.debounce(() => {
    setScrollTop(ref.current.scrollTop)
  }, 100)

  return (
    <div className="editor">
      <div className='editor-scroll'
        ref={ref}
        onScroll={handleScroll}
      >
        {
          !widgets.length && (
            <span className='editor-empty'>
              <img src={require(`@/assets/img/empty/empty.png`)}
              />
              请从左侧拖入控件来创建表单
            </span>
          )
        }
        <Widgets
          widgets={widgets}
          setPrepare={setPrepare}
          activeKey={key}
          scrollTop={scrollTop}
        />
      </div>
    </div>
  )
}
export default Editor
