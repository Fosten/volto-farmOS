import '@plone/volto/config';
import customBlocks from './components/Blocks/customBlocks';
import customSettings from './components/Blocks/customSettings';

const applyConfig = (config) => {
  config.blocks = {
    ...config.blocks,
    blocksConfig: {
      ...config.blocks.blocksConfig,
      ...customBlocks,
    },
  };
  config.settings = {
    ...config.settings,
    ...customSettings,
  };
  return config;
};

export default applyConfig;
