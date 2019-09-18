import React, { Component } from 'react';
import BaseLayout from '../components/layouts/base-layout.js';
import BasePage from '../components/BasePage.js';

class Blogs extends Component {

  render() {
    return (
      <BaseLayout>
        <BasePage>
          <div>Blogs</div>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Blogs;
