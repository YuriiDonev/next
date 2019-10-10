const Portfolio = require('../models/portfolio.js');

exports.getPortfolios = (req, res) => {
  Portfolio.find({}, (err, allPortfolios) => {
    if (err) return res.status(422).send(err);
    return res.json(allPortfolios);
  });
};

exports.getPortfolioById = (req, res) => {
  const portfolioId = req.params.id;
  Portfolio.findById({_id: portfolioId}, (err, foundedPortfolio) => {
    if (err) return res.status(422).send(err);
    return res.json(foundedPortfolio);
  });
};

exports.savePortfolio = (req, res) => {
  const portfolioData = req.body;
  const portfolio = new Portfolio(portfolioData);
  portfolio.save((err, createdPortfolio) => {
    if (err) return res.status(422).send(err);
    return res.json(createdPortfolio);
  });
};

exports.updatePortfolio = (req, res) => {
  const portfolioId = req.params.id;
  const portfolioData = req.body;
  Portfolio.findById(portfolioId, (err, foundedPortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }
    if (!foundedPortfolio) {
      return res.status(400).send('Not found');
    };
    foundedPortfolio.set(portfolioData);
    foundedPortfolio.save((err, savedPortfolio) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json(savedPortfolio);
    });
  });
}

exports.deletePortfolio = (req, res) => {
  const portfolioId = req.params.id;
  Portfolio.deleteOne({_id: portfolioId}, (err, deletedPortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }
    return res.json({ status: 'DELETED' });
  });
};
