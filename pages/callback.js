import React, { Component } from 'react';
import BaseLayout from '../components/layouts/base-layout.js';
import BasePage from '../components/BasePage.js';
import _ from 'lodash';
import { withRouter } from 'next/router';
import { Auth0Context } from '../services/auth0.js';

class CallbackPage extends Component {

  static contextType = Auth0Context;

  state = {
    auth0Context: null
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.state.auth0Context, this.context.auth0Client)) {
      this.setState({ auth0Context: this.context.auth0Client });
      this.context.handleRedirectCallback();
      this.props.router.push('/');
    }
  }

  render() {
    return (
      <BaseLayout title={'Authorization'}>
        <BasePage>
          <div> Verifying loading data... </div>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(CallbackPage);
