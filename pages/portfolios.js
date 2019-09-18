import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import BaseLayout from '../components/layouts/base-layout.js';
import axios from 'axios';

import { Col, Row, Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';

import BasePage from '../components/BasePage.js';

class Portfolios extends Component {

  static async getInitialProps() {
    let posts = [];
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log('res.data posts ', res.data);
      posts = res.data.slice(0, 10);
    } catch(err) {
      console.error(err);
    }
    return { posts };
  }

  renderPosts = (posts) => {
    return posts.map((post, index) =>
      <Col md="4">
        <Fragment key={index}>
          <span>
            <Card className="portfolio-card">
              <CardHeader className="portfolio-card-header">Some Position {index}</CardHeader>
              <CardBody>
                <p className="portfolio-card-city"> Some Location {index} </p>
                <CardTitle className="portfolio-card-title">Some Company {index}</CardTitle>
                <CardText className="portfolio-card-text">Some Description {index}</CardText>
                <div className="readMore"> </div>
              </CardBody>
            </Card>
          </span>
        </Fragment>
      </Col>
    )
  }

  render() {
    console.log('this.props ', this.props);
    const { posts } = this.props;

    return (
      <BaseLayout>
        <BasePage className={'portfolio-page'} title={'Portfolios'}>
          <Row>
            { this.renderPosts(posts) }
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;

// <li key={post.id}>
//  <Link as={`/portfolio/${post.id}`} href={`/portfolio?id=${post.id}`}>
//    <a>{post.title}</a>
//  </Link>
//</li>
