import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Col, Row, Card, CardHeader, CardBody, CardText, CardTitle, Button } from 'reactstrap';
import BaseLayout from '../components/layouts/base-layout.js';
import BasePage from '../components/BasePage.js';
import PortfolioCard from '../components/portfolios/portfolio-card.js';
import { getPortfolios, deletePortfolio } from '../services/endpoints.js';
import { Auth0Context } from '../services/auth0.js';

class Portfolios extends Component {
  state = {
    portfolios: [],
    isModalOpen: false
  }

  async componentDidMount() {
    let portfolios = [];
    try {
      const res = await getPortfolios();
      this.setState({ portfolios: res });
    } catch(err) {
      console.error(err);
    }
  }

  nanigateToEdit = (e, portfolioId) => {
    e.stopPropagation();
    // Router.pushRoute(`/portfolio/${portfolioId}/edit`);
    Router.push({ pathname: `/portfolio/${portfolioId}/edit` });
  }

  showDeletePortfolioWarn = (e, name, id) => {
    e.stopPropagation();
    const isConfirmDelete = confirm(`Are you sure you want to delete ${name}?`);
    if (isConfirmDelete) {
      this.deletePortfolio(id);
    }
  }

  renderPosts = (portfolios, isAuthenticated, isSiteOwner) => {
    return portfolios.map(portfolio =>
      <Col md="4" key={portfolio._id}>
        <PortfolioCard portfolio={portfolio} >
          {
            (isAuthenticated && isSiteOwner) &&
            <Fragment>
              <Button
                onClick={(e) => this.nanigateToEdit(e, portfolio._id)}
                color='warning'
              >Edit</Button>{' '}
              <Button
                onClick={(e) => this.showDeletePortfolioWarn(e, portfolio.title, portfolio._id)}
                color='danger'
              >Delete</Button>
            </Fragment>
          }
        </PortfolioCard>
      </Col>
    )
  }

  deletePortfolio = async (id) => {
    try {
      const deletedStatus = await deletePortfolio(id);
      const res = await getPortfolios();
      this.setState({ portfolios: res });
    } catch(err) {
      console.error(err);
    }
  }

  static contextType = Auth0Context;

  render() {
    const { portfolios } = this.state;
    const { isAuthenticated, isSiteOwner } = this.context;

    return (
      <BaseLayout title={'Portfolios'}>
        <BasePage className={'portfolio-page'} title={'Portfolios'}>
          {
            (isAuthenticated && isSiteOwner) &&
            <Button
              onClick={() => Router.push('/portfolio/new')}
              color='success'
              className='create-portfolio-btn'
            >Create Portfolio</Button>
          }
          <Row>
            { this.renderPosts(portfolios, isAuthenticated, isSiteOwner) }
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;
