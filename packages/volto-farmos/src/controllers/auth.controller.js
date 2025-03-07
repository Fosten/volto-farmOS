import farmOS from 'farmos';

let token = {};
const remoteConfig = {
  host: process.env.FARMOS_API_HOST,
  clientId: process.env.FARMOS_API_CLIENT_ID,
  getToken: () => token,
  setToken: (t) => {
    token = t;
  },
};
const options = { remote: remoteConfig };

export const farm = farmOS(options);
export const session = farm.remote.authorize(
  process.env.FARMOS_API_USERNAME,
  process.env.FARMOS_API_PASSWORD,
);
