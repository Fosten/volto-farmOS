export default function APISchema(farm) {
  farm.schema.fetch().then((schemata) => {
    farm.schema.set(schemata);
  });
}
