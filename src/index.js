import CrudApp from './CrudApp'
import OaConnector from './connectors/OaConnector'
import { install, components } from './install'

export default {
  version: '2.0.0',
  install,
  OaConnector,
  createApp: CrudApp.create,
  components
};
