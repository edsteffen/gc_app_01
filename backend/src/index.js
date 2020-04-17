const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();
let port = process.env.DEV_PORT_LISTEN;

app.use(express.json());
app.use(routes);

app.listen(port);