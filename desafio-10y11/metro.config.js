const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      components: path.resolve(__dirname, 'src/components'),
      screens: path.resolve(__dirname, 'src/screens'),
      navigation: path.resolve(__dirname, 'src/navigation'),
      data: path.resolve(__dirname, 'src/data'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      store: path.resolve(__dirname, 'src/store'),
      features: path.resolve(__dirname, 'src/features'),
      hooks: path.resolve(__dirname, 'src/hooks'),
    },
    // Alternatively, you can use the 'root' option to define the base directory:
    // root: path.resolve(__dirname, 'src'),
  },
};
