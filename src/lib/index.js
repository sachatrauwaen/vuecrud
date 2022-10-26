import CrudApp from '../demo/CrudApp'
import OaConnector from './connectors/OaConnector'
import AbpConnector from './connectors/AbpConnector'
import { install, components } from './utils/install'
import defaults from './utils/defaults'

/* Library public API */
export default {
    version: '2.0.0',
    install,
    OaConnector,
    AbpConnector,
    createApp: CrudApp.create,
    createAbp: CrudApp.createAbp,
    createSettings: CrudApp.createSettings,
    components,
    defaults:defaults
};
