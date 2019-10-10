import React, { Component } from 'react';
import BaseLayout from '../components/layouts/base-layout.js';
import BasePage from '../components/BasePage.js';
import withAuth from '../components/hoc/with-auth.js';
import { Row, Col } from 'reactstrap';

import PortfolioCreateForm from '../components/portfolios/portfolio-create-form.js';

import { getPortfolioById } from '../services/endpoints.js';

class PortfolioEdit extends Component {

  static async getInitialProps({ req, query }) {
    let portfolio = {};

    // console.log('query ', query);
    // console.log('req.headers.cookie ', req.headers.cookie);

    try {

      portfolio = await getPortfolioById(query.id, req);

      console.log('portfolio ', portfolio);

    } catch(e) {
      console.error(e);
    }
    return { portfolio };
  }


  render() {

    const { portfolio } = this.props;

    return (
      <BaseLayout>
        <BasePage className='portfolio-create-page' title={'Edit portfolio'}>

          <Row>
            <Col md='6'>
              <PortfolioCreateForm
                isEdit={true}
                initialValues={portfolio}
              />
            </Col>
          </Row>

        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth(PortfolioEdit);
