const express = require('express');
const next = require('next');
const routes = require('../routes');

const mongoose = require('mongoose');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const config = require('./config');

const authService = require('./services/auth.js');

const secretData = [
  {
    title: 'Secret Data 1',
    description: 'This real secret data 1'
  },
  {
    title: 'Secret Data 2',
    description: 'My secret password'
  }
];

mongoose.connect(config.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(
  res => {
    console.log('Connected!!!!');
  }, err => {
    console.log('ERROR!!! ', err);
  }
);

app.prepare().then(() => {

  const server = express();

  server.get('/api/v1/secret', authService.jwtCheck, (req, res) => {

    return res.json(secretData);

  });

  server.get('/portfolio/:id', (req, res) => {
    app.render(req, res, '/portfolio', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({title: 'Not Authorized', detail: 'Unauthorized Access'});
    }
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on 3000');
  })

}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
