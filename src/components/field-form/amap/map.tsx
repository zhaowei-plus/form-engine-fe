import React, { useState } from 'react'
import { Map, Markers } from 'react-amap'
const AMAP_KEY = '47e98be3124f1bdf3fd4105857f40b6f' // 地图key

export default (props: any) => {
  const XComponentProps = props.props['x-component-props']

  const mapEvents = {
    created: (e: any) => {
      console.log('map inited')
    }
  }

  const centerOption = XComponentProps?.center?.position ? { center: XComponentProps?.center?.position } : {}

  return <div style={{ width: '100%', height: XComponentProps?.height || 400 }}>
    <Map {...XComponentProps} amapkey={AMAP_KEY} events={mapEvents} plugins={['ToolBar']} { ...centerOption }>
      <Markers markers={XComponentProps?.markers}/>
    </Map>
  </div>
}
