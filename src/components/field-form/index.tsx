import React, { useState, useEffect } from 'react'
import { SchemaForm, FormButtonGroup, Submit } from '@formily/antd'
import { setup } from '@formily/antd-components'
import fieldPrepare from './field-prepare'
// import 'antd/dist/antd.css'

setup()
fieldPrepare()

export default (props: any) => {
  return <SchemaForm {...props} validateFirst>
  </SchemaForm>
}
