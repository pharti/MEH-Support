module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          components: './src/components',
          containers: './src/containers',
          config: './src/config',
          actions: './src/actions',
          constants: './src/constants',
          helpers: './src/helpers',
          images: './src/images',
          reducers: './src/reducers',
          store: './src/store',
          utils: './src/utils',
          hoc: './src/hoc',
        },
      },
    ],
  ],
};
