import React from 'react'
import { Modal, Button } from 'antd'
import { FormButtonGroup, Submit, createFormActions, ISchema, IFormEffect } from '@formily/antd'
import SchemaForm from '@/components/field-form'

interface IFieldModal {
  title: string,
  value?: any,
  visible: boolean,
  schema: ISchema,
  effects?: IFormEffect,
  onSave: (value: any) => void,
  toggleModal: () => void,
  modalAddtionElement: any
}

export default (props: IFieldModal) => {
  const submitHandle = (values: any) => {
    props.onSave(values)
    props.toggleModal()
  }

  const actions = createFormActions()

  return <Modal
    title={props.title}
    visible={props.visible}
    footer={null}
    destroyOnClose
    onCancel={props.toggleModal}
  >
    <SchemaForm
      schema={props.schema}
      defaultValue={props.value}
      onSubmit={submitHandle}
      actions={actions}
      effects={props.effects}
    >
      <FormButtonGroup align="center">
        <Submit>保存</Submit>
        <Button onClick={props.toggleModal}>取消</Button>
      </FormButtonGroup>
    </SchemaForm>
    {props.modalAddtionElement}
  </Modal>
}
