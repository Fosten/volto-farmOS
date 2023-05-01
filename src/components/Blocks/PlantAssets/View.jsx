import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

/**
 * View description block.
 * @module components/manage/Blocks/Description/View
 */

import PropTypes from 'prop-types';
import farmOS from '@farmOS/farmOS.js';

/**
 * View description block class.
 * @class View
 * @extends Component
 */
const View = (props) => {
    const [response, setState] = useState({});
    async function useResponse() {
      try {
        const response = await axios.get(
          `${window.env.RAZZLE_FARMOS_API_HOST}/api/asset/plant`,
          {headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))['access_token']}`
          }}
        )
        setState(response.data);
        window.localStorage.setItem(0, JSON.stringify(response));
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
        setToken: token => localStorage.setItem('token', JSON.stringify(token)),
      };
      const options = { remote: remoteConfig }
      const farm = farmOS(options);
      const username = window.env.RAZZLE_FARMOS_API_USERNAME;
      const password = window.env.RAZZLE_FARMOS_API_PASSWORD;  
      farm.remote.authorize(username, password)
      .then(useResponse());
    }, []);
    return (
        <div className="container">
          <h2>Plant Assets</h2>
          <div className="plantassets">
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Plant Type</th>
                </Table.Row>
              </Table.Header>
              <Table.Body>
              {response.data?.map((item, i) => {
                return (
                  <Table.Row key={i}>
                  <td>{item.attributes.name}</td>
                  <td>{item.attributes.status}</td>
                  <td>{item.relationships.location.data[0]?.id}</td>
                  <td>{item.relationships.plant_type.data[0]?.id}</td>
                  </Table.Row>
                );
                })}
              </Table.Body>
            </Table>
          </div>
        </div>
    )
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
