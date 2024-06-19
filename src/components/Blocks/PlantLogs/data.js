import { useState, useEffect } from 'react';
import _ from 'lodash';
import { customizer } from '@Fosten/volto-farmOS/components/Blocks/PlantLogs/customizer';
import { loginSchema } from '@Fosten/volto-farmOS/components/Blocks/PlantLogs/loginSchema';

const WholeDataResponse = (props) => {
  const { data } = props;
  const [propertyValues, setState] = useState({});
  const [hasFilter, setFilter] = useState(true);
  const [isAxiosBusy, setAxiosBusy] = useState(true);

  useEffect(() => {
    let y = 0;
    let n = 20;
    var newarray = [];

    async function myResponse2(combodata) {
      var farm = await loginSchema();
      if ((typeof data?.log_type_selector == 'undefined' && typeof data?.plant_type_selector == 'undefined') || (data?.log_type_selector === '' && data.plant_type_selector === '')) {
        setFilter(false);
      } else {
        combodata = combodata || {};
        var newlyarray = [];
        var startdate = data.start_date_selector || '2016-01-01T00:00:00.000Z';
        var enddate = data.end_date_selector || '2038-01-01T00:00:00.000Z';
        try {
          if (newarray.length === 0) {
            var filter = {
              type: data?.log_type_selector,
              'asset.plant_type.id': data?.plant_type_selector,
              timestamp: { $gte: startdate, $lte: enddate },
              status: data?.status_selector,
            };
            await farm.log.fetch({ filter, limit: Infinity }).then(async (response) => {
              response.data.map(async (ik) => {
                var activityid = ik.id;
                newarray.push(activityid);
              });
            });
          }
          let slicedArray = newarray.slice(y, n);
          const requests = slicedArray.map(async (idok) => {
            const filter = { type: data?.log_type_selector, id: idok };
            const include = ['asset', 'location'];
            return farm.log.fetch({ filter, include, limit: 1 });
          });

          Promise.all(requests).then((responses) => {
            responses.forEach(async (respP) => {
              var {
                data: [remoteLog, remoteAsset, remoteLocation],
              } = respP;
              if (typeof remoteLocation == 'undefined') {
                remoteLocation = { attributes: { name: null } };
              }
              if (typeof remoteAsset == 'undefined' || typeof remoteAsset.relationships.plant_type == 'undefined') {
                remoteAsset = {
                  attributes: { name: null },
                  relationships: { plant_type: [{ id: null }] },
                };
              }
              const objectPName = [remoteLog?.attributes.name, remoteLog?.attributes.timestamp, remoteLog?.attributes.status, remoteAsset?.attributes.name, remoteLocation?.attributes.name, remoteLog?.attributes.timestamp];
              newlyarray.push(objectPName);
            });
            var okthen = { newlyarray };
            if (n <= newarray.length) {
              y = n;
              n = n + 20;
            }
            if (newlyarray.length <= 20) {
              _.mergeWith(combodata, okthen, customizer);
            }
            if (newlyarray.length === 20) {
              myResponse2(combodata);
            } else {
              var propertyValues = Object.values(combodata);
              if (data?.sort_selector === 'asc') {
                propertyValues[0].sort(function (a, b) {
                  return a[1] > b[1];
                });
              } else if (data?.sort_selector === 'desc') {
                propertyValues[0].sort(function (a, b) {
                  return a[1] < b[1];
                });
              }
              setState(propertyValues);
              setAxiosBusy(false);
            }
          });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
          setAxiosBusy(true);
        }
      }
    }
    myResponse2();
  }, [data]);
  return [propertyValues, hasFilter, isAxiosBusy];
};

export default WholeDataResponse;
