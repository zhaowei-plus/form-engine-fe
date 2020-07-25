import { connect, registerFormFields } from '@formily/antd'

import IndustryTags from './industry-tags'

registerFormFields({
  'industry-tags': connect()(IndustryTags)
})
