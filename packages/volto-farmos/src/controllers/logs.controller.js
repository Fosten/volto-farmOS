import _ from 'lodash';
import { customizer } from '../helpers/customizer.helper';

const WholeDataResponse = async function (filterOK, farm) {
  let y = 0;
  let n = 20;
  var newarray = [];
  const filter = filterOK[0];
  const order = filterOK[1];
  const filtertype = filter['type'];
  const DataResponse = async function (combodata) {
    await farm.log.fetch({ filter, limit: Infinity }).then(async (response) => {
      response.data.map(async (ik) => {
        var activityid = ik.id;
        newarray.push(activityid);
      });
    });
    combodata = combodata || {};
    var newlyarray = [];
    let slicedArray = newarray.slice(y, n);
    const requests = slicedArray.map(async (idok) => {
      var filter = { type: filtertype, id: idok };
      const include = ['asset', 'location'];
      return farm.log.fetch({ filter, include, limit: 1 });
    });

    return new Promise((resolve, reject) => {
      Promise.allSettled(requests).then((results) => {
        results.forEach((result) => {
          const respP = result.value;
          var {
            data: [
              remoteLog,
              remoteAsset,
              remoteLocation,
              remoteLocation2,
              remoteLocation3,
              remoteLocation4,
              remoteLocation5,
            ],
          } = respP;
          if (typeof remoteLocation == 'undefined') {
            remoteLocation = { attributes: { name: null } };
          }
          if (
            typeof remoteAsset == 'undefined' ||
            typeof remoteAsset.relationships.plant_type == 'undefined'
          ) {
            remoteAsset = {
              attributes: { name: null },
              relationships: { plant_type: [{ id: null }] },
            };
          }
          const objectPName = [
            remoteLog?.attributes.name,
            remoteLog?.attributes.timestamp,
            remoteLog?.attributes.status,
            remoteAsset?.attributes.name,
            remoteLocation?.attributes.name,
            remoteLocation2?.attributes.name,
            remoteLocation3?.attributes.name,
            remoteLocation4?.attributes.name,
            remoteLocation5?.attributes.name,
          ];
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
          DataResponse(combodata).then(resolve).catch(reject);
        } else {
          var propertyValues = Object.values(combodata);
          if (order === 'asc') {
            propertyValues[0].sort(function (a, b) {
              if (a[1] === undefined) return 1;
              if (b[1] === undefined) return -1;
              return new Date(a[1]) - new Date(b[1]);
            });
          } else if (order === 'desc') {
            propertyValues[0].sort(function (a, b) {
              if (a[1] === undefined) return 1;
              if (b[1] === undefined) return -1;
              return new Date(b[1]) - new Date(a[1]);
            });
          }
          const sortedValues = propertyValues;
          resolve(sortedValues);
        }
      });
    });
  };

  const wdr = await DataResponse();
  return wdr;
};

export default WholeDataResponse;
