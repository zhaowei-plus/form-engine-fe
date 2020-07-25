import React, { useState, useEffect } from 'react'
import Form from '@/components/field-form'
import { fieldsMap } from '@/components/fields'
import { createAsyncFormActions, IFormState, IFieldState } from '@formily/antd'

export default (props: any) => {
  const { type } = props.match.params
  const { schema = {}, effects = [], title } = fieldsMap[type]
  const [info, setInfo] = useState({ type: 'object' })
  const actions = createAsyncFormActions()

  const configFormEffects = ($: any, { setFieldState, getFieldState } : IFormState): void => {
    effects.map((item: any) => {
      const { key, effect } = item
      $('onFieldChange', key).subscribe((fieldState: IFieldState):void => {
        effect($, { setFieldState, getFieldState }, fieldState)
      })
    })
  }

  return <div>
    <h3>{title}</h3>
    <Form
      actions={actions}
      key="1"
      schema={schema}
      onSubmit={(v: any) => {
        console.log(v)
        setInfo({
          type: 'object',
          properties: {
            [v.name]: {
              type: 'string',
              ...v
            }
          }

        })
      }}
      effects={configFormEffects}
    />
    <Form
      key="2"
      schema={info}
      onSubmit={(v: any) => {
        console.log(v)
      }}
    />
  </div>
}
