import farmOS from '@farmOS/farmOS.js';

const APILogin = async function () {
  const remoteConfig = {
    host: process.env.FARMOS_API_HOST,
    clientId: process.env.FARMOS_API_CLIENT_ID,
    clientSecret: process.env.FARMOS_API_CLIENT_SECRET,
    scope: process.env.FARMOS_API_SCOPE,
  };
  const options = { remote: remoteConfig };
  const farm = await farmOS(options);
  await farm.remote.authorize();
  return farm;
};

export default APILogin;
