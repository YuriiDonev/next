import React, { Component, Fragment } from 'react';
import Header from '../components/shared/header.js';
import BaseLayout from '../components/layouts/base-layout.js';

import axios from 'axios';


class Index extends Component {

  static async getInitialProps() {
    let userData = {};
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      console.log('res.data ', res.data);
      userData = res.data;
    } catch(err) {
      console.error(err);
    }
    return { userData };
  }

  render() {

    // console.log('this.props ', this.props);
    const { userData } = this.props;

    return (
      <BaseLayout>
        <h2>This is the index page</h2>
        <div>Title: {userData.title}</div>

      </BaseLayout>
    );
  }
}

export default Index;
