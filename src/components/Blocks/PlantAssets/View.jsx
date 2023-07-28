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
  const [response, setState] = useState({});
  const [response2, setState2] = useState({});
  const [response3, setState3] = useState({});
  const [locationURL, setState4] = useState('null');
  const [planttypeURL, setState5] = useState('null');
  async function useResponse() {
    try {
      const response = await axios.get(
        `${window.env.RAZZLE_FARMOS_API_HOST}/api/asset/plant`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('token'))['access_token']
            }`,
          },
        },
      );
      setState(response.data);

      for (let count = 0; count < 13; count++) {
        const locationURL =
          response.data.data[count].relationships.location.links.related.href;
        setState4(locationURL);
        window.localStorage.setItem(
          `Location${count}`,
          JSON.stringify(locationURL),
        );
        const response2 = await axios.get(
          `${JSON.parse(localStorage.getItem(`Location${count}`))}`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('token'))['access_token']
              }`,
            },
          },
        );
        setState2(response2.data);
        window.localStorage.setItem(
          `LResponse${count}`,
          JSON.stringify(response2),
        );

        const planttypeURL =
          response.data.data[count].relationships.plant_type.links.related.href;
        setState5(planttypeURL);
        window.localStorage.setItem(
          `Planttype${count}`,
          JSON.stringify(planttypeURL),
        );
        const response3 = await axios.get(
          `${JSON.parse(localStorage.getItem(`Planttype${count}`))}`,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('token'))['access_token']
              }`,
            },
          },
        );
        setState3(response3.data);
        window.localStorage.setItem(
          `PResponse${count}`,
          JSON.stringify(response3),
        );
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
  useEffect(() => {
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
    farm.remote.authorize(username, password).then(useResponse());
  }, []);

  const renderthis = () => {
    return (
      <div className="container">
        <h2>Plant Assets</h2>
        <div className="plantassets">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <th>Name</th>
                <th>Status</th>
                <th>Plant Type</th>
                <th>Location1</th>
                <th>Location2</th>
                <th>Location3</th>
                <th>Location4</th>
                <th>Location5</th>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {response.data?.map((item, i) => {
                let newObject1 = JSON.parse(
                  localStorage.getItem(`LResponse${i}`),
                );
                let newObject2 = JSON.parse(
                  localStorage.getItem(`PResponse${i}`),
                );
                return (
                  <Table.Row key={i}>
                    <td>{item.attributes.name}</td>
                    <td>{item.attributes.status}</td>
                    {newObject2.data.data?.map((item, i) => {
                      return <td key={i}>{item.attributes.name}</td>;
                    })}
                    {newObject1.data.data?.map((item, i) => {
                      return <td key={i}>{item.attributes.name}</td>;
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
};

export default View;
