import React, { Component } from 'react';
import { withRouter } from 'next/router';
import BaseLayout from '../components/layouts/base-layout.js';
import axios from 'axios';

class PortfolioItem extends Component {

  static async getInitialProps({ query }) {

    console.log('getInitialProps ', query);
    const portfolioId = query.id;
    let portfolio = {};

    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${portfolioId}`);
      console.log('res.data ', res.data);
      portfolio = res.data;

    } catch(err) {
      console.error(err);
    }
    return { portfolio };
  }


  render() {

    console.log('this.props ', this.props);
    console.log('this.props.router.query ', this.props.router.query);

    const { portfolio } = this.props;

    return (
      <BaseLayout>
        <h2>Portfolio:</h2>
        <div>ID: {portfolio.id}</div>
        <h2>Title: {portfolio.title}</h2>
        <div>{portfolio.body}</div>
      </BaseLayout>
    );
  }
}

export default withRouter(PortfolioItem);
