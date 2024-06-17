import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { SelectWidget, DatetimeWidget } from '@plone/volto/components';
import farmOS from '@farmOS/farmOS.js';
import _ from 'lodash';

const Sidebar = (props) => {
  const { data, block, onChangeBlock } = props;
  const [newarray, setState2] = useState({});
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
    function combineTwo(inputArray) {
      //Starting with the beginning of the array, this function combines index 0 with 1, 2 with 3, and so on for the entire length of the array
      var result = []; //this will the variable that we store our result in
      for (var i = 0; i < inputArray.length; i += 2) {
        //This for loop iterates through every other index of the array... for example: 0, 2, 4, etc.
        result.push([inputArray[i], inputArray[i + 1]]); //Adds i and i+1 as a new array to the result array
      }
      return result;
    }

    async function myResponse2(url, combodata) {
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
        const newarray = combineTwo(arr);
        setState2(newarray);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        setAxiosBusy(true);
      }
      setAxiosBusy(false);
    }
    async function myResponse() {
      await LoginSchema(farm);
      myResponse2(`${window.env.RAZZLE_FARMOS_API_HOST}/api/taxonomy_term/plant_type?sort=name`);
    }
    myResponse();
  }, []);

  const logchoices = [
    ['log--activity', 'log--activity'],
    ['log--harvest', 'log--harvest'],
    ['log--input', 'log--input'],
    ['log--maintenance', 'log--maintenance'],
    ['log--observation', 'log--observation'],
    ['log--purchase', 'log--purchase'],
    ['log--sale', 'log--sale'],
    ['log--seeding', 'log--seeding'],
    ['log--transplanting', 'log--transplanting'],
  ];

  const renderthis = () => {
    return isAxiosBusy ? (
      <div className="App">Loading...</div>
    ) : (
      <Segment.Group raised>
        <header className="header pulled">
          <h2>Select filters</h2>
        </header>
        <SelectWidget
          id="log_type_selector"
          title="Log Types"
          required={false}
          value={data.log_type_selector ?? ''}
          choices={logchoices}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        />
        <SelectWidget
          id="plant_type_selector"
          title="Plant Types"
          required={false}
          value={data.plant_type_selector ?? ''}
          choices={newarray}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        />
        <SelectWidget
          id="status_selector"
          title="Status"
          required={false}
          value={data.status_selector ?? ''}
          choices={[
            ['done', 'Done'],
            ['pending', 'Pending'],
          ]}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        />
        <DatetimeWidget
          id="start_date_selector"
          title="Start Date"
          required={false}
          value={data.start_date_selector ?? ''}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        />
        <DatetimeWidget
          id="end_date_selector"
          title="End Date"
          required={false}
          value={data.end_date_selector ?? ''}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        />
        <header className="header pulled">
          <h2>Select sort</h2>
        </header>
        <SelectWidget
          id="sort_selector"
          title="Sort"
          required={false}
          value={data.sort_selector ?? ''}
          choices={[
            ['asc', 'Ascending'],
            ['desc', 'Descending'],
          ]}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        />
      </Segment.Group>
    );
  };
  var yoyo = renderthis();
  return yoyo;
};

Sidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default injectIntl(Sidebar);
