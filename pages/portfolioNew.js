import React, { Component } from 'react';
import BaseLayout from '../components/layouts/base-layout.js';
import BasePage from '../components/BasePage.js';
import withAuth from '../components/hoc/with-auth.js';
import { Row, Col } from 'reactstrap';

import PortfolioCreateForm from '../components/portfolios/portfolio-create-form.js';

import { createPortfolio } from '../services/endpoints.js';

class PortfolioNew extends Component {

  render() {
    return (
      <BaseLayout>
        <BasePage className='portfolio-create-page' title={'Create new portfolio'}>

          <Row>
            <Col md='6'>
              <PortfolioCreateForm
                initialValues={{
                  _id: '',
                  title: '',
                  description: '',
                  company: '',
                  codeUrl: '',
                  deployedAppLink: '',
                  language: '',
                  startDate: '',
                  endDate: ''
                }}
              />
            </Col>
          </Row>

        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth(PortfolioNew);
