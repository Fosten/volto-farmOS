import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { SelectWidget } from '@plone/volto/components';

const Sidebar = (props) => {
  const { data, block, value, onChangeBlock } = props;

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>Select plant type</h2>
      </header>
      <SelectWidget
        id="plant_type_selector"
        title="Plant Typer"
        required={true}
        value={data.plant_type_selector ?? false}
        choices={[
          ['Celery','Celery'],
          ['Tomato','Tomato'],
          ['Pepper','Pepper'],
          ['Brown Onion','Brown Onion'],
          ['Green Onion','Green Onion'],
          ['Annuals','Annuals'],
          ['Daisy','Daisy'],
          ['Black-Eyed Susan','Black-Eyed Susan'],
          ['Iris','Iris'],
          ['Bearded Iris','Bearded Iris'],
          ['Potato','Potato'],
          ['Blueberry','Blueberry'],
          ['Carrots','Carrots']
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