import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { SelectWidget, DatetimeWidget } from '@plone/volto/components';
import WholePlantTypeResponse from '@Fosten/volto-farmOS/components/Blocks/PlantLogs/plant_type';

const Sidebar = (props) => {
  const { data, block, onChangeBlock } = props;
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

  const value = WholePlantTypeResponse(props);
  var newarray = value[0];
  var isAxiosBusy = value[1];

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

Sidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default injectIntl(Sidebar);
