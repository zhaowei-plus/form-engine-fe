export const getSchema = () => {
  return {
    id: {
      type: 'string',
      editable: false,
      title: '表单ID：'
    },
    title: {
      type: 'string',
      editable: false,
      title: '表单名称：'
    },
    formDesc: {
      type: 'string',
      editable: false,
      title: '表单描述：'
    },
    versionDesc: {
      type: 'string',
      'x-component': 'textarea',
      title: '版本说明：'
    }
  }
}
