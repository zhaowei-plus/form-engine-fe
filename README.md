## 子项目

#### 命令

```
开发
npm run serve

更新主项目，无需停止本地服务
npm run micro

打包
npm run build
```

#### 样式

可直接使用 [tcon](https://fervent-lamport-9792bb.netlify.com/guide/) 和 antd.css

#### 路由

```js
import { ConfigProvider } from 'antd'
import { addReactRoutes } from './assets/window'

addReactRoutes(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
)
```

#### http

[文档](https://competent-bose-f6b47c.netlify.com/#/http)

```js
import { registerHttpUrlMap } from './assets/window'

// 注册 http url
registerHttpUrlMap({
  form: {
    create: engine
  }
})

http.get(engine, data) 
// 或者
http.post(engine, data)
```

#### 其他公共组件

都可以从 `import {} from './assets/window'` 获取，具体列表查看：[window._MICRO_APP_CONFIG](https://git.shinemo.com/projects/UBPM/repos/process-engine-main/browse)

#### 12.29修改日志
1. 控件id有可能重复，是用户操作时使用的,所以改为用key关联


#### 表单控件
使用了[uform](https://uform-next.netlify.com/#/MpI2Ij/dNFzFyTb)

##### 通用控件注册在文件加`components/fields`

##### 控件扩展属性

`x-babel-props` 标记需要babel编译的属性，值为属性path的数组
```js
{
  type: 'object',
  properties: {
    cash: {
      type: 'string',
      title: '<span style={{color: "red"}}>金额</span>',
      'x-component-props': {
        addonAfter: '<span style={{color: "red"}}>元</span>'
      }
      'x-babel-props': ['title', 'x-component-props.addonAfter']
    }
  }
}
```

`x-expression` 配置表达式需要设置的控件和上下午变量， 只在控件类型为`codeExpression`时有效
```js
  {
    title: '表达式设置',
    type: 'codeExpression',
    'x-expression': {
      contextParams // 数组 上下文变量
      fieldCascaderData // 数组 控件列表 {label, value, children}树结构
    }
  }
```
`x-field-extend-props` 支持扩展设置的控件属性
```js
  {
  type: 'extendArray',
  title: '扩展规则',
  'x-field-extend-props' : [
    {
      label: '控件值',
      path: 'value'
    },
    {
      label: '选项',
      path: 'enum'
    }
  ]
}
```
