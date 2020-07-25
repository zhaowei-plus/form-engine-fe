export const DRAGTYPES = 'MainDrag' // 左侧组件拖拽到中间来

// 表示编辑区域没有任何控件
export const NO_WIDGETS = 'NO_WIDGETS'

// 测试数据
export const TEST_WIDGETS = [
  {
    category: 'input',
    name: 'radio',
    title: '单选框1',

    // 编辑区域结点新添加的数据信息
    id: '11',
    parent: [],
    key: '157604651351676172'
  },
  {
    category: 'input',
    name: 'radio',
    title: '单选框2',

    // 编辑区域结点新添加的数据信息
    id: '1124',
    parent: [],
    key: '15760465135167617232'
  },
  {
    category: 'input',
    name: 'radio',
    title: '单选框3',

    // 编辑区域结点新添加的数据信息
    id: '114',
    parent: [],
    key: '157604651351676172123'
  },
  {
    category: 'container',
    name: 'block',
    title: '区块组件4',

    // 编辑区域结点新添加的数据信息
    id: '10',
    parent: [],
    key: '157604651351676173',
    children: [
      {
        category: 'input',
        name: 'radio',
        title: '单选框5',

        // 编辑区域结点新添加的数据信息
        id: '13',
        parent: ['157604651351676173'],
        key: '157604651354576172'
      }
    ]
  },
  {
    category: 'container',
    name: 'block',
    title: '区块组件6',

    // 编辑区域结点新添加的数据信息
    id: '135',
    parent: [],
    key: '15760465135167617309',
    children: [
      {
        category: 'input',
        name: 'radio',
        title: '单选框7',

        // 编辑区域结点新添加的数据信息
        id: '136',
        parent: ['15760465135167617309'],
        key: '15760465135457617208'
      }
    ]
  },
  {
    category: 'container',
    name: 'grid',
    title: '网格布局组件8',

    // 编辑区域结点新添加的数据信息
    id: '134',
    parent: [],
    key: '157604651351676173231214',
    children: [
      {
        category: 'input',
        name: 'radio',
        title: '单选框9',

        // 编辑区域结点新添加的数据信息
        id: '15',
        parent: ['157604651351676173231214'],
        key: '157604651354576172423'
      }
    ]
  },
  {
    category: 'container',
    name: 'grid',
    title: '网格布局组件',

    // 编辑区域结点新添加的数据信息
    id: '137',
    parent: [],
    key: '157604651351676173231214137',
    children: [
      {
        category: 'input',
        name: 'radio',
        title: '单选框',

        // 编辑区域结点新添加的数据信息
        id: '138',
        parent: ['157604651351676173231214137'],
        key: '157604651354576172423138'
      }
    ]
  }
]

// 容器类别
export const CONTAINER = 'container'

// 路由跳转
const BASICPATH = '/form/engine/basic/edit'
const DESIGNPATH = '/form/engine/design'
const SCRIPTSPATH = '/form/engine/script'
export const LOCATIONMAP: any = {
  0: {
    next: DESIGNPATH
  },
  1: {
    prev: BASICPATH,
    next: SCRIPTSPATH
  },
  2: {
    prev: DESIGNPATH
  }
}
export const STAGE = {
  BASIC: 0,
  DESIGN: 1,
  SCRIPT: 2
}

export interface IWithRouterProps {
  history: any
  match: any
}
