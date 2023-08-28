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
            assets: './assests',
            components: './src/components',
            data: './src/data',
            db: './src/db',
            features: './src/features',
            helpers: './src/helpers',
            hooks: './src/hooks',
            navigation: './src/navigation',
            screens: './src/screens',
            services: './src/services',
            store: './src/store',
          },
        },
      ],
    ],
  };
};
