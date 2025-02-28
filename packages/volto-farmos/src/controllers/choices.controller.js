import config from '@plone/volto/registry';
import _ from 'lodash';
import { combineTwo } from '../helpers/combineTwo.helper';
import { customizer } from '../helpers/customizer.helper';

const WholeTypeResponse = async function (props) {
  const farm = await config.settings.farmschema();
  const WholeLandTypeResponse = async function (url, combodata) {
    combodata = combodata || {};
    try {
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
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
  const ltr = await WholeLandTypeResponse(
    `${config.settings.farmhost}/api/land_type/land_type?sort=label`,
  );

  const WholePlantTypeResponse = async function (url, combodata) {
    combodata = combodata || {};
    try {
      await farm.remote.request(url).then(async (response) => {
        _.mergeWith(combodata, response.data, customizer);
        if (typeof response.data.links.next?.href !== 'undefined') {
          await WholePlantTypeResponse(
            response.data.links.next.href,
            combodata,
          );
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
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
  const ptr = await WholePlantTypeResponse(
    `${config.settings.farmhost}/api/taxonomy_term/plant_type?sort=name`,
  );
  return [ltr, ptr];
};

export default WholeTypeResponse;
