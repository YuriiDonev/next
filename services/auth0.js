import React, { Component, Fragment } from 'react';
import createAuth0Client from "@auth0/auth0-spa-js";
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';


const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

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
        client_id: 'fsEcjiFlMrxDEd7amFtfAtH2rH4k6bw0',
        // redirect_uri: `${window.location.origin}/callback`
        redirect_uri: `http://localhost:3000/callback`,
        audience: 'http://api.localhost:3000/'
      });

      this.setState({ auth0Client: auth0FromHook });

      // if (typeof window !== 'undefined') {}

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      this.setState({ isAuthenticated });

      this.setState({ loading: false });

    } catch(err) {
      console.log('creating err ', err);
    }

  }

  // loginWithPopup = async (params = {}) => {
  //   this.setState({ popupOpen: true });
  //   try {
  //     await this.state.auth0Client.loginWithPopup(params);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     this.setState({ popupOpen: false });
  //   }
  //   const user = await this.state.auth0Client.getUser();
  //   this.setState({ user });
  //   this.setState({ isAuthenticated: true });
  // }

  handleRedirectCallback = async () => {
    this.setState({ loading: true });
    await this.state.auth0Client.handleRedirectCallback();
    const user = await this.state.auth0Client.getUser();

    // console.log('user ', user);

    const token = await this.state.auth0Client.getTokenSilently();
    this.setState({ loading: false });
    this.setState({ isAuthenticated: true });

    localStorage.setItem('portfolio-token', token);
    Cookies.set('portfolio-token', token);


    this.setState({ user, token });
  }

  clientAuth = () => {
    if (typeof localStorage !== 'undefined') {
      const isAuthenticated = localStorage.getItem('portfolio-token');
      if (isAuthenticated) {
        return true;
      } else {
        return false;
      }
    }
  }

  logout = (...p) => {
    this.state.auth0Client.logout(...p);
    localStorage.removeItem('portfolio-token');
    Cookies.remove('portfolio-token');
  }

  render() {
    // console.log('this.state ', this.state);
    // console.log('this.props ', this.props);
    const { isAuthenticatedServer } = this.props;

    // console.log('isAuthenticatedServer ', isAuthenticatedServer);

    return (
      <Auth0Context.Provider
        value={{
          isAuthenticated: isAuthenticatedServer || this.clientAuth(),
          user: this.state.user,
          loading: this.state.loading,
          popupOpen: this.state.popupOpen,
          loginWithPopup: this.loginWithPopup,
          handleRedirectCallback: this.handleRedirectCallback,
          getIdTokenClaims: (...p) => this.state.auth0Client.getIdTokenClaims(...p),
          loginWithRedirect: (...p) => this.state.auth0Client.loginWithRedirect(...p),
          getTokenSilently: (...p) => this.state.auth0Client.getTokenSilently(...p),
          getTokenWithPopup: (...p) => this.state.auth0Client.getTokenWithPopup(...p),
          // logout: (...p) => this.state.auth0Client.logout(...p),
          logout: this.logout
        }}
      >
        { this.props.children }
      </Auth0Context.Provider>
    );
  }
}

export default withRouter(Auth0Provider);
