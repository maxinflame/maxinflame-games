import path from 'path';
import { fileURLToPath } from 'url';

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
  },
  output: {
    filename: '[name].js',
    path: __dirname,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
