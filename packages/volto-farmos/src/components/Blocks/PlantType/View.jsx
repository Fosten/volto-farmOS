import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import farmOS from '@farmOS/farmOS.js';
import _ from 'lodash';

/**
 * View description block.
 * @module components/manage/Blocks/Description/View
 */

/**
 * View description block class.
 * @class View
 * @extends Component
 */

const View = (props) => {
  const { data } = props;
  const [combodata, setState] = useState({});
  const [arrayP, setState2] = useState({});
  const [arrayL, setState3] = useState({});
  const [isAxiosBusy, setAxiosBusy] = useState(true);

  const APIlogin = () => {
    const remoteConfig = {
      host: window.env.RAZZLE_FARMOS_API_HOST,
      clientId: window.env.RAZZLE_FARMOS_API_CLIENT_ID,
      clientSecret: window.env.RAZZLE_FARMOS_API_CLIENT_SECRET,
      scope: window.env.RAZZLE_FARMOS_API_SCOPE,
      getToken: () => JSON.parse(localStorage.getItem('token')),
      setToken: (token) => localStorage.setItem('token', JSON.stringify(token)),
    };
    const options = { remote: remoteConfig };
    const farm = farmOS(options);
    const username = window.env.RAZZLE_FARMOS_API_USERNAME;
    const password = window.env.RAZZLE_FARMOS_API_PASSWORD;
    return farm.remote.authorize(username, password);
  };

  function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  }

  useEffect(() => {
    const farmOSlogin = APIlogin();
    async function myResponse(url, combodata) {
      combodata = combodata || {};
      try {
        await APIlogin();
        await axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))['access_token']}`,
            },
          })
          .then(async (response) => {
            _.mergeWith(combodata, response.data, customizer);
            if (typeof response.data.links.next?.href !== 'undefined') {
              await myResponse(response.data.links.next.href, combodata);
            }
          });
        setState(combodata);
        var arrayL = [];
        var arrayP = [];

        for (let count = 0; count < combodata.data.length; count++) {
          const origplantID = combodata?.data[count].id;

          const locationURL =
            combodata?.data[count].relationships.location.links.related.href;
          const response2 = await axios.get(
            JSON.parse(`${JSON.stringify(locationURL)}`),
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))['access_token']}`,
              },
            },
          );
          var arr = [];
          for (let Lcount = 0; Lcount < 5; Lcount++) {
            var i = response2.data.data[Lcount]?.attributes.name;
            arr.push(i);
          }
          const objectLName = {
            [`${origplantID}`]: arr,
          };
          arrayL.push({ objectLName });
          const planttypeURL =
            combodata?.data[count].relationships.plant_type.links.related.href;
          const response3 = await axios.get(
            JSON.parse(`${JSON.stringify(planttypeURL)}`),
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))['access_token']}`,
              },
            },
          );
          const objectPName = {
            [`${origplantID}`]: response3.data.data[0]?.attributes.name,
          };
          arrayP.push({ objectPName });
        }
        setState3(arrayL);
        setState2(arrayP);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        setAxiosBusy(true);
      }
      setAxiosBusy(false);
    }
    farmOSlogin.then(
      myResponse(
        `${window.env.RAZZLE_FARMOS_API_HOST}/api/asset/plant?sort=name`,
      ),
    );
  }, []);

  const renderthis = () => {
    return isAxiosBusy ? (
      <div className="App">Loading...</div>
    ) : (
      <div className="container">
        <h2>Plant Assets</h2>
        <div className="plantassets">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <th>Name</th>
                <th>Status</th>
                <th>Plant Type</th>
                <th>Location 1</th>
                <th>Location 2</th>
                <th>Location 3</th>
                <th>Location 4</th>
                <th>Location 5</th>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {combodata?.data
                .filter((plant) =>
                  plant.relationships.plant_type.data[0].id.includes(
                    data?.plant_type_selector,
                  ),
                )
                .map((item, i) => {
                  const matchingplantID = item.id;
                  for (let p of arrayP) {
                    for (const z of Object.values(p)) {
                      for (const y of Object.keys(z)) {
                        if (y === matchingplantID)
                          var valueP = Object.values(z);
                      }
                    }
                  }
                  for (let p of arrayL) {
                    for (const z of Object.values(p)) {
                      for (const y of Object.keys(z)) {
                        if (y === matchingplantID)
                          var valueL = Object.values(z)[0];
                      }
                    }
                  }
                  return (
                    <Table.Row key={i}>
                      <td>{item.attributes.name}</td>
                      <td>{item.attributes.status}</td>
                      <td>{valueP}</td>
                      {valueL?.map((item, i) => {
                        return <td key={i}>{item}</td>;
                      })}
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  };
  var yoyo = renderthis();
  return yoyo;
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */

View.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.shape({
    plant_type_selector: PropTypes.string,
  }),
};

export default View;
