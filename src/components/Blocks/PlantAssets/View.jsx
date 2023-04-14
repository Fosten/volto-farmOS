import React, { Fragment, useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

/**
 * View description block.
 * @module components/manage/Blocks/Description/View
 */

import PropTypes from 'prop-types';

/**
 * View description block class.
 * @class View
 * @extends Component
 */
const View = (props) => {
    const { content } = props;
    const [response, setState] = useState({});
    async function useResponse() {
      try {
        const response = await axios.get(
          `https://farmos.duckdns.org:2443/api/asset/plant`,
        );
        setState(response.data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
    useEffect(() => {
      useResponse();
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
                </Table.Row>
              </Table.Header>
              <Table.Body>
              <Table.Row>
                {response.data?.map((item, i) => {
                return (
                    <Fragment key={i}>
                    <td>{item.attributes.name}</td>
                    <td>{item.attributes.status}</td>
                    </Fragment>
                );
                })}
              </Table.Row>
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
