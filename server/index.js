const express = require('express');
const compression = require('compression');
const path = require('path');
const next = require('next');
const routes = require('../routes');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const config = require('./config');

const authService = require('./services/auth.js');
const portfolioRoutes = require('./routes/portfolio.js');

const robotsOptions = {
  root: path.join(__dirname, "../static"),
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
};

mongoose.connect(config.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(
  res => {
    console.log('DB Connected');
  }, err => {
    console.log('Mongo DB connection ERROR ', err);
  }
);

app.prepare().then(() => {

  const server = express();
  server.use(compression());
  server.use(bodyParser.json());
  server.use(cookieParser());

  server.use('/api/v1/portfolios', portfolioRoutes);

  server.get('/robots.txt', (req, res) => {
    return res.status(200).sendFile('robots.txt', robotsOptions);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({title: 'Not Authorized', detail: 'Unauthorized Access'});
    }
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${PORT}`);
  })

}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
