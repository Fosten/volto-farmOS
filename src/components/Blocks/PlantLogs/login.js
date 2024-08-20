import farmOS from '@farmOS/farmOS.js';
import config from '@plone/volto/registry';

export default async function login() {
  const remoteConfig = {
    host: window.env.RAZZLE_FARMOS_API_HOST,
    clientId: window.env.RAZZLE_FARMOS_API_CLIENT_ID,
    clientSecret: window.env.RAZZLE_FARMOS_API_CLIENT_SECRET,
    scope: window.env.RAZZLE_FARMOS_API_SCOPE,
    getToken: () => JSON.parse(localStorage.getItem('token')),
    setToken: (token) => localStorage.setItem('token', JSON.stringify(token)),
  };

  const options = { remote: remoteConfig };
  const farm = farmOS(options);

  await farm.remote.authorize(config.settings.farmUser, config.settings.farmPw);
  return farm;
}
