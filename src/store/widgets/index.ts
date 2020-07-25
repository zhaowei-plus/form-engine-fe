import immer from 'immer'
import { cloneDeep } from 'lodash'
import { TEST_WIDGETS, NO_WIDGETS } from '@/views/engine/constants'

const initialState: Array<any> = []

interface IAction {
  type: string
  payload: any
}

const findIndex = (sources: Array<any>, key: string) => {
  const index = sources.findIndex((source: any) => source.key === key)
  if (index < 0) {
    return 0
  }
  return index
}

const resetPath = (source: any, path: Array<string>) => {
  const { key, children = [] } = source
  children.map((source: any) => {
    source.parent = [...path, key]
    resetPath(source, path)
  })
}

function setInsertWidget (newState: any, source: any, prepare: any, fromMenu: boolean) {
  const { key, parent = [] } = source
  const { activeKey, path, position } = prepare

  if (!activeKey) {
    return
  }

  const backupSource = cloneDeep(source)

  if (!fromMenu) {
    // 编辑区域控件拖拽：删除源结点
    let sourceWidgets: Array<any>
    if (parent.length === 0) {
      sourceWidgets = newState
    } else {
      sourceWidgets = parent.reduce((widgets: any, key: string): any => {
        const index = findIndex(widgets, key)
        return widgets[index].children
      }, newState)
    }

    const sourceIndex = findIndex(sourceWidgets, key)
    // console.log('sourceIndex:', sourceIndex, key)
    sourceWidgets.splice(sourceIndex, 1)
  }

  // 找到目标位置所在的组件层级
  let targetWidgets: any
  if (path.length === 0) {
    targetWidgets = newState
  } else {
    // console.log('newState', { newState, path })
    targetWidgets = path.reduce((widgets: any, key: string): any => {
      const index = findIndex(widgets, key)
      return widgets[index].children
    }, newState)
  }

  // 如果没有控件，则直接添加到顶部
  let targetIndex = findIndex(targetWidgets, activeKey)

  switch (position) {
    case 'top': {
      backupSource.parent = path
      resetPath(backupSource, path)
      if (activeKey === NO_WIDGETS) {
        targetIndex = 0
      }
      // console.log('position:', position, targetIndex)
      targetWidgets.splice(targetIndex, 0, backupSource)
      break
    }

    case 'inside': {
      backupSource.parent = path
      resetPath(backupSource, path)
      targetWidgets.push(backupSource)
      break
    }

    case 'bottom': {
      backupSource.parent = path
      resetPath(backupSource, path)
      if (activeKey === NO_WIDGETS) {
        targetIndex = targetWidgets.length - 1
      }
      targetWidgets.splice(targetIndex + 1, 0, backupSource)
      break
    }

    default: {
      break
    }
  }
}

function setDeleteWidget (newState: any, key: string, path: Array<string>) {
  let sourceWidgets: Array<any>
  if (path.length === 0) {
    sourceWidgets = newState
  } else {
    sourceWidgets = path.reduce((widgets: any, key: string): any => {
      const index = findIndex(widgets, key)
      return widgets[index].children
    }, newState)
  }

  const sourceIndex = findIndex(sourceWidgets, key)
  sourceWidgets.splice(sourceIndex, 1)
}

export default (state: any = initialState, { type, payload }: IAction) => {
  switch (type) {
    case 'SET_WIDGET_LIST': {
      return payload || []
    }
    case 'SET_INSERT_WIDGET': {
      const { source, prepare, fromMenu } = payload
      return immer(state, (newState: any) => {
        setInsertWidget(newState, source, prepare, fromMenu)
      })
    }
    case 'SET_DELETE_WIDGET': {
      const { key, path } = payload
      return immer(state, (newState: any) => {
        setDeleteWidget(newState, key, path)
      })
    }
    default:
      return state
  }
}
