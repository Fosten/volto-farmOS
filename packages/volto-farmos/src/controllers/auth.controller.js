import config from '@plone/volto/registry';
import farmOS from '@farmOS/farmOS.js';

const APILogin = async function () {
  const remoteConfig = {
    host: config.settings.farmhost,
    clientId: config.settings.farmclientId,
    clientSecret: config.settings.farmclientSecret,
    scope: config.settings.farmscope,
  };
  const options = { remote: remoteConfig };
  const farm = await farmOS(options);
  await farm.remote.authorize();
  return farm;
};

export default APILogin;
