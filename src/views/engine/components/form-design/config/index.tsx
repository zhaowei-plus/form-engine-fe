import React, { useState, useEffect } from 'react'
import SchemaForm from '@/components/field-form'
import { FormButtonGroup, Submit, createAsyncFormActions, IFormState, IFieldState } from '@formily/antd'
import { fieldsMap } from '@/components/fields'
import { Empty, Button, Modal } from 'antd'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import FieldExtendModal from '@/components/field-form/field-extend-modal'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import './index.less'

export default () => {
  const dispatch = useDispatch()
  const {
    config: metaInfo,
    designResult
  } = useSelector(({ config, designResult }: { config: any, designResult: any }) => ({
    config,
    designResult
  }), shallowEqual)

  const [previewInfo, setPreviewInfo] = useState({
    show: false,
    schema: {
      type: 'object'
    }
  })

  const formActions = createAsyncFormActions()

  const submitHandle = (values: any) => {
    dispatch({
      type: 'UPDATE_WIDGET',
      payload: {
        metaInfo,
        values
      }
    })
  }

  useEffect(() => {
    formActions.submit()
  }, [metaInfo.key])

  const preview = () => {
    designResult.currentWidgetConfigAction.submit().then((res: IFormState) => {
      console.log(res.values)
      setPreviewInfo({
        show: true,
        schema: {
          type: 'object',
          properties: {
            [res.values.name]: JSON.parse(JSON.stringify(res.values)) // 需要深度复制，不然选择内置验证会不生效
          }
        }
      })
    })
  }

  // 自定义验证提示弹窗
  const showValidatorFunHelp = () => {
    Modal.info({
      title: '代码案例',
      icon: null,
      width: 500,
      content: <CodeMirror options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
        readOnly: true
      }}
      value={`
// 简单验证，不通过时返回错误信息字符串
val => val > 10 ? '数值不能大于10' : ''

// 返回warning
val => {
  if (val < 10) {
    return {
      type: 'warning',
      message: '数值偏小'
    }
  } else if (val > 20) {
    return {
      type: 'error',
      message: '不能大于20'
    }
  }
}

// 异步验证，返回Promise，在resolve中返回错误信息
val => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (val > 10) {
      resolve('数值不能大于10')
    } else {
      resolve('')
    }
  }, 1000)
})
      `}
      />
    })
  }

  const expressionScope = {
    // 自定义验证规则提示标题
    validatorFunTitle: <span>自定义方法 <a onClick={showValidatorFunHelp}><span className="iconfont  iconyuan_wenhao_line" /></a></span>
  }

  const renderForm = () => {
    const setting = fieldsMap[metaInfo.name]
    if (!setting) {
      return <Empty />
    } else {
      const { schema = {}, effects = [], title } = setting
      const initVal = designResult?.widgetResultMap[metaInfo.key]?.values || {
        title: metaInfo.title,
        name: metaInfo.id,
        uuid: metaInfo.key,
        category: metaInfo.category
      }
      const configFormEffects = ($: any, { setFieldState, getFieldState, getFormState }: IFormState): void => {
        $('onFormInit').subscribe((formState: IFormState) => {
          dispatch({
            type: 'SET_CURRENT_WIDGET_FORM_ACTION',
            payload: formActions
          })
        })
        $('onFieldValueChange').subscribe((formState: IFormState) => {
          getFormState((val: any) => {
            submitHandle(val.values)
          })
        })
        effects.map((item: any) => {
          const { key, effect } = item
          $('onFieldChange', key).subscribe((fieldState: IFieldState): void => {
            effect($, { setFieldState, getFieldState }, fieldState)
          })
        })
      }

      // grid控件需要修改schema中cols的个数
      if (metaInfo.name === 'grid' && 24 % metaInfo.children === 0) {
        const gridArray = new Array(metaInfo.children).fill(24 / metaInfo.children)
        schema.properties['x-component-props'].properties.cols.default = gridArray
      }
      return <div>
        <div> 控件类型：{metaInfo.title}</div>
        <SchemaForm
          className="config-form"
          key={metaInfo.key}
          initialValues={initVal}
          actions={formActions}
          schema={schema}
          validateFirst
          effects={configFormEffects}
          expressionScope={expressionScope}
          // onChange={submitHandle} 不知道为何form的onChange自动保存会导致表单数据丢失, 已放到onFieldValueChange中了
          onSubmit={submitHandle}
          wrapperCol={24}
        >
          <FormButtonGroup sticky align='center'>
            {/* <Submit>保存控件设置</Submit> */}
            {setting.category !== 'container' && <Button onClick={preview}>预览控件</Button>}
          </FormButtonGroup>
        </SchemaForm>

        <Modal
          title="预览控件"
          visible={previewInfo.show}
          destroyOnClose
          footer={null}
          onCancel={
            () => setPreviewInfo({ show: false, schema: { type: 'object' } })
          }
        >
          <SchemaForm key="-1" wrapperCol={24} schema={previewInfo.schema} validateFirst onSubmit={(v: any) => { console.log(v) }}><Submit /></SchemaForm>
        </Modal>
        <FieldExtendModal />
      </div>
    }
  }
  return (
    <div className="config">
      <span className="header">控件信息</span>
      <div style={{ padding: 16 }}>
        {renderForm()}
      </div>
    </div>
  )
}
