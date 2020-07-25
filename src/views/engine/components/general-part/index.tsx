/**
 * @description 公用部分顶部进度条和底部的按钮
 * **/

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './index.less'
import { initialState } from '@/store/basic'
import RecoverModal from '@/components/recover-modal'

import { Steps, Button, Modal, message } from 'antd'
import { LOCATIONMAP, STAGE } from '../../constants'
const { Step } = Steps

interface IProps {
  current: number
  children: JSX.Element,
  history: any
  match: any

  save: (isNext?: any) => any
  handleValidate?: () => any
  handlePublish?: () => any
  handlePreview?: () => any
}
const GeneralPart = ({
  current,
  children,
  history,
  match,
  save,
  handleValidate,
  handlePreview,
  handlePublish
}: IProps) => {
  const { params, path } = match
  const { type, id, formKey } = params
  const [visible, setVisible] = useState(false)

  const handleBack = () => {
    Modal.confirm({
      centered: true,
      content: '返回将丢失未保存的内容，确认返回吗？',
      onOk: () => {
        window.history.back()
      }
    })
  }

  const handleRecover = () => {
    // console.log('恢复版本')
    setVisible(true)
  }

  const handleSave = () => {
    save()
  }

  const handlePrev = async () => {
    history.push(`${LOCATIONMAP[current].prev}/${id}/${formKey}`)
  }

  const handleNext = () => {
    Modal.confirm({
      centered: true,
      content: '是否保存后前往下一步',
      onOk: async () => {
        try {
          const res: any = await save(true)
          if (res.success) {
            const finalId = res.id || id
            const finalFormKey = res.formKey || formKey
            history.push(`${LOCATIONMAP[current].next}/${finalId}/${finalFormKey}`)
          }
        } catch (e) {
          message.error('保存出现错误')
          return true
        }
      }
    })
  }

  return (
    <div className='engine'>
      <div className='engine__header'>
        <Button
          size='small'
          className='back'
          onClick={handleBack}
        >
          <span className='iconfont iconleft'></span>
          返回
        </Button>
        <Steps current={current} size='small' className='steps'>
          <Step title='基础信息' />
          <Step title='设计表单' />
          <Step title='脚本/校验' />
        </Steps>
        <Button
          size='small'
          disabled={!formKey}
          onClick={handleRecover}
          className='recover'
        >
          <span className='iconfont iconlishibanben_line'></span>
          恢复版本
        </Button>
      </div>

      <div className='engine__content'>{children}</div>

      <div className='engine__footer'>
        {
          current !== 0 && (
            <Button onClick={handlePrev}>上一步</Button>
          )
        }
        <Button onClick={handleSave}>保存</Button>
        { current === 1 && <Button onClick={handlePreview}>预览</Button> }
        {
          current !== 2
            ? (
              <Button
                onClick={handleNext}
                type='primary'
              >
                下一步
              </Button>
            )
            : (
              <>
                <Button
                  onClick={handleValidate}
                >
                  检查
                </Button>
                <Button
                  onClick={handlePublish}
                  type='primary'
                >
                  发布
                </Button>
              </>
            )
        }
      </div>

      {
        visible && (
          <RecoverModal
            onCancel={() => setVisible(false)}
            formKey={formKey}
          />
        )
      }
    </div>
  )
}

export default GeneralPart
