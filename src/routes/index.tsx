import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Spin } from 'antd'
import routeConfig from './config'
import '@/index.less'

interface RouteProps {
  name: string,
  component?: string,
  path: string,
  children?: any
}

const R = ({ children, path, component }: RouteProps) => {
  return (
    <Route
      exact={!(children && children.length)}
      path={path}
      component={Loadable({
        loader: () => import(`@/views/${component}`),
        loading: () => <Spin spinning />
      })}
    />
  )
}

export default ({ defaultPath = '/form/list' }) =>
  <Switch>
    {
      routeConfig.map((route: RouteProps) =>
        route!.children!.length > 0 ? [
          <Route exact key={`/${route.path}`} path={`/${route.path}`}>
            {
              route.component ? <R {...route} /> : <Redirect to={`/${route.path}/${route.children[0].path}`} />
            }
          </Route>,
          ...route.children.map((child: RouteProps) => <R {...child} key={`/${route.path}/${child.path}`} path={`/${route.path}/${child.path}`} />)
        ] : <R {...route} key={`/${route.path}`} path={`/${route.path}`} />
      )
    }
    <Redirect path="" exact to={defaultPath} />
  </Switch>
