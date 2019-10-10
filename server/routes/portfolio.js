const express = require('express');
const router = express.Router();
const authService = require('../services/auth.js');

const portfoliosController = require('../controllers/portfolio.js');

router.post('', authService.jwtCheck,
                authService.checkRole('siteOwner'),
                portfoliosController.savePortfolio);

router.get('', portfoliosController.getPortfolios);

router.get('/:id', portfoliosController.getPortfolioById);

router.patch('/:id', authService.jwtCheck,
                     authService.checkRole('siteOwner'),
                     portfoliosController.updatePortfolio);

router.delete('/:id', portfoliosController.deletePortfolio,
                      authService.checkRole('siteOwner'),
                      portfoliosController.deletePortfolio);

module.exports = router;
