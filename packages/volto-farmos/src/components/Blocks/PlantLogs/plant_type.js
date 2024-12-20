import { useState, useEffect } from 'react';
import _ from 'lodash';
import { combineTwo } from '../../../components/Blocks/PlantLogs/combineTwo';
import { customizer } from '../../../components/Blocks/PlantLogs/customizer';
import schema from '../../../components/Blocks/PlantLogs/schema';

const WholePlantTypeResponse = (props) => {
  const [plantTypearray, setState2] = useState({});
  const [isPlantTypeBusy, setAxiosBusy] = useState(true);

  useEffect(() => {
    async function myResponse2(url, combodata) {
      var farm = await schema();
      combodata = combodata || {};
      try {
        await farm.remote.request(url).then(async (response) => {
          _.mergeWith(combodata, response.data, customizer);
          if (typeof response.data.links.next?.href !== 'undefined') {
            await myResponse2(response.data.links.next.href, combodata);
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
        setState2(plantTypearray);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        setAxiosBusy(true);
      }
      setAxiosBusy(false);
    }
    myResponse2(
      `${window.env.RAZZLE_FARMOS_API_HOST}/api/taxonomy_term/plant_type?sort=name`,
    );
  }, []);
  return [plantTypearray, isPlantTypeBusy];
};

export default WholePlantTypeResponse;
