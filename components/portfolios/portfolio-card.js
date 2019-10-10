import React, { Component, Fragment } from 'react';

import { Col, Row, Card, CardHeader, CardBody, CardText, CardTitle, Button } from 'reactstrap';


import ModalExample from '../portfolio-modal';

class PortfolioCard extends Component {

  state = {
    isModalOpen: false
  }


  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }


  render() {
    // console.log('this.props ', this.props);
    const { portfolio, children } = this.props;
    const { isModalOpen } = this.state;

    return (

      <Fragment>

        <ModalExample isOpen={isModalOpen} toggleModal={this.toggleModal} portfolio={portfolio} />

        <span onClick={this.toggleModal}>
          <Card className="portfolio-card">

            <CardHeader className="portfolio-card-header">{portfolio.title}</CardHeader>

            <CardBody>

              <p className="portfolio-card-city">{portfolio.description} </p>

              <CardTitle className="portfolio-card-title">{portfolio.company}</CardTitle>

              <CardText className="portfolio-card-text">{portfolio.language}</CardText>

              <CardText className="portfolio-card-text">{portfolio.codeUrl}</CardText>
              <CardText className="portfolio-card-text">{portfolio.deployedAppLink}</CardText>

              <CardText className="portfolio-card-text">{portfolio.startDate}</CardText>
              <CardText className="portfolio-card-text">{portfolio.endDate}</CardText>

              <div className="readMore"> </div>

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
