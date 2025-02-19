const SetStaticFilter = () => {
  var staticfilter = {
    type: 'log--harvest',
    'asset.plant_type.id': '167966ad-f46d-4c1f-99da-d1ad83033458',
    'location.land_type': 'bed',
    timestamp: {
      $gte: '2016-01-01T00:00:00.000Z',
      $lte: '2038-01-01T00:00:00.000Z',
    },
    status: 'done',
  };
  var order = 'asc';
  return [staticfilter, order];
};

export default SetStaticFilter;
