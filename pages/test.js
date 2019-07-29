import React, { Component } from 'react';
import { withRouter } from 'next/router';
import BaseLayout from '../components/layouts/base-layout.js';
import axios from 'axios';

class Test extends Component {

  static async getInitialProps({ query }) {

    return { id: query.id  };
  }


  render() {

    console.log('this.props ', this.props);
    console.log('this.props.router.query ', this.props.router.query);

    const { id } = this.props;

    return (
      <BaseLayout>
        <h2> TEST PAGE </h2>
        <div>{ id }</div>
      </BaseLayout>
    );
  }
}

export default withRouter(Test);
