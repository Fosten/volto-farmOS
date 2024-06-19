import PropTypes from 'prop-types';
import farmOS from '@farmOS/farmOS.js';

export async function loginSchema() {
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

  const APIlogin = () => {
    const username = window.env.RAZZLE_FARMOS_API_USERNAME;
    const password = window.env.RAZZLE_FARMOS_API_PASSWORD;
    return farm.remote.authorize(username, password);
  };
  async function setFarmSchema() {
    // Try the session storage first...
    let schema = JSON.parse(localStorage.getItem('schema'));
    if (schema == null) {
      // Not in session storage, so fetch schema from the farmOS host.
      await farm.schema.fetch();
      schema = farm.schema.get();
      // Cache in the session storage for next time.
      localStorage.setItem('schema', JSON.stringify(schema));
      await farm.schema.set(schema);
    } else {
      await farm.schema.set(schema);
    }
  }
  await APIlogin();
  await setFarmSchema();
  return farm;
}

loginSchema.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any),
};
