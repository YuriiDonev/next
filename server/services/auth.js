var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// MIDDLEWARE
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
