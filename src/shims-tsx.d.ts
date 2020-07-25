import { EscHttpInstance } from './http'

declare global {
  interface Window {
    _MICRO_APP_CONFIG: {
      http: EscHttpInstance
      addReactRoutes: (jsx: JSX.Element) => void
      registerHttpUrlMap: (urlMap: {
        [module: string]: {
          [uri: string]: string
        }
      }) => void,
      OptionsBar: (props: {
        title: string
        center?: JSX.Element
        right?: JSX.Element
      }) => JSX.Element
    }
  }
}
