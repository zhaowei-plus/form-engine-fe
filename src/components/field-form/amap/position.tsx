import React, { useState } from 'react'
import { Modal, Input } from 'antd'
import { Map } from 'react-amap'
import { PreviewText } from '@formily/react-shared-components'

const AMAP_KEY = '47e98be3124f1bdf3fd4105857f40b6f' // 地图key
export default (props: any) => {
  const { value, mutators, editable } = props
  const XcomponentProps = props.props['x-component-props']
  const [show, setShow] = useState(false)
  const [map, setMap] = useState(null)
  const [currentVal, setCurrentVal] = useState(value)
  const showMap = () => {
    setShow(true)
  }
  const mapEvents = {
    created: (e: any) => {
      console.log('map inited')
      setMap(e)
      AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker: any) => {
        const positionPicker = new PositionPicker({
          mode: 'dragMap', // 定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: e // 依赖地图对象
        })
        positionPicker.on('success', (result: any) => {
          setCurrentVal(result)
        })
        positionPicker.start()
      })
    }
  }
  const centerOption = value?.position ? { center: value?.position } : {}
  return <>
    {
      editable
        ? <Input { ...XcomponentProps } allowClear onChange={mutators.change} value={value?.address} readOnly addonAfter={editable && <a onClick={showMap}>位置</a>}/>
        : <PreviewText value={value?.address}/>
    }

    <Modal
      title={<span className="ellipsis nowrap db" style={{ overflow: 'hidden' }}>设定位置<span style={{ fontWeight: 'normal', fontSize: 14 }}>{currentVal?.address ? `（${currentVal.address}）` : ''}</span></span>}
      visible={show}
      onOk={() => {
        mutators.change(currentVal)
        setShow(false)
      }}
      bodyStyle={{
        padding: 0
      }}
      onCancel={
        () => {
          setShow(false)
        }
      }
    >
      <div style={{ width: '100%', height: 400 }}>
        <Map amapkey={AMAP_KEY} events={mapEvents} plugins={['ToolBar']} { ...centerOption } useAMapUI>
        </Map>
      </div>
    </Modal>
  </>
}
