export default [
  {
    name: '表单列表',
    path: 'form/list',
    component: 'list/index',
    children: []
  },
  {
    name: '表单编辑',
    path: 'form/engine',
    children: [
      {
        name: '基础信息',
        path: 'basic/:type?/:id?/:formKey?',
        component: 'engine/components/form-basic'
      },
      {
        name: '设计表单',
        path: 'design/:id/:formKey',
        component: 'engine/components/form-design'
      },
      {
        name: '脚本/校验',
        path: 'script/:id/:formKey',
        component: 'engine/components/form-scripts'
      }
    ]
  },
  {
    path: 'test',
    children: [
      {
        name: '控件列表',
        path: 'index',
        component: 'test/index'
      },
      {
        name: '控件配置',
        path: ':type',
        component: 'test/config'
      }
    ]
  }

]
