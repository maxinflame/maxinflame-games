import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  resolve: {
    extensions: ['.js', '.json'],
    extensionAlias: {
      '.js': ['.js', '.mjs', '.cjs'],
    },
  },

  entry: {
    life: './src/js/life.js',
    snake: './src/js/snake.js',
    tetris: './src/js/tetris.js',
    style: './src/scss/style.scss',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'www/js'),
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'sass-loader',
        ],
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg|ico|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: '../img/[name][ext]',
        },
      },

      {
        test: /\.(woff|woff2|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '../fonts/[name][ext]',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
    }),
  ],
};
