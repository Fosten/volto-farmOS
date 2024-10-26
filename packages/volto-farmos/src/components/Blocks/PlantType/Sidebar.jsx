import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { SelectWidget } from '@plone/volto/components';
import axios from 'axios';
import farmOS from '@farmOS/farmOS.js';
import _ from 'lodash';

const Sidebar = (props) => {
  const { data, block, onChangeBlock } = props;
  const [newarray, setState2] = useState({});
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
        var arr = [];
        function combineTwo(inputArray) {
          //Starting with the beginning of the array, this function combines index 0 with 1, 2 with 3, and so on for the entire length of the array
          var result = []; //this will the variable that we store our result in
          for (var i = 0; i < inputArray.length; i += 2) {
            //This for loop iterates through every other index of the array... for example: 0, 2, 4, etc.
            result.push([inputArray[i], inputArray[i + 1]]); //Adds i and i+1 as a new array to the result array
          }
          return result;
        }
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
    farmOSlogin.then(
      myResponse(
        `${window.env.RAZZLE_FARMOS_API_HOST}/api/taxonomy_term/plant_type?sort=name`,
      ),
    );
  }, []);

  const renderthis = () => {
    return isAxiosBusy ? (
      <div className="App">Loading...</div>
    ) : (
      <Segment.Group raised>
        <header className="header pulled">
          <h2>Select plant type</h2>
        </header>
        <SelectWidget
          id="plant_type_selector"
          title="Plant Type"
          required={true}
          value={data.plant_type_selector ?? false}
          choices={newarray}
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
