import React from 'react';
import App, { Container } from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

import Auth0Provider from '../services/auth0.js';

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    let isAuthenticatedServer = false;

    if (!process.browser) {
      if (ctx.req.headers.cookie) {
        const token = ctx.req.headers.cookie.split(';').find(c => c.trim().startsWith('portfolio-token='));
        if (token) {
          isAuthenticatedServer = true;
        }
      }
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, isAuthenticatedServer };
  }

  render() {
    const { Component, pageProps, isAuthenticatedServer } = this.props;

    // console.log('isAuthenticatedServer ', isAuthenticatedServer);

    return (
      <Container>
        <Auth0Provider isAuthenticatedServer={isAuthenticatedServer}>
          <Component {...pageProps} />
        </Auth0Provider>
      </Container>
    );
  }
}

export default MyApp;

// The package could not be installed. No valid plugins were found.
