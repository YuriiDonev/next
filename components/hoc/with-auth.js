import React from 'react';
import BaseLayout from '../layouts/base-layout.js';
import BasePage from '../BasePage.js';

import { Auth0Context } from '../../services/auth0.js';

export default function (Component) {
  return class withAuth extends React.Component {

    static contextType = Auth0Context;

    static async getInitialProps(args) {
      const pageProps = await Component.getInitialProps && await Component.getInitialProps(args);
      return { ...pageProps };
    }

    renderProtectedPage = () => {
      const { isAuthenticated } = this.context;

      if (isAuthenticated) {
        return <Component {...this.props} />;
      } else {
        return (
          <BaseLayout>
            <BasePage>
              <div className='page-header'>
                <h1 className='page-header-title'>You are not authenticated. Please login to access this page</h1>
              </div>
            </BasePage>
          </BaseLayout>
        );
      }
    }

    render() {
      return this.renderProtectedPage();
    }

  }
}
