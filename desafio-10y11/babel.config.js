module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            components: './src/components',
            screens: './src/screens',
            navigation: './src/navigation',
            data: './src/data',
            helpers: './src/helpers',
            store: './src/store',
            features: './src/features',
            hooks: './src/hooks',
          },
        },
      ],
    ],
  };
};
