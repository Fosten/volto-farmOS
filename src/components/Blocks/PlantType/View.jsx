import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import farmOS from '@farmOS/farmOS.js';

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
  const [response, setState] = useState({});
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

  useEffect(() => {
    const farmOSlogin = APIlogin();
    async function myResponse() {
      try {
        await APIlogin();
        const response = await axios.get(`${window.env.RAZZLE_FARMOS_API_HOST}/api/asset/plant`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))['access_token']}`,
          },
        });
        setState(response.data);

        for (let count = 0; count < 52; count++) {
          const origplantID = response.data?.data[count].id;

          const locationURL = response.data?.data[count].relationships.location.links.related.href;
          const response2 = await axios.get(JSON.parse(`${JSON.stringify(locationURL)}`), {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))['access_token']}`,
            },
          });
          var arr = [];
          for (let Lcount = 0; Lcount < 5; Lcount++) {
            var i = response2.data.data[Lcount]?.attributes.name;
            arr.push(i);
            window.localStorage.setItem(`LResponse${origplantID}`, JSON.stringify(arr));
          }
          const planttypeURL = response.data.data[count].relationships.plant_type.links.related.href;
          const response3 = await axios.get(JSON.parse(`${JSON.stringify(planttypeURL)}`), {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))['access_token']}`,
            },
          });
          window.localStorage.setItem(`PResponse${origplantID}`, response3.data.data[0]?.attributes.name);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      setAxiosBusy(false);
    }
    farmOSlogin.then(myResponse);
  }, []);

  const renderthis = () => {
    return isAxiosBusy ? (
      <div className="App">Loading...</div>
    ) : (
      <div className="container">
        <h2>{data?.plant_type_selector} Plants History</h2>
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
              {response.data
                ?.filter((plant) => plant.attributes.name.includes(data?.plant_type_selector))
                .map((item, i) => {
                  const matchingplantID = item.id;
                  let newObjectL = JSON.parse(localStorage.getItem(`LResponse${matchingplantID}`));
                  let newObjectP = localStorage.getItem(`PResponse${matchingplantID}`);
                  return (
                    <Table.Row key={i}>
                      <td>{item.attributes.name}</td>
                      <td>{item.attributes.status}</td>
                      <td>{newObjectP}</td>
                      {newObjectL?.map((item, i) => {
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
