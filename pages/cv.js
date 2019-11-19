import React, { Component } from 'react';
import BaseLayout from '../components/layouts/base-layout.js';
import BasePage from '../components/BasePage.js';

import { Row, Col } from 'reactstrap';

class Cv extends Component {

  render() {
    return (
      <BaseLayout title={'CV - Yurii Donev '}>
        <BasePage title={'Feel free to download my CV'} className='cv-page'>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <div className='cv-title'>
                <a
                  download='Donev_Yurii_Fullstack_JS.pdf'
                  className='btn btn-success'
                  href='/static/Donev_Yurii_Fullstack_JS.pdf'
                >Download</a>
              </div>
            </Col>
          </Row>
          <iframe src='/static/Donev_Yurii_Fullstack_JS.pdf' style={{ width: '100%', height: '800px' }} />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Cv;
