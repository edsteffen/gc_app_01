const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

var allowedOrigins = ['http://someorigin.com','http://anotherorigin.com','http://localhost:3333/'];
var corsOptions = {
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
          var msg = 'Requisição Negada!';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
      credentials: true,
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

let port = process.env.DEV_PORT_LISTEN;
app.listen(port);