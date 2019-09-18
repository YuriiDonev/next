import React, { Component } from 'react';
import BaseLayout from '../components/layouts/base-layout.js';

import BasePage from '../components/BasePage.js';

class About extends Component {

  render() {
    return (
      <BaseLayout>
        <BasePage className='about-page' title={'This is the About page'}>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;
