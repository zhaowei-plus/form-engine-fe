
import { tagList } from '@/assets/service'

export const getSchema = async (tagParams: any) => {
  const res: any = await tagList(tagParams)
  const tagsEnum = (res?.data?.rows || []).map((item: any) => ({ label: item.name, value: item.id }))
  return {
    title: {
      type: 'string',
      title: '表单名称',
      required: true
    },
    formKey: {
      type: 'string',
      title: '表单key',
      description: '表单key为表单的唯一识别符号，流程引擎可用到，确定输入后不可修改',
      required: true
    },
    formDesc: {
      type: 'string',
      title: '表单描述',
      'x-component': 'textarea',
      'x-props': {
        autoSize: {
          minRows: 3,
          maxRows: 5
        }
      }
    },
    tags: {
      type: 'industry-tags',
      title: '标签',
      enum: tagsEnum,
      editable: false,
      'x-props': {
        change: true
      }
    }
  }
}
