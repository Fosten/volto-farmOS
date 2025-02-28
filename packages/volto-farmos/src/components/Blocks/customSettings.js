import APISchema from '../../controllers/schema.controller';

const customSettings = {
  farmhost: process.env.FARMOS_API_HOST,
  farmschema: APISchema,
};
export default customSettings;
