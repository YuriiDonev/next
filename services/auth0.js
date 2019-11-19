import React, { Component, Fragment } from 'react';
import createAuth0Client from "@auth0/auth0-spa-js";
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);
const CLIENT_ID = process.env.CLIENT_ID;

export const Auth0Context = React.createContext();

class Auth0Provider extends Component {

  state = {
    auth0Client: null,
    isAuthenticated: false,
    user: null,
    loading: false,
    popupOpen: false,
    token: null
  }

  async componentDidMount() {
    try {
      const auth0FromHook = await createAuth0Client({
        domain: 'dev--lew0s-p.eu.auth0.com',
        client_id: CLIENT_ID,
        redirect_uri: `${process.env.BASE_URL}/callback`,
        audience: 'http://api.localhost:3000/'
      });
      this.setState({ auth0Client: auth0FromHook });
      const isAuthenticated = await auth0FromHook.isAuthenticated();
      this.setState({ isAuthenticated, loading: false });
    } catch(err) {
      console.log('creating err ', err);
    }
  }

  handleRedirectCallback = async () => {
    this.setState({ loading: true });
    await this.state.auth0Client.handleRedirectCallback();
    const user = await this.state.auth0Client.getUser();
    Cookies.set('portfolio-user', user[`${process.env.NAMESPACE}/rules`]);
    const token = await this.state.auth0Client.getTokenSilently();
    this.setState({ loading: false });
    this.setState({ isAuthenticated: true });
    Cookies.set('portfolio-token', token);
    this.setState({ user, token });
  }

  clientAuth = () => {
    if (typeof document !== 'undefined' && document.cookie) {
      const token = document.cookie.split(';').find(c => c.trim().startsWith('portfolio-token='));
      if (token) {
        return true;
      } else {
        return false;
      }
    }
  }

  logout = (...p) => {
    this.state.auth0Client.logout({...p, returnTo: process.env.BASE_URL});
    localStorage.removeItem('portfolio-token');
    Cookies.remove('portfolio-token');
    Cookies.remove('portfolio-user');
  }

  render() {
    const { isAuthenticatedServer, isSiteOwner } = this.props;

    return (
      <Auth0Context.Provider
        value={{
          isAuthenticated: isAuthenticatedServer || this.clientAuth(),
          isSiteOwner: isSiteOwner,
          user: this.state.user,
          loading: this.state.loading,
          popupOpen: this.state.popupOpen,
          loginWithPopup: this.loginWithPopup,
          handleRedirectCallback: this.handleRedirectCallback,
          getIdTokenClaims: (...p) => this.state.auth0Client.getIdTokenClaims(...p),
          loginWithRedirect: (...p) => this.state.auth0Client.loginWithRedirect(...p),
          getTokenSilently: (...p) => this.state.auth0Client.getTokenSilently(...p),
          getTokenWithPopup: (...p) => this.state.auth0Client.getTokenWithPopup(...p),
          logout: this.logout
        }}
      >
        { this.props.children }
      </Auth0Context.Provider>
    );
  }
}

export default withRouter(Auth0Provider);
