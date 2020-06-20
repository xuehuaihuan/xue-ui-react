process.env.NODE_ENV = 'development';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
        },
      ],
      '@babel/plugin-proposal-class-properties',
    ],
  },
};

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '..', 'examples/index.tsx'),

  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
        ],
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        shared: {
          name: 'shared',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin(
      {
        inject: true,
        template: 'public/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      },
    ),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      'xue-ui-react': path.join(__dirname, '..', 'dist/xue-ui-react.esm.js'),
      // 'xue-ui-react': path.join(__dirname, '..', 'src/index.tsx'),
      '@': path.resolve(__dirname, '..', 'src'),
    },
  },
};
