import PlantAssetsView from '../../components/Blocks/PlantAssets/View';
import PlantAssetsEdit from '../../components/Blocks/PlantAssets/Edit';
import PlantLogsView from '../../components/Blocks/PlantLogs/View';
import PlantLogsEdit from '../../components/Blocks/PlantLogs/Edit';
import icon from '@plone/volto/icons/list-bullet.svg';

const customBlocks = {
  plantassets: {
    id: 'plantassets',
    title: 'Plant Assets',
    edit: PlantAssetsEdit,
    view: PlantAssetsView,
    icon: icon,
    group: 'text',
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  plantlogs: {
    id: 'plantlogs',
    title: 'Plant Logs',
    edit: PlantLogsEdit,
    view: PlantLogsView,
    icon: icon,
    group: 'text',
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
};
export default customBlocks;
