/** @format */

import React from 'react'
import './index.less'
import { Provider } from 'react-redux'
import store from '@/store'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import Routes from '@/routes'
import 'antd/dist/antd.css'

moment.locale('zh-cn')
export default (
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <div className='global__form'>
        <Routes />
      </div>
    </Provider>
  </ConfigProvider>
)
