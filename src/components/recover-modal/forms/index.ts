import { connect, registerFormFields } from '@formily/antd'

import Versions from './versions'

registerFormFields({
  'versions': connect()(Versions)
})
