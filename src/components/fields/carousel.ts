
import { IFormState, IFieldState } from '@formily/antd'
export default {
  title: '轮播',
  name: 'carousel',
  description: '轮播',
  category: 'container',
  group: 'view',
  icon: 'carousel.png',
  available: true,
  version: 1,
  schema: {
    type: 'object',
    title: '轮播',
    properties: {
      type: {
        type: 'string',
        default: 'carousel',
        display: false // display: false会提交该数据，但是不会显示在表单中， visible:false不显示不提交数据
      },
      uuid: {
        type: 'string',
        display: false
      },
      category: {
        type: 'string',
        display: false
      },
      'x-component-props': {
        type: 'object',
        properties: {
          autoplay: {
            type: 'boolean',
            title: '自动播放',
            default: false
          },
          dots: {
            type: 'boolean',
            title: '显示面板指示点',
            default: true
          },
          dotPosition: {
            type: 'string',
            title: '面板指示点位置',
            default: 'bottom',
            enum: [
              { label: '上', value: 'top' },
              { label: '下', value: 'bottom' },
              { label: '左', value: 'left' },
              { label: '右', value: 'right' }
            ]
          },
          effect: {
            type: 'radio',
            title: '动画效果',
            default: 'scrollx',
            enum: [
              { label: '切换', value: 'scrollx' },
              { label: '渐隐', value: 'fade' }
            ]
          }
        }
      }
    }

  },
  effects: [
    {
      key: 'x-component-props.dots',
      effect: ($: any, { setFieldState, getFieldState } :IFormState, fieldState: IFieldState) => {
        getFieldState('x-component-props.dots').then((enumFieldState: IFieldState) => {
          setFieldState('x-component-props.dotPosition', (state: IFieldState) => {
            state.visible = enumFieldState.value
          })
        })
      }
    }
  ]
}
