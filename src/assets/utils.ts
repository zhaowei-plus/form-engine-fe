import * as Babel from '@babel/standalone'
import { useSelector, shallowEqual } from 'react-redux'

/**
 * es6字符串转es5
 * @param es6Code
 */
export const es6Toes5 = (es6Code: string): string => {
  const es5Code = Babel.transform(es6Code, { presets: ['es2015', 'react'] }).code
  let result
  try {
    result = eval(es5Code) // eslint-disable-line
  } catch (error) {
    console.log(error)
  }
  return result
}

/**
 * useShallowEqualSelector优化redux hooks
 * ***/
export const useShallowEqualSelector = (selector: any) => {
  return useSelector(selector, shallowEqual)
}
