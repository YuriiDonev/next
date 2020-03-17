import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Col, Row, Card, CardHeader, CardBody, CardText, CardTitle, Button } from 'reactstrap';
import ModalPortfolio from '../portfolio-modal';

class PortfolioCard extends Component {
  state = {
    isModalOpen: false
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    const { portfolio, children } = this.props;
    const { isModalOpen } = this.state;

    return (
      <Fragment>
        <ModalPortfolio isOpen={isModalOpen} toggleModal={this.toggleModal} portfolio={portfolio} />
        <span onClick={this.toggleModal}>
          <Card className="portfolio-card">
            <CardHeader className="portfolio-card-header">{portfolio.title}</CardHeader>
            <CardBody>
              {
                portfolio.imgUrl &&
                <div className="img-container">
                  <img width="100%" src={portfolio.imgUrl} alt="Card image cap"
                    loading="lazy"
                  />
                </div>
              }
              {
                portfolio.appGoal &&
                <Fragment>
                  <b>{'Application Goal:'}</b>
                  <p>{portfolio.appGoal}</p>
                </Fragment>
              }
              <b>{'Description:'}</b>
              <p>
                {
                  _.truncate(portfolio.description, { 'length': 100 })
                }
                {
                  portfolio.description.length > 100 &&
                  <b>{' read more'}</b>
                }
              </p>
              {
                portfolio.language &&
                <Fragment>
                  <b>{'Tech Stack:'}</b>
                  <p>{portfolio.language}</p>
                </Fragment>
              }
              {
                children
              }
            </CardBody>
          </Card>
        </span>
      </Fragment>

    );
  }
}

export default PortfolioCard;
