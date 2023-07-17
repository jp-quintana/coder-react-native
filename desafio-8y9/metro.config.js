const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      components: path.resolve(__dirname, 'src/components'),
      screens: path.resolve(__dirname, 'src/screens'),
      data: path.resolve(__dirname, 'src/data'),
      helpers: path.resolve(__dirname, 'src/helpers'),
    },
    // Alternatively, you can use the 'root' option to define the base directory:
    // root: path.resolve(__dirname, 'src'),
  },
};
