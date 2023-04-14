import PlantAssetsView from '@Fosten/volto-farmOS/components/Blocks/PlantAssets/View';
import PlantAssetsEdit from '@Fosten/volto-farmOS/components/Blocks/PlantAssets/Edit';
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
  }
};
export default customBlocks;
