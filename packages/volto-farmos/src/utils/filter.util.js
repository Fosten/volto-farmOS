const SetFilter = async function (dataProps) {
  const data = dataProps || {};
  var startdate = data.start_date_selector || '2016-01-01T00:00:00.000Z';
  var enddate = data.end_date_selector || '2038-01-01T00:00:00.000Z';
  var order = data.sort_selector || 'asc';

  if (
    (typeof data?.log_type_selector == 'undefined' &&
      typeof data?.plant_type_selector == 'undefined' &&
      typeof data?.land_type_selector == 'undefined') ||
    (data?.log_type_selector === '' &&
      data?.plant_type_selector === '' &&
      data?.land_type_selector === '')
  ) {
    let filter = {
      type: 'log--transplanting',
      'asset.plant_type.id': data?.plant_type_selector,
      'location.land_type': 'coldframe',
      timestamp: { $gte: startdate, $lte: enddate },
      status: 'done',
    };
    return [filter, order];
  } else {
    let filter = {
      type: data?.log_type_selector,
      'asset.plant_type.id': data?.plant_type_selector,
      'location.land_type': data?.land_type_selector,
      timestamp: { $gte: startdate, $lte: enddate },
      status: data?.status_selector,
    };
    return [filter, order];
  }
};
export default SetFilter;
