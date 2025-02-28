import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { SelectWidget, DatetimeWidget } from '@plone/volto/components';

const Sidebar = (props) => {
  const { data, block, onChangeBlock } = props;
  const [landTypearray, setState3] = useState([]);
  const [plantTypearray, setState4] = useState([]);
  const [isAxiosBusy, setAxiosBusy] = useState(true);
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
  useEffect(() => {
    function fetchData() {
      fetch('/choices')
        .then((response) => response.json())
        .then((json) => {
          const landTypearray = Object.values(json)[0];
          setState3(landTypearray);
          const plantTypearray = Object.values(json)[1];
          setState4(plantTypearray);
          setAxiosBusy(false);
        });
    }
    fetchData();
  }, []);

  const renderthis = () => {
    return isAxiosBusy ? (
      <div className="App">Loading...</div>
    ) : (
      <Segment.Group raised>
        <header className="header pulled">
          <h2>Select Type Filters</h2>
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
          choices={plantTypearray}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        />
        <SelectWidget
          id="land_type_selector"
          title="Land Types"
          required={false}
          value={data.land_type_selector ?? ''}
          choices={landTypearray}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        />
        <header className="header pulled">
          <h2>Select Status/Date Filters</h2>
        </header>
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
          <h2>Select Sort</h2>
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
