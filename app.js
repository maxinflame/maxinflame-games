import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/pug'));

app.use(express.static('www'));

// Pages
app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/snake', (req, res) => {
  res.render('pages/snake');
});

app.get('/tetris', (req, res) => {
  res.render('pages/tetris');
});

app.get('/life', (req, res) => {
  res.render('pages/life');
});

app.get('/score-table', (req, res) => {
  res.render('pages/score-table');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
