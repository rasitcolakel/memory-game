const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
module.exports = {
  resolver: {
    blacklistRE: /#current-cloud-backend\/.*/,
    assetExts: [...defaultConfig.resolver.assetExts, "db"],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
