import React, { Component } from 'react';
import BaseLayout from '../components/layouts/base-layout.js';
import BasePage from '../components/BasePage.js';

class Cv extends Component {

  render() {
    return (
      <BaseLayout>
        <BasePage>
          <div>CV</div>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Cv;
