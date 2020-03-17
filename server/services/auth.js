var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

exports.jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev--lew0s-p.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://api.localhost:3000/',
    issuer: 'https://dev--lew0s-p.eu.auth0.com/',
    algorithms: ['RS256']
});

exports.checkRole = role => (req, res, next) => {
  if (req.cookies['portfolio-user'] === role) {
    next();
  } else {
    return res.status(401).send({ title: 'Not Authorized', detail: 'You are not authorized to access this data' });
  }
}
