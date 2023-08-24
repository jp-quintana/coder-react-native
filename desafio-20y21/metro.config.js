const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      assets: path.resolve(__dirname, 'assets'),
      components: path.resolve(__dirname, 'src/components'),
      data: path.resolve(__dirname, 'src/data'),
      db: path.resolve(__dirname, 'src/db'),
      features: path.resolve(__dirname, 'src/features'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      navigation: path.resolve(__dirname, 'src/navigation'),
      screens: path.resolve(__dirname, 'src/screens'),
      services: path.resolve(__dirname, 'src/services'),
      store: path.resolve(__dirname, 'src/store'),
    },
    // Alternatively, you can use the 'root' option to define the base directory:
    // root: path.resolve(__dirname, 'src'),
  },
};
