import _ from 'lodash';
import { combineTwo } from '../helpers/combineTwo.helper';
import { customizer } from '../helpers/customizer.helper';

const WholeTypeResponse = async function (farm, props) {
  const WholeLandTypeResponse = async function (url, combodata) {
    combodata = combodata || {};
    await farm.remote.request(url).then(async (response) => {
      _.mergeWith(combodata, response.data, customizer);
      if (typeof response.data.links.next?.href !== 'undefined') {
        await WholeLandTypeResponse(response.data.links.next.href, combodata);
      }
    });
    var arr = [];
    for (let count = 0; count < combodata.data.length; count++) {
      var ok = combodata.data[count].attributes.label;
      var ok2 = combodata.data[count].attributes.drupal_internal__id;
      arr.push(ok2);
      arr.push(ok);
    }
    const landTypearray = combineTwo(arr);
    return landTypearray;
  };
  const ltr = await WholeLandTypeResponse(
    `${process.env.FARMOS_API_HOST}/api/land_type/land_type?sort=label`,
  );

  const WholePlantTypeResponse = async function (url, combodata) {
    combodata = combodata || {};
    await farm.remote.request(url).then(async (response) => {
      _.mergeWith(combodata, response.data, customizer);
      if (typeof response.data.links.next?.href !== 'undefined') {
        await WholePlantTypeResponse(response.data.links.next.href, combodata);
      }
    });
    var arr = [];
    for (let count = 0; count < combodata.data.length; count++) {
      var ok = combodata.data[count].attributes.name;
      var ok2 = combodata.data[count].id;
      arr.push(ok2);
      arr.push(ok);
    }
    const plantTypearray = combineTwo(arr);
    return plantTypearray;
  };
  const ptr = await WholePlantTypeResponse(
    `${process.env.FARMOS_API_HOST}/api/taxonomy_term/plant_type?sort=name`,
  );
  return [ltr, ptr];
};

export default WholeTypeResponse;
