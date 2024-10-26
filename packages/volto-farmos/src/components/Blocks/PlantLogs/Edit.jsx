import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import View from './View';
import Sidebar from './Sidebar';

const Edit = (props) => {
  const { selected, data } = props;
  return (
    <div>
      <SidebarPortal selected={selected}>
        <Sidebar {...props} />
      </SidebarPortal>
      <View data={data} />
    </div>
  );
};

export default Edit;
