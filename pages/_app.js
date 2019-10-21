import React from 'react';
import App, { Container } from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

import Auth0Provider from '../services/auth0.js';

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let isAuthenticatedServer = false;
    let isSiteOwner = false;
    if (!process.browser) {
      if (ctx.req.headers.cookie) {
        if (ctx.req.cookies['portfolio-user'] === 'siteOwner') {
          isSiteOwner = true;
        }
        const token = ctx.req.headers.cookie.split(';').find(c => c.trim().startsWith('portfolio-token='));
        if (token) {
          isAuthenticatedServer = true;
        }
      }
    } else {
      if (document.cookie) {
        const siteOwnerCookiie = document.cookie.split(';').find(c => c.trim().startsWith('portfolio-user='));
        if (siteOwnerCookiie && siteOwnerCookiie.trim() === 'portfolio-user=siteOwner') {
          isSiteOwner = true;
        }
      }
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, isAuthenticatedServer, isSiteOwner };
  }

  render() {
    const { Component, pageProps, isAuthenticatedServer, isSiteOwner } = this.props;

    return (
      <Container>
        <Auth0Provider isAuthenticatedServer={isAuthenticatedServer} isSiteOwner={isSiteOwner}>
          <Component {...pageProps} />
        </Auth0Provider>
      </Container>
    );
  }
}

export default MyApp;
