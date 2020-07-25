import React from 'react'
import Menus from './menus'
import { fieldsArray } from '@/components/fields'

import './index.less'

export default () => {
  // console.log(fieldsArray)
  return (
    <div className='forms'>
      <span className='header'>表单控件</span>
      <Menus menus={fieldsArray} />
    </div>
  )
}
