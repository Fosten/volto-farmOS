import APILogin from './auth.controller';

const APISchema = async function () {
  async function setFarmSchema() {
    await farm.schema.fetch();
    const schema = farm.schema.get();
    await farm.schema.set(schema);
    return farm;
  }
  const farm = await APILogin();
  const schema = await setFarmSchema(farm);

  return schema;
};

export default APISchema;
