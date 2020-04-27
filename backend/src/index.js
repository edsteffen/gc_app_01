const express = require('express');
const cors = require('cors');
const routes = require('./routes');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  try {
      console.log('Estou no CORS');
      let white_url = ['http://localhost:3000'];
      res.header('Access-Control-Allow-Origin', white_url);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      app.use(cors());
      next();
  } catch {
      console.log('ERRO no CORS');
      return res.status(400).json({ error: 'Requisição não Autorizada!' });
  }
});
app.use(routes);

let port = process.env.DEV_PORT_LISTEN;
app.listen(port);