const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');

var webpack_opts = {
  devtool: 'source-map',
  entry: './src/index.ts',
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        test: /\.ts$/,
        ts: {
          compiler: 'typescript',
          configFileName: 'tsconfig.json',
        },
        tslint: {
          emitErrors: true,
          failOnHint: true,
        },
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules', 'src'],
  },
  target: 'node',
};

module.exports = webpack_opts;
