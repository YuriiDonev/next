import React, { Component } from 'react';
import BaseLayout from '../components/layouts/base-layout.js';
import BasePage from '../components/BasePage.js';

import withAuth from '../components/hoc/with-auth.js';

import { getSecretData } from '../services/endpoints.js';

class Secret extends Component {

  static async getInitialProps({ req }) {

    let anotherSecretData;

    if (!process.browser) {
      anotherSecretData = await getSecretData(req);
    }

    console.log('anotherSecretData ', anotherSecretData);

    return { anotherSecretData };
  }

  state = {
    secretData: []
  }

  async componentDidMount() {
    const secretData = await getSecretData();
    this.setState({ secretData });
  }

  displaySecretData = () => {
    const { secretData } = this.state;
    if (secretData && secretData.length > 0) {
      return secretData.map((item, index) =>
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      )
    }
  }

  render() {
    const { superSecretValue } = this.props;

    return (
      <BaseLayout>
        <BasePage>
          <h1>I am Secret Page</h1>
          <p>Secret content</p>
          <h2>{ superSecretValue }</h2>

          {
            this.displaySecretData()
          }
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth(Secret);
