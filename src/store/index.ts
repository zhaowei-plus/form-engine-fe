import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import widgets from './widgets'
import prepare from './prepare'
import config from './config'
import designResult from './design-result'

const enhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools(
  applyMiddleware(thunk)
  // other store enhancers if any
) : applyMiddleware(thunk)

export default createStore(combineReducers({
  widgets,
  prepare,
  config,
  designResult
}), enhancers)
