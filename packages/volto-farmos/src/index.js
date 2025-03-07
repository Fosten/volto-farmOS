import '@plone/volto/config';
import customBlocks from './components/Blocks/customBlocks';

const applyConfig = (config) => {
  if (__SERVER__) {
    const makeMiddlewares = require('./routes/logs.route.js').default;
    const makeMiddlewares2 = require('./routes/choices.route.js').default;
    config.settings.expressMiddleware = [
      ...config.settings.expressMiddleware,
      makeMiddlewares(),
      makeMiddlewares2(),
    ];
  }

  config.blocks = {
    ...config.blocks,
    blocksConfig: {
      ...config.blocks.blocksConfig,
      ...customBlocks,
    },
  };

  return config;
};

export default applyConfig;
