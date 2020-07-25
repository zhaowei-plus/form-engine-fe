import { registerHttpUrlMap } from './window'

registerHttpUrlMap({
  form: {
    list: '/form-engine/form/list',
    checkFormKey: '/form-engine/form/form_key/check',
    create: '/form-engine/form/create',
    update: '/form-engine/form/update',
    detail: '/form-engine/form/detail',
    delete: '/form-engine/form/delete',
    copy: '/form-engine/form/copy',
    release: '/form-engine/form/release',
    history: '/form-engine/form/release/history',
    rollback: '/form-engine/form/rollback',
    draft: '/form-engine/form/define_draft/detail',
    draftUpdate: '/form-engine/form/define_draft/update',
    draftCreate: '/form-engine/form/define_draft/create',

    scriptSelect: '/script-engine/scriptConfig/scriptConfig/scriptSelects',
    scriptDetail: '/script-engine/scriptConfig/scriptConfig/getScriptDetail',
    scriptTest: '/script-engine/userScript/userScript/execute'
  },
  config: {
    tags: '/engine-config/tag/list',
    tagsQuery: '/engine-config/tag/query',
    libraries: '/engine-config/datasource/getDatasource'
  }
})
