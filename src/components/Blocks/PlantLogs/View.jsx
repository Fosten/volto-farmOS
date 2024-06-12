import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
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
  const [propertyValues, setState] = useState({});
  const [hasFilter, setFilter] = useState(true);
  const [isAxiosBusy, setAxiosBusy] = useState(true);
  function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
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

    async function LoginSchema() {
      const APIlogin = () => {
        const username = window.env.RAZZLE_FARMOS_API_USERNAME;
        const password = window.env.RAZZLE_FARMOS_API_PASSWORD;
        return farm.remote.authorize(username, password);
      };
      async function setFarmSchema() {
        // Try the session storage first...
        let schema = JSON.parse(localStorage.getItem('schema'));
        if (schema == null) {
          // Not in session storage, so fetch schema from the farmOS host.
          await farm.schema.fetch();
          schema = farm.schema.get();
          // Cache in the session storage for next time.
          localStorage.setItem('schema', JSON.stringify(schema));
        } else {
          await farm.schema.set(schema);
        }
      }
      await APIlogin();
      setFarmSchema();
    }

    let y = 0;
    let n = 20;
    var newarray = [];

    async function myResponse2(combodata) {
      if (typeof data?.log_type_selector == 'undefined' && typeof data?.plant_type_selector == 'undefined') {
        setFilter(false);
      } else {
        combodata = combodata || {};
        var newlyarray = [];
        try {
          if (newarray.length === 0) {
            var filter = typeof data?.log_type_selector !== 'undefined' ? { type: data?.log_type_selector, 'asset.plant_type.id': data?.plant_type_selector } : { 'asset.plant_type.id': data?.plant_type_selector };
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
              const objectPName = [remoteLog?.attributes.name, remoteLog?.attributes.timestamp, remoteLog?.attributes.status, remoteAsset?.attributes.name, remoteLocation?.attributes.name];
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
    async function myResponse() {
      await LoginSchema(farm);
      myResponse2();
    }
    myResponse();
  }, [data]);

  const renderthis = () => {
    return hasFilter ? (
      isAxiosBusy ? (
        <div className="App">Loading...</div>
      ) : (
        <div className="container">
          <h2>Plant Logs</h2>
          <div className="plantlogs">
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Asset</th>
                  <th>Location 1</th>
                  <th>Location 2</th>
                  <th>Location 3</th>
                  <th>Location 4</th>
                  <th>Location 5</th>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {propertyValues[0].length > 0 ? (
                  propertyValues[0].map((item, i) => {
                    return (
                      <Table.Row key={i}>
                        <td>{item[0]}</td>
                        <td>{item[1].substring(0, 10)}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[4]}</td>
                      </Table.Row>
                    );
                  })
                ) : (
                  <Table.Row>
                    <td>
                      <strong>No results found</strong>
                    </td>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
      )
    ) : (
      <div className="App">No Filter is set. Too many results. Please set at least one filter...</div>
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
    log_type_selector: PropTypes.string,
  }),
};

export default View;
