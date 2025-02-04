import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import WholeDataResponse from '../../../components/Blocks/PlantLogs/data';

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
  const value = WholeDataResponse(props);
  var propertyValues = value[0];
  var hasFilter = value[1];
  var isAxiosBusy = value[2];
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
                      <td>{item[1]?.substring(0, 10)}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>{item[4]}</td>
                      <td>{item[5]}</td>
                      <td>{item[6]}</td>
                      <td>{item[7]}</td>
                      <td>{item[8]}</td>
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
    <div className="App">
      No Type Filter is set. Too many results. Please set at least one Type
      Filter...
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */

View.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.objectOf(PropTypes.any),
};

export default View;
