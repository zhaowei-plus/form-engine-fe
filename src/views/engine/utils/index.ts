import { cloneDeep } from 'lodash'
import { getRegistry, FormPath, ISchema } from '@formily/antd'

const registrys = getRegistry()
/**
 * @description 检查是否是中间值
 * */
export const isMidValue = (source: number, min: number, max: number): boolean => {
  // console.log('source', source)
  // console.log('min', min)
  // console.log('max', max)
  return (source >= min && source < max)
}

/**
 * @description 将widgets的状态与config合并得到最终结果
*/
const findIndex = (sources: Array<any>, key: string) => {
  const index = sources.findIndex((source: any) => source.key === key)
  if (index < 0) {
    return 0
  }
  return index
}
/**
 *
 * @param designResult
 * @param widgets
 */
export const mergeConfig = (designResult: any, widgets: Array<any>) => {
  const { widgetResultMap } = designResult

  let fullResult = { // 完整schema数据
    type: 'object'
  }
  let simpleResult: any[] = [] // 简化版数据
  let scriptKeyList: string[] = [] // 控件扩展用到的脚本

  // 递归将数组结构数据转换成schema结构
  const transformToSchema = (fieldsArray: any[], fullResultPath: string, simpleResultPath: string) => {
    fieldsArray.forEach((item: any) => {
      const { key } = item
      const result = widgetResultMap[key]
      if (result) {
        const nextFullPath = `${fullResultPath}.properties.[${result.values.name}]`
        const nextSimplePath = `${simpleResultPath}.[${result.values.name}]`
        // cool-path 文档 https://www.npmjs.com/package/cool-path
        FormPath.setIn(fullResult, nextFullPath, [{ ...result.values }]) // 这里赋值需要复制一份，不然会报not extendable错误
        if (registrys.fields[result.values.type]) {
          // FormPath.setIn(simpleResult, nextSimplePath, result.values.name)
          simpleResult.push({
            id: result.values.name,
            title: result.values.title,
            type: result.values.type,
            canIndex: result.values.canIndex
          })
          const scriptKey = result.values?.expandConfig?.[0]?.methodId
          if (scriptKey && scriptKeyList.indexOf(scriptKey) === -1) {
            scriptKeyList.push(scriptKey)
          }
        }
        if (item.children) {
          transformToSchema(item.children, `${fullResultPath}.properties.${result.values.name}`, nextSimplePath)
        }
      }
    })
  }
  transformToSchema(widgets, '', '')
  return {
    fullResult,
    simpleResult,
    scriptKeyList
  }

  // let sourceWidgets: Array<any>
  // // console.log('final', final)

  // for (const [key, config] of Object.entries(widgetResultMap)) {
  //   let path = (config as any).metaInfo.parent
  //   // console.log('path', path)
  //   const values = (config as any).values
  //   const finalConfig = {
  //     key,
  //     ...values
  //   }
  //   // console.log(finalConfig)
  //   // console.log('finalConfig', finalConfig)
  //   if (!path.length) {
  //     const index = findIndex(final, key)
  //     const finalChildren = final[index].children
  //     if (finalChildren) {
  //       finalConfig.children = finalChildren
  //     }
  //     final[index] = finalConfig
  //   } else {
  //     sourceWidgets = path.reduce((prevWidgets: any, parentKey: string): any => {
  //       // console.log('reduce', prevWidgets)
  //       const index = findIndex(prevWidgets, parentKey)
  //       return prevWidgets[index].children
  //     }, final)
  //     // console.log('final', final)
  //     let targetIndex = findIndex(sourceWidgets, key)
  //     sourceWidgets[targetIndex] = { ...finalConfig, parent: path }
  //     // console.log('sourceWidgets[targetIndex]', sourceWidgets[targetIndex])
  //   }
  // }
  // return final
}

/**
 * @description 将获取到的配置拆分为widgets(拖拽配置)+widgetResultMap(表单配置)
 * ***/
const flatToMap = (obj = {}, rel: any = {}) => {
  for (const [id, value] of Object.entries(obj)) {
    const { properties, ..._value }: any = value
    rel[_value.uuid] = {
      metaInfo: {
        title: _value.title,
        name: _value.type,
        category: _value.category,
        id: _value.name
      },
      values: _value
    }
    flatToMap(properties, rel)
  }
  return rel
}
const flatToArray = (obj = {}, arr = [], parent: any = []) => {
  for (const [id, value] of Object.entries(obj)) {
    const { properties, uuid, title, type, category }: any = value
    arr.push({
      id,
      key: uuid,
      title,
      name: type,
      children: flatToArray(properties, [], [...parent, uuid]),
      parent,
      category
    })
  }
  return arr
}

export const flatConfig = (fullConfig: any) => {
  let resultArray: [] = []
  let valueMap = {}

  flatToMap(fullConfig, valueMap)
  flatToArray(fullConfig, resultArray)

  return {
    resultArray,
    valueMap
  }
}

/**
 * 获取schema中field树结构数据，默认只会保留category为input类型的数据
 * @param schema
 * @param options 转换设置
 */
export const getSchemaTreeData = (schema: any, options: any) => {
  const { textName, filterCategoryArray } = {
    filterCategoryArray: ['input'],
    textName: 'title',
    ...options
  }
  let result = {
    [textName]: '根节点',
    value: '-1',
    children: [],
    disable: true
  }
  const recursiveFun = (obj = {}, parent, parentPath = '') => {
    if (obj.properties) {
      for (const [name, value] of Object.entries(obj.properties)) {
        if (filterCategoryArray.includes(value.category)) {
          const nextParentPath = `${parentPath}.${name}`
          let res = {
            [textName]: value.title,
            value: nextParentPath
          }
          parent.children = parent.children || []
          parent.children.push(res)
          recursiveFun(value, res, nextParentPath)
        } else {
          recursiveFun(value, parent, parentPath)
        }
      }
    }
    return parent
  }
  return recursiveFun({ ...schema }, result, '')
}
