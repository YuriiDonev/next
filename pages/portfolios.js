import React, { Component } from 'react';
import Link from 'next/link';
import BaseLayout from '../components/layouts/base-layout.js';
import axios from 'axios';

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
    return posts.map(post => <li key={post.id}>
      <Link as={`/portfolio/${post.id}`} href={`/portfolio?id=${post.id}`}>
        <a>{post.title}</a>
      </Link>
    </li>)
  }

  render() {
    console.log('this.props ', this.props);
    const { posts } = this.props;

    return (
      <BaseLayout>
        <ul>
          { this.renderPosts(posts) }
        </ul>
      </BaseLayout>
    );
  }
}

export default Portfolios;
