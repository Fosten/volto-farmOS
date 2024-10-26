import PropTypes from 'prop-types';
import login from '../../../components/Blocks/PlantLogs/login.js';

export default async function schema() {
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
    return farm;
  }
  const farm = await login();
  return await setFarmSchema(farm);
}

schema.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any),
};
