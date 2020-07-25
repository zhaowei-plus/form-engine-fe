import React, { useState } from 'react'
import { es6Toes5 } from '@/assets/utils'
import { registerFieldMiddleware, registerFormFields, connect, registerVirtualBox, IFieldState, FormPath } from '@formily/antd'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import { Button, Cascader, Carousel, Input } from 'antd'
import CascaderTree from './cascader-tree'
import FieldExtendModal from '@/components/field-form/field-extend-modal'
import Position from '@/components/field-form/amap/position'
import Map from '@/components/field-form/amap/map'
import { PreviewText } from '@formily/react-shared-components'

export default () => {
  registerFormFields({
    js: connect({
      eventName: 'onBeforeChange',
      getValueFromEvent: (editor, data, value) => {
        return value
      }
    })(props => {
      return <div style={{ lineHeight: 1.2 }}>
        <CodeMirror
          {...props}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true,
            tabSize: 2,
            ...props?.options,
            readOnly: props.readOnly
          }}
          value={props.value || ''}
        />
      </div>
    }),

    xml: connect({
      eventName: 'onBeforeChange',
      getValueFromEvent: (editor, data, value) => {
        return value
      }
    })(props => {
      return <div style={{ lineHeight: 1.2 }}>
        <CodeMirror
          {...props}
          options={{
            mode: 'xml',
            theme: 'material',
            lineNumbers: true,
            tabSize: 2,
            ...props?.options,
            readOnly: props.readOnly
          }}
          value={props.value || ''}
        />
      </div>
    }),

    // 级联选择器
    cascader: itemProps => {
      const { value, mutators, props, editable, schema } = itemProps
      const xComponentProps: any = schema['x-component-props']
      const { options } = xComponentProps
      if (!editable) {
        let valTextArr: any [] = []
        let getValTextArr = (optionArr: [], valArr = []) => {
          const [currentVal, ...restVal] = valArr
          let findObj: any = (optionArr.find((x: any) => x.value === currentVal) || {})
          if (findObj) {
            valTextArr.push(findObj.label)
          }
          if (restVal.length) {
            getValTextArr(findObj.children || [], restVal)
          }
        }
        getValTextArr(options, value)
        return <PreviewText value={valTextArr.join('/')}/>
      }
      return <Cascader value={value} onChange={mutators.change} {...xComponentProps}/>
    },

    // 级联选项树
    cascadertree: connect()(props => {
      return <CascaderTree {...props} />
    }),

    // 地图位置
    position: Position,

    // 代码编辑器
    codeBox: props => {
      const { value, mutators } = props
      const openEdit = () => {
        window?.scriptEditor?.default({
          data: value, // 初始值
          formTree: props.props?.fieldCascaderData || [] // 表单控件 { label, value, children: [] }
        }).then(data => {
          // 结果
          console.log(data)
          mutators.change(data)
        })
      }
      return <div>
        {
          window.scriptEditor ? <Input readOnly value={JSON.stringify(props.value)} addonAfter={<a onClick={openEdit}>编辑脚本</a>} /> : <span className="c-999">不支持此控件</span>
        }

      </div>
    },
    // 表达式, 可从shcema中x-code中获取上下文context和表单控件fieldCascaderData
    codeExpression: props => {
      const { value, mutators } = props
      const openEdit = () => {
        window?.scriptEditor?.fx(
          value || '', // 初始值
          data => {
            mutators.change(data)
          },
          props.props['x-expression']?.contextParams || [], // 上下文变量
          props.props['x-expression']?.fieldCascaderData || [] // 表单控件 { label, value, children: [] }
        )
      }
      return <div>
        {
          window.scriptEditor ? <Input readOnly value={props.value} addonAfter={<a onClick={openEdit}>表达式</a>} /> : <span className="c-999">不支持此控件</span>
        }

      </div>
    },

    // 控件扩展规则
    extendArray: (props) => {
      const { value = [], path, mutators } = props
      const [valueEdited, setValueEdited] = useState(undefined)

      const onSave = val => {
        if (valueEdited.index === -1) {
          mutators.push(val)
        } else {
          value[valueEdited.index] = val
          mutators.change(value)
        }
      }
      const emptyUI = <div className="tc">
        <div className="c-999">暂无扩展规则</div>
        <Button onClick={e => setValueEdited({ value: undefined, index: -1 })}>添加扩展规则</Button>
      </div>
      const listUI = value.map((item, index) => {
        const ruleName = ({ 1: '接口模式', 2: '数据库模式' })[item?.ruleType || '1']
        return <div key={index} className="bd bd-eee">
          <div className="cf pl15 pr15">
            <span className="b">{ruleName}</span>
            <div className="fr">
              <a className="mr5" onClick={e => { setValueEdited({ value: item, index }) }}>编辑</a>
              <a className="c-error" onClick={e => { mutators.remove(index) }}>删除</a>
            </div>
          </div>
          <div className="pl15 pr15 c-999">
            {item?.description || '暂无描述'}
          </div>
        </div>
      })
      return <div>
        {value.length === 0 ? emptyUI : listUI}
        <FieldExtendModal
          value={valueEdited?.value}
          visible={!!valueEdited}
          toggleModal={() => setValueEdited(undefined)}
          onSave={onSave}
          extendsPropsSupported={props.props?.['x-field-extend-props']}
        />
      </div>
    }

  })

  registerVirtualBox('slot', props => {
    const { children } = props?.props?.['x-component-props']
    return <React.Fragment>
      {
        props?.props.babel ? es6Toes5(children) : children
      }
    </React.Fragment>
  })

  registerVirtualBox('btn', props => {
    return <Button {...props.props['x-component-props']}>
    </Button>
  })

  registerVirtualBox('img', props => {
    const XComponentProps = props?.props?.['x-component-props']
    return <img {...XComponentProps} style={{ maxWidth: '100%' }}/>
  })

  registerVirtualBox('html', props => {
    const { children } = props?.props?.['x-component-props']
    return <div dangerouslySetInnerHTML={{ __html: children }} />
  })

  // 链接
  registerVirtualBox('link', props => {
    const XComponentProps = props?.props?.['x-component-props']
    return <a {...XComponentProps}>
      {props?.children}
    </a>
  })

  // 轮播图
  registerVirtualBox('carousel', props => {
    const XComponentProps = props?.props?.['x-component-props']
    return <Carousel {...XComponentProps}>
      {props?.children}
    </Carousel>
  })

  // 地图显示
  registerVirtualBox('map', props => {
    return <Map {...props} />
  })

  registerFieldMiddleware((Field: any) => {
    return (fieldState: IFieldState) => {
      fieldState.form.setFieldState(fieldState.path, (newProps: IFieldState) => {
        // babel需要转换的属性
        const babelProps = newProps?.props['x-babel-props']
        if (babelProps && Array.isArray(babelProps)) {
          babelProps.forEach(path => {
            const pathArr = path.split('.*.') // 递归处理有通配符的路径
            const transformFun = (sourceArr: string[], parentPath = '') => {
              for (let i = 0; i < sourceArr.length; i++) {
                const val2 = FormPath.getIn(newProps?.props, parentPath)
                if (i === sourceArr.length - 1) { // 到达递归终点
                  if (typeof val2 === 'string') {
                    FormPath.setIn(newProps?.props, parentPath, es6Toes5(val2))
                  }
                } else {
                  for (let k in val2) {
                    let nextSourceArr = sourceArr.concat()
                    nextSourceArr.shift()
                    const nextPath = parentPath + `.${k}.` + sourceArr[i + 1]
                    transformFun(nextSourceArr, nextPath)
                  }
                }
              }
            }

            transformFun(pathArr, pathArr[0])
          })
          delete newProps?.props['x-babel-props'] // 编译结束后需要删除x-babel-props属性，避免多次编译
        }
      })
      return <Field {...fieldState} />
    }
  })
}
